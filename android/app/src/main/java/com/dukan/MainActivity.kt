package com.dukan

import android.content.pm.PackageManager
import android.Manifest
import androidx.core.app.ActivityCompat

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "dukan"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return object : ReactActivityDelegate(this, mainComponentName) {
      override fun createRootView(): ReactRootView {
        return ReactRootView(this@MainActivity)
      }
    }
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
