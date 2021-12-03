const LocalStrategy = require('passport-local').Strategy
const User = require('../model/users.js')
const validPassword = require('./pswrd').validPassword

let customFields = {
    usernameField: 'username',
    passwordField: 'password'
}

const verifyCallback = (username, password, done) => {
    User.findOne({where: { username: username}})
        .then(async (user) => {

            if (!user) {
                await User.findOne({where: { email: username}})
                    .then((userByEmail) => {
                        if (!userByEmail) {
                            return done(null, false); //это не ошибка, но passport веренет unAuthoried HTTP status
                        } else {
                            user = userByEmail;
                        }
                })
            }

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