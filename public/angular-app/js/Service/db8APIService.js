angular.module("db8").service("db8APIService", function(debateFactory){
  var idUserN = "";
  var user = "";

  //------------------------SUBSCRIBE-----------------------------------------

  this.notify = function(subjectID,user){
    subject = {
      _id   : subjectID,
      user  : user
    };
    debateFactory.notifySubject(subject).then(function(response){
      //vm.adm = response.data.adm;
    });
  };

  //------------------------UNSUBSCRIBE-----------------------------------------

  this.unNotify = function(subject,user){
    //console.log(subject._id);
    //console.log(subject.notification.length);
    //console.log(String(subject.notification[0]["_id"]));
    for (i = 0; i < subject.notification.length; i++){
      if(String(subject.notification[i]["user"]) == user){
        //console.log(String(subject.notification[i]["_id"]));
        idUserN = String(subject.notification[i]["_id"]);
      };
    };

    subject = {
      _id       : subject._id,
      _idNotify : idUserN
    };
    debateFactory.unNotifySubject(subject).then(function(response){
      //vm.adm = response.data.adm;
    });
  };

  //-----------------------CREATE OR ADD USER IN DEBATE--------------------------

  this.createDebate = function(info){
    var teste         = "";
    var positionU     = "";

    var conRes        = "";
    var idConver      = "";
    var userNN        = "";

    var id            = "";

    var conversation  = "";
    var message       = "";

    var position      = "";

    var debate = {
      people    : info.people,
      position  : info.position,
      topics    : info.topics,
      subject   : info.subject
    };

    debateFactory.debateSearch(debate).then(function(response){
      teste = response.data;
      positionU = info.position;

      if (response.data.length <= 0){
        var conversation = {
          topic     : info.topic,
          subject   : info.subject,
          user      : info.user,
          position  : info.position,
          userLimit : info.people,
          createdOn : Date.now()
          //usersN    : vm.userN
        };

        //CRIA CONVERSATION
        debateFactory.debateInsert(conversation).then(function(response){
          conRes = response.data;
          idConver = conRes._id
          //console.log("DIRECT RESPONSE :"+vm.conRes._id);
          //console.log("VAR RESPONSE "+ vm.idConver);

          userNN = info.userN.split(",");
          for (var i = 0; i < userNN.length; i++) {
            var conUsers = {
              _id       : conRes._id,
              usersN    : userNN[i]
            };

            //ADD USERS NOTIFICATION
            debateFactory.debateInsertUsers(conUsers).then(function(response){

            });
          };

        });

      }else {
        //alert(String(vm.teste[0]["_id"]));
        id = String(teste[0]["_id"]);
        //alert("TESTE 1");
        debateFactory.debateSearchUser(id).then(function(response){
          conversation = response.data;
          //alert(vm.conversation[0]["user"] + " 1");
          for (i = 0; i < conversation.length; i++){
            if(String(conversation[i]["user"]) == info.user){
              user = "TRUE"
              //alert(vm.conversation[i]["user"]);
            };
          };
          if(user=="TRUE"){
            message = 'You are already in this conversation ';

          }else {

            if (info.people == 2){
              //alert(vm.position);
              //POSITION--------------------------------------------------------
              debateFactory.debateSearchP(id).then(function(response){
                position = response.data;
                var one = 0;
                var two = 0;
                var three = 0;
                for (i = 0; i < position.length; i++){
                  if (position[i]["position"] == 1){
                    //alert(vm.position[i]["position"]);
                    one = one + 1;
                  }else if (position[i]["position"] == 2) {
                    //alert(vm.position[i]["position"]);
                    two = two + 1;
                  }else if (position[i]["position"] == 3) {
                    three = three + 1;
                  }
                };

                alert("Position Two " + two);
                if (one >= 2 || two >= 2 || three >= 2){
                  console.log("BIGGER THAN Size");
                  alert("Sorry we couldn`t find a debate for you.");
                }else {
                  message = 'Welcome to the Debate';

                  var user = {
                    _id       : id,
                    user      : info.user,
                    position  : positionU,
                    createdOn : Date.now()
                  };

                  debateFactory.debateAddinDebate(user).then(function(response){

                  });
                }
                //alert("Position One: " + vm.one + " - Positon Two: " + vm.two + " - Position Three: " + vm.three);

              });
            }else if (info.people == 4) {
              //POSITION--------------------------------------------------------
              debateFactory.debateSearchP(vm._id).then(function(response){
                position = response.data;
                var one = 0;
                var two = 0;
                var three = 0;
                for (i = 0; i < position.length; i++){
                  if (position[i]["position"] == 1){
                    //alert(vm.position[i]["position"]);
                    one = one + 1;
                  }else if (position[i]["position"] == 2) {
                    //alert(vm.position[i]["position"]);
                    two = two + 1;
                  }else if (position[i]["position"] == 3) {
                    three = three + 1;
                  }
                };

                alert("Position Two " + two);
                if (one >= 3 || two >= 3 || three >= 3){
                  console.log("BIGGER THAN Size");
                  alert("Sorry we couldn`t find a debate for you.");
                }else {
                  message = 'Welcome to the Debate';

                  var user = {
                    _id        : id,
                    user      : info.user,
                    position  : positionU,
                    createdOn : Date.now()
                  };

                  debateFactory.debateAddinDebate(user).then(function(response){

                  });
                }
                //alert("Position One: " + vm.one + " - Positon Two: " + vm.two + " - Position Three: " + vm.three);

              });
            };

          }//END ELSE --------------------------------
          alert(message);
        });//END SEARCHUSER -----------------------------------------------
      }//END ELSE
    });//END DEBATE SEARCH
  };

});
