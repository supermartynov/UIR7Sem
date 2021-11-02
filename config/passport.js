let userController = require("../controllers/index.js");
let User = require("../model/users.js");

let LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
    passport.use(
        new LocalStrategy((login, password, done) => {
            usersController.GetUserByLogin({ params: login}, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (!user) {
                    return done(null, false, { msg: "Incorrect username" });
                }
                if (user.password !== password) {
                    return done(null, false, { msg: "Incorrect password" });
                }
                return done(null, user);
            });
        })
    );

    passport.serializeUser(function (user, done) { //сериализация, что будем хранить в сессии
        console.log('serialization', user);
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => { //десериализация
        User.findByPk(id)
            .then((user) => {
                done(null, user)
            })
            .catch(err => done(err))
    });
}
