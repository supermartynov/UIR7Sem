let genericCrud  = require('./genericController.js')
let User = require ('../model/users.js');
const genPassword = require("../security_stuff/pswrd").genPassword;

const usersController = genericCrud(User)

usersController.create = async (req, res) => {
    console.log(req.body.username)
    if (await usersController.getUserByLogin(req, res)
        || await usersController.getUserByEmail(req, res))
    {
        return res.status(422)
    }
    let body = req.body;
    const saltHash = genPassword(body.password);
    body.salt = saltHash.salt;
    body.hash = saltHash.hash;
    try {
        const item = await User.create(body)
        return res.status(200).send(item)
    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
}

usersController.getUserByLogin = async (req, res) => {
    let username = req.body.username
    try {
        const item = User.findAll({
            where: {
                username: username
            }
        })
        res.status(200).send(item)
    } catch (err) {
        res.status(400).send(err)
    }
}

usersController.getUserByEmail= async (req, res) => {
    let email = req.body.email;
    try {
        const item = User.findAll({
            where: {
                email: email
            }
        })
        res.status(200).send(item)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = usersController;