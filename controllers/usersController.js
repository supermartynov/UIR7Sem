import {genericCrud} from './genericController.js'
import {User} from '../model/users.js'
import bcrypt from 'bcrypt'

const usersController = genericCrud(User)
usersController.GetUserByLogin = async ({ params: {login}}, res) => {
    try {
        const item = User.findAll({
            where: {
                login: login
            }
        })
        res.status(200).send(item)
    } catch (err) {
        res.status(400).send(err)
    }
}

usersController.create = async ({body}, res) => {
    try {
        bcrypt.genSalt(10, (err, sault) => {
            bcrypt.hash(body.password, sault, async (err, hash) => {
                if (err) throw err;
                else {
                    body.password = hash;
                    await User.create(body)
                }
            })
        })
        res.status(200).send(body)
    } catch (err) {
        res.status(400).send(err)
    }
}

export {usersController}