angular.module('db8').controller('subVotingController', subVotingController);

function subVotingController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper,$timeout){
  var vm = this;
  vm.topic = $routeParams.topic;

  vm.verifyVote = function(id){

    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    vm.loggedInUser = decodedToken.username;
    var user = "";
    var idTopic = id;

    var verify = {
        _id   : id,
        user  : vm.loggedInUser
      };

    debateFactory.getUserVote(id,vm.loggedInUser).then(function(response){
      vm.yesOrNot = response.data;

      for (i = 0; i < vm.yesOrNot.length; i++) {
          //console.log(String(vm.yesOrNot[i]["user"]));
          if(String(vm.yesOrNot[i]["user"]) == vm.loggedInUser){
            user = "TRUE";
          };
      };
      if(user == "TRUE"){
        vm.message = 'You have already vote in this subject';
      }else {
        vm.vote(idTopic);
      }

    });

  };

  vm.reload = function(){
    //debateFactory.getSubjects().then(function(response){
      //vm.subjects = response.data;
    //});
    debateFactory.getSub(vm.topic).then(function(response){
      vm.subjects = response.data;
    });

  };

  vm.UserName = function(){
    //$window.sessionStorage.token = response.data.token;
    //AuthFactory.isLoggedIn = true;
    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    vm.loggedInUser = decodedToken.username;
  };

  vm.reload();

  vm.vote = function(idTopic){

    var topic = {
        _id   : idTopic,
        vote  : 1,
        user  : vm.loggedInUser
      };

    debateFactory.updateTopic(topic).then(function(response){
      //vm.adm = response.data.adm;
      vm.message = 'Your vote has been successfully registered.';
    });
    vm.hideLoader = false;

    vm.reload();

    $timeout(function(){
        vm.hideLoader = true;
    }, 3000);
  };

  vm.voteN = function(idTopic){

    var topic = {
        _id   : idTopic,
        vote  : 0,
        user  : vm.loggedInUser
      };

    debateFactory.updateTopic(topic).then(function(response){
      //vm.adm = response.data.adm;
      vm.message = 'Your vote has been successfully registered.';
    });

    vm.message = 'Your vote has been successfully registered. NAO';

    vm.hideLoader = false;

    vm.reload();

    $timeout(function(){
        vm.hideLoader = true;
    }, 3000);

  };

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

};
