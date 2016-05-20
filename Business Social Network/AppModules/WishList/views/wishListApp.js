var wishListApp = angular.module('wishListApp', []);

wishListApp.controller('WishListNotificationController',
  function($scope, $http,$routeParams) {
    var wishlist_id= '573f4399853cb2ca1affb6dc';
    $scope.getNotifications = function(){

      var config ={
        method: "PUT",
        url: "/wishlists/" + wishlist_id,
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
              $http(config).then(function(response) {
               //console.log(response.data);
               if(response.data.flag == '1'){
                 alert('Updated');
               }


        });

    }
$scope.getNotifications();



  }
);

wishListApp.controller('WishListController',
  function($scope, $http,$routeParams) {

    $scope.getWishList = function(){

      var config ={
        method: "GET",
        url: "/wishlists/" + $routeParams.wishlistId,
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
              $http(config).then(function(response) {
               //console.log(response.data);
            $scope.wishlist = response.data.newArr;


        });

    }



    $scope.removeProduct = function(x){
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
