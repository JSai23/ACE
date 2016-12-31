module.exports = function(app, passport){
    app.get( '/', function( req, res ) {
    res.sendfile(__dirname + '/AceClub.html');
  });
    app.get( '/registration', function( req, res ) {
    res.render('registration.ejs', { message: req.flash('signupMessage') });
  });
    app.get( '/login', function( req, res ) {
    res.render('sign_in.ejs', { message: req.flash('loginMessage'),  redirect: req.flash('unauthorized') });
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
  app.get( '/ourteam', function( req, res ) {
  res.sendfile(__dirname + '/ourteam.html');
});
app.get( '/aboutus', function( req, res ) {
res.sendfile(__dirname + '/aboutus.html');
});
app.get( '/contactus', function( req, res ) {
res.sendfile(__dirname + '/contactus.html');
});
app.get( '/donations', function( req, res ) {
res.sendfile(__dirname + '/donation.html');
});
app.get( '/video_teach', function( req, res ) {
res.sendfile(__dirname + '/video_teach.html');
});
app.get( '/video_meeting', function( req, res ) {
res.sendfile(__dirname + '/video_meeting.html');
});
};
function isLoggedIn(req, res, next){
  if (req.isAuthenticated())
  {return next();}

    req.flash('unauthorized', 'You must be signed in or registered to view this page')
    res.redirect('/login');
}
