  var mainApp = angular.module('mainApp', [ 'ngRoute', 'postApp', 'blogApp', 'homeApp']);

  mainApp.controller('aboutController', function($scope){});

  mainApp.config(['$routeProvider',
                    function($routeProvider) {
                      $routeProvider.
                        when('/', {
                          templateUrl: '/partials/Home/home.html',
                          controller: 'homeController'
                        })
                        .when('/blog/:blogId', {
                          templateUrl: '/partials/Blog/blog.html',
                          controller: 'blogController'
                        })
                        .when('/post/:postId', {
                          templateUrl: '/partials/Post/post.html',
                          controller: 'postController'
                        });
                    }
                  ]
  );
