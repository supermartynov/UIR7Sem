import express from "express"
import * as session from "express-session"
import cors from 'cors'
import bodyparser from 'body-parser'
import passport from 'passport'
import localStrategy from "./config/passport.js";
import {sequelize} from "./config/db.js";
import * as sequilizeStore from "connect-session-sequelize"


import {routerAuthRegDashboard} from './routes/account.js'

const app = express()
app.use(bodyparser.json())
app.use(express.json())
app.use(cors())

let SequilizeStore = sequilizeStore(session.Store)  //создаем SessionStore в бд, с помощью sequilize
app.use(
    session({
        secret: "keyboard cat",
        store: new SequilizeStore({
            db: sequelize,
        }),
        resave: false, // we support the touch method so per the express-session docs this should be set to false
        proxy: true, // if you do SSL outside of node.
    })
);

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
