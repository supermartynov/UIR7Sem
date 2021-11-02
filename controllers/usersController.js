let genericCrud  = require('./genericController.js')
let User = require ('../model/users.js');
let bcrypt = require('bcrypt');

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

module.exports = usersController;