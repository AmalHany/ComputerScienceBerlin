var createBusinessApp = angular.module('createBusinessApp', []);


  createBusinessApp.controller('createBusinessCtrl', function($scope,$location,$http,$routeParams) {
      
      //amr
      $scope.createbusiness=function(){
        var config = {
            method: "POST",
            url: "/registerBusiness",
             data: {name:$scope.name,
                    category:$scope.category,
                    description:$scope.description
                   },
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
             $http(config).then(function(response) {
$location.path(response.data);
        });
       
      
    }
    //amr



    //abod
          $scope.showreports=function(){
        var config = {
            method: "POST",
            url: "/showreports",
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
             $http(config).then(function(response) {
              $scope.abod=response.data;
        });
       
      
    }
    //abod

      
//kareem
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
     //kareem

     
//sayed
     $scope.subscribers=function(){
        var config = {
            method: "GET",
            url: "/getmyproducts",
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
$scope.getuser();
   $http(config).then(function(response) {
             $scope.products = response.data;

            // $scope.cart=[];
            //  console.info("felapp");
            // console.info($scope.products);



        });

     }
    //sayed
    

    //sayed dah 3shn el subscribe we add products 
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
     //sayed


     //sayed adeem
          $scope.addtoshop=function(x){
            console.log(x._id);
        var config = {
            method: "POST",
            url: "/addtocart",
                data: {productid:x._id
                   },
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };

   $http(config).then(function(response) {
          $scope.cart=response.data;
          $scope.myuser=$scope.getuser();
            //console.log($scope.business);



        });

     }
     //sayed adeem


     //hazem 
     
          $scope.removeproduct=function(x){
            console.log(x._id);
        var config = {
            method: "POST",
            url: "/removefromcart",
                data: {productid:x._id
                   },
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };

   $http(config).then(function(response) {
          $scope.cart=response.data;
                    $scope.myuser=$scope.getuser();

            //console.log($scope.business);



        });

     }
     //hazem


     //helper
     $scope.getuser=function(){
        var config = {
            method: "POST",
            url: "/getuser",
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
$http(config).then(function(response) {
             //$scope.cart=response.data;
             $scope.myuser=response.data;
            //console.log($scope.business);



        });
  
     }
     //helper


     //hana
          $scope.checkout=function(){
        var config = {
            method: "POST",
            url: "/checkout",
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
$http(config).then(function(response) {
  $scope.cart=response.data;
             $scope.myuser=$scope.getuser();            //console.log($scope.business);



        });
  
     }
     //hana


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



     //helper for adding products
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
     //helper for adding products


//helper for all
     // counting number of purchases per product
     $scope.getCount = function (i,user) {
      console.log(user);
    var iCount = iCount || 0;
    for (var j = 0; j < user.length; j++) {
        if (user[j]== i._id) {
            iCount++;
        }
    }
    return iCount;
}

//counting total
   $scope.total = function (cart,user) {
      console.log(user);
    var iCount = iCount || 0;
    for (var j = 0; j < user.length; j++) {
          for (var k = 0; k < cart.length; k++) {

        if (user[j]== cart[k]._id) {
            iCount=iCount+cart[k].price;
        }
      }
    }
    return iCount;
}

//helpers



//sayed
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
     //sayed
       

  });