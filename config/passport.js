// passporty stuffs
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(result => {
            if (result) {
                done(null, result);
            }
        })
        .catch(err => done(err, null));
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then(result => {
                if (result) {
                    done(null, result);
                } else {
                    new User({ googleId: profile.id }).save().then(result => {
                        done(null, result);
                    });
                }
            });
        }
    )
);

module.exports = passport;
