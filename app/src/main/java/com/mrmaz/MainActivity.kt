package com.mrmaz

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.media.projection.MediaProjectionManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import android.view.WindowManager
import android.widget.Button
import android.widget.TextView

class MainActivity : Activity() {
    private lateinit var statusText: TextView
    private lateinit var recordButton: Button
    private val handler = Handler(Looper.getMainLooper())
    private val preferences by lazy { getSharedPreferences("mrmaz", Context.MODE_PRIVATE) }
    private val projectionRequestCode = 710
    private val overlayRequestCode = 711
    private var stopRequested = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.addFlags(WindowManager.LayoutParams.FLAG_SECURE)
        setContentView(R.layout.activity_main)

        statusText = findViewById(R.id.statusText)
        recordButton = findViewById(R.id.recordButton)
        recordButton.setOnClickListener {
            if (isRecording()) stopRecording() else requestCapture()
        }
        updateUi()
    }

    override fun onResume() {
        super.onResume()
        updateUi()
    }

    private fun requestCapture() {
        preferences.edit().remove("last_error").apply()
        if (Build.VERSION.SDK_INT >= 33 &&
            checkSelfPermission(android.Manifest.permission.POST_NOTIFICATIONS) !=
            android.content.pm.PackageManager.PERMISSION_GRANTED
        ) {
            requestPermissions(arrayOf(android.Manifest.permission.POST_NOTIFICATIONS), 712)
        }
        if (!Settings.canDrawOverlays(this)) {
            statusText.setText(R.string.overlay_required)
            val intent = Intent(
                Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:" + packageName)
            )
            startActivityForResult(intent, overlayRequestCode)
            return
        }

        val manager = getSystemService(MediaProjectionManager::class.java)
        startActivityForResult(manager.createScreenCaptureIntent(), projectionRequestCode)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == overlayRequestCode) {
            if (Settings.canDrawOverlays(this)) requestCapture()
            else statusText.setText(R.string.overlay_required)
            return
        }

        if (requestCode == projectionRequestCode) {
            if (resultCode == RESULT_OK && data != null) {
                startCountdown(resultCode, data)
            } else {
                statusText.setText(R.string.permission_cancelled)
                updateUi()
            }
        }
    }

    private fun startCountdown(resultCode: Int, data: Intent) {
        recordButton.isEnabled = false
        var remaining = 3
        statusText.text = getString(R.string.countdown, remaining)
        val tick = object : Runnable {
            override fun run() {
                remaining -= 1
                if (remaining == 0) {
                    val serviceIntent = Intent(this@MainActivity, ScreenCaptureService::class.java)
                        .putExtra(ScreenCaptureService.EXTRA_RESULT_CODE, resultCode)
                        .putExtra(ScreenCaptureService.EXTRA_DATA, data)
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        startForegroundService(serviceIntent)
                    } else {
                        startService(serviceIntent)
                    }
                    stopRequested = false
                    preferences.edit().putBoolean(ScreenCaptureService.PREF_RECORDING, true).apply()
                    statusText.setText(R.string.recording)
                    moveTaskToBack(true)
                    updateUi()
                } else {
                    statusText.text = getString(R.string.countdown, remaining)
                    handler.postDelayed(this, 1000L)
                }
            }
        }
        handler.postDelayed(tick, 1000L)
    }

    private fun stopRecording() {
        if (!isRecording() || stopRequested) return

        stopRequested = true
        recordButton.isEnabled = false
        statusText.setText(R.string.saving_video)
        startService(Intent(this, ScreenCaptureService::class.java).setAction(ScreenCaptureService.ACTION_STOP))
        waitForServiceToFinish()
    }

    private fun waitForServiceToFinish() {
        handler.post(object : Runnable {
            override fun run() {
                if (isRecording()) {
                    handler.postDelayed(this, 100L)
                    return
                }

                stopRequested = false
                statusText.setText(R.string.saved_video)
                updateUi()
            }
        })
    }

    private fun isRecording(): Boolean =
        preferences.getBoolean(ScreenCaptureService.PREF_RECORDING, false)

    private fun updateUi() {
        if (!::recordButton.isInitialized) return
        val lastError = preferences.getString("last_error", null)
        if (isRecording()) {
            recordButton.setText(R.string.stop_recording)
            recordButton.isEnabled = !stopRequested
            if (!stopRequested) statusText.setText(R.string.recording)
        } else {
            stopRequested = false
            recordButton.isEnabled = true
            recordButton.setText(R.string.start_recording)
            if (!lastError.isNullOrBlank()) {
                statusText.text = "خطأ: $lastError"
                preferences.edit().remove("last_error").apply()
            } else if (statusText.text.isNullOrBlank()) {
                statusText.setText(R.string.ready)
            }
        }
    }


    override fun onDestroy() {
        handler.removeCallbacksAndMessages(null)
        super.onDestroy()
    }
}
