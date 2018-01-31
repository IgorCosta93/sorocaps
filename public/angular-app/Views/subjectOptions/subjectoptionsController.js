angular.module('db8').controller('subjectoptionsController', subjectoptionsController);

function subjectoptionsController($http,debateFactory,$routeParams){
  var vm = this;
  vm.topic = $routeParams.topic;

  //alert(vm.topic);
  /*/GET TOPIC
  debateFactory.getTopic().then(function(response){
    vm.topics = response.data;

    vm.topicsT = [vm.topics.length];

    for (i = 0; i < vm.topics.length; i++){
        //alert(vm.topics[i]["topic"]);
        vm.topicsT[i] = vm.topics[i]["topic"];
    };
  });*/

};
