//Client Side Controller
app.controller('signupController', ['$scope', '$resource', function ($scope, $resource) {
	var User = $resource('/api/users');
/*the app is the module we just created in the app.js, it calls the controller method which first
takes its name, then the scope, and the resource and passes them as parameters in the function
User just tells angular that the resources is called by the api from the collection Users, within
our database. 
*/
User.query(function (results) {
 $scope.user = results;
 });

/*This query just calls ever user in our collection users, and stores them into an array reults*/
	$scope.user = [] //This function just empties the array
    $scope.createUser = function () {		//This creates a new user when signing up
		var user = new User();				//Creates a variable using our resource
		user.email = $scope.userEmail;		//sets the user email as the data within a variable called userEmail, which we identify in the html page
		user.password = $scope.userPass;	//Same goes with the rest variable
		user.firstName = $scope.userFName;
		user.lastName = $scope.userLName;
		user.age = $scope.userAge;
		user.Gender = $scope.userGender;
		user.$save(function (result){		//this saves the new user, and passes a function that takes the results as a parameter
			$scope.user.push(result);		//Pushes the result into the collection user
			$scope.userEmail = '';			//This just resets our html  variables to nothing
			$scope.userPass = '';			//This exact process is repeated in the businessdraft controller
			$scope.userFName = '';
			$scope.userLName = '';
			$scope.userAge = '';
			$scope.userGender = '';
		});
	}
}]);

