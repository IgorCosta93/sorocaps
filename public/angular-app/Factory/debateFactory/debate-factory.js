angular.module('db8').factory('debateFactory', debateFactory);

function debateFactory($http){
  return {
    //USERS COLLECTION
    getUsers            : getUsers,
    getUser             : getUser,
    updateUser          : updateUser,
    deleteUser          : deleteUser,

    //CATEGORIES COLLECTION
    getTopic            : getTopic,
    addTopic            : addTopic,

    //NEWS
    addNews             : addNews,
    getSubjectsTopics   : getSubjectsTopics,

    debateList          : debateList,
    debatePost          : debatePost,
    topicPost           : topicPost,
    getSubjects         : getSubjects,
    updateTopic         : updateTopic,
    updateSujestion     : updateSujestion,
    deleteTopic         : deleteTopic,
    deleteDebate        : deleteDebate,
    getUserVote         : getUserVote,
    debateSearch        : debateSearch,
    debateInsert        : debateInsert,
    debateSearchUser    : debateSearchUser,
    debateAddinDebate   : debateAddinDebate,
    debateSearchP       : debateSearchP,
    debateGetDebates    : debateGetDebates,
    getSubjectsA        : getSubjectsA,
    debateGetDebate     : debateGetDebate,
    deleteConversation  : deleteConversation,
    updateConversation  : updateConversation,
    getSub              : getSub,
    notifySubject       : notifySubject,
    unNotifySubject     : unNotifySubject,
    getUserNotification : getUserNotification,
    debateGetUserN      : debateGetUserN,
    deleteNotification  : deleteNotification,
    debateInsertUsers   : debateInsertUsers

  };

  //-----------------------USERS---------------------------------------
  function getUsers(){
    return $http.get('/api/users').then(complete).catch(failed);
  }

  function getUser(username){
    return $http.get('/api/user/' + username).then(complete).catch(failed);
  }

  function updateUser(usuario){
    return $http.post('/api/user/', usuario).then(complete).catch(failed);
  }

  function deleteUser(_id){
    return $http.delete('/api/user/' + _id).then(complete).catch(failed);
  }

  //--------------------------TOPIC--------------------------------------

  function getTopic(){
    return $http.get('/api/topics/menu').then(complete).catch(failed);
  }

  function addTopic(topics){
    return $http.post('/api/topics/menu', topics).then(complete).catch(failed);
  }

  //------NEWS---------------------------------------------------------------------------

  function getSubjectsTopics(topic){
    return $http.get('/api/topics/topics/'+topic).then(complete).catch(failed);
  }

  //------SUJESTIONS---------------------------------------------------------------------------

  function getSubjects(){
    return $http.get('/api/topics').then(complete).catch(failed);
  }

  function getSub(topic){
    return $http.get('/api/topics/vote/'+topic).then(complete).catch(failed);
  }

  function getSubjectsA(topic){
    return $http.get('/api/topics/availeble/'+topic).then(complete).catch(failed);
  }

  function getUserVote(id, user){
    return $http.get('/api/topics/' + id + '/user/' + user).then(complete).catch(failed);
  }

  function topicPost(post){
    return $http.post('/api/topics', post).then(complete).catch(failed);
  }

  function addNews(post){
    return $http.post('/api/topics/news', post).then(complete).catch(failed);
  }

  function updateTopic(topic){
    return $http.post('/api/topics/id', topic).then(complete).catch(failed);
  }

  function updateSujestion(topic){
    return $http.post('/api/topics/topic', topic).then(complete).catch(failed);
  }

  function deleteTopic(_id){
    return $http.delete('/api/topics/' + _id).then(complete).catch(failed);
  }

  function notifySubject(subject){
    return $http.post('/api/notify', subject).then(complete).catch(failed);
  }

  function unNotifySubject(subject){
    return $http.post('/api/unNotify', subject).then(complete).catch(failed);
  }

  function getUserNotification(id){
    return $http.get('/api/notify/'+id).then(complete).catch(failed);
  }

  //------------CONVERSATIONS---------------------------------------------

  function debateGetDebate(){
    return $http.get('/api/topics/debates/').then(complete).catch(failed);
  }

  function debateList(id) {
    return $http.get('/api/topics/politics/'+id).then(complete).catch(failed);
  }

  function debateSearch(debate){
    return $http.post('/api/topics/search/', debate).then(complete).catch(failed);
  }

  function debateSearchUser(id){
    return $http.get('/api/topics/user/' + id).then(complete).catch(failed);
  }

  function debateGetDebates(user){
    return $http.get('/api/topics/debates/'+user).then(complete).catch(failed);
  }

  function debateSearchP(id){
    return $http.get('/api/topics/position/' + id).then(complete).catch(failed);
  }

  function debatePost(post){// NEED TO BE DELETE AFTER FINISH THE OTHER
    return $http.post('/api/topics/politics/', post).then(complete).catch(failed);
  }

  function debateInsert(conversation){
    return $http.post('/api/topics/chat', conversation).then(complete).catch(failed);
  }

  function debateInsertUsers(conUsers){
    return $http.post('/api/topics/chat/users', conUsers).then(complete).catch(failed);
  }

  function debateAddinDebate(user){
    return $http.post('/api/topics/user/', user).then(complete).catch(failed);
  }

  function updateConversation(conversation){
    return $http.post('/api/topics/conversation/', conversation).then(complete).catch(failed);
  }

  function deleteConversation(idDebate){
    return $http.delete('/api/topics/politics/debate/' + idDebate).then(complete).catch(failed);
  }

  function deleteDebate(idDebate,_id){
    return $http.delete('/api/topics/politics/' + idDebate + '/idComent/' + _id).then(complete).catch(failed);
  }

  function debateGetUserN(){
    return $http.get('/api/topics/debateGetUserN').then(complete).catch(failed);
  }

  function deleteNotification(subject){
    return $http.post('/api/topics/politics/debate/notification',  subject).then(complete).catch(failed);
  }

  //--------------------------------------------------------------------------------------------------

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
