var wishListApp = angular.module('wishListApp', []);

wishListApp.controller('WishListNotificationController',
  function($scope, $http,$routeParams) {
    var wishlist_id= '573f4399853cb2ca1affb6dc'; //wishlist_id
    $scope.getNotifications = function(){   //checks if there are new Notifications meaning if any product
                                            // in a wishlist has changed
        var config ={
        method: "PUT",
        url: "/wishlists/" + wishlist_id,
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
              $http(config).then(function(response) {

               if(response.data.flag == '1')    //if data has been updated since last_seen the server controller sets the flag to 1
               $scope.notificationCount = "New Notification";
               else
               $scope.notificationCount = "No Notifications";



        });

    }
$scope.getNotifications(); // calling the method



  }
);

wishListApp.controller('WishListController',
  function($scope, $http,$routeParams) {

    $scope.getWishList = function(){   //view all products inside the wishlist

      var config ={
        method: "GET",
        url: "/wishlists/" + $routeParams.wishlistId,
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
              $http(config).then(function(response) {
            $scope.wishlist = response.data.newArr;
        });

    }



    $scope.removeProduct = function(x){  //remove a certain product from the wishlist
        console.log(x._id);
        console.log($routeParams.wishlistId);
        var config = {
          method: "DELETE",
          url: "/wishlists/" + $routeParams.wishlistId,
          data: {productID: x._id , wishlistID: $routeParams.wishlistId},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.getWishList();
        });
      }

    $scope.getWishList();
    $(function(){
    $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
});

  }
);
