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
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/dashboard')
    });

router.get('/dashboard', isLoggedIn, (req, res) => {
    res.send(req.user);
})

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    res.redirect("/login")
})

module.exports = router;

