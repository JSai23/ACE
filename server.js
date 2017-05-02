var express = require('express');
var app = express();
var port     = process.env.PORT || 3000;
var flash = require('connect-flash');
var passport = require('passport');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./backend/database.js');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'jsaivarahi@gmail.com', // Your email id
          pass: 'baba231411' // Your password
      }
  });
//now database
mongoose.connect(configDB.url, function(err){if (err) console.log(err);});
//Parse cookies and body
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'ejs');
app.use(session({ secret: 'SAIRAM' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//files
require('./backend/routes.js')(app, passport, transporter);
require('./backend/passport.js')(passport, nodemailer, transporter);
//Port
console.log("Working Now");
app.listen(port);
