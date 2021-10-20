import express from "express"
import cors from 'cors'
import bodyparser from 'body-parser'
import * as passport from 'passport'
import {auth} from './config/passport.js'
import {routerAuthRegDashboard} from './routes/account.js'
import * as jwt from 'jsonwebtoken'

const app = express()
app.use(bodyparser.json())
app.use(express.json())
app.use(cors())
app.use(routerAuthRegDashboard)

/*
app.use(passport.initialize(undefined));
app.use(passport.session(undefined))
*/










app.get("/",  (req, res) => {
    res.send("Главная страница")
})


app.listen(9000, () => {
    console.log("Запустили")
})



