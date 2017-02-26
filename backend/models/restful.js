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
  .methods(['get','post','put','delete']);

  Jokes.after('get', function(req, res, next) {
    if (req.params.id){
				var	pv = res.locals.bundle.pv + 1
        res.locals.bundle.pv = pv
        Jokes.update({_id:req.params.id},{pv:pv},function(err, count, resp) {
        });
    }  
    next();
  })

  Jokes.before('get', function(req, res, next) {
			req.body.author = req.user._id
      next();
  })

  Jokes.before('post', function(req, res, next) {
    if(req.isAuthenticated()){
      req.body['createdate'] = new Date()
      req.body['pv'] = 1
      req.body['joke'] = 0
      req.body['unjoke'] = 0
      req.body['author'] = req.user._id
      next();
    } else {
			res.sendStatus(403);
    } 
  })

  Jokes.before('put', function(req, res, next) {
    if(req.isAuthenticated()){
      
      next();
    } else {
			res.sendStatus(403);
    } 
  })

  Jokes.before('delete', function(req, res, next) {
    if(req.isAuthenticated()){
      next();
    } else {
			res.sendStatus(403);
    } 
  })

	Jokes.register(app,'/jokes')

  // collection 2,
  var UploadImg = app.images = restful.model(
		'uploadimg', mongoose.Schema({
    url: String,
    createdate :Date,
  }))
  .methods(['get','post','put','delete']);

	UploadImg.register(app,'/images')

}


/*
GET    /jokes
GET    /jokes/:id
POST   /jokes
PUT    /jokes/:id
DELETE /jokes/:id
*/
