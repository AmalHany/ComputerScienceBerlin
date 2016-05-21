var messageApp = angular.module('messageApp', ['MessageSocketService']);

// message controller for testing purpose
messageApp.controller('MessageController',[ '$scope', 'messageSocket', function($scope, messageSocket) {

  $scope.toUser = '';
  $scope.content = '';
  $scope.from_business = '';
  $scope.to_business = '';

  $scope.send = function(){
    messageSocket.sendMessage({
      toUser: $scope.toUser,
      content: $scope.content,
      from_business: $scope.from_business,
      to_business: $scope.to_business
    });
    $scope.toUser = '';
    $scope.content = '';
  };

}]);

// controller to handle inbox notifications
messageApp.controller('MessageNotifyController',['$rootScope','$scope', function($rootScope, $scope) {
  $scope.newMessages = [];

  // on updateMessage event group unseen messages from the inbox
  $rootScope.$on('updateMessages', function(){
    $scope.newMessages = [];
    $rootScope.currentUser.inbox.forEach(function(msg){
        if(!msg.seen)
          $scope.newMessages.push(msg);
    });
  });

}]);

// create service for realtime messaging socket management
var MessageSocketService = angular.module('MessageSocketService', [])
.service('messageSocket', ['$rootScope', '$window', function ($rootScope, $window) {

  var messageSocket = {};
  messageSocket.socket = {};

  // initialize socket connection with server
  messageSocket.connect = function(){
    // connect using JWT for authentication
    messageSocket.socket = io.connect('/chat', {
      query: 'token=' + $window.sessionStorage['mean-token']
    });
    // check connection status
    messageSocket.socket.on('connect', function () {
      console.log("authorized");
    })
    // when a message is received update client user inbox
    .on('recMessage', function(newMsg) {
      $rootScope.$apply(function() {
        $rootScope.currentUser.inbox.push(newMsg);
        // emit event to MessageNotifyController to update message notifications
        $rootScope.$emit('updateMessages');
      });
    })
    .on('disconnect', function () {
      console.log('disconnected');
    })
    .on('error', function(error) {
      if (error.type == 'UnauthorizedError' || error.code == 'invalid_token') {
        console.log("User's token is invalid");
      }
    });
  };

  messageSocket.sendMessage = function(msg){
    // expected msg object
    // msg.content; text in message
    // msg.from_business; id of sender's business
    // msg.to_business; id of receiver's business
    // msg.to_user; id of receiver
    // send new message to server realtime socket hub
    messageSocket.socket.emit('sendMessage', msg);
  };

  return messageSocket;
}]);

var search = angular.module("searchApp", []);

search.controller('SearchBoxController', function($scope, $http){

  var userSearch;

  //dummy data for testing:

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


  $scope.update = function(){   //this will run whenever the input changes

    userSearch = $scope.search_term;  //user search is the term the user entered in the search
    $scope.searchTerm = userSearch

    var userSearchArray = userSearch.toLowerCase().split(" ")
    //array of search terms entered by user changed to lowercase


    var bestMatches = [];    //the products to show (in this order)

    for(var i = 0; i<allProducts.length; i++){

      var productTags = ("" + allProducts[i].tags).toLowerCase().split(",")
      //change all tags to lowercase so comparison is more accurate

      var productNameArray = allProducts[i].name.toLowerCase().split(" ")
      //change product name to lowercase and placed in array

      var tagCount = count(userSearchArray, productTags)
      var nameCount = count(userSearchArray, productNameArray)
      var matchPoints = tagCount + nameCount
      //match points indicate how much a product matches the search

      bestMatches.push([allProducts[i], matchPoints])

    };


    //filters out the products with 0 matchPoints
    //then sorts the remaining products based on their matchPoints
    //and then finally returns only the product and ignores the matchPoints

    bestMatches = bestMatches.filter(function(a){
      return a[1] !== 0
    })
    .sort(function(a,b){
      return b[1] - a[1]
    })
    .map(function(a){
      return a[0]
    })

    $scope.searchResults = bestMatches;

  }

  //on button click
  $scope.search = function(){

    $scope.update()

  };

  //counts how many times the search terms occur in another array (name/tags)
  count = function(search, comp){

    var len = (search.length >= comp.length) ? search.length : comp.length
    //to loop on the length of the larger array

    var count = 0

    for(var i = 0; i<len; i++){

      if(comp.indexOf(search[i]) !== -1){
        count++
        //increment count if current search term is found in other array
      }

    }
    return count
  };

});

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

var userAuthApp = angular.module('userAuthApp', ['MessageSocketService']);

