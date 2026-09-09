package com.mrmaz

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.ContentValues
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.Rect
import android.hardware.display.DisplayManager
import android.hardware.display.VirtualDisplay
import android.media.Image
import android.media.ImageReader
import android.media.MediaRecorder
import android.media.projection.MediaProjection
import android.media.projection.MediaProjectionManager
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.os.SystemClock
import android.provider.MediaStore
import android.provider.Settings
import android.view.Gravity
import android.view.WindowManager
import android.graphics.PixelFormat
import android.content.pm.ServiceInfo
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import java.io.File
import java.io.FileInputStream

class ScreenCaptureService : Service() {
    companion object {
        const val ACTION_STOP = "com.mrmaz.action.STOP"
        const val EXTRA_RESULT_CODE = "com.mrmaz.extra.RESULT_CODE"
        const val EXTRA_DATA = "com.mrmaz.extra.DATA"
        const val PREF_RECORDING = "recording"
        const val CAPTURE_WIDTH = 360
        const val CAPTURE_HEIGHT = 640
        private const val CHANNEL_ID = "mrmaz_capture"
        private const val NOTIFICATION_ID = 241551
    }

    private val handler = Handler(Looper.getMainLooper())
    private var projection: MediaProjection? = null
    private var recorder: MediaRecorder? = null
    private var recordingDisplay: VirtualDisplay? = null
    private var analysisDisplay: VirtualDisplay? = null
    private var reader: ImageReader? = null
    private var outputFile: File? = null
    private var overlayView: MaskOverlayView? = null
    private var windowManager: WindowManager? = null
    private var lastAnalysisAt = 0L
    private var lastOcrAt = 0L
    private var lastDetectionAt = 0L
    private var stopped = false
    private val recognizer by lazy { TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS) }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent?.action == ACTION_STOP) {
            stopCapture()
            return START_NOT_STICKY
        }
        if (projection != null) return START_STICKY

        val resultCode = intent?.getIntExtra(EXTRA_RESULT_CODE, 0) ?: 0
        val data = if (Build.VERSION.SDK_INT >= 33) {
            intent?.getParcelableExtra(EXTRA_DATA, Intent::class.java)
        } else {
            @Suppress("DEPRECATION")
            intent?.getParcelableExtra(EXTRA_DATA)
        }
        if (resultCode == 0 || data == null) {
            stopSelf()
            return START_NOT_STICKY
        }

        startAsForeground()
        val manager = getSystemService(MediaProjectionManager::class.java)
        projection = manager.getMediaProjection(resultCode, data)
        if (projection == null) {
            stopCapture()
            return START_NOT_STICKY
        }
        projection?.registerCallback(object : MediaProjection.Callback() {
            override fun onStop() {
                stopCapture()
            }
        }, handler)
        startCapture()
        return START_STICKY
    }

    private fun startAsForeground() {
        val notification = buildNotification()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            startForeground(
                NOTIFICATION_ID,
                notification,
                ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION
            )
        } else {
            startForeground(NOTIFICATION_ID, notification)
        }
    }

    private fun startCapture() {
        try {
            outputFile = File.createTempFile("mrmaz_", ".mp4", cacheDir)
            recorder = MediaRecorder().apply {
                setVideoSource(MediaRecorder.VideoSource.SURFACE)
                setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
                setVideoEncoder(MediaRecorder.VideoEncoder.H264)
                setVideoEncodingBitRate(1_200_000)
                setVideoFrameRate(30)
                setVideoSize(CAPTURE_WIDTH, CAPTURE_HEIGHT)
                setOutputFile(outputFile!!.absolutePath)
                prepare()
            }

            val density = resources.displayMetrics.densityDpi
            recordingDisplay = projection?.createVirtualDisplay(
                "MrmazRecorder",
                CAPTURE_WIDTH,
                CAPTURE_HEIGHT,
                density,
                DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
                recorder!!.surface,
                null,
                handler
            )
            recorder?.start()

            // Android 14+ allows only one virtual display per projection session.
            // Analysis is optional: never let its failure break the recording.
            try {
                reader = ImageReader.newInstance(
                    CAPTURE_WIDTH,
                    CAPTURE_HEIGHT,
                    PixelFormat.RGBA_8888,
                    2
                )
                reader?.setOnImageAvailableListener({ processFrame(it) }, handler)
                analysisDisplay = projection?.createVirtualDisplay(
                    "MrmazAnalysis",
                    CAPTURE_WIDTH,
                    CAPTURE_HEIGHT,
                    density,
                    DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
                    reader!!.surface,
                    null,
                    handler
                )
            } catch (_: Throwable) {
                analysisDisplay = null
                try { reader?.close() } catch (_: Exception) { }
                reader = null
            }

            installOverlay()
        } catch (error: Throwable) {
            saveError(error.javaClass.simpleName + ": " + (error.message ?: ""))
            stopCapture()
        }
    }

    private fun saveError(message: String) {
        getSharedPreferences("mrmaz", Context.MODE_PRIVATE)
            .edit().putString("last_error", message).apply()
    }


    private fun processFrame(source: ImageReader) {
        val now = SystemClock.elapsedRealtime()
        val image = try { source.acquireLatestImage() } catch (_: Exception) { null } ?: return
        try {
            if (now - lastAnalysisAt < 25L) return
            lastAnalysisAt = now

            val candidate = findSharpRedRegion(image)
            if (candidate != null && now - lastOcrAt >= 125L) {
                lastOcrAt = now
                val bitmap = cropBitmap(image, candidate)
                if (bitmap != null) recognizeTarget(bitmap, candidate)
            } else if (now - lastDetectionAt > 220L) {
                handler.post { overlayView?.setMask(null) }
            }
        } finally {
            image.close()
        }
    }

    private fun findSharpRedRegion(image: Image): Rect? {
        val plane = image.planes.firstOrNull() ?: return null
        val buffer = plane.buffer
        val pixelStride = plane.pixelStride
        val rowStride = plane.rowStride
        val limit = buffer.limit()
        var minX = CAPTURE_WIDTH
        var minY = CAPTURE_HEIGHT
        var maxX = -1
        var maxY = -1
        var redCount = 0
        var edgeCount = 0

        var y = 1
        while (y < CAPTURE_HEIGHT - 1) {
            var x = 1
            while (x < CAPTURE_WIDTH - 1) {
                val pos = y * rowStride + x * pixelStride
                if (pos + 2 < limit) {
                    val r = buffer.get(pos).toInt() and 0xff
                    val g = buffer.get(pos + 1).toInt() and 0xff
                    val b = buffer.get(pos + 2).toInt() and 0xff
                    if (r >= 220 && g <= 80 && b <= 80 && r - g >= 150) {
                        redCount++
                        if (x < minX) minX = x
                        if (x > maxX) maxX = x
                        if (y < minY) minY = y
                        if (y > maxY) maxY = y

                        val rightPos = y * rowStride + (x + 1) * pixelStride
                        if (rightPos + 2 < limit) {
                            val rightRed = buffer.get(rightPos).toInt() and 0xff
                            val rightGreen = buffer.get(rightPos + 1).toInt() and 0xff
                            val rightBlue = buffer.get(rightPos + 2).toInt() and 0xff
                            if (rightRed < 160 || rightGreen > 120 || rightBlue > 120) edgeCount++
                        }
                    }
                }
                x += 2
            }
            y += 2
        }

        if (redCount < 8 || maxX <= minX || maxY <= minY) return null
        if (edgeCount * 100 < redCount * 8) return null
        return Rect(
            (minX - 8).coerceAtLeast(0),
            (minY - 8).coerceAtLeast(0),
            (maxX + 9).coerceAtMost(CAPTURE_WIDTH),
            (maxY + 9).coerceAtMost(CAPTURE_HEIGHT)
        )
    }

    private fun cropBitmap(image: Image, region: Rect): Bitmap? {
        val plane = image.planes.firstOrNull() ?: return null
        val buffer = plane.buffer
        val pixelStride = plane.pixelStride
        val rowStride = plane.rowStride
        val left = region.left.coerceIn(0, CAPTURE_WIDTH - 1)
        val top = region.top.coerceIn(0, CAPTURE_HEIGHT - 1)
        val right = region.right.coerceIn(left + 1, CAPTURE_WIDTH)
        val bottom = region.bottom.coerceIn(top + 1, CAPTURE_HEIGHT)
        val width = right - left
        val height = bottom - top
        val pixels = IntArray(width * height)
        val limit = buffer.limit()
        for (y in 0 until height) {
            for (x in 0 until width) {
                val pos = (top + y) * rowStride + (left + x) * pixelStride
                if (pos + 2 < limit) {
                    val r = buffer.get(pos).toInt() and 0xff
                    val g = buffer.get(pos + 1).toInt() and 0xff
                    val b = buffer.get(pos + 2).toInt() and 0xff
                    pixels[y * width + x] = Color.rgb(r, g, b)
                }
            }
        }
        return Bitmap.createBitmap(pixels, width, height, Bitmap.Config.ARGB_8888)
    }

    private fun recognizeTarget(bitmap: Bitmap, region: Rect) {
        recognizer.process(InputImage.fromBitmap(bitmap, 0))
            .addOnSuccessListener { result ->
                val normalized = result.text.replace(" ", "").replace("\n", "")
                if (normalized.contains("241551")) {
                    lastDetectionAt = SystemClock.elapsedRealtime()
                    handler.post { overlayView?.setMask(region) }
                }
            }
            .addOnCompleteListener { bitmap.recycle() }
    }

    private fun installOverlay() {
        if (!Settings.canDrawOverlays(this)) return
        try {
            windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
            overlayView = MaskOverlayView(this)
            val type = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            } else {
                @Suppress("DEPRECATION")
                WindowManager.LayoutParams.TYPE_PHONE
            }
            val params = WindowManager.LayoutParams(
                WindowManager.LayoutParams.MATCH_PARENT,
                WindowManager.LayoutParams.MATCH_PARENT,
                type,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                    WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE or
                    WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
                PixelFormat.TRANSLUCENT
            )
            params.gravity = Gravity.TOP or Gravity.START
            windowManager?.addView(overlayView, params)
        } catch (_: Exception) {
            overlayView = null
        }
    }

    private fun stopCapture() {
        if (stopped) return
        stopped = true
        try { recorder?.stop() } catch (_: Exception) { }
        try { recorder?.reset() } catch (_: Exception) { }
        recorder?.release()
        recorder = null
        recordingDisplay?.release()
        analysisDisplay?.release()
        recordingDisplay = null
        analysisDisplay = null
        reader?.close()
        reader = null
        projection?.stop()
        projection = null
        try { windowManager?.removeView(overlayView) } catch (_: Exception) { }
        overlayView = null
        outputFile?.let { copyToGallery(it) }
        getSharedPreferences("mrmaz", Context.MODE_PRIVATE)
            .edit().putBoolean(PREF_RECORDING, false).apply()
        stopForeground(STOP_FOREGROUND_REMOVE)
        stopSelf()
    }

    private fun copyToGallery(source: File) {
        if (!source.exists() || source.length() == 0L) return
        val name = "Mrmaz_" + System.currentTimeMillis() + ".mp4"
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val values = ContentValues().apply {
                put(MediaStore.Video.Media.DISPLAY_NAME, name)
                put(MediaStore.Video.Media.MIME_TYPE, "video/mp4")
                put(MediaStore.Video.Media.RELATIVE_PATH, Environment.DIRECTORY_MOVIES + "/Mrmaz")
                put(MediaStore.Video.Media.IS_PENDING, 1)
            }
            val uri: Uri? = contentResolver.insert(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, values)
            if (uri != null) {
                try {
                    contentResolver.openOutputStream(uri)?.use { output ->
                        FileInputStream(source).use { input -> input.copyTo(output) }
                    }
                    values.clear()
                    values.put(MediaStore.Video.Media.IS_PENDING, 0)
                    contentResolver.update(uri, values, null, null)
                } catch (_: Exception) {
                    contentResolver.delete(uri, null, null)
                }
            }
        } else {
            val directory = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES)
            val targetDirectory = File(directory, "Mrmaz")
            targetDirectory.mkdirs()
            source.copyTo(File(targetDirectory, name), overwrite = true)
        }
        source.delete()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                getString(R.string.capture_channel),
                NotificationManager.IMPORTANCE_LOW
            )
            getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        }
    }

    private fun buildNotification(): Notification {
        val launchIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this,
            1,
            launchIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Notification.Builder(this, CHANNEL_ID)
                .setContentTitle(getString(R.string.app_name))
                .setContentText(getString(R.string.recording))
                .setSmallIcon(android.R.drawable.ic_menu_camera)
                .setContentIntent(pendingIntent)
                .setOngoing(true)
                .build()
        } else {
            @Suppress("DEPRECATION")
            Notification.Builder(this)
                .setContentTitle(getString(R.string.app_name))
                .setContentText(getString(R.string.recording))
                .setSmallIcon(android.R.drawable.ic_menu_camera)
                .setContentIntent(pendingIntent)
                .setOngoing(true)
                .build()
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        stopCapture()
        recognizer.close()
        super.onDestroy()
    }
}
