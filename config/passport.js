const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../model/users.js')
const validPassword = require('./pswrd').validPassword


//1) verify callback for LocalStrategy

//после post запроса, middleware passport сам найдет userName и password и подставит в verifyCallback
//чтобы не допустить ошибок из-за разных наименований нужно создать customFields

let customFields = {
    usernameField: 'username',
    passwordField: 'password'
}

const verifyCallback = (username, password, done) => {
    console.log("aaaaaaAAA")
    console.log("aaaaaaAAA")
    console.log("aaaaaaAAA")
    console.log("aaaaaaAAA")
    console.log("aaaaaaAAA")
    console.log("aaaaaaAAA")
    console.log("aaaaaaAAA")
    User.findOne({where: { username: username}})
        .then((user) => {

            if (!user) {
                return done(null, false)  //это не ошибка, но passport веренет unAuthoried HTTP status
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


} //done определяет результаты верификации

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy)

passport.serializeUser((user, done) => {
    console.log("serialize")
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    console.log("deserialize")
    User.findByPk(userId)
        .then((user) => {
            done(null, user)
        })
        .catch(err => done(err))
})

module.exports.passport = passport;