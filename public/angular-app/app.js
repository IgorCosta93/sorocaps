angular.module('sorocaps', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/', {
      templateUrl : 'angular-app/Views/main/main.html',
      controller    : MainController,
      controllerAs  : 'vm',
      /*
      restricted : "A"
      kinds of restriction
    	"A" - Restrict to the atribuit of the element Ex: <div>
    	"E" - Restrict to the Element
    	"C" - Restrict to the class of the element
    	"M" - Restrict to the coment of the element
      */
      access      : {
        restricted: false
      }
    })
    .when('/profile', {
      templateUrl : 'angular-app/Views/profile/profile.html',
      controller    : profileController,
      controllerAs  : 'vm',
      access      : {
        restricted: true
      }
    })
    .when('/register', {
      templateUrl   : 'angular-app/Views/register/register.html',
      controller    : RegisterController,
      controllerAs  : 'vm',
      access: {
        restricted: false
      }
    })
    .when('/controlPanel', {
      templateUrl   : 'angular-app/Views/controlPanel/controlPanel.html',
      controller    : controlpanelcontroller,
      controllerAs  : 'vm',
      access        : {
        restricted  : false
      }
    })
    .when('/debates',{
      templateUrl   : 'angular-app/Views/debates/debates.html',
      //controller    : debatesController,
      //controllerAs  : 'vm',
      access        : {
        restricted  : false
      }
    })
    .when('/produtos',{
      templateUrl   : 'angular-app/Views/produtos/produtos.html',
      access        : {
        restricted  : false
      }
    })
    .when('/gestaoQ',{
      templateUrl   : 'angular-app/Views/gestaoQualidade/gestaoQualidade.html',
      access        : {
        restricted  : false
      }
    })
    .when('/quemSomos',{
      templateUrl   : 'angular-app/Views/quemSomos/quemSomos.html',
      access        : {
        restricted  : false
      }
    })
    .when('/contato',{
      templateUrl   : 'angular-app/Views/contato/contato.html',
      access        : {
        restricted  : false
      }
    })
    .otherwise({
      redirectTo: '/'
    });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}
