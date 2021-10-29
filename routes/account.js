import express from "express";
//import Router from 'express-promise-router'
import {usersController} from '../controllers/index.js'
import passport from 'passport'

const routerAuthRegDashboard = express.Router()

routerAuthRegDashboard.post("/account/reg", usersController.create)

routerAuthRegDashboard.get("/account/auth", (req, res) => {
    res.send('Страница авторизации')
})

routerAuthRegDashboard.get("/account/dashboard", passport.authenticate('local', {session: false}), (req, res) => {
    try{
        res.send("Страница пользователя")
    } catch (err) {
       res.send(err)
    }
})

export {routerAuthRegDashboard}
