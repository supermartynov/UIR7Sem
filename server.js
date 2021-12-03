const express = require("express")
const cors = require('cors')
const session = require("express-session")
const {sequelize} = require("./config/db.js");
const passport = require("passport")
const SequilizeStore = require("connect-session-sequelize")(session.Store)
const routerAuthRegDashboard = require('./routes/accountRoutes.js')

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
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
        resave: false,
        proxy: true,
    })
);

sessionStore.sync()

require('./security_stuff/passport')(passport) //функция, в которой passport будет сказано использовать LocalStratrgy
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
})

app.use(routerAuthRegDashboard) //роуты можно стаивть только после use(passport)


app.listen(9000, () => {
    console.log("Запустили")
})
