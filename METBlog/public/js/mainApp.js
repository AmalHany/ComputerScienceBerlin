  var mainApp = angular.module('mainApp', [ 'ngRoute', 'postApp', 'blogApp', 'homeApp', 'userApp']);

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
                        })
                        .when('/signUp', {
                          templateUrl: '/partials/User/sign_up.html',
                          controller: 'signUpController'
                        })
                        .when('/signIn', {
                          templateUrl: '/partials/User/sign_in.html',
                          controller: 'signInController'
                        });
                    }
                  ]
  );
