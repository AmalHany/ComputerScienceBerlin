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

function authentication ($http, $window) {

  var saveToken = function (token) {
    $window.sessionStorage['mean-token'] = token;
  };

  var getToken = function () {
    return $window.sessionStorage['mean-token'];
  };

  logout = function() {
    $window.sessionStorage.removeItem('mean-token');
  };

  var isLoggedIn = function() {
    var token = getToken();
    var payload;

    if(token){
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        email : payload.email,
        first_name : payload.first_name,
        last_name : payload.last_name
      };
    }
  };

  var register = function(user) {
    return $http.post('/users/register', user).success(function(data){
      saveToken(data.token);
    });
  };

  var login = function(user) {
    return $http.post('/users/login', user).success(function(data) {
      saveToken(data.token);
    });
  };

  return {
    saveToken : saveToken,
    getToken : getToken,
    logout : logout,
    isLoggedIn : isLoggedIn,
    currentUser : currentUser,
    register : register,
    login : login
  };
}

var userAuthApp = angular.module('userAuthApp', []);

userAuthApp.controller('RegisterController',['$scope', '$location', '$http', '$window', function($scope, $location, $http, $window) {
  $scope.credentials = {};

  $scope.onSubmit = function () {

    $http.post('/users/register', $scope.credentials).success(function(data){
      $window.sessionStorage['mean-token'] = data.token;
    })
    .error(function(err){
      alert(err);
    })
    .then(function(){
      $location.path('profile');
    });
  };

}]);

userAuthApp.controller('LoginController',['$scope', '$location', '$http', '$window', function($scope, $location, $http, $window) {
  $scope.credentials = {};

  $scope.onSubmit = function () {

    $http.post('/users/login', $scope.credentials).success(function(data) {
      $window.sessionStorage['mean-token'] = data.token;
    })
    .error(function(err){
      alert(err);
    })
    .then(function(){
      $location.path('profile');
    });
  };

}]);

userAuthApp.controller('ProfileController',['$rootScope', '$scope', '$http', '$window', function($rootScope, $scope, $http, $window) {
  $scope.user = {};

  $http.get('/users/profile', {
    headers: {
      Authorization: 'Bearer '+ $window.sessionStorage['mean-token']
    }
  })
  .success(function(data) {
    $scope.user = data;
    $rootScope.currentUser = data;
    $rootScope.isLoggedIn = true;
  })
  .error(function (e) {
    console.log(e);
  });
}]);

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
