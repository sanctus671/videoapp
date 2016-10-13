angular.module('app.controllers', [])

.controller('VideoCtrl', function($scope, $rootScope, $cordovaCamera) {
    $scope.video = {videoURI:""};
    
    
    if (window.localStorage.videoapp_video){
        $scope.video.videoURI = window.localStorage.videoapp_video ? window.localStorage.videoapp_video : "";
        var v = "<video controls autoplay loop>";
        v += "<source src='" + $scope.video.videoURI + "' type='video/mp4'>";
        v += "</video>";        
    }
    
    $scope.getVideoPath = function(){
          var options = {
            quality: 50,
             destinationType: Camera.DestinationType.FILE_URI, // <== try THIS
             sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            mediaType:Camera.MediaType.VIDEO
        };

        $cordovaCamera.getPicture(options).then(function(videoURI) {
            console.log("videoURI",videoURI);
            $scope.video.videoURI = videoURI;
            window.localStorage.videoapp_video = videoURI;
            var v = "<video controls autoplay loop>";
            v += "<source src='" + $scope.video.videoURI + "' type='video/mp4'>";
            v += "</video>";
            document.querySelector("#videoArea").innerHTML = v;            
        }, function(err) {
            console.log("err",JSON.stringify(err));
        });
    }   
    
    window.addEventListener("batterystatus", onBatteryStatus, false);

        function onBatteryStatus(status) {
        console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
        if (!status.isPlugged){
            document.querySelector("#videoArea video").pause();
        }
        else{
            document.querySelector("#videoArea video").play();
        }
    }     
    
    
})
