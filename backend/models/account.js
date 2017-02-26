var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  nickname: String,
  avatar: String,  //image url
  createdate: Date,
  level: Number
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);

