
  var mainApp = angular.module('mainApp', [ 'ngRoute', 'wishListApp', 'searchApp']);

  mainApp.config(['$routeProvider',
                    function($routeProvider) {

                    	$routeProvider.
                        when('/wishlist/:wishlistId', {
                          templateUrl: '/partials/WishList/wishlist.html',
                          controller: 'WishListController'

                        })
                        .when('/search', {
                            templateUrl: '/partials/Search/searchBox.html',
                            controller: 'SearchBoxController'
                        });
                      }
                  ]
  );
