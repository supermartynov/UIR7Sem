import {User} from '../model/users.js'
import {usersController} from "../controllers/usersController.js";
import * as passportJWT from 'passport-jwt';

function auth (passport) {

    var JwtStrategy = passportJWT.Strategy,
        ExtractJwt = passportJWT.ExtractJwt;
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';
    opts.issuer = 'accounts.examplesoft.com';
    opts.audience = 'yoursite.net';
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