nodemailer = require('nodemailer')
var User = require('./user.js');
module.exports = function(app, passport, transporter){
  app.get( '/', function( req, res ) {
  res.render('AceClub.ejs',  { message: req.flash('loginMessage'),  redirect: req.flash('unauthorized'), user: req.user });
});
  app.get( '/registration', function( req, res ) {
  res.render('registration.ejs', { message: req.flash('signupMessage'),  redirect: req.flash('unauthorized'), user: req.user });
});
app.get( '/registration-org', function( req, res ) {
res.render('registration-org.ejs', { message: req.flash('signupMessage'),  redirect: req.flash('unauthorized'), user: req.user });
});
  app.get( '/login', function( req, res ) {
  res.render('sign_in.ejs', { message: req.flash('loginMessage'),  redirect: req.flash('unauthorized'), user: req.user });
});
app.get( '/lesson', isLoggedIn, function( req, res ) {
res.render('lessonplans.ejs', { message: req.flash('signupMessage'),  redirect: req.flash('unauthorized'), user: req.user});
});
  app.get( '/otherresources', isLoggedIn, function( req, res ) {
  res.render('otherresources.ejs', { message: req.flash('loginMessage'),  redirect: req.flash('unauthorized'), user: req.user });
});
app.post('/login', passport.authenticate('local-login', {
     successRedirect : '/welcome',
     failureRedirect : 'back',
     failureFlash : true
 }));
app.post('/registration', passport.authenticate('local-signup', {
     successRedirect : '/welcome',
     failureRedirect : '/registration',
     failureFlash : true
 }));
 app.post('/registration-org', passport.authenticate('local-signup', {
      successRedirect : '/welcome',
      failureRedirect : '/registration',
      failureFlash : true
  }));

 app.post('/contactus', function(req, res)
 {
 var mailOptions = {
     from: req.body.email,
     to: 'jsaivarahi@gmail.com',
     subject: req.body.subject,
     text: req.body.message + " " + req.body.email
 };
 transporter.sendMail(mailOptions, function(error, info){
     if(error){
         console.log(error);
         res.end("error");
     }else{
         console.log('Message sent: ' + info.response);
         res.end("sent");
     };
 });
 }
);
  app.get( '/welcome',isLoggedIn, function( req, res ) {
  res.render('welcome.ejs', {user: req.user, message: req.flash('loginMessage'),  redirect: req.flash('unauthorized') });
});
  app.get('/verify', function(req,res)
{
  var id = req.query.id;
   process.nextTick(function() {
    User.findOneAndUpdate({ 'local.id' :  id }, {'local.verified': true}, function(err, user)
    {
      if(err)
      {
        console.log(err);
        console.log('error');
      }
      if(!user)
      {
        console.log('Does not work');
        res.redirect('/');
      }
      else
      {
        console.log('the user has been verified');
      }
    });
  });
  res.redirect('/')
});
  app.get( '/logout', function( req, res ) {
  req.logout();
  res.redirect('/');
});
app.get( '/aboutus', function( req, res ) {
res.render('aboutus.ejs', {message: req.flash('loginMessage'),  redirect: req.flash('unauthorized'), user: req.user});
});
app.get( '/contactus', function( req, res ) {
res.render('contactus.ejs', { message: req.flash('loginMessage'),  redirect: req.flash('unauthorized'), user: req.user });
});
app.get( '/video_teach', function( req, res ) {
res.render('video_teach.ejs', { message: req.flash('loginMessage'),  redirect: req.flash('unauthorized'), user: req.user });
});
app.get( '/video_meeting', function( req, res ) {
  res.render('video_meeting.ejs', { message: req.flash('loginMessage'),  redirect: req.flash('unauthorized'), user: req.user });
});
};
function isLoggedIn(req, res, next){
  if (req.isAuthenticated())
  {return next();}

    req.flash('unauthorized', 'You must be signed in or registered to view this page')
    res.redirect('/login');
}
