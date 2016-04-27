facebookSocialApi = {

};

 var signupApp = angular.module('signupApp', []);


  signupApp.controller('signupCtrl', function($scope, $http) {
      
      
      $scope.signup=function(){
        if($scope.username!=null || $scope.password!=null || $scope.email!=null){
        var config = {
            method: "POST",
            url: "/signup",
            data: {username:$scope.username,
                    password:$scope.password,
                    email:$scope.email,
                    number:$scope.number,
                    cat1:$scope.cat1,
                    cat2:$scope.cat2,
                    cat3:$scope.cat3},
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          $http(config).then(function(response){
           
     
            if(response.data=="y"){
            $scope.username=null;
            $scope.password=null;
            $scope.email=null;
            $scope.number=null;
            $scope.cat1=null;
            $scope.cat2=null;
            $scope.cat3=null;
            $scope.message="Signed Up Successfully !!!";
            }else{$scope.username=null;
              $scope.password=null;
            $scope.message="This username is already taken, please choose another one";}
            
            
    
            console.log(response.data);
          });
      }else{
      $scope.message="required data must be filled"
    }
    }

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