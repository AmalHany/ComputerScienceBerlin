
mainApp.controller('categoryCtrl',function($scope,$location,$http,$window){

	$scope.choose =function(category){


		$http.get('/updateDB/'+ category);
		$window.alert("you have successfully chosen your first category");


	}


})