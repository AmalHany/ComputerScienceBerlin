var checkoutApp = angular.module('checkoutApp', []);


  checkoutApp.controller('checkoutCtrl', function($scope,$location,$http,$routeParams) {
      //posting checkout for the controller
              $scope.checkout=function(){
        var config = {
            method: "POST",
            url: "/checkout",
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
$http(config).then(function(response) {
  $scope.cart=response.data;
             $scope.myuser=$scope.getuser();  



        });
  
     }
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
var search = angular.module("searchApp", []);

search.controller('SearchBoxController', function($scope, $http){

  var userSearch;

  //dummy data for testing:

  var test1 = {
    name: "test1 bob",
    price: 200,
    seller: "H&M",
    review: "5 stars",
    tags: ["blue", "male", "jeans"]
  };

  var test2 = {
    name: "miho car",
    price: 1200,
    seller: "Zara",
    review: "2 stars",
    tags: ["red", "female", "sweater"]
  };

  var test3 = {
    name: "sami awy",
    price: 11900,
    seller: "Saturn",
    review: "5 stars",
    tags: ["black", "purple", "sweater"]
  };

  var test4 = {
    name: "swailem gedan",
    price: 1024,
    seller: "Apple",
    review: "4 stars",
    tags: ["black", "purple", "male", "clothes"]
  };



  var allProducts = [test1, test2, test3, test4];


  $scope.update = function(){   //this will run whenever the input changes

    userSearch = $scope.search_term;  //user search is the term the user entered in the search
    $scope.searchTerm = userSearch

    var userSearchArray = userSearch.toLowerCase().split(" ")
    //array of search terms entered by user changed to lowercase


    var bestMatches = [];    //the products to show (in this order)

    for(var i = 0; i<allProducts.length; i++){

      var productTags = ("" + allProducts[i].tags).toLowerCase().split(",")
      //change all tags to lowercase so comparison is more accurate

      var productNameArray = allProducts[i].name.toLowerCase().split(" ")
      //change product name to lowercase and placed in array

      var tagCount = count(userSearchArray, productTags)
      var nameCount = count(userSearchArray, productNameArray)
      var matchPoints = tagCount + nameCount
      //match points indicate how much a product matches the search

      bestMatches.push([allProducts[i], matchPoints])

    };


    //filters out the products with 0 matchPoints
    //then sorts the remaining products based on their matchPoints
    //and then finally returns only the product and ignores the matchPoints

    bestMatches = bestMatches.filter(function(a){
      return a[1] !== 0
    })
    .sort(function(a,b){
      return b[1] - a[1]
    })
    .map(function(a){
      return a[0]
    })

    $scope.searchResults = bestMatches;

  }

  //on button click
  $scope.search = function(){

    $scope.update()

  };

  //counts how many times the search terms occur in another array (name/tags)
  count = function(search, comp){

    var len = (search.length >= comp.length) ? search.length : comp.length
    //to loop on the length of the larger array

    var count = 0

    for(var i = 0; i<len; i++){

      if(comp.indexOf(search[i]) !== -1){
        count++
        //increment count if current search term is found in other array
      }

    }
    return count
  };

});

function getRecommendationProducts($http){
  var tags = [];
  var config = {
    method: "GET",
    url: '/socialRecs'
  };
  return $http(config).then(function(response) {
    return response.data;
  });
};

//usage
// getRecommendationProducts($http).then(function(response){
//   $scope.tests = response;
// });

var wishListApp = angular.module('wishListApp', []);

wishListApp.controller('WishListController',
  function($scope, $http,$routeParams) {
    
    $scope.getWishList = function(){

      var config ={
        method: "GET",
        url: "/wishlists/" + $routeParams.wishlistId,
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
              $http(config).then(function(response) {
              // console.log(response.data);
            $scope.wishlist = response.data;


        });

    }



    $scope.removeProduct = function(x){
        console.log(x._id);
        console.log($routeParams.wishlistId);
        var config = {
          method: "DELETE",
          url: "/wishlists/" + $routeParams.wishlistId,
          data: {productID: x._id , wishlistID: $routeParams.wishlistId},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.getWishList();
        });
      }

    $scope.getWishList();
    $(function(){
    $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
});

  }
);
