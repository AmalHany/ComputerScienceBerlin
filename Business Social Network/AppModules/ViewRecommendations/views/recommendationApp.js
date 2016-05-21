 var recApp = angular.module('recommendationApp', []);


  recApp.controller('recommendationCtrl', function($scope, $http) {
      

    
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
    $scope.products=allProducts

 /*
 getRecommendationProducts($http).then(function(response){
   $scope.products = response;
 });
 */

  });



// SENDING HTTP REQUESTS TO SERVER USING ANGULAR AND THE $HTTP MODULE
// var config = {
//   method: "<HTTP METHOD>",
//   url: "<ROUTE>",
//   data: <DATA IF NEEDED>,
//   headers: {"Content-Type": "application/json;charset=utf-8"}
// };
// $http(config).then(function(response) {
//    <WHAT TO DO AFTER RECIEVING RESPONSE>
// });