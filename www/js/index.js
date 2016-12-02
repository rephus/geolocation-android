var app = {
    // Application Constructor
    initialize: function() {
        log("Initializing cordova");

        this.bindEvents();
    },
      bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
      log("Device ready") ;

        app.receivedEvent('deviceready');


        try{
          startGeolocation();
        } catch (e) {
          error("Failed geolocation", e);
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};

var startGeolocation = function(){

  //Make sure to get at least one GPS coordinate in the foreground before starting background services
    navigator.geolocation.getCurrentPosition(function(position) {
     log("Succesfully retreived our GPS position" + JSON.stringify(position) );
     log("We can now start our background tracker.");
    }, function(error) {
     error("Unable to get geolocation " , error);
   });

  var bgLocationServices =  window.plugins.backgroundLocationServices;

  log("bgLocationServices " + bgLocationServices) ;

  //Congfigure Plugin
  bgLocationServices.configure({
       //Both
       desiredAccuracy: 20, // Desired Accuracy of the location updates (lower means more accurate but more battery consumption)
       distanceFilter: 5, // (Meters) How far you must move from the last point to trigger a location update
       debug: true, // <-- Enable to show visual indications when you receive a background location update
       interval: 9000, // (Milliseconds) Requested Interval in between location updates.
       useActivityDetection: true, // Uses Activitiy detection to shut off gps when you are still (Greatly enhances Battery Life)

       //Android Only
       notificationTitle: 'BG Plugin', // customize the title of the notification
       notificationText: 'Tracking', //customize the text of the notification
       fastestInterval: 5000 // <-- (Milliseconds) Fastest interval your app / server can handle updates

  });

  //Register a callback for location updates, this is where location objects will be sent in the background
  bgLocationServices.registerForLocationUpdates(function(location) {
       log("We got an BG Update" + JSON.stringify(location));
       url = "http://mylocation.server.url";
       $.ajax({
         url: url,
         data: JSON.stringify(location),
         dataType: "json",
         contentType: "application/json",
         method: "POST",
         success: function (json) {
           log("Saved geolocation" + JSON.stringify(json));
         },
         error: function( jqXHR, textStatus, errorThrown ) {
           console.error(JSON.stringify(jqXHR));
           console.error(errorThrown);

           error("Unable to save geolocation "+ textStatus, errorThrown);

         }
       });
  }, function(err) {
       error("Didnt get an update",err);
  });

  //Register for Activity Updates
  bgLocationServices.registerForActivityUpdates(function(activities) {
       log("We got an activity update" + JSON.stringify(activities) ) ;
  }, function(err) {
       error("Something went wrong", err);
  });

  //Start the Background Tracker. When you enter the background tracking will start, and stop when you enter the foreground.
  bgLocationServices.start();


}

var error = function(text, error) {
  $("#log").append("<p>"+text+error+"</p>");
  console.error("Geolocation ERROR "+error);
};

var log = function(text) {
  $("#log").append("<p>"+text+"</p>");
  console.log("Geolocation INFO "+text);

};

app.initialize();
