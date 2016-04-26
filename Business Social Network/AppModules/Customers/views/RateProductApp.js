var RateProductApp = angular.module('RateProductApp', []);
RateProductApp.controller('RateAppController',
    function($scope, $http,$routeParams) {

        $scope.getRate = function(){

            var config ={
                method: "GET",
                url: "/rateProducts/",
                headers: {"Content-Type": "application/json;charset=utf-8"}
            };
            $http(config).then(function(response) {
                $scope.RateProductController = response.data;


            });

        };



        $scope.addRating = function(x){

            var config = {
                method: "addRating",
                url: "/rateProducts/" + $routeParams.productID,
                data: {productID: x._id },
                headers: {"Content-Type": "application/json;charset=utf-8"}
            };
            alert("Your rating has successfully been added");
            $http(config).then(function(response) {
                $scope.getRate();
            });

        };

        $scope.getWishList();

    }
);
