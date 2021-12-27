const LocalStrategy = require('passport-local').Strategy
const User = require('../model/users.js')
const validPassword = require('./pswrd').validPassword

let customFields = {
    emailField: 'email',
    passwordField: 'password'
}

const verifyCallback = (email, password, done) => {
    console.log(password)
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
        console.log(err)
    })

}

const strategy = new LocalStrategy(customFields, verifyCallback)

module.exports = (passport) => {
    passport.use(strategy)

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((userId, done) => {
        User.findByPk(userId)
            .then((user) => {
                done(null, user)
            })
            .catch(err => done(err))
    })
}