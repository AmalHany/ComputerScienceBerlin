var search = angular.module("searchApp", []);

search.controller('SearchBoxController', function($scope, $location){

  //show all categories by default
  $scope.selected = "All Categories";

  //get all categories to display in dropdown menu
  //dummy data:
  $scope.categories = ["Clothes", "Electronics", "Books", "Bateekh"];
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

search.controller('SearchResultsController', function($scope, $routeParams, $http){

  //get all products

      // var config = {
      //   method: "GET",
      //   url: '/search/:category/' + $routeParams.searchTerm,
      //   headers: {"Content-Type": "application/json;charset=utf-8"}
      // };
      //
      // $http(config).then(function(response) {
      //     console.log(response.data);
      // });


  //dummy data for testing:

  var test1 = {
    name: "test1 bob",
    price: 200,
    seller: "H&M",
    review: "5 stars",
    tags: ["blue", "male", "jeans"],
    category: "clothes"
  };

  var test2 = {
    name: "miho car",
    price: 1200,
    seller: "Zara",
    review: "2 stars",
    tags: ["red", "female", "sweater"],
    category: "electronics"
  };

  var test3 = {
    name: "sami awy",
    price: 11900,
    seller: "Saturn",
    review: "5 stars",
    tags: ["black", "purple", "sweater"],
    category: "books"
  };

  var test4 = {
    name: "swailem gedan",
    price: 1024,
    seller: "Apple",
    review: "4 stars",
    tags: ["black", "purple", "male", "clothes"],
    category: "bateekh"
  };

  var allProducts = [test1, test2, test3, test4];

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
      return (a[1] !== 0 && a[0].category.toLowerCase() == chosenCat.toLowerCase());
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
