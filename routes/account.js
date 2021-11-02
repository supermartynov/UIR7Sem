let usersController = require("../controllers/index").usersController;
let express = require("express");
const passport = require('passport')

const routerAuthRegDashboard = express.Router()

routerAuthRegDashboard.post("/account/register", usersController.create)

routerAuthRegDashboard.post('/login', passport.authenticate('local',
    {successRedirect: '/login-success', failureRedirect: "/login-failure"})) //failureRedirect

routerAuthRegDashboard.get('/account/dashboard', (req, res) => {
    res.send("Добро пожаловть пользователь")
})

routerAuthRegDashboard.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

routerAuthRegDashboard.get('/login', (req, res, next) => {

    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

routerAuthRegDashboard.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

routerAuthRegDashboard.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

routerAuthRegDashboard.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});


module.exports = routerAuthRegDashboard;

