package com.dukan

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.core.app.ActivityCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "dukan"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return object : ReactActivityDelegate(this, mainComponentName) {
      override fun createRootView(): ReactRootView {
        return ReactRootView(this@MainActivity)
      }
    }
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    SplashScreen.show(this)
    super.onCreate(savedInstanceState)
  }

  override fun onResume() {
    super.onResume()
    requestCameraPermission()
  }

  private fun requestCameraPermission() {
    val cameraPermission = Manifest.permission.CAMERA
    if (ActivityCompat.checkSelfPermission(this, cameraPermission) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(this, arrayOf(cameraPermission), CAMERA_PERMISSION_CODE)
    }
  }

  companion object {
    private const val CAMERA_PERMISSION_CODE = 100
  }

  override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    if (requestCode == CAMERA_PERMISSION_CODE) {
      if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
        // Permission granted, handle accordingly
      } else {
        // Permission denied, handle accordingly
      }
    }
  }
}
