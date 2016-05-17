var search = angular.module("searchApp", []);

search.controller('SearchBoxController', function($scope, $http){

  var userSearch;

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
  var allCats = ["Clothes", "Electronics", "Books", "Bateekh"]

  $scope.categories = allCats

  //show all categories by default
  $scope.selected = "All Categories"

  //this will run whenever the input changes
  $scope.update = function(){

    //user search is the term the user entered in the search
    userSearch = $scope.search_term;
    $scope.searchTerm = userSearch

    //chosen category from dropdown menu
    var chosenCat = $scope.selected;

    //array of search terms entered by user changed to lowercase
    var userSearchArray = userSearch.toLowerCase().split(" ")

    //the products to display
    var bestMatches = [];

    for(var i = 0; i<allProducts.length; i++){

      //change all tags to lowercase so comparison is more accurate
      var productTags = ("" + allProducts[i].tags).toLowerCase().split(",")

      //change product name to lowercase and placed in array
      var productNameArray = allProducts[i].name.toLowerCase().split(" ")

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

      if(chosenCat != "All Categories"){
        return (a[1] !== 0 && a[0].category.toLowerCase() == chosenCat.toLowerCase())
      }
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

    for(var i = 0; i < len; i++){

      if(comp.indexOf(search[i]) !== -1){
        count++
        //increment count if current search term is found in other array
      }

    }
    return count
  };

  //updates chosen category in dropdown menu and search results
  //if there are any to display
  $scope.updateCategory = function(category){

    $scope.selected = category

    if($scope.search_term != null){
      $scope.update()
    }

  };

});
