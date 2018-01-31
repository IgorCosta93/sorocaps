angular.module('db8').controller('sujestionController', sujestionController);

function sujestionController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper){
    var vm = this;
    vm.topic = $routeParams.topic;
    vm.igor = "Igor";

    vm.postSujestion = function(){
      var post = {
        topic     : vm.topic,
        subject   : vm.subject,
        createdOn : Date.now()
      };

      if (!vm.topic){
        vm.error = 'Please write a Topic'
      }else if (!vm.subject) {
        vm.error = 'Please write a subject'
      }else {
        debateFactory.topicPost(post).then(function(response){
          vm.topic = response.data;
        });
        vm.message = 'Successful add sujestion.';
        vm.error = '';
        document.getElementById('topics').value = '';
      }
    };

    vm.isLoggedIn = function() {
      if (AuthFactory.isLoggedIn) {
        return true;
      } else {
        return false;
      }
    };
};
