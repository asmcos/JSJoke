var restful = require('node-restful')
var mong = require('mongoose')

// app.jokes, /jokes
// app.images,/images

module.exports = function (app){
	var mongoose = restful.mongoose
  //databases
  mongoose.connect("mongodb://localhost/jsjokes")	

  //collection 1,
  var Jokes = app.blogs = restful.model(
		'jokes', mongoose.Schema({
    title: String,
    content:String,
    createdate :Date,
    pv: Number,
    joke: Number,
    unjoke: Number,
    author  : [ {type : mongoose.Schema.ObjectId, ref : 'accounts'} ],
  }))
  .methods(['get']);
   
   var accounts = restful.model(
    'accounts',mongoose.Schema({
    nickname: String,
    avatar: String,  //image url
    createdate: Date,
    level: Number
  }));

  app.get('/jokes' ,function (req,res){
		Jokes.find()
         .sort('-_id')
         .populate({ path: 'author', select: {'avatar':1,'nickname':1,'level':1,'username':1} })
    		 .exec(function (err, jokes) {
      		 if (err) return handleError(err);
					 res.json(jokes)
         })
   })
   // get jokes end
   app.get('/jokes/:id',function(req,res){

      Jokes.findOne({'_id': req.params['id']},function(err,j){
			  if (req.query['joke']){
				  j.joke = j.joke + 1
          j.save(function(err,data){
						res.json(data)
          })
         } else if (req.query['unjoke']) {

				  j.unjoke = j.unjoke + 1
          j.save(function(err,data){
						res.json(data)
          })
        } else {
					res.json(j)
        }
      
      })
   })

}


/*
GET    /jokes
GET    /jokes/:id
POST   /jokes
PUT    /jokes/:id
DELETE /jokes/:id
*/