userAuthApp.controller('RegisterController',['$rootScope', '$scope', '$location', '$http', '$window', 'messageSocket', function($rootScope, $scope, $location, $http, $window, messageSocket) {
  $scope.credentials = {};

  // submit user credentials form
  $scope.onSubmit = function () {

    // send post request to API with basic user information to register the user
    $http.post('/users/register', $scope.credentials).success(function(data){
      // obtain json web token of the regitered user
      $window.sessionStorage['mean-token'] = data.token;
      // populate global angular user object
      populateUser($http, $rootScope, $window, messageSocket, function(){
        $rootScope.$emit('setStatusAlert', "Logged in succesfully as " + $rootScope.currentUser.first_name);
      });
    })
    .error(function(err){
      $rootScope.$emit('setErrorAlert', err.message);
    })
    .then(function(){
      // redirect to root page
      $location.path('/');
    });
  };

}]);

userAuthApp.controller('LoginController',['$rootScope', '$scope', '$location', '$http', '$window', 'messageSocket', function($rootScope, $scope, $location, $http, $window, messageSocket) {
  $scope.credentials = {};

  // submit user credentials form
  $scope.onSubmit = function () {

    // send post request to API with basic user information to login the user
    $http.post('/users/login', $scope.credentials)
    .success(function(data) {
      // obtain json web token of the logged in user
      $window.sessionStorage['mean-token'] = data.token;
      // populate global angular user object
      populateUser($http, $rootScope, $window, messageSocket, function(){
        $rootScope.$emit('setStatusAlert', "Logged in succesfully as " + $rootScope.currentUser.first_name);
      });
    })
    .error(function(err){
      $rootScope.$emit('setErrorAlert', err.message);
    })
    .then(function(){
      // redirect to root page
      $location.path('/');
    });
  };

}]);

userAuthApp.controller('NavigationController',['$rootScope', '$scope', '$location', '$window', function($rootScope, $scope, $location, $window){

  // on logout
  $scope.logout = function(){
    // delete session json web token
    $window.sessionStorage.removeItem('mean-token');
    // clear global user object
    $rootScope.currentUser = {};
    // clear global user inbox
    $rootScope.currentUser.inbox = [];
    // change global state to not logged in
    $rootScope.isLoggedIn = false;
    // emit event to messageNotifyController to clear message notifications
    $rootScope.$emit('updateMessages');
    // redirect to root page
    $location.path('/');
    $rootScope.$emit('setStatusAlert', "Logged out succesfully");
  };

}]);

function populateUser($http, $rootScope, $window, messageSocket, callback){

  var token = $window.sessionStorage['mean-token'];

  // initialize global variables
  $rootScope.currentUser = {};
  $rootScope.currentUser.inbox = [];
  $rootScope.isLoggedIn = false;

  if(token)
  {
    var user;
    // decode token
    user = token.split('.')[1];
    user = $window.atob(user);
    user = JSON.parse(user);

    // check if token is not expired
    $rootScope.isLoggedIn = user.exp > Date.now() / 1000;

    if($rootScope.isLoggedIn)
    {
      // populate global user object with more detailed user information
      // API call with JWT to get logged user details
      $http.get('/users/profile', {
        headers: {
          Authorization: 'Bearer '+ token
        }
      })
      .success(function(data) {
        // set global user
        $rootScope.currentUser = data;
      })
      .error(function (e) {
        console.log(e);
      })
      .then(function(){
        // API call with JWT to get logged user inbox
        $http.get('/messages/myMessages', {
          headers: {
            Authorization: 'Bearer '+ token
          }
        })
        .success(function(data) {
          // populate inbox object
          $rootScope.currentUser.inbox = data;
          // fire up realtime socket to long poll for new messages
          messageSocket.connect();
        })
        .error(function (e) {
          console.log(e);
        })
        .then(function(){
          // emit event to messageNotifyController to update new messages notification
          $rootScope.$emit('updateMessages');
          if(callback !== undefined)
            callback();
        });
      });
    }
  }
}

var wishListApp = angular.module('wishListApp', []);

wishListApp.controller('WishListController',
  function($scope, $http,$routeParams) {
    
    $scope.getWishList = function(){

      var config ={
        method: "GET",
        url: "/wishlists/" + $routeParams.wishlistId,
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
              $http(config).then(function(response) {
              // console.log(response.data);
            $scope.wishlist = response.data;


        });

    }



    $scope.removeProduct = function(x){
        console.log(x._id);
        console.log($routeParams.wishlistId);
        var config = {
          method: "DELETE",
          url: "/wishlists/" + $routeParams.wishlistId,
          data: {productID: x._id , wishlistID: $routeParams.wishlistId},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.getWishList();
        });
      }

    $scope.getWishList();
    $(function(){
    $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
});

  }
);
