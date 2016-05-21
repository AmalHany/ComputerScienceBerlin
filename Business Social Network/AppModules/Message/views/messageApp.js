// to connect angular 
var messageApp = angular.module('messageApp', []);
messageApp.controller('messageCRUD', function($scope, $http,$filter){
	//to get the message 
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
      //to send the message
      $scope.sendMessage = function(){
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
            data: {fromBusiness: $scope.fromBusiness,toBusiness:$scope.toBusiness,content:$scope.content,subject:$scope.subject},
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          $http(config).then(function(response) {
              $scope.getMessage();
              $scope.fromBusiness = null;
              $scope.toBusiness = null;
              $scope.content = null;
              $scope.subject=null;
          });
      	}
      }
      //to remove the message
      $scope.removemessage = function(x){
        var config = {
          method: "DELETE",
          url: "/message",
          data: {messageID: x._id},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.getMessage();
        });
      }
      //the current date
      $scope.CurrentDate = new Date();
      //date in day/month/year
      $scope.ddMMyyyy = $filter('date')(new Date(), 'dd/MM/yyyy');
      //date in hour/month/seconds
      $scope.hhmmsstt = $filter('date')(new Date(), 'hh:mm:ss a');
       
      $scope.getMessage();


});

