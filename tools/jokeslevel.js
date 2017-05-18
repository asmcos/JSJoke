var restful = require('node-restful')
var mong = require('mongoose')



function init( ){
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

  var authors = {};

  Jokes.find({})
       .populate('author')
       .exec(function(error,cursor) {
					 for(var i in cursor){
						 // console.log(cursor[i].author[0])
						 level = cursor[i].comments.length * 2 + 5 + cursor[i].joke
             if (!authors[cursor[i].author[0]._id]){
							 cursor[i].author[0].datelevel = 0
							 authors[cursor[i].author[0]._id] = cursor[i].author[0]
						 } 
						 authors[cursor[i].author[0]._id].datelevel += level
					 }
					 for (var a in authors){
            	console.log(authors[a].datelevel)
					 }
           db.disconnect()					
        })
  
}

init ( )
