
  var mainApp = angular.module('mainApp', [ 'ngRoute', 'wishListApp', 'searchApp','acceptBusinessCtrl']);

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
                        .when('/', {
                          templateUrl: '/partials/AcceptBusiness/toolbar.html',
                          controller: 'acceptBusinessCtrl'
                        })
                        
                        .when('/admin', {
                          templateUrl: '/partials/AcceptBusiness/admin.html',
                          controller: 'acceptBusinessCtrl'
                        })
                        
                        .when('/show', {
                          templateUrl: '/partials/AcceptBusiness/show.html',
                          controller: 'acceptBusinessCtrl'
                        })
                      
                         .when('/business', {
                          templateUrl: '/partials/AcceptBusiness/businessregisteration.html',
                          controller: 'acceptBusinessCtrl'
                        });


                      }
                  ]
  );
