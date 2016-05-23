var search = angular.module("searchApp", []);
var fetchedProducts = false;  //if the all the products
var allProducts = [];

search.controller('SearchBoxController', function($scope, $location, $http){

  //show all categories by default
  $scope.selected = "All Categories";

  var config = {
    method: "GET",
    url: '/productcategories',
    headers: {"Content-Type": "application/json;charset=utf-8"}
  };

  $http(config).then(function(response) {

    //dummy data:
    //$scope.categories = ["Clothes", "Electronics", "Books", "Bateekh"];
    $scope.categories = response.data.map(function(a){

      //capitilize the first letter of the category name and return it
      //excluding the other attributes of the object
      return a.name[0].toUpperCase() + a.name.substring(1, a.name.length);

    });

    var selectedCategory = "All Categories";
    var userSearch = ' ';
    var previousPath = $location.path();

    $scope.update = function(){

      userSearch = $scope.search_term;
      var route = '/search/' + selectedCategory + '/' + userSearch

      //update URL if necessary
      if(userSearch.length > 0){
        $location.path(route);
      }

      else{
        // var previousPath = $location.path().replace(route, '');
        // previousPath = previousPath.substring(0, -1);

        //this will only work if the page is refreshed
        $location.path(previousPath);

      }

    }

    $scope.updateCategory = function(category){

      $scope.selected = category;
      selectedCategory = category;
      var route = '/search/' + selectedCategory + '/' + userSearch

      //update URL if necessary
      if(userSearch.length > 0){
        $location.path(route);
      }

      else{
        // var previousPath = $location.path().replace(route, '');
        // previousPath = previousPath.substring(0, -1);

        //this will only work if the page is refreshed
        $location.path(previousPath);
      }

    }

  });

});

search.controller('SearchResultsController', function($scope, $routeParams, $http){

  if(!fetchedProducts){  //fetch products from server if they have not already been fetched

    var config = {
      method: "GET",
      url: '/products',
      headers: {"Content-Type": "application/json;charset=utf-8"}
    };

    $http(config).then(function(response) {

      allProducts = response.data.map(function(a){

        if(a.category != null){
          a.category = a.category.name;
        }

        if(a.tags.length > 0){
          a.tags = a.tags.map(function(b){
            return b.name;
          })
        }

      });


    });

  } //if statement

  //return the search results only if products have been fetched
  if(fetchedProducts){

    console.log(allProducts);
    //get category and search term from URL

    var chosenCat = $routeParams.category;
    var userSearch = $routeParams.searchTerm;

    //array of search terms entered by user changed to lowercase
    var userSearchArray = userSearch.toLowerCase().split(" ");

    var bestMatches = [];

    for(var i = 0; i < allProducts.length; i++){

      //change all tags to lowercase so comparison is more accurate
      var productTags = ("" + allProducts[i].tags).toLowerCase().split(",");

      //change product name to lowercase and placed in array
      var productNameArray = allProducts[i].name.toLowerCase().split(" ");

      var tagCount =  search.count(userSearchArray, productTags);
      var nameCount = search.count(userSearchArray, productNameArray);

      //match points indicate how much a product matches the search
      var matchPoints = tagCount + nameCount

      bestMatches.push([allProducts[i], matchPoints]);

    };

    //filters out the products with 0 matchPoints
    //then sorts the remaining products based on their matchPoints
    //and then finally returns only the product and ignores the matchPoints

    bestMatches = bestMatches.filter(function(a){

      if(chosenCat != "All Categories"){
        return (a[1] !== 0 && a[0].category == chosenCat);
      }
      return a[1] !== 0;
    })
    .sort(function(a,b){
      return b[1] - a[1];
    })
    .map(function(a){
      return a[0];
    })

    //send the search results and the search term to the search results page
    $scope.searchResults = bestMatches;
    $scope.searchTerm = userSearch;

  }  //if statement
})

//counts how many times the search terms occur in another array (name/tags)
search.count = function(search, comp){

  //to loop on the length of the larger array
  var len = (search.length >= comp.length) ? search.length : comp.length ;

  var count = 0;

  for(var i = 0; i < len; i++){

    if(comp.indexOf(search[i]) !== -1){
      //increment count if current search term is found in other array
      count++ ;
    }

  }
  return count;
};

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
