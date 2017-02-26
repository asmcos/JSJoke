var passport = require('passport');
var Account = require('./account');
var router = require('express').Router();
var extend = require('util')._extend;

router.post('/register', function(req, res, next) {
  d = new Date()
  Account.register(new Account({username: req.body.username,createdate:d,level:0}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});


router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
router.get('/my', function(req, res) {
  var user = extend({},req.user['_doc'])

  user['_id'] = 'null'
	res.json(user)
});

module.exports = router;

