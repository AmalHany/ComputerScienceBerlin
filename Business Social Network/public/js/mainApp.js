
  var mainApp = angular.module('mainApp', [ 'ngRoute', 'wishListApp', 'searchApp','BusinessCategoryApp']);

  mainApp.config(['$routeProvider',
                    function($routeProvider) {
                    	$routeProvider.
                        when('/wishlist/:wishlistId', {
                          templateUrl: '/partials/WishList/wishlist.html',
                          controller: 'WishListController'
                        }).
                        when('/search', {
                            templateUrl: '/partials/Search/searchBox.html',
                            controller: 'SearchBoxController'
                        }).
                        when('/businessCategory/:businessId',{
                        templateUrl:'/partials/BusinessCategory/BusinessCategoryView.html',
                       controller:'BusinessCategoryController'
                      }).
                         when('/productCategory/:productId',{
                        templateUrl:'/partials/ProductCategory/ProductCategoryView.html',
                       controller:'ProductCategoryController'
                      });
                      }
                  ]
  );
