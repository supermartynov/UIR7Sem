const usersController = require("../controllers/index").usersController;
const express = require("express");
const passport = require('passport')
const isLoggedIn = require('../security_stuff/authMiddleware').isLoggedIn;

const router = express.Router()

router.post("/register", usersController.create)

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.send(req.body)
})

router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}));

router.get('/registration/google/callback',
    passport.authenticate('google', { failureRedirect: '/failure_redirect' }),
    (req, res) => {
        res.send("<h3>Вы авторизированы, вернуться домой - <a href='http://localhost:8080/dashboard'>Главная страница</a></h3>")
    });

router.get('/dashboard', isLoggedIn, (req, res) => {
    res.send(req.user);
})

router.get('/failure_redirect', (req, res) => {
    res.send("Неудачная аутентификация через google")
})

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    res.send()
})

module.exports = router;

