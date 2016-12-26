module.exports = function(app, passport){
    app.get( '/', function( req, res ) {
    res.sendfile(__dirname + '/aboutus.html');
  });
    app.get( '/registration', function( req, res ) {
    res.render('registration.ejs', { message: req.flash('signupMessage') });
  });
    app.get( '/login', function( req, res ) {
    res.render('sign_in.ejs', { message: req.flash('loginMessage') });
  });
  app.post('/login', passport.authenticate('local-login', {
       successRedirect : '/welcome',
       failureRedirect : '/login',
       failureFlash : true
   }));
  app.post('/registration', passport.authenticate('local-signup', {
       successRedirect : '/welcome',
       failureRedirect : '/registration',
       failureFlash : true
   }));
    app.get( '/welcome',isLoggedIn, function( req, res ) {
    res.sendfile(__dirname + '/welcome.html');
  });
    app.get( '/logout', function( req, res ) {
    req.logout();
    res.redirect('/');
  });
};
function isLoggedIn(req, res, next){
  if (req.isAuthenticated())
    return next();

    res.redirect(__dirname + '/sign_in.html');
}
