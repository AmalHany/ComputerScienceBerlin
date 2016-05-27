var signupApp = angular.module('myApp', []);


  signupApp.controller('myCtrl', function($scope, $http) {
      
      
     $scope.update=function(){
      
     var config = {
            method: "POST",
            url: "/Report",
            data: {id:$scope.id,
                    report:$scope.report},
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          $http(config).then(function(response){
           
            $scope.message=response;
  
          });
      }

  });



// SENDING HTTP REQUESTS TO SERVER USING ANGULAR AND THE $HTTP MODULE
// var config = {
//   method: "<HTTP METHOD>",
//   url: "<ROUTE>",
//   data: <DATA IF NEEDED>,
//   headers: {"Content-Type": "application/json;charset=utf-8"}
// };
// $http(config).then(function(response) {
//    <WHAT TO DO AFTER RECIEVING RESPONSE>
// });