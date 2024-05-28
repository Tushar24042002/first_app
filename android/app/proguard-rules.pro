# Suppress warnings about missing ProGuard annotations
-dontwarn proguard.annotation.Keep
-dontwarn proguard.annotation.KeepClassMembers

# Suppress warnings for missing classes
-dontwarn com.google.android.apps.nbu.paisa.inapp.client.api.PaymentsClient
-dontwarn com.google.android.apps.nbu.paisa.inapp.client.api.Wallet
-dontwarn com.google.android.apps.nbu.paisa.inapp.client.api.WalletUtils

# Preserve all classes from the Razorpay SDK
-keep class com.razorpay.** { *; }

# Preserve classes from Google's in-app payment library
-keep class com.google.android.apps.nbu.paisa.inapp.client.api.** { *; }

# If you're using Gson for JSON serialization/deserialization, 
# you may need to add keep rules for Gson as well:
-keep class com.google.gson.** { *; }
-keepclassmembers class com.google.gson.** { *; }

# Other ProGuard rules can be here
# (for other dependencies or your own code)

-keep class com.android.installreferrer.api.** {
  *;
}

-keep class com.google.android.gms.common.** {*;}
