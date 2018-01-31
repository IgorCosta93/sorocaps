angular.module('db8').directive('mhNavigation', mhNavigation);

function mhNavigation() {
  return {
    restrict: 'E',
    templateUrl: 'angular-app/Directive/navigation-directive/navigation-directive.html'
  };
}
