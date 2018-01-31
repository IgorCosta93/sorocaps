var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
  user : {
    type : String,
    required : true
  }
});

var usersSchema = new mongoose.Schema({
  user : {
    type : String,
    required : true
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

var topicsSchema = new mongoose.Schema({
  topic: {
    type : String,
    required: true
  },
  subject: {
    type : String,
    required : true
  },
  votes: {
    type : Number,
    required : false
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  },
  active: {
    type : String,
    required : false
  },
  users : [usersSchema],
  notification : [notificationSchema],
  image: {
    type : String,
    required : false
  }
});

mongoose.model('Topics', topicsSchema);
