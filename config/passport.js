import {usersController} from "../controllers/index.js";
import {User} from "../model/users.js";

import PasportLocal from 'passport-local';
const LocalStrategy = PasportLocal.Strategy;

export default (passport) => {
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
