const usersController = require("../controllers/index").usersController;
const express = require("express");
const passport = require('passport')
const isLoggedIn = require('../authentication/authMiddleware').isLoggedIn;

const router = express.Router()

router.post("/register", usersController.create)

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.send(req.body)
})

router.get('/google', passport.authenticate('google', {scope: ['email', 'profile']}));

router.get('/registration/google/callback',
    passport.authenticate('google', { failureRedirect: '/failure_redirect' }),
    (req, res) => {
        res.redirect("http://localhost:8080/dashboard");
    });

router.get('/dashboard', isLoggedIn, (req, res) => {
    let obj = {
        email : req.user.email,
        name: req.user.name,
        socialId: req.user.socialId,
    }
    res.send(obj);
})

router.get('/failure_redirect', (req, res) => {
    res.send("Неудачная аутентификация через google")
})

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    res.send()
})

module.exports = router;

