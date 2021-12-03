let genericCrud  = require('./genericController.js')
let User = require ('../model/users.js');
const genPassword = require("../security_stuff/pswrd").genPassword;

const usersController = genericCrud(User)

usersController.create = async (req, res) => {
    let body = req.body;
    const saltHash = genPassword(body.password);
    body.salt = saltHash.salt;
    body.hash = saltHash.hash;
    try {
        const item = await User.create(body)
        res.redirect('/login');
        return res.status(200).send(item)
    } catch (err) {
        console.log(err)
        res.redirect('/login');
        return res.status(400).send(err)
    }
}

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

module.exports = usersController;