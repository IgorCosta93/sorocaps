angular.module('sorocaps').controller('controlpanelcontroller', controlpanelcontroller);

function controlpanelcontroller(debateFactory,$scope){
    var vm = this;
    var idUser;
    var idSubject;
    var idConversation;

    //------------------------------VISIBILITY

    document.getElementById('Overview').style.display = 'inherit';
    document.getElementById('latestUsers').style.display = 'inherit';
    document.getElementById('users').style.display = 'none';
    document.getElementById('sujestion').style.display = 'none';
    document.getElementById('posts').style.display = 'none';
    document.getElementById('topics').style.display = 'none';
    document.getElementById('news').style.display = 'none';

    vm.controlVisible = function(){
      document.getElementById('Overview').style.display = 'inherit';
      document.getElementById('latestUsers').style.display = 'inherit';
      document.getElementById('users').style.display = 'none';
      document.getElementById('sujestion').style.display = 'none';
      document.getElementById('posts').style.display = 'none';
      document.getElementById('topics').style.display = 'none';
      document.getElementById('news').style.display = 'none';
    };

    vm.usersVisible = function(){
      document.getElementById('Overview').style.display = 'none';
      document.getElementById('latestUsers').style.display = 'none';
      document.getElementById('users').style.display = 'inherit';
      document.getElementById('sujestion').style.display = 'none';
      document.getElementById('posts').style.display = 'none';
      document.getElementById('topics').style.display = 'none';
      document.getElementById('news').style.display = 'none';
    };

    vm.sujestionVisible = function(){
      document.getElementById('Overview').style.display = 'none';
      document.getElementById('latestUsers').style.display = 'none';
      document.getElementById('users').style.display = 'none';
      document.getElementById('sujestion').style.display = 'inherit';
      document.getElementById('posts').style.display = 'none';
      document.getElementById('topics').style.display = 'none';
      document.getElementById('news').style.display = 'none';
    };

    vm.postsVisible = function(){
      document.getElementById('Overview').style.display = 'none';
      document.getElementById('latestUsers').style.display = 'none';
      document.getElementById('users').style.display = 'none';
      document.getElementById('sujestion').style.display = 'none';
      document.getElementById('posts').style.display = 'inherit';
      document.getElementById('topics').style.display = 'none';
      document.getElementById('news').style.display = 'none';
    };

    vm.topicVisible = function(){
      document.getElementById('Overview').style.display = 'none';
      document.getElementById('latestUsers').style.display = 'none';
      document.getElementById('users').style.display = 'none';
      document.getElementById('sujestion').style.display = 'none';
      document.getElementById('posts').style.display = 'none';
      document.getElementById('topics').style.display = 'inherit';
      document.getElementById('news').style.display = 'none';
    };

    vm.newsVisible = function(){
      document.getElementById('Overview').style.display = 'none';
      document.getElementById('latestUsers').style.display = 'none';
      document.getElementById('users').style.display = 'none';
      document.getElementById('sujestion').style.display = 'none';
      document.getElementById('posts').style.display = 'none';
      document.getElementById('topics').style.display = 'none';
      document.getElementById('news').style.display = 'inherit';
    };

    //---------------------USERS------------------------------------------------

    vm.reload = function(){
      // GET USERS
      debateFactory.getUsers().then(function(response){
        vm.users = response.data;
      });

      //GET THE SUJESTIONS
      debateFactory.getSubjects().then(function(response){
        vm.subjects = response.data;
      });

      //GET THE CONVERSATIONS
      debateFactory.debateList().then(function(response){
        //vm.debates = response.data;
      });

      //GET debates
      debateFactory.debateGetDebate().then(function(response){
        vm.debates = response.data;
      });

      //GET Conversations
      vm.getConversation = function(idDebate){
        vm.debateId = idDebate;
        debateFactory.debateList(idDebate).then(function(response){
          vm.conversations = response.data;
        });
      };

      //GET TOPIC
      debateFactory.getTopic().then(function(response){
        vm.topics = response.data;
      });

    };

    vm.reload();

    vm.edit = function(user){

      document.getElementById("username").value = user.username;
      //document.getElementById("password").value = user.password;
      document.getElementById("email").value = user.email;
      document.getElementById("tipo").value = user.adm;
      idUser = user._id;
      vm.message = "NAO";
    };

    vm.update = function(id){

      if (document.getElementById("username").value == "" || document.getElementById("email").value == "" || document.getElementById("tipo").value == ""){
        vm.message = "SIM";
      }else {
        var usuario = {
            _id       : idUser,
            username  : document.getElementById("username").value,
            //password  : document.getElementById("password").value,
            email     : document.getElementById("email").value,
            adm       : document.getElementById("tipo").value
          };
          debateFactory.updateUser(usuario).then(function(response){
            //vm.adm = response.data.adm;
          });

          document.getElementById("username").value = "";
          document.getElementById("email").value = "";
          document.getElementById("tipo").value = "";

          vm.reload();
          vm.message = "NAO";
      }
      vm.reload();
    };

    vm.delete = function(_id){

      console.log(_id);
      debateFactory.deleteUser(_id).then(function(response){
        //
      });
      vm.reload();
    };

    //-------------------------------------CONVERSATIONS---------------------------------------------

    //GET THE CONVERSATIONS
    debateFactory.debateList().then(function(response){
      vm.debates = response.data;
    });

    //EDIT PRINCIPAL
    vm.editConversations = function(debate){
      document.getElementById("topicDebate").value      = debate.topic;
      document.getElementById("subjectDebate").value    = debate.subject;
      document.getElementById("userlimit").value        = debate.userLimit;
      document.getElementById("createdOnDebate").value  = debate.createdOn;
      idConversation                                    = debate._id;
      vm.message = "NAO";
    };

    //EDIT PRINCIPAL
    vm.updateConversations = function(id){
      if (document.getElementById("topicDebate").value == "" || document.getElementById("subjectDebate").value == "" || document.getElementById("userlimit").value == "" || document.getElementById("createdOnDebate").value == ""){
        vm.message = "SIM";
      }else {
        //console.log("UPDATE");
        //alert(idConversation);
        var conversation = {
            _id       : idConversation,
            topic     : document.getElementById("topicDebate").value,
            subject   : document.getElementById("subjectDebate").value,
            userlimit : document.getElementById("userlimit").value,
            createdOn : document.getElementById("createdOnDebate").value
          };

          //debateFactory.updateDebate(conversation).then(function(response){
            //vm.adm = response.data.adm;
          //});

          debateFactory.updateConversation(conversation).then(function(response){

          });

          document.getElementById("topicDebate").value = "";
          document.getElementById("subjectDebate").value = "";
          document.getElementById("userlimit").value = "";
          document.getElementById("createdOnDebate").value = "";

          //vm.reload();
          vm.message = "NAO";
      }
      vm.reload();
      vm.reload();
    };

    /*EDIT CONVERSATIONS
    vm.editConversation = function(debate){
      document.getElementById("userC").value       = conversation.user;
      document.getElementById("comentC").value     = conversation.coment;
      document.getElementById("createdOnC").value  = conversation.createdOn;
      idC                                          = conversation._id;
      vm.message = "NAO";
    };*/

    /*EDIT CONVERSATIONS
    vm.updateConversation = function(id){
      if (document.getElementById("userC").value == "" || document.getElementById("comentC").value == "" || document.getElementById("createdOnC").value == ""){
        vm.message = "SIM";
      }else {
        //console.log("UPDATE");
        //alert(idConversation);
        var conversations = {
            _id       : idC,
            user      : document.getElementById("userC").value,
            coment    : document.getElementById("comentC").value,
            createdOn : document.getElementById("createdOnC").value
        };

          debateFactory.updateC(conversations).then(function(response){});

          document.getElementById("userC").value = "";
          document.getElementById("comentC").value = "";
          document.getElementById("createdOnC").value = "";

          //vm.reload();
          vm.message = "NAO";
      }
      vm.reload();
      vm.reload();
    };*/

    vm.deleteDebate = function(_id){
      debateFactory.deleteConversation(_id).then(function(response){
      });
      vm.reload();
    };

    vm.deleteConversation = function(_id){
      debateFactory.deleteDebate(vm.debateId,_id).then(function(response){
          debateFactory.debateList(vm.debateId).then(function(response){
            vm.conversations = response.data;
          });
      });
    };

    //-------------------------------------SUJESTIONS------------------------------------------------

    //GET THE SUJESTIONS
    debateFactory.getSubjects().then(function(response){
      vm.subjects = response.data;
    });

    vm.editSujestion = function(subject){
      document.getElementById("topic").value      = subject.topic;
      document.getElementById("sujestio").value   = subject.subject;
      document.getElementById("votes").value      = subject.votes;
      document.getElementById("createdOn").value  = subject.createdOn;
      document.getElementById("active").value     = subject.active;
      idSubject = subject._id;
      vm.message = "NAO";
    };

    vm.updateSujestion = function(id){

      if (document.getElementById("topic").value == "" || document.getElementById("sujestion").value == "" || document.getElementById("createdOn").value == ""){
        vm.message = "SIM";
      }else {
        var sujestion = {
            _id       : idSubject,
            topic     : document.getElementById("topic").value,
            sujestion : document.getElementById("sujestio").value,
            votes     : document.getElementById("votes").value,
            createdOn : document.getElementById("createdOn").value,
            active    : document.getElementById("active").value
          };
          debateFactory.updateSujestion(sujestion).then(function(response){
            //vm.adm = response.data.adm;
          });

          document.getElementById("topic").value = "";
          document.getElementById("sujestio").value = "";
          document.getElementById("votes").value = "";
          document.getElementById("createdOn").value = "";
          document.getElementById("active").value = "";

          vm.reload();
          vm.message = "NAO";
      }
      vm.reload();
    };

    vm.deleteSujestion = function(_id){
      debateFactory.deleteTopic(_id).then(function(response){
      });
      vm.reload();
    };

    //-------------------------------------TOPIC------------------------------------------------

    vm.addTopic = function(){
      var topics = {
        topic     : document.getElementById("topicT").value,
        user      : document.getElementById("userT").value,
        createdOn : document.getElementById("createdOnT").value
      };

      debateFactory.addTopic(topics).then(function(response){
        //
      });

      document.getElementById("topicT").value = "";
      document.getElementById("userT").value = "";
      document.getElementById("createdOnT").value = "";

      vm.reload();
    };

    //-------------------------------------TOPIC------------------------------------------------

    vm.addNews = function(){

      if(document.getElementById("topicN").value == ""){
        //vm.error = 'Please write a Topic'
        alert(vm.error = 'Please write a Topic');
      }else if (!document.getElementById("sujestionN").value) {
        //vm.error = 'Please write a subject'
        alert(vm.error = 'Please write a subject');
      }else if (!document.getElementById("inputFileToLoad").value) {
        //vm.error = 'Please select a Image'
        alert(vm.error = 'Please select a Image');
      }else {

        var post = {
          topic     : document.getElementById("topicN").value,
          subject   : document.getElementById("sujestionN").value,
          image     : vm.base64value,
          createdOn : Date.now()
        };

        debateFactory.addNews(post).then(function(response){
          vm.topic = response.data;
        });
        vm.message = 'Successful add sujestion.';
        vm.error = '';
      };

      document.getElementById("topicN").value = "";
      document.getElementById("sujestionN").value = "";
      document.getElementById("inputFileToLoad").value = "";

      vm.reload();
    };

    //CONVERT IMAGE TO BASE64
    $(document).ready(function() {
        $("#inputFileToLoad").change(function() {
            var filesSelected = document.getElementById("inputFileToLoad").files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];
                var fileReader = new FileReader();
                fileReader.onload = function(fileLoadedEvent) {
                    var base64value = fileLoadedEvent.target.result;
                    //console.log(base64value);
                    vm.base64value = base64value;
                    $("#response").val(base64value);
                };
                fileReader.readAsDataURL(fileToLoad);
            }
        });
    });

};
