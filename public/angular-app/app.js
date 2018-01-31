angular.module('db8', ['ngRoute', 'angular-jwt']).config(config).run(run);

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
    .when('/topics', {
      templateUrl   : 'angular-app/Views/topics/topics.html',
      controller    : TopicsController,
      controllerAs  : 'vm',
      access: {
        restricted: false
      }
    })
        .when('/topics/subjectoptions/:topic', {
          templateUrl   : 'angular-app/Views/subjectOptions/subjectoptions.html',
          controller    : subjectoptionsController,
          controllerAs  : 'vm',
          access: {
            restricted: false
          }
        })
        .when('/topics/availableSubjects/:topic', {
          templateUrl   : 'angular-app/Views/AvailableSubjects/availablesubjects.html',
          controller    : availablesubjectsController,
          controllerAs  : 'vm',
          access: {
            restricted: false
          }
        })
        .when('/topics/sujestsubject/:topic',{
          templateUrl   : 'angular-app/Views/SujestSubject/sujestsubject.html',
          controller    : sujestionController,
          controllerAs  : 'vm',
          access        : {
            restricted : false
          }
        })
        .when('/topics/subjectsinvoting/:topic', {
          templateUrl   : 'angular-app/Views/subjectsInVoting/subjectsInVoting.html',
          controller    : subVotingController,
          controllerAs  : 'vm',
          access        : {
            restricted  : false
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
      controller    : debatesController,
      controllerAs  : 'vm',
      access        : {
        restricted  : false
      }
    })
    .when('/chat/:id',{
      templateUrl   : 'angular-app/Views/chat/chat.html',
      controller    : chatController,
      controllerAs  : 'vm',
      access        : {
        restricted : false
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
