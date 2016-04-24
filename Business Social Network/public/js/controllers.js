facebookSocialApi = {

};

var search = angular.module("searchApp", []);
//what is this array for?

search.controller('SearchBoxController', function($scope){
  //why are there sometimes more arguments in second argument (array?)

  var userSearch = $scope.search_term;  //user search is the term the user entered in the search
  $scope.searchTerm = userSearch

  var test1 = {
    name: "test1 bob",
    price: 200,
    seller: "H&M",
    review: "5 stars",
    tags: ["clothes", "testtag"]
  };

  var test2 = {
    name: "test car",
    price: 1200,
    seller: "Zara",
    review: "2 stars",
    tags: ["clothes again", "testtag once again"]
  };

  var allProducts = [test1, test2];

  $scope.searchResults = allProducts


  //on button click
  $scope.search = function(){

    $scope.searchTerm = userSearch

  }



});
