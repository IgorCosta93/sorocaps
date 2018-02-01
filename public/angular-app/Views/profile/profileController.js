angular.module('sorocaps').controller('profileController', profileController);

function profileController($http, $scope, AuthFactory, debateFactory,$route, $routeParams,$window,jwtHelper){
    var vm = this;

    vm.verificar = function(){
      $http.get('192.168.0.100', function(res){
        if(res.statusCode == 200)
          console.log("This site is up and running");
        else {
          console.log("This site might be down "+ res.statusCode);
        }
      });
      console.log("TESTE");
    };
    vm.verificar();

    /*vm.user = [];
    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    vm.loggedInUser = decodedToken.username;

    vm.reload = function(){
      //GET THE SUJESTIONS
      debateFactory.getSubjects().then(function(response){
        vm.subjects = response.data;
      });
    };

    vm.reload();

    vm.subscribe = function(subject){
      if(subject != undefined){
        //var debateN = debate.split(",");
        if (subject.length > 0){
          for (i = 0; i < subject.length; i++){
            if(String(subject[i]["user"]) == vm.loggedInUser){
              //user = "TRUE"
              //alert(vm.conversation[i]["user"]);
              return true;
            };
          };
        };
      };
    };

    vm.notify = function(subjectID){
      subject = {
        _id   : subjectID,
        user  : vm.loggedInUser
      };
      debateFactory.notifySubject(subject).then(function(response){
        //vm.adm = response.data.adm;
      });
      vm.reload();
      vm.reload();
    };

    vm.unNotify = function(subject){
      //console.log(subject._id);
      //console.log(subject.notification.length);
      //console.log(String(subject.notification[0]["_id"]));
      for (i = 0; i < subject.notification.length; i++){
        if(String(subject.notification[i]["user"]) == vm.loggedInUser){
          //console.log(String(subject.notification[i]["_id"]));
          vm.idUserN = String(subject.notification[i]["_id"]);
        };
      };

      subject = {
        _id       : subject._id,
        _idNotify : vm.idUserN
      };
      debateFactory.unNotifySubject(subject).then(function(response){
        vm.adm = response.data.adm;
      });
      vm.reload();
      vm.reload();
    };

    vm.isLoggedIn = function() {
      if (AuthFactory.isLoggedIn) {
        return true;
      } else {
        return false;
      }
    };*/

}
