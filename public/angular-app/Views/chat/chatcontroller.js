angular.module('db8').controller('chatController', chatController);

function chatController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper){
  var vm      = this;
  vm.idDebate = $routeParams.id;
  var token   = jwtHelper.decodeToken($window.sessionStorage.token);
  username = token.username;

  vm.getTopic = function(){
    console.log('RAIO');
    vm.topic = 'Bolsonaro';
  };

  vm.post = function(){
    var token = jwtHelper.decodeToken($window.sessionStorage.token);
    var post = {
      _id       : vm.idDebate,
      user      : token.username,
      coment    : vm.coment,
      createdOn : Date.now()
    };

    if (!vm.coment){
      vm.error = 'Please write your coment before.'
    } else {
      /*$http.post('/api/topics/politics', post).then(function(result){
        console.log(result);
        vm.message = 'Successful coment.';
        vm.error = '';
      }).catch(function(error){
        console.log(error);
      });*/
      debateFactory.debatePost(post).then(function(response){
        //vm.debates = response.data;
      });
      vm.reload();
      vm.reload();
    }

    debateFactory.debateList(vm.idDebate).then(function(response){
      vm.debates = response.data;
    });

    document.getElementById("coment").value = '';
  };

  vm.delete = function(_id){

    debateFactory.deleteDebate(vm.idDebate,_id).then(function(response){
      //vm.debates = response.data;
    });
    debateFactory.debateList(vm.idDebate).then(function(response){
      vm.debates = response.data;
    });
    vm.reload();

    /*console.log("ID = " + _id);
    $http.delete('/api/topics/politics/' + vm.idDebate + '/idComent/' + _id).then(function(result){
      console.log(result);
      vm.message = 'Successful coment.';
      vm.error = '';
    }).catch(function(error){
      console.log(error);
    });
    debateFactory.debateList(vm.idDebate).then(function(response){
      vm.debates = response.data;
    });
    document.getElementById("myModal").modal = 'hide';*/

  };

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  debateFactory.debateList(vm.idDebate).then(function(response){
    vm.debates = response.data;
  });

  vm.reload = function(){
    debateFactory.debateList(vm.idDebate).then(function(response){
      vm.debates = response.data;
    });
  };

  //VERIFY IF USER IS ADM
  debateFactory.getUser(username).then(function(response){
    vm.adm = response.data.adm;
    console.log(response.data);
  });


  /*vm.getUser = function(){
    debateFactory.getUser(username).then(function(response){
      vm.adm = response.data.adm;
      console.log(response.data);
    });
  };*/

};
