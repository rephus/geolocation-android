#!/bin/bash
#cordova platform add android

cordova run android --device

$ANDROID_HOME/platform-tools/adb logcat  -T 1 #| grep "CONSOLE\|NotificationService\|Notification"
