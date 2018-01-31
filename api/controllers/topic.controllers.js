var mongoose  = require('mongoose');
var topicMenu    = mongoose.model('TopicM');

module.exports.getAll = function(req,res){
  topicMenu
    .find()
    .exec(function(err, result){
      console.log(err);
      console.log(result);
      if(err){
        console.log("Error finding Topic");
        res
          .status(500)
          .json(err);
      }else {
        console.log("Found the topic HERE", result.length);
        res
          .json(result);
      }
    });
};

module.exports.addTopic = function(req,res){
  topicMenu
    .create({
      topic     : req.body.topic,
      user      : req.body.user,
      createdOn : req.body.createdOn
    }, function(err, topic){
      if(err){
        console.log("Error creating Topic");
        res
          .status(400)
          .json(err);
      }else {
        console.log("Topic Add.", topic);
        res
          .status(201)
          .json(topic);
      }
    });
};
