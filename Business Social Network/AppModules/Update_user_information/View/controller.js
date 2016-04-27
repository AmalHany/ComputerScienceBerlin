var Update_User_info = angular.module('myApp', []);

  Update_User_info.controller('myCtrl', function($scope, $http) {


      $scope.update=function(){
     var config = {
            method: "POST",
            url: "/updateUser",
            data: {name:$scope.name,
                    phone:$scope.phone,
                    email:$scope.email,
                     password:$scope.password},
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          $http(config).then(function(response){





            console.log(response.data);
          });
      }

  });
