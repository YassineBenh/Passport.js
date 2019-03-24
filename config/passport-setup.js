const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys.js');
const User = require('../models/user-model.js');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    // find the user by his id then send it to the done method
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for the strategy
        callbackURL: '/auth/google/redirect',
        // keys are from the google.Console api
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in database
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if (currentUser){
                //alreay have the user
                console.log('user is:' + currentUser);
                // when we're done, send the currentUser to the serializeUser method
                done(null, currentUser);
            } else {
                //if not, create new user in our db
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log(newUser);
                    // when we're done, send the newUser to the serializeUser method
                    done(null, newUser);
                });
            }
        });

    })
);
