// to connect angular 
var messageApp = angular.module('messageApp', []);
messageApp.controller('messageCRUD', function($scope, $http,$filter){


     $scope.getMessage = function(){
        var config = {
          method: "GET",
          url: "/message",
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.message = response.data;
        });
      }

      $scope.sendMessage = function(){
      	console.log("OO");
      	if($scope.fromBusiness !== null
        && $scope.fromBusiness !== ""
        && $scope.fromBusiness !== undefined
        && $scope.toBusiness !== null
        && $scope.toBusiness !== ""
        && $scope.toBusiness !== undefined
        && $scope.content !== null
        && $scope.content !== ""
        && $scope.content !== undefined)
      	{

      		var config = {
            method: "POST",
            url: "/message",
            data: {fromBusiness: $scope.fromBusiness,toBusiness:$scope.toBusiness,content:$scope.content},
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          $http(config).then(function(response) {
              $scope.getMessage();
              $scope.fromBusiness = null;
              $scope.toBusiness = null;
              $scope.content = null;
          });
      	}
      }



      // $scope.removemessage = function(x){
      //   var config = {
      //     method: "DELETE",
      //     url: "/message",
      //     data: {messageID: x._id},
      //     headers: {"Content-Type": "application/json;charset=utf-8"}
      //   };
      //   $http(config).then(function(response) {
      //       $scope.getMessage();
      //   });
      // }

      $scope.CurrentDate = new Date();
      $scope.ddMMyyyy = $filter('date')(new Date(), 'dd/MM/yyyy');
      $scope.hhmmsstt = $filter('date')(new Date(), 'hh:mm:ss a');
       $scope.getMessage();


});

