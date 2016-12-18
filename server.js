var express = require('express');
var app = express();
var flash = require('connect-flash');
var passport = require('passport');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//now database
//mongoose.connect(......);
//make all files static
app.use(express.static(__dirname));
//Parse cookies and body
app.use(cookieParser());
app.use(bodyParser());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//files
require(__dirname + '/routes.js')(app, passport);
//require('/passport.js')(passport);
//Port
console.log("Working Now");
app.listen(3000);
