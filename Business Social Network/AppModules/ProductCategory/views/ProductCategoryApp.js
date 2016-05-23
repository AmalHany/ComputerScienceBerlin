var ProductCategoryApp = angular.module('ProductCategoryApp',[]);
ProductCategoryApp.controller('ProductCategoryController',
  function($scope, $http,$routeParams) {
    $scope.getProductCategories = function(){
      var config ={
        method: "GET",
        url: "/productCategories/" + $routeParams.businessId,
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
      $http(config).then(function(response) {
            //console.log(response.data);
            $scope.productCategories = response.data;
      });        
	};

	$scope.submit = function(){
		if($scope.myPcategory !== undefined)
		{
			var config ={
			method:"POST",
		    url: "/productCategories",
		    data:{category_id : $scope.myPcategory, product_id:$routeParams.productId },
            headers: {"Content-Type": "application/json;charset=utf-8"}
      };
	};
}
	$scope.getProductCategories();
  }
);
