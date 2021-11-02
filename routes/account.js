let {usersController} = require("../controllers/index");
let express = require("express");
const routerAuthRegDashboard = express.Router()

routerAuthRegDashboard.post("/account/reg", usersController.create)

routerAuthRegDashboard.get("/account/auth", (req, res) => {
    res.send('Страница авторизации')
})

/*routerAuthRegDashboard.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/account/dashboard' + user.login);
        });
    })(req, res, next);}
    )

routerAuthRegDashboard.get('/account/dashboard', auth(), (req, res) => {
    res.send("Добро пожаловть пользователь")
})*/

module.exports = routerAuthRegDashboard;

