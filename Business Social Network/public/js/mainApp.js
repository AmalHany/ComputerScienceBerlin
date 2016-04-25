  var mainApp = angular.module('mainApp', [ 'ngRoute', 'wishListApp']);
  
  mainApp.config(['$routeProvider',
                    function($routeProvider) {

                    	$routeProvider.
                        when('/wishlist/:wishlistId', {
                          templateUrl: '/partials/WishList/wishlist.html',
                          controller: 'WishListController'
                        });
                    }
                  ]
  );
