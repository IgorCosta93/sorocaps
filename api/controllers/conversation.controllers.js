var mongoose      = require('mongoose');
var conversation  = mongoose.model('User');
var coment        = mongoose.model('Conversation');
var topics        = mongoose.model('Topics');

module.exports.conversationGetAll = function(req, res){
    //console.log('Request by: ' + req.user);
    //console.log('GET the hotels');
    //console.log('req.query');

    /*var offset    = 0;
    var count     = 5;
    var maxCount  = 50;

    if (req.query && req.query.offset){
      offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count){
      count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
      res
        .status(400)
        .json({
          "message" : "If supplied in querystring, count and offset must both be numbers"
        });
        return;
    }

    if (count > maxCount){
      res
        .status(400)
        .json({
          "message" : "Count limit of " + maxCount + " exceeded"
        });
        return;
    }

    coment
      .find()
      .exec(function(err, debates){
        //console.log(err);
        //console.log(debates);
        if (err){
          console.log("Error finding debates");
          res
            .status(500)
            .json(err);
        } else {
          console.log("Found a debate ", debates.length);
          res
            .json(debates);
        }
      });*/
      //console.log("ID HERE " + req.params.id);
      var debateId = req.params.id;

      coment
        .findById(debateId)
        .select("coments")
        .exec(function(err, debates){
          var response = {
            status  : 200,
            message : {}
          };
          if (err){
            console.log("Error finding Debate");
            response.status   = 500;
            response.message  = err;
          }else if (!debates) {
            console.log("Debate not found in database ");
            response.status   = 404;
            response.message  = {"message" : "Debate ID not found "}
          }else {
            response.message = debates.coments ? debates.coments : [];
            if(!response.message){
              response.status   = 404;
              response.message  = {
                "message" : "User not found "
              };
            }
          }
          res
            .status(response.status)
            .json(response.message);
        });

};

module.exports.addComent = function(req,res){
    //console.log("Post new coment.");

    /*coment
      .create({
        subject   : req.body.subject,
        user      : req.body.user,
        coment    : req.body.coment,
        createdOn : req.body.createdOn
      }, function(err, coment){
        if (err) {
          console.log("Error creating coment");
          res
            .status(400)
            .json(err);
        } else {
          console.log("Coment Add.", coment);
          res
            .status(201)
            .json(coment);
        }
      });*/

      coment.findById(req.body._id, (err, coment) => {
          if(err){
            res.status(500).send(err);
          }else {
            coment.coments.push({
              user      : req.body.user,
              coment    : req.body.coment,
              createdOn : req.body.createdOn
            });
            coment.save((err, coment) => {
              if(err){
                res.status(500).send(err)
                console.log(err);
              }else {
                res.status(200).send(coment)
                console.log(coment);
              }
            });
          }
      });
};

module.exports.updateComent = function(req,res){
    console.log("COMENT ID "+req.body._id);
    coment.findById(req.body._id, (err, conversation) =>{
      if (err){
        res.status(505).send(err);
      }else {
        conversation.topic      = req.body.topic      || conversation.topic;
        conversation.subject    = req.body.subject    || conversation.subject;
        conversation.userLimit  = req.body.userlimit  || conversation.userLimit;
        conversation.createdOn  = req.body.createdOn  || conversation.createdOn;
        conversation.save((err, conversation) =>{
            if(err){
              res.status(500).send(err)
            }else {
              res.status(200).send(conversation)
            }
        });
      }
    });
};

module.exports.deleteConversation = function(req,res){
  id = req.params.id;
  coment
    .findByIdAndRemove(id)
    .exec(function(err, result){
      console.log(err);
      console.log(result);
      if(err){
        console.log("Erros deleting conversation");
        res
          .status(500)
          .json(err);
      }else {
        console.log("Conversation deleted.");
        res
          .json(result);
      }
    });
};

module.exports.deleteUserN = function(req,res){
  //console.log("COMENT ID "+req.body._id);
  //console.log("COMENT ID USER NOT "+req.body._idNotify);
  coment
    .findById(req.body._id, (err, conversationN) =>{
      if(err){
        res
          .status(500)
          .send(err);
      }else {
        conversationN.notification.pull({
          _id : req.body._idNotify
        });
        conversationN.save((err, conversationN)=>{
          if(err){
            res
              .status(500)
              .send(err);
              console.log(err);
          }else {
            res
              .status(200)
              .send(conversationN);
              console.log(conversationN);
          }
        });
      }
    });
};

module.exports.deleteComent = function(req,res){
  idDebate = req.params.idDebate;
  idComent = req.params.idComent;
  //console.log("Debate ID: " + idDebate);
  //console.log("coment ID " + idComent);
  coment.findById(idDebate, (err, coments) => {
      if(err){
        res.status(500).send(err);
      }else {
        coments.coments.pull({
          _id      : idComent
        });
        coments.save((err, coments) => {
          if(err){
            res.status(500).send(err)
            console.log(err);
          }else {
            res.status(200).send(coments)
            console.log(coments);
          }
        });
      }
    });
};

