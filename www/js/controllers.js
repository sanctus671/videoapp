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
            $scope.video = JSON.stringify(videoURI);
            window.localStorage.videoapp_video = JSON.stringify(videoURI);
        }, function(err) {
            console.log("err",JSON.stringify(err));
        });
    }    
    
})
