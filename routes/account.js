import Router from 'express-promise-router'
import {usersController} from '../controllers/index.js'
import {User} from "../model/users.js";

const routerAuthRegDashboard = Router()

routerAuthRegDashboard.route("/account/reg").post(usersController.create);

routerAuthRegDashboard.route("/account/auth").get((req, res) => {
    res.send('Страница авторизации')
})
routerAuthRegDashboard.route("/account/dashboard").get((req, res) => {
    res.send('Страница  кабинета пользователя')
})

export {routerAuthRegDashboard}
