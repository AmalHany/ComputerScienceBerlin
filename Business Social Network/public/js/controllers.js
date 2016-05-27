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
