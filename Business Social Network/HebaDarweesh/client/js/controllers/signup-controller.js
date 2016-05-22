//Client Side Controller, app.js calls this method.
app.controller('signupController', ['$scope', '$resource', function ($scope, $resource) {
	var User = $resource('/api/users');
User.query(function (results) {
 $scope.user = results;
 });

/*This query just calls every user in our collection users, and stores them into an array reults*/
	$scope.user = [] 
    $scope.createUser = function () {		
		var user = new User();				
		user.email = $scope.userEmail;	
		user.password = $scope.userPass;	
		user.firstName = $scope.userFName;
		user.lastName = $scope.userLName;
		user.age = $scope.userAge;
		user.Gender = $scope.userGender;
		user.$save(function (result){		
			$scope.user.push(result);		
			$scope.userEmail = '';			
			$scope.userPass = '';			
			$scope.userFName = '';
			$scope.userLName = '';
			$scope.userAge = '';
			$scope.userGender = '';
		});
	}
}]);

