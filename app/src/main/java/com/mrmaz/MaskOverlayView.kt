package com.mrmaz

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Rect
import android.graphics.RectF
import android.view.View

class MaskOverlayView(context: Context) : View(context) {
    private val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.BLACK }
    private var mask: Rect? = null

    fun setMask(value: Rect?) {
        mask = value?.let { Rect(it) }
        invalidate()
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        val source = mask ?: return
        if (width == 0 || height == 0) return
        val scaleX = width.toFloat() / ScreenCaptureService.CAPTURE_WIDTH
        val scaleY = height.toFloat() / ScreenCaptureService.CAPTURE_HEIGHT
        val target = RectF(
            source.left * scaleX,
            source.top * scaleY,
            source.right * scaleX,
            source.bottom * scaleY
        )
        canvas.drawRect(target, paint)
    }
}
