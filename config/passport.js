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

/**
 * Google oAuth 2.0 strategory for Passport
 *
 * 1. This informs the strategry to trust the proxy from Heroku's Nginx server
 *    https://stackoverflow.com/a/48478696/1694116
 */
passport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            proxy: true /* [1] */
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
