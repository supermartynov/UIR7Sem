const usersController = require("../controllers/index").usersController;
const express = require("express");
const passport = require('passport')
const isAuth = require('../security_stuff/authMiddleware').isAuth;

const router = express.Router()

router.post("/register", usersController.create)

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.send(req.body)
}) //failureRedirect

router.get('/dashboard', isAuth, (req, res) => {
    res.send(req.user);
})

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect("/login")
})

module.exports = router;


/*router.get('/login', (req, res, next) => {

    const form = '<h1>Страница авторизации</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});*/

/*
router.get('/register', (req, res, next) => {

    const form = '<h1>Страница регистрации</h1><form method="post" action="/register">\
                    Username:<br><input type="text" name="username">\
                    <br>Password:<br><input type="password" name="password">\
                    <br>Email:<br><input type="text" name="email">\
                    <br>Name:<br><input type="text" name="name">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});*/

/*
router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});
*/

/*router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});*/

/*
router.get('/protected-route', isAuth, (req, res, next) => {
    res.send("Прочитайте ответ в инструментах разработчика")
});
*/