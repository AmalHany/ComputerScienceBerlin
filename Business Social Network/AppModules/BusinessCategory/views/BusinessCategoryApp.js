var BusinessCategoryApp = angular.module('BusinessCategoryApp',[]);
BusinessCategoryApp.controller('BusinessCategoryController',
  function($scope, $http,$routeParams) {
    $scope.getBusinessCategories = function(){
      var config ={
        method: "GET",
        url: "/businessCategories/" + $routeParams.businessId,
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
      $http(config).then(function(response) {
            //console.log(response.data);
            $scope.businessCategories = response.data;
      });        
	};

	$scope.submit = function(){
		if($scope.myBcategory !== undefined)
		{
			var config ={
			method:"POST",
		    url: "/businessCategories",
		    data:{category_id : $scope.myBcategory, business_id:$routeParams.businessId },
            headers: {"Content-Type": "application/json;charset=utf-8"}
      };
	};
}
	$scope.getBusinessCategories();
  }
);
