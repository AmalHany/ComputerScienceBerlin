var removeProductApp = angular.module('removeProductApp', []);


  removeProductApp.controller('removeProductCtrl', function($scope,$location,$http,$routeParams) {
      //posting addtocart for the controller
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
    //cart is where the products are
          $scope.cart=response.data;
    //myuser is where the product ids are
          $scope.myuser=$scope.getuser();
          
        });

     }
     //this is for showing the products on my wall and its called by init function on page load
        $scope.subscribers=function(){
        var config = {
            method: "GET",
            url: "/getmyproducts",
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
   $http(config).then(function(response) {
             $scope.products = response.data;
        });
     }
//this is for removing the product with a given parameter passed throught html in this case x giving the id of the product to the controller
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
        });
     }
     //helper method to get product ids in cart for counting without counting duplicates
     $scope.getuser=function(){
        var config = {
            method: "POST",
            url: "/getuser",
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
$http(config).then(function(response) {
             $scope.myuser=response.data;
        });
     }
     // counting number of purchases per product given a product and the cart for counting how many times this product with unique id has been added
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
//counting total given cart of products and cart of ids then comparing and counting the total amount of money for this cart
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
  });