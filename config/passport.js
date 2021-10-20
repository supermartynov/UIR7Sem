import {User} from '../model/users.js'
import {secret} from "./db.js";
import * as passportJWT from 'passport-jwt';

function auth (passport) {

    let JwtStrategy = passportJWT.Strategy,
        ExtractJwt = passportJWT.ExtractJwt;
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}

export {auth}