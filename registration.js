var express = require('express');
var app = express();
var path = require('path')

app.use(express.static(__dirname))
app.use(express.static('files'))

app.get( '/', function( req, res ) {
    res.sendFile( path.join( __dirname, '/registration.html' ));
  });
app.listen('3000');
