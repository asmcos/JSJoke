var path     = require('path')
var express  = require('express')
var logger   = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var Account = require('./account')
var login = require('./login')

module.exports = function (app) {


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.query());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.use(session({keys: ['jsadmin1', 'jsadmin2', '...']}));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*
 * passport-local-mongoose
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/',login)

}
