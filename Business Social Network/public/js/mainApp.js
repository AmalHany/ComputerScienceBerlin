
  var mainApp = angular.module('mainApp', [ 'ngRoute', 'wishListApp', 'searchApp']);

  mainApp.config(['$routeProvider',
                    function($routeProvider) {

                    	$routeProvider.
                        when('/wishlist/:wishlistId', {
                          templateUrl: '/partials/WishList/wishlist.html',
                          controller: 'WishListController'

                        })
                         $routeProvider.
                        when('/business', {
                          templateUrl: '/partials/CreateBusiness/businessregisteration.html',
                          controller: 'createBusinessCtrl'
                        });
                        $routeProvider.
                        when('/admin', {
                          templateUrl: '/partials/CreateBusiness/admin.html',
                          controller: 'createBusinessCtrl'
                        });
                         $routeProvider.
                        when('/show', {
                          templateUrl: '/partials/CreateBusiness/show.html',
                          controller: 'createBusinessCtrl'
                        })
                        .when('/search', {
                            templateUrl: '/partials/Search/searchBox.html',
                            controller: 'SearchBoxController'
                        });
                      }
                  ]
  );
