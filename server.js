import express from "express"
import cors from 'cors'
import bodyparser from 'body-parser'
import passport from 'passport'
import localStrategy from "./config/passport.js";
import passportConfig from "./config/passport.js";

import {routerAuthRegDashboard} from './routes/account.js'

const app = express()
app.use(bodyparser.json())
app.use(express.json())
app.use(cors())

app.use(routerAuthRegDashboard)
app.use(passport.initialize());
app.use(passport.session())
localStrategy(passport)

app.get("/",  (req, res) => {
    res.send("Главная страница")
})

app.listen(9000, () => {
    console.log("Запустили")
})