module.exports.getSearch = function(req,res){
  /*console.log("People "+ req.body.topics);
  console.log("Subject "+ req.body.subject);
  console.log("People "+ req.body.people);
  console.log("Position "+ req.body.position);*/

  coment
    .find({
      topic     : req.body.topics,
      subject   : req.body.subject,
      //RETURNS A VALUE SMALL THAN PASS  $gt is for Gratter than
      userLimit : req.body.people,
      userListN : {$lt: req.body.people}
    })
    .exec(function(err, debates){
      if (err){
        console.log("Error finding debates");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found a debate ", debates.length);
        res
          .json(debates);
      }
    });
};

module.exports.getDebate = function(req,res){
  coment
    .find()
    .exec(function(err, debate){
      if(err){
        console.log("Error finding debates");
        res
          .status(500)
          .json(err)
      }else {
        console.log("Found debate: ", debate.length);
        res
          .status(200)
          .json(debate);
      }
    })
};

module.exports.getDebates = function(req,res){
  coment
    .find({
      //Search for a element in a array
      userList : {$elemMatch: {user:req.params.user}}
    })
    .exec(function(err, debates){
      if(err){
        console.log("Error finding debates");
        res
          .status(500)
          .json(err)
      }else {
        console.log("Found a debate: ", debates.length);
        res
          .status(200)
          .json(debates);
      }
    })
};

module.exports.getSearchUser = function(req,res){
  //console.log("People "+ req.params.people);
  //console.log("Position "+ req.params.position);
  var debateId = req.params.id;

  coment
    .findById(debateId)
    .select("userList")
    .exec(function(err, debates){
      var response = {
        status  : 200,
        message : {}
      };
      if (err){
        console.log("Error finding Debate");
        response.status   = 500;
        response.message  = err;
      }else if (!debates) {
        console.log("Debate not found in database ");
        response.status   = 404;
        response.message  = {"message" : "Debate ID not found "}
      }else {
        response.message = debates.userList ? debates.userList : [];
        if(!response.message){
          response.status   = 404;
          response.message  = {
            "message" : "User not found "
          };
        }
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

module.exports.getSearchPosition = function(req,res){
  //console.log("People "+ req.params.people);
  //console.log("Position "+ req.params.position);
  var debateId = req.params.position;
  coment
    .findById(debateId)
    .select("positionL")
    .exec(function(err, debates){
      var response = {
        status  : 200,
        message : {}
      };
      if (err){
        console.log("Error finding Debate");
        response.status   = 500;
        response.message  = err;
      }else if (!debates) {
        console.log("Debate not found in database ");
        response.status   = 404;
        response.message  = {"message" : "Debate ID not found "}
      }else {
        response.message = debates.positionL ? debates.positionL : [];
        if(!response.message){
          response.status   = 404;
          response.message  = {
            "message" : "User not found "
          };
        }
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

module.exports.addUserNotification = function(req,res){
  //var usersN = users.split(",");
  console.log('HERE IS THE ID ' + req.body._id);
  var userName = req.body.usersN;
  //var users = userName.split(",");

  coment.findById(req.body._id, (err, comentsUser) => {
      if(err){
        res.status(500).send(err);
      }else {
        comentsUser.notification.push({
          user      : userName
        });
        comentsUser.save((err, comentsUser) => {
          if(err){
            res.status(500).send(err)
            console.log(err);
          }else {
            res.status(200).send(comentsUser)
            console.log(comentsUser);
          }
        });
      }
    });
};

module.exports.addConversation = function(req,res){
    //console.log("UsersN "+req.body.usersN);
    var _id = 'TESTE';
    var usersN = req.body.usersN;
    coment
      .create({
        topic     : req.body.topic,
        subject   : req.body.subject,
        userLimit : req.body.userLimit,
        userList : {
          user      : req.body.user,
          //position  : req.body.position,
          createdOn : req.body.createdOn
        },
        positionL : {
          position  : req.body.position
        },
        userListN : 1,
        createdOn : req.body.createdOn
      }, function(err, conversation){
        if (err) {
          console.log("Error creating coment");
          res
            .status(400)
            .json(err);
        } else {
          console.log("Coment Add.", conversation);
          res
            .status(201)
            .json(conversation);
        }
      });
};

module.exports.addUserInDebate = function(req,res){
  //console.log("POSITION : " + req.body.position);
  coment.findById(req.body._id, (err, coments) => {
      if(err){
        res.status(500).send(err);
      }else {
        coments.userListN = coments.userListN + 1;
        coments.userList.push({
          user      : req.body.user,
          createdOn : req.body.createdOn
        }),
        coments.positionL.push({
          position  : req.body.position
        });
        coments.save((err, coments) => {
          if(err){
            res.status(500).send(err)
            console.log(err);
          }else {
            res.status(200).send(coments)
            console.log(coments);
          }
        });
      }
    });
};

module.exports._getUserNotification = function(req,res){
  topics
    .find()
    .select('notification')
    .exec(function(err, topic){
      var response = {
        status  : 200,
        message : {}
      };
      if (err){
        console.log("Error finding Topic");
        response.status   = 500;
        response.message  = err;
      }else if (!topic) {
        console.log("Topic id not found in database ", id);
        response.status   = 404;
        response.message  = {"message" : "Topic ID not found " + id}
      }else {
        //Get User
        //response.message = topic.notification ? topic.notification : [];
        //If the user doens`t exist Mongoose returns null
        if (!response.message){
          response.status   = 404;
          response.message  = {
            "message" : "User not found " + username
          };
        }
      }
      console.log("MESSAGE HERE "+response.message);
      res
        .status(response.status)
        .json(response.message);
    });
};
