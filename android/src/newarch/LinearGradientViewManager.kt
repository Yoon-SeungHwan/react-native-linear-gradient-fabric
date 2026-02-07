package com.lineargradientfabric

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.LinearGradientViewManagerDelegate
import com.facebook.react.viewmanagers.LinearGradientViewManagerInterface

@ReactModule(name = LinearGradientViewManager.REACT_CLASS)
class LinearGradientViewManager : ViewGroupManager<LinearGradientView>(),
    LinearGradientViewManagerInterface<LinearGradientView> {

    private val delegate: ViewManagerDelegate<LinearGradientView> = LinearGradientViewManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<LinearGradientView> = delegate

    override fun getName(): String = REACT_CLASS

    override fun createViewInstance(reactContext: ThemedReactContext): LinearGradientView {
        return LinearGradientView(reactContext)
    }

    @ReactProp(name = "colors")
    override fun setColors(view: LinearGradientView, colors: ReadableArray?) {
        if (colors == null) return

        val colorArray = IntArray(colors.size())
        for (i in 0 until colors.size()) {
            colorArray[i] = colors.getInt(i)
        }
        view.setColors(colorArray)
    }

    @ReactProp(name = "locations")
    override fun setLocations(view: LinearGradientView, locations: ReadableArray?) {
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
    override fun setStartPoint(view: LinearGradientView, startPoint: ReadableMap?) {
        if (startPoint == null) return

        val x = startPoint.getDouble("x").toFloat()
        val y = startPoint.getDouble("y").toFloat()
        view.setStartPoint(x, y)
    }

    @ReactProp(name = "endPoint")
    override fun setEndPoint(view: LinearGradientView, endPoint: ReadableMap?) {
        if (endPoint == null) return

        val x = endPoint.getDouble("x").toFloat()
        val y = endPoint.getDouble("y").toFloat()
        view.setEndPoint(x, y)
    }

    @ReactProp(name = "useAngle", defaultBoolean = false)
    override fun setUseAngle(view: LinearGradientView, useAngle: Boolean) {
        view.setUseAngle(useAngle)
    }

    @ReactProp(name = "angle", defaultFloat = 0f)
    override fun setAngle(view: LinearGradientView, angle: Float) {
        view.setAngle(angle)
    }

    @ReactProp(name = "angleCenter")
    override fun setAngleCenter(view: LinearGradientView, angleCenter: ReadableMap?) {
        if (angleCenter == null) return

        val x = angleCenter.getDouble("x").toFloat()
        val y = angleCenter.getDouble("y").toFloat()
        view.setAngleCenter(x, y)
    }

    companion object {
        const val REACT_CLASS = "LinearGradientView"
    }
}
