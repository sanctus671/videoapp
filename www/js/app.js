// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'ngCordova' ,'app.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
      
      cordova.plugins.autoStart.enable();
      
        cordova.plugins.backgroundMode.setDefaults({ 
            title:  'Video app running',
            text:   'Executing background tasks.'
        });

        // Enable background mode
        cordova.plugins.backgroundMode.enable();

        // Called when background mode has been activated
        cordova.plugins.backgroundMode.onactivate = function () {

            // Set an interval of 3 seconds (3000 milliseconds)
            setInterval(function () {

                //console.log(window.batterystatus)

            }, 3000);
        }  
        
        window.addEventListener("batterystatus", onBatteryStatus, false);

            function onBatteryStatus(status) {
            console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
            if (!status.isPlugged){
                window.plugins.insomnia.allowSleepAgain();
                document.querySelector("#videoArea video").pause();
            }
            else{
                window.plugins.insomnia.keepAwake();
                document.querySelector("#videoArea video").play();
            }
        } 
        
        window.plugins.insomnia.keepAwake();
      
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    $ionicPlatform.on("resume", function(){ 
        
    });    
    
    $ionicPlatform.on("pause", function(){ 

    });     
    
    
  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider

    .state('video', {
    url: '/video',
    templateUrl: 'templates/video.html',
    controller: 'VideoCtrl'
  })    
    ;
  
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/video');

});
