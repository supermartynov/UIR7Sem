let express = require("express")
let cors = require('cors')
let bodyparser = require('body-parser')
let session = require("express-session")
let passport = require('passport')
let crypto = require('crypto')
let localStrategy = require("./config/passport.js");
let {sequelize} = require("./config/db.js");
let SequilizeStore = require("connect-session-sequelize")(session.Store)
let routerAuthRegDashboard = require('./routes/account.js')


require("dotenv").config()

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
app.use(passport.initialize());
app.use(passport.session())
localStrategy(passport)

app.get("/", (req, res) => {
    res.send(`Главная страница, вы сюда заходили`)
})

app.listen(9000, () => {
    console.log("Запустили")
})
