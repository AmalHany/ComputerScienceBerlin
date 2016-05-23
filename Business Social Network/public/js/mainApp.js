
  var mainApp = angular.module('mainApp', [ 'ngRoute', 'wishListApp', 'searchApp']);

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
                        .when('/information', {
                            templateUrl: '/partials/UserInterface/UserView.html',
                            //controller: 'SearchBoxController'
                        });
                      }
                  ]
  );
