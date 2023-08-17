const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: "1",
    clientSecret: "1",
    callbackURL: "1"
}, async function (accessToken, refreshToken, profile, done) {
    try {
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            // User found, set this user as req.user
            return done(null, user);
        } else {
            // User not found, create the user and set it as req.user
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            return done(null, newUser);
        }
    } catch (err) {
        console.log('Error in Google strategy passport', err);
        return done(err);
    }
}));

module.exports = passport;

