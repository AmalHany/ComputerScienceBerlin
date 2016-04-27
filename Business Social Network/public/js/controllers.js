var RateProductApp = angular.module('RateProductApp', []);
RateProductApp.controller('RateProductController',
    function($scope, $http,$routeParams) {

        $scope.getRate = function(){

            var config ={
                method: "GET",
                url: "/rateProducts/",

            };
            $http(config).then(function(response) {
                $scope.RateProductController = response.data;


            });

        };



        $scope.addRating = function(){
              var rating = $scope.Rating;
                var config = {
                method: "addRating",
                url: "/rateProducts/" + $routeParams.ProductName,
                data: {productName: x.ProductName,Rating:rating},

            };
            alert("Your rating has successfully been added");
            $http(config).then(function(response) {
                $scope.getRate();
            });

        };

    }
);

facebookSocialApi = {

};
