import express from "express"
import cors from 'cors'
import bodyparser from 'body-parser'
import passport from 'passport'
import {routerAuthRegDashboard} from './routes/account.js'

const app = express()
app.use(bodyparser.json())
app.use(express.json())
app.use(cors())
app.use(routerAuthRegDashboard)

app.get("/",  (req, res) => {
    res.send("Главная страница")
})


app.listen(9000, () => {
    console.log("Запустили")
})



