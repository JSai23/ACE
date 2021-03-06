// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('./user.js');

// expose this function to our app using module.exports
module.exports = function(passport, nodemailer, transporter) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
      var link;
      process.nextTick(function() {
      User.findOne({ 'local.email' :  req.body.email }, function(err, user) {
           // if there are any errors, return the error
           if (err)
               return done(err);

           // check to see if theres already a user with that email
           if (user)
           {
               return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
           } else {
      User.findOne({ 'local.username' :  username }, function(err, user) {
                  // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user)
            {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {

                var newUser            = new User();
                var rand = Math.floor((Math.random() * 100) + 54).toString(); //the random
                link="http://"+req.get('host')+"/verify?id="+rand;

                // set the user's local credentials
                newUser.local.username = req.body.username;
                newUser.local.password = newUser.generateHash(req.body.password);
                newUser.local.email    = req.body.email;
                newUser.local.namef    = req.body.f_name;
                newUser.local.namel    = req.body.l_name;
                newUser.local.id = rand;
                newUser.local.verified = false;
                newUser.local.link = link;
                if (req.url == '/registration-org')
                {
                  newUser.local.organization = req.body.org;
                }
                else
                {
                  newUser.local.organization = 'personal';
                }
                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, false, req.flash('signupMessage', 'Please click the link that was sent to your email, and then relogin.'));
                });
                var mailOptions = {
                    from: 'jsaivarahi@gmail.com',
                    to: req.body.email,
                    subject: req.body.subject,
                    html: "<a href="+link+"> Click the link to verify</a><br>"+link+"<br>"
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    }else{
                        console.log('Message sent: ' + info.response);
                    };
                });
              }});
            }});
          });

    }));
    passport.use('local-login', new LocalStrategy({
       passReqToCallback : true // allows us to pass back the entire request to the callback
   },
   function(req, username, password, done) { // callback with email and password from our form

       // find a user whose email is the same as the forms email
       // we are checking to see if the user trying to login already exists
       User.findOne({ 'local.username' :  username }, function(err, user) {
           // if there are any errors, return the error before anything else
           if (err)
               return done(err);

           // if no user is found, return the message
           if (!user)
               return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

           // if the user is found but the password is wrong
           if (!user.validPassword(password))
               return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

          if(!user.local.verified)
                {
                  return done(null, false, req.flash('loginMessage', 'You did not verify your email')); //if email is verified
                }
           // all is well, return successful user
           return done(null, user);
       });

   }));

};
