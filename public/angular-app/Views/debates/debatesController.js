angular.module('db8').controller('debatesController', debatesController);

function debatesController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper,$timeout){
  var vm = this;
  vm.debateInfo = "";
  vm.position = "";

  var token = $window.sessionStorage.token;
  var decodedToken = jwtHelper.decodeToken(token);
  vm.loggedInUser = decodedToken.username;

  vm.reload = function(){
    debateFactory.debateGetDebates(vm.loggedInUser).then(function(response){
      vm.debates = response.data;
    });

    debateFactory.debateGetDebate().then(function(response){
      vm.debate = response.data;
      /*var debateN = vm.debate.notification;
      var debateNA = debateN.split(",");*/
    });
  };

  vm.reload(vm.loggedInUser);

  vm.debateR = function(debate){
    //console.log(debate);
    if(debate != undefined){
      //var debateN = debate.split(",");
      if (debate.length > 0){
        for (i = 0; i < debate.length; i++){
          if(String(debate[i]["user"]) == vm.loggedInUser){
            //user = "TRUE"
            //alert(vm.conversation[i]["user"]);
            return true;
          };
        };
      };
    };
  };

  vm.removeNotification = function(debates){
    console.log(debates._id);
    if(debates != undefined){
      //var debateN = debate.split(",");
      if (debates.notification.length > 0){
        for (i = 0; i < debates.notification.length; i++){
          if(String(debates.notification[i]["user"]) == vm.loggedInUser){
            //console.log(String(debates.notification[i]["_id"]));
            vm.user = String(debates.notification[i]["_id"]);
          };
        };
      };
    };
    subject = {
      _id       : debates._id,
      _idNotify : vm.user
    };

    debateFactory.deleteNotification(subject).then(function(response){
      //vm.debates = response.data;
      vm.reload();
    });

    vm.reload();
  };

  vm.addUserInDebate = function(position){
    vm.positionU = position;
    vm.people = vm.debateInfo.userLimit;
    /*console.log("Debate: "+vm.debateInfo);
    console.log("Position "+vm.positionU);
    console.log("Position "+vm.people);*/

    debateFactory.debateSearchUser(vm.debateInfo._id).then(function(response){
      vm.conversation = response.data;
      //alert(vm.conversation[0]["user"] + " 1");
      for (i = 0; i < vm.conversation.length; i++){
        if(String(vm.conversation[i]["user"]) == vm.loggedInUser){
          vm.userDebate = "TRUE"
          //alert(vm.conversation[i]["user"]);
        };
      };
      if(vm.userDebate == "TRUE"){
        vm.message = 'You are already in this conversation ';
      }else {
        alert(vm.people);
        if (vm.people == 2){
          //alert(vm.position);
          //POSITION--------------------------------------------------------
          debateFactory.debateSearchP(vm.debateInfo._id).then(function(response){
            vm.position = response.data;
            vm.one = 0;
            vm.two = 0;
            vm.three = 0;
            for (i = 0; i < vm.position.length; i++){
              if (vm.position[i]["position"] == 1){
                //alert(vm.position[i]["position"]);
                vm.one = vm.one + 1;
              }else if (vm.position[i]["position"] == 2) {
                //alert(vm.position[i]["position"]);
                vm.two = vm.two + 1;
              }else if (vm.position[i]["position"] == 3) {
                vm.three = vm.three + 1;
              }
            };

            alert("Position Two " + vm.two);
            if (vm.one >= 2 || vm.two >= 2 || vm.three >= 2){
              console.log("BIGGER THAN Size");
              alert("Sorry we couldn`t find a debate for you.");
            }else {
              vm.message = 'Welcome to the Debate';
              alert("Welcome to the Debate");
              var user = {
                _id       : vm.debateInfo._id,
                user      : vm.loggedInUser,
                position  : vm.positionU,
                createdOn : Date.now()
              };

              debateFactory.debateAddinDebate(user).then(function(response){

              });
            }
            //alert("Position One: " + vm.one + " - Positon Two: " + vm.two + " - Position Three: " + vm.three);

          });
        }else if (vm.people == 4) {
          //POSITION--------------------------------------------------------
          debateFactory.debateSearchP(vm.debateInfo._id).then(function(response){
            vm.position = response.data;
            vm.one = 0;
            vm.two = 0;
            vm.three = 0;
            for (i = 0; i < vm.position.length; i++){
              if (vm.position[i]["position"] == 1){
                //alert(vm.position[i]["position"]);
                vm.one = vm.one + 1;
              }else if (vm.position[i]["position"] == 2) {
                //alert(vm.position[i]["position"]);
                vm.two = vm.two + 1;
              }else if (vm.position[i]["position"] == 3) {
                vm.three = vm.three + 1;
              }
            };

            alert("Position Two " + vm.two);
            if (vm.one >= 3 || vm.two >= 3 || vm.three >= 3){
              console.log("BIGGER THAN Size");
              alert("Sorry we couldn`t find a debate for you.");
            }else {
              vm.message = 'Welcome to the Debate';
              alert("Welcome to the Debate");
              var user = {
                _id       : vm.debateInfo._id,
                user      : vm.loggedInUser,
                position  : vm.positionU,
                createdOn : Date.now()
              };

              debateFactory.debateAddinDebate(user).then(function(response){

              });
            }
            //alert("Position One: " + vm.one + " - Positon Two: " + vm.two + " - Position Three: " + vm.three);

          });
        };

      }//END ELSE --------------------------------
      alert(vm.message);
      vm.removeNotification(vm.debateInfo);
      vm.reload(vm.loggedInUser);
      vm.reload(vm.loggedInUser);
    });
  };

  /*debateFactory.debateGetUserN().then(function(response){
    vm.debatesGetUserN = response.data;
    vm.user = String(vm.debatesGetUserN[0]["user"]);
  });*/


  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };
};
