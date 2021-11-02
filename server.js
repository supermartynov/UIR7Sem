const express = require("express")
const cors = require('cors')
const bodyparser = require('body-parser')
const session = require("express-session")
const {sequelize} = require("./config/db.js");
const SequilizeStore = require("connect-session-sequelize")(session.Store)
const routerAuthRegDashboard = require('./routes/account.js')
const usersController = require("./controllers/usersController");



const app = express()

app.use(bodyparser.json())
app.use(express.json())
app.use(cors())

let sessionStore = new SequilizeStore({ //создаем sessionStore в бд
    db: sequelize,
    checkExpirationInterval: 60 * 60 * 1000,
    expiration: 7 * 24 * 60 * 60 * 1000
})

app.use(
    session({ //говорим серверу выдавать куки с idSessions
        secret: "keyboard cat",
        saveUninitialized: true,
        store: sessionStore, //указываем. где будут храниться сессии на сервере
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000
        },
        resave: false, // we support the touch method so per the express-session docs this should be set to false
        proxy: true, // if you do SSL outside of node.
    })
);
sessionStore.sync()

app.use(routerAuthRegDashboard)

const passport = require('./config/passport').passport
app.use(passport.initialize())
app.use(passport.session()) //serialize , deserialize


app.listen(9000, () => {
    console.log("Запустили")
})
