var restful = require('node-restful')
var mong = require('mongoose')
var argv = require('argv')
var args = argv.run();

function user(  ){
	var mongoose = restful.mongoose
  //databases
  var db = mongoose.connect("mongodb://localhost/jsjokes")	

  var accounts = restful.model(
    'accounts',mongoose.Schema({
    username: String,
    nickname: String,
    avatar: String,  //image url
    createdate: {type:Date, default: Date.now },
    level: {type:Number,default: 0 },
    admin: Number,
  }));
  

  var Jokes = restful.model(
    'jokes', mongoose.Schema({
    title: String,
    content:String,
    createdate :{type:Date, default:Date.now },
    pv: {type:Number,default:0},
    joke: {type:Number,default:0},
    unjoke: {type:Number, default: 0},
    published: {type :Number, default: 1},// 1 ,show. 0. hide
    comments: [{type : mongoose.Schema.ObjectId, ref : 'comments'}], // 1 ,show. 0. hide
    author  : [{type : mongoose.Schema.ObjectId, ref : 'accounts'}],
  }));

	accounts.find({},function(err,cursor){
					for (var c in cursor) {
						console.log(c,cursor[c].nickname||cursor[c].username,cursor[c].level)
					}
           db.disconnect()					
	})
}

user()
