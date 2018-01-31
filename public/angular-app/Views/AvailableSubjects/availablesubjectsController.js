angular.module('db8').controller('availablesubjectsController', availablesubjectsController);

function availablesubjectsController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper,db8APIService){
  var vm      = this;
  vm.people   = "";
  vm.position = "";
  vm.topic = $routeParams.topic;
  vm.subject  = "";
  var user = "";
  vm.userNotification = "";
  var token = $window.sessionStorage.token;
  var decodedToken = jwtHelper.decodeToken(token);
  vm.loggedInUser = decodedToken.username;
  var username = vm.loggedInUser;

  vm.getUserN = function(subject,user){
    vm.userN = '';
    vm.subject = subject;
    vm.userNotification = user;
    for (i = 0; i < vm.userNotification.length; i++){
      if (vm.userN == ''){
        vm.userN= String(vm.userNotification[i]["user"]);
        //alert(String(vm.userNotification[i]["user"]));
      }else {
        vm.userN= vm.userN + ',' +String(vm.userNotification[i]["user"]);
        //alert(String(vm.userNotification[i]["user"]));
      }
    };
    //alert("TESTE "+subject+' '+ vm.userN);
    //console.log(vm.userNotification);
  };

  vm.reload = function(){
    debateFactory.getSubjectsA(vm.topic).then(function(response){
      vm.subjects = response.data;
    });
  };

  vm.reload();

  vm.notify = function(subjectID){
    db8APIService.notify(subjectID,username);
    vm.reload();
  };

  vm.unNotify = function(subject){
    db8APIService.unNotify(subject,username);
    vm.reload();
  };

  vm.subscribe = function(subject){
    if(subject != undefined){
      //var debateN = debate.split(",");
      if (subject.length > 0){
        for (i = 0; i < subject.length; i++){
          if(String(subject[i]["user"]) == vm.loggedInUser){
            user = "TRUE"
            //alert(String(subject[i]["user"]));
            return true;
          };
        };
      };
    };
  };

  $('#myModal2').on('hidden.bs.modal', function () {
    var info = {
      people    : vm.people,
      position  : vm.position,
      topics    : vm.topics,
      topic     : vm.topic,
      subject   : vm.subject,
      user      : vm.loggedInUser,
      userN     : vm.userN
    };
    db8APIService.createDebate(info);
    vm.reload();
  });

};
