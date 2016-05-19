(function () {

  angular.module('mainApp').service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

    var saveToken = function (token) {
      $window.sessionStorage['mean-token'] = token;
    };

    var getToken = function () {
      return $window.sessionStorage['mean-token'];
    };

    logout = function() {
      $window.sessionStorage.removeItem('mean-token');
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          first_name : payload.first_name,
          last_name : payload.last_name
        };
      }
    };

    var register = function(user) {
      return $http.post('/users/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    var login = function(user) {
      return $http.post('/users/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    return {
      saveToken : saveToken,
      getToken : getToken,
      logout : logout,
      isLoggedIn : isLoggedIn,
      currentUser : currentUser,
      register : register,
      login : login
    };
  }

})();
