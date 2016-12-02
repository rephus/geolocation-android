## Geolocation Android app

Cordova Android app that sends periodically location to your own
service (makes REST resquests), for tracking locations.

![Check my REST + Redis service for storing geodata](https://github.com/rephus/rest-nodejs-redis)

This app is just a demo / wrapper of the background geolocation plugin.

https://github.com/pmwisdom/cordova-background-geolocation-services

Note: This might work with IOS too, but I haven't tested it.

## Installation

```
cordova platforma add android
cordova plugin add https://github.com/pmwisdom/cordova-background-geolocation-services.git --save

./run.sh # or cordova run android --device
```
