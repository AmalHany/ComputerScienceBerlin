
  var mainApp = angular.module('mainApp', [ 'ngRoute', 'wishListApp', 'searchApp','businessApp']);

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
                        })
                        .when('/business', {
                             templateUrl: '/partials/BusinessProfile/businessProfile.html',
                             controller: 'view'
                         })
                        .when('/business/:businessId', {
                              templateUrl: '/partials/BusinessProfile/businessView.html',
                              controller: 'businessProfileController'
                         });

                      }
                  ]
  );
