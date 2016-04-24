var search = angular.module("searchApp", []);
//what is this array for?

search.controller('SearchBoxController', function($scope, $http){
  //why are there sometimes more arguments in second argument (array?)

  var userSearch;

  var test1 = {
    name: "test1 bob",
    price: 200,
    seller: "H&M",
    review: "5 stars",
    tags: ["blue", "male", "jeans"]
  };

  var test2 = {
    name: "test car",
    price: 1200,
    seller: "Zara",
    review: "2 stars",
    tags: ["red", "female", "sweater"]
  };

  var allProducts = [test1, test2];

  $scope.update = function(){   //this will run whenever the input changes

    userSearch = $scope.search_term;  //user search is the term the user entered in the search
    var searchResults = []


    for(var i = 0; i<allProducts.length; i++){

      if(
        (allProducts[i].name.indexOf(userSearch) !== -1)
        ||
        (allProducts[i].tags.indexOf(userSearch.toLowerCase()) !== -1)
      )

      {

        searchResults.push(allProducts[i]);

      }

    };


    $scope.searchResults = searchResults


  }


  //on button click
  $scope.search = function(){

    $scope.update()

  };




});
