const LocalStrategy = require('passport-local').Strategy
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const Config = require('./passportSocialNetworksConfig');

const User = require('../model/users.js')
const validPassword = require('./pswrd').validPassword

let customFields = {
    emailField: 'email',
    passwordField: 'password'
}

let customFielsForGoogle = {
    clientID: Config.oauth.googleAuth.clientID,
    clientSecret: Config.oauth.googleAuth.clientSecret,
    callbackURL: Config.oauth.googleAuth.callbackURL
}

const verifyCallback = (email, password, done) => {
    console.log(email)
    User.findOne({where: { email: email}})
        .then(async (user) => {
            const isValid = validPassword(password, user.hash, user.salt)

            if (isValid) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch(err => {
            return done(null, false)
    })
}

const verifyCallbackForGoogle = (request, accessToken, refreshToken, profile, done) => {
    User.findOne({where: { email: profile.emails[0].value}})
        .then(async (user) => {
            if (await user) {
                return done(null, user)
            } else if (!user) {
                let user = User.create({
                    name: profile.name.givenName,
                    email: profile.emails[0].value,
                    socialId: profile.id
                })
                return done(null, user)
            }
        })
        .catch(err => {
           return done(err, null)
        })
}

const strategy = new LocalStrategy(customFields, verifyCallback)
const googleStrategy = new GoogleStrategy(customFielsForGoogle, verifyCallbackForGoogle)

module.exports = (passport) => {
    passport.use(strategy)
    passport.use(googleStrategy);

    passport.serializeUser(async (user, done) => {
         done(null, await user)
    })

    passport.deserializeUser((user, done) => {
        User.findByPk(user.id)
            .then((user) => {
                done(null, user)
            })
            .catch(err => done(err))
    })
}