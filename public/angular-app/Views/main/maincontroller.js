angular.module('sorocaps').controller('MainController', MainController);

function MainController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper,$timeout,db8APIService){
  var vm = this;
  vm.people   = "";
  vm.position = "";
  vm.topic    = "";

  var token = $window.sessionStorage.token;
  var decodedToken = jwtHelper.decodeToken(token);
  vm.loggedInUser = decodedToken.username;
  var username = vm.loggedInUser;

  vm.reload = function(){
    //GET THE SUJESTIONS BY TOPIC
    vm.getSubjectPolitic = function(){
      debateFactory.getSubjectsTopics("Politic").then(function(response){
        vm.subjectPolitic = response.data;
        //console.log(vm.subjects.length);
      });
    };

    vm.getSubjectMusic = function(){
      debateFactory.getSubjectsTopics("Music").then(function(response){
        vm.subjectMusic = response.data;
        //console.log(vm.subjects.length);
      });
    };

    vm.getSubjectSoccer = function(){
      debateFactory.getSubjectsTopics("Soccer").then(function(response){
        vm.subjectSoccer = response.data;
        //console.log(vm.subjects.length);
      });
    };

    vm.getSubjectScience = function(){
      debateFactory.getSubjectsTopics("Science").then(function(response){
        vm.subjectScience = response.data;
        //console.log(vm.subjects.length);
      });
    };

    vm.getSubjectPolitic();
    vm.getSubjectMusic();
    vm.getSubjectSoccer();
    vm.getSubjectScience();


  };

  vm.reload();

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

  vm.notify = function(subjectID){
    db8APIService.notify(subjectID,username);
    vm.reload();
  };

  vm.unNotify = function(subject){
    db8APIService.unNotify(subject,username);
    vm.reload();
  };

  vm.getUserN = function(subject,user,topic){
    vm.userN            = '';
    vm.subject          = subject;
    vm.userNotification = user;
    vm.topic            = topic;
    vm.topics           = topic;
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
