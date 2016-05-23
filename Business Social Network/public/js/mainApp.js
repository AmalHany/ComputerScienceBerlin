
  var mainApp = angular.module('mainApp', [ 'ngRoute', 'wishListApp', 'searchApp', 'userApp']);

  mainApp.config(['$routeProvider',
                    function($routeProvider) {

                    	$routeProvider.
                        when('/wishlist/:wishlistId', {
                          templateUrl: '/partials/WishList/wishlist.html',
                          controller: 'WishListController'

                        })
                        .when('/wishlist/:wishlistId', {
                          templateUrl: '/partials/WishList/wishlist.html',
                          controller: 'WishListController'

                        })
                        .when('/user/:userId', {
                            templateUrl: '/partials/UserInterface/UserView.html',
                            controller: 'userController'
                        });
                      }
                  ]
  );
