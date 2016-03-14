  var mainApp = angular.module('mainApp', [ 'ngRoute', 'postApp', 'blogApp', 'homeApp']);

  mainApp.controller('aboutController', function($scope){});

  mainApp.config(['$routeProvider',
                    function($routeProvider) {
                      $routeProvider.
                        when('/', {
                          templateUrl: '/partials/home.html',
                          controller: 'homeController'
                        })
                        .when('/blog/:blogId', {
                          templateUrl: '/partials/blog.html',
                          controller: 'blogController'
                        })
                        .when('/post/:postId', {
                          templateUrl: '/partials/post.html',
                          controller: 'postController'
                        });
                    }
                  ]
  );
