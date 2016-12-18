module.exports = function(app, pasport){
    app.get( '/', function( req, res ) {
    res.sendfile(__dirname + '/aboutus.html');
  });
    app.get( '/registration', function( req, res ) {
    res.sendfile(__dirname + '/registration.html');
  });
    app.get( '/login', function( req, res ) {
    res.sendfile(__dirname + '/sign_in.html');
  });
    app.get( '/welcome',isLoggedIn, function( req, res ) {
    res.sendfile(__dirname + '/welcome.html');
  });
    app.get( '/logout', function( req, res ) {
    req.logout();
    res.redirect(__dirname + '/aboutus.html');
  });
};
function isLoggedIn(req, res, next){
  if (req.isAuthenticated())
    return next();

    res.redirect(__dirname + '/sign_in.html');
}
