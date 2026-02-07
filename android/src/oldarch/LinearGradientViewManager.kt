package com.lineargradientfabric

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp

class LinearGradientViewManager : ViewGroupManager<LinearGradientView>() {

    override fun getName(): String = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): LinearGradientView {
        return LinearGradientView(reactContext)
    }

    @ReactProp(name = "colors")
    fun setColors(view: LinearGradientView, colors: ReadableArray?) {
        if (colors == null) return

        val colorArray = IntArray(colors.size())
        for (i in 0 until colors.size()) {
            colorArray[i] = colors.getInt(i)
        }
        view.setColors(colorArray)
    }

    @ReactProp(name = "locations")
    fun setLocations(view: LinearGradientView, locations: ReadableArray?) {
        if (locations == null) {
            view.setLocations(null)
            return
        }

        val locationArray = FloatArray(locations.size())
        for (i in 0 until locations.size()) {
            locationArray[i] = locations.getDouble(i).toFloat()
        }
        view.setLocations(locationArray)
    }

    @ReactProp(name = "startPoint")
    fun setStartPoint(view: LinearGradientView, startPoint: ReadableMap?) {
        if (startPoint == null) return

        val x = startPoint.getDouble("x").toFloat()
        val y = startPoint.getDouble("y").toFloat()
        view.setStartPoint(x, y)
    }

    @ReactProp(name = "endPoint")
    fun setEndPoint(view: LinearGradientView, endPoint: ReadableMap?) {
        if (endPoint == null) return

        val x = endPoint.getDouble("x").toFloat()
        val y = endPoint.getDouble("y").toFloat()
        view.setEndPoint(x, y)
    }

    @ReactProp(name = "useAngle")
    fun setUseAngle(view: LinearGradientView, useAngle: Boolean) {
        view.setUseAngle(useAngle)
    }

    @ReactProp(name = "angle")
    fun setAngle(view: LinearGradientView, angle: Float) {
        view.setAngle(angle)
    }

    @ReactProp(name = "angleCenter")
    fun setAngleCenter(view: LinearGradientView, angleCenter: ReadableMap?) {
        if (angleCenter == null) return

        val x = angleCenter.getDouble("x").toFloat()
        val y = angleCenter.getDouble("y").toFloat()
        view.setAngleCenter(x, y)
    }

    companion object {
        const val REACT_CLASS = "LinearGradientView"
    }
}
