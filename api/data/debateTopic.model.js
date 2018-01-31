var mongoose = require('mongoose');

var topicMSchema = new mongoose.Schema({
  topic : {
    type      : String,
    required  : true
  },
  user : {
    type : String,
    required : false
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

mongoose.model('TopicM', topicMSchema);
