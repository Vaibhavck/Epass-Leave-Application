const mongoose = require('mongoose');
const userModel = mongoose.model("users");
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;


module.exports = function (passport) {
    passport.use(
      new localStrategy({
        usernameField: 'regiId',
        passwordField: 'password'
      },
        (regiId, password, done) => {
          userModel.findOne({ regiId: regiId }, (err, user) => {
          console.log("this is a error", err);
          if (err) throw err;
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      })
    );
  
    passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
      userModel.findOne({ _id: id }, (err, user) => {
        const userInformation = {
          regiId: user.regiId,
        };
        // cb(err, userInformation);
        cb(err, user);
      });
    });
  };