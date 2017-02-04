var express = require('express');
var app = express();
var flash = require('connect-flash');
var passport = require('passport');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./database.js');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'jsaivarahi@gmail.com', // Your email id
          pass: 'Sai2314108' // Your password
      }
  });
//now database
mongoose.connect(configDB.url, function(err){if (err) console.log(err);});
//make all files static
app.use(express.static(__dirname));
//Parse cookies and body
app.use(cookieParser());
app.use(bodyParser());
app.set('views', __dirname)
app.set('view engine', 'ejs');
app.use(session({ secret: 'SAIRAM' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//files
require('./routes.js')(app, passport, transporter);
require('./passport.js')(passport, nodemailer, transporter);
//Port
console.log("Working Now");
app.listen(3000);
