var acceptBusinessApp = angular.module('acceptBusinessApp', []);


  acceptBusinessApp.controller('acceptBusinessCtrl', function($scope,$location,$http,$routeParams) {
      
   
       $scope.trial2=function(){
        var config = {
            method: "GET",
            url: "/show2",
            headers: {"Content-Type": "applicat`ion/json;charset=utf-8"}
          };

   $http(config).then(function(response) {
             $scope.trial = response.data;
            //console.log($scope.business);



        });

     }
       $scope.trial=function(){
        var config = {
            method: "POST",
            url: "/show",
            headers: {"Content-Type": "applicat`ion/json;charset=utf-8"}
          };

   $http(config).then(function(response) {
             $scope.trial = response.data;
            //console.log($scope.business);



        });

     }
    $scope.showallbusiness=function(path){

      
             $location.path(path);

            //console.log($scope.business);



      
    }
    $scope.getuser=function(){
        var config = {
            method: "GET",
            url: "/getuser",
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
$http(config).then(function(response) {
             $scope.myusername = response.data;
            //console.log($scope.business);



        });
  
     }

     //kareem
       $scope.accept=function(businessID){
        console.log(businessID._id);
        var config = {
            method: "POST",
            url: "/accept",
              data: {businessID:businessID._id
                   },
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };

   $http(config).then(function(response) {
             $scope.trial = response.data;
            //console.log($scope.business);



        });

     }
     //kareem



       

  });
