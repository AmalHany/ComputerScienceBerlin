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
