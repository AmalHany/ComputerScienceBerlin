var Update_company_info = angular.module('myApp', []);

  Update_company_info.controller('myCtrl', function($scope, $http) {


      $scope.update=function(){
     var config = {
            method: "POST",
            url: "/updateCompany",
            data: {name:$scope.name,
                    phone:$scope.phone,
                    email:$scope.email,
                     category:$scope.category},
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          $http(config).then(function(response){





            console.log(response.data);
          });
      }

  });
