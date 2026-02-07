package com.lineargradientfabric

import android.content.Context
import android.graphics.Canvas
import android.graphics.LinearGradient
import android.graphics.Paint
import android.graphics.Shader
import android.widget.FrameLayout
import kotlin.math.cos
import kotlin.math.sin

class LinearGradientView(context: Context) : FrameLayout(context) {

    private val paint = Paint()
    private var colors: IntArray = intArrayOf()
    private var locations: FloatArray? = null
    private var startX: Float = 0.5f
    private var startY: Float = 0f
    private var endX: Float = 0.5f
    private var endY: Float = 1f
    private var useAngle: Boolean = false
    private var angle: Float = 0f
    private var angleCenterX: Float = 0.5f
    private var angleCenterY: Float = 0.5f

    init {
        // Enable drawing for ViewGroup
        setWillNotDraw(false)
    }

    fun setColors(colors: IntArray) {
        this.colors = colors
        invalidate()
    }

    fun setLocations(locations: FloatArray?) {
        this.locations = locations
        invalidate()
    }

    fun setStartPoint(x: Float, y: Float) {
        this.startX = x
        this.startY = y
        invalidate()
    }

    fun setEndPoint(x: Float, y: Float) {
        this.endX = x
        this.endY = y
        invalidate()
    }

    fun setUseAngle(useAngle: Boolean) {
        this.useAngle = useAngle
        invalidate()
    }

    fun setAngle(angle: Float) {
        this.angle = angle
        invalidate()
    }

    fun setAngleCenter(x: Float, y: Float) {
        this.angleCenterX = x
        this.angleCenterY = y
        invalidate()
    }

    override fun onDraw(canvas: Canvas) {
        if (colors.size < 2 || width == 0 || height == 0) {
            super.onDraw(canvas)
            return
        }

        val (x0, y0, x1, y1) = calculateGradientPoints()

        val gradient = LinearGradient(
            x0, y0, x1, y1,
            colors,
            locations,
            Shader.TileMode.CLAMP
        )

        paint.shader = gradient
        canvas.drawRect(0f, 0f, width.toFloat(), height.toFloat(), paint)

        super.onDraw(canvas)
    }

    private fun calculateGradientPoints(): FloatArray {
        return if (useAngle) {
            calculatePointsFromAngle()
        } else {
            floatArrayOf(
                startX * width,
                startY * height,
                endX * width,
                endY * height
            )
        }
    }

    private fun calculatePointsFromAngle(): FloatArray {
        // Convert angle from degrees to radians
        // Angle 0 = up, 90 = right, 180 = down, 270 = left
        val angleRad = Math.toRadians((angle - 90).toDouble())

        // Calculate the gradient direction vector
        val dx = cos(angleRad).toFloat()
        val dy = sin(angleRad).toFloat()

        // Calculate the center point in pixels
        val centerPx = angleCenterX * width
        val centerPy = angleCenterY * height

        // Calculate the length to cover the view
        // Use half the diagonal for proper coverage
        val halfWidth = width / 2f
        val halfHeight = height / 2f

        val x0 = centerPx - dx * halfWidth
        val y0 = centerPy - dy * halfHeight
        val x1 = centerPx + dx * halfWidth
        val y1 = centerPy + dy * halfHeight

        return floatArrayOf(x0, y0, x1, y1)
    }
}
