var createBusinessApp = angular.module('createBusinessApp', []);


  createBusinessApp.controller('createBusinessCtrl', function($scope,$location,$http,$routeParams) {
      
      
      $scope.createbusiness=function(){
        var config = {
            method: "POST",
            url: "/x",
             data: {name:$scope.name
                   },
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
             $http(config).then(function(response) {
              $scope.trial=response.data;
        });
       
      
    }

      $scope.showallbusiness=function(path){

        var config = {
            method: "GET",
            url: "/show",
             
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
                     $location.path(path);

   $http(config).then(function(response) {
             $scope.trial = response.data;
            //console.log($scope.business);



        });
   // $location.path(path);
      
    }

     $scope.trial=function(){
        var config = {
            method: "GET",
            url: "/show",
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };

   $http(config).then(function(response) {
             $scope.trial = response.data;
            //console.log($scope.business);



        });

     }

     $scope.subscribers=function(){
        var config = {
            method: "GET",
            url: "/getmyproducts",
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };

   $http(config).then(function(response) {
             $scope.products = response.data;
             $scope.cart=[];
             console.info("felapp");
            console.info($scope.products);



        });

     }
     $scope.trial2=function(){
        var config = {
            method: "GET",
            url: "/show2",
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };

   $http(config).then(function(response) {
             $scope.trial = response.data;
            //console.log($scope.business);



        });

     }
          $scope.addtoshop=function(x){
            console.log(x._id);
        var config = {
            method: "GET",
            url: "/addtocart/" + $routeParams.cart,
                data: {productid:x._id
                   },
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };

   $http(config).then(function(response) {
             $scope.cart.push(response.data);
            //console.log($scope.business);



        });

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
        $scope.testproduct=function(businessID){
        console.log(businessID._id);
        var config = {
            method: "POST",
            url: "/test",
              data: {businessID:businessID._id
                   },
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };

   $http(config).then(function(response) {
             $scope.trial = response.data;
            //console.log($scope.business);



        });

     }
     $scope.subscribe=function(businessID){
        console.log(businessID._id);
        var config = {
            method: "POST",
            url: "/subscribe",
              data: {businessID:businessID._id
                   },
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };

   $http(config).then(function(response) {
             $scope.trial = response.data;
            //console.log($scope.business);



        });

     }
       $scope.reject=function(){
        var config = {
            method: "GET",
            url: "/accept",
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };

   $http(config).then(function(response) {
             $scope.trial = response.data;
            //console.log($scope.business);



        });

     }

  });