angular.module('app.controllers', [])

.controller('VideoCtrl', function($scope, $rootScope, $cordovaCamera) {
    $scope.video = window.localStorage.videoapp_video ? window.localStorage.videoapp_video : null;
    $scope.getVideoPath = function(){
          var options = {
            quality: 50,
             destinationType: Camera.DestinationType.FILE_URI, // <== try THIS
             sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            mediaType:Camera.MediaType.VIDEO
        };

        $cordovaCamera.getPicture(options).then(function(videoURI) {
            console.log("videoURI",JSON.stringify(videoURI));
            console.log("videoURI",videoURI.toURI());
            $scope.video = videoURI.toURI();
            window.localStorage.videoapp_video = videoURI.toURI();
        }, function(err) {
            console.log("err",JSON.stringify(err));
        });
    }    
    
})
