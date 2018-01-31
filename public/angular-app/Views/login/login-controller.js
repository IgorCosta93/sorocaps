angular.module('db8').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory,debateFactory, jwtHelper,$timeout) {
  var vm = this;
  vm.adm = "NAO";

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  vm.login = function() {
    if (vm.username && vm.password) {
      var user = {
        username: vm.username,
        password: vm.password
      };

      $http.post('/api/login', user).then(function(response) {
        if (response.data.success) {
          $window.sessionStorage.token = response.data.token;
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          vm.loggedInUser = decodedToken.username;
          vm.erro = '';

          debateFactory.getUser(vm.loggedInUser).then(function(response){
            vm.adm = response.data.adm;
          });
          debateFactory.debateGetDebates(vm.loggedInUser).then(function(response){
            vm.debates = response.data;
          });
        }
      }).catch(function(error) {
        console.log(error);
        vm.erro = error;
        vm.hideLoader = false;

        $timeout(function(){
            vm.hideLoader = true;
        }, 2000);
      })
    }
  }

  vm.logout = function() {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path('/');
    vm.adm = "NAO";
  }

  vm.isActiveTab = function(url) {
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  }
}
