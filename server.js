var express = require('express');
var app = express();
var flash = require('connect-flash');
var passport = require('passport');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//files
require('/routes.js')(app, passport);
require('/passport.js')(passport);
//now database
mongoose.connect(......);
//Parse cookies and body
app.use(cookieParser());
app.use(bodyParser());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


//Port
console.log("Working Now");
app.listen(3000);
