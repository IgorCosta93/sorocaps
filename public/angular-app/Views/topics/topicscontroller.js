angular.module('db8').controller('TopicsController', TopicsController);

function TopicsController($http,debateFactory){
  var vm = this;

  //GET TOPIC
  debateFactory.getTopic().then(function(response){
    vm.topics = response.data;

    vm.topicsT = [vm.topics.length];

    for (i = 0; i < vm.topics.length; i++){
        //alert(vm.topics[i]["topic"]);
        vm.topicsT[i] = vm.topics[i]["topic"];
    };
  });

};
