var LocalStrategy   = require('passport-local').Strategy;
var User            = require('./user');
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('local-signup', new LocalStrategy({
          usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true
      },
      function(req, f_name, l_name, user_name, password, email, done) {
            process.nextTick(function() {
          User.findOne({ 'local.email' :  email }, function(err, user) {
              if (err)
                  return done(err);
              if (user) {
                  return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
              } else {
                  var newUser            = new User();
                  newUser.local.email    = email;
                  newUser.local.namef    = f_name;
                  newUser.local.namel    = l_name;
                  newUser.local.username = user_name;
                  newUser.local.password = newUser.generateHash(password);
                  newUser.save(function(err) {
                      if (err)
                          throw err;
                      return done(null, newUser);
                  });
              }

          });

          });

      }));

  };
