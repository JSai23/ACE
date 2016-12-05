var path = require('path');

app.get( '/', function( req, res ) {
    res.sendfile(__dirname + '/registration.html');
  });
app.listen('3000');
