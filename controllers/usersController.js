let genericCrud  = require('./genericController.js')
let User = require ('../model/users.js');
const genPassword = require("../security_stuff/pswrd").genPassword;

const usersController = genericCrud(User)

usersController.create = async (req, res) => {
    const isAlreadyExistAccount = await usersController.getUserByEmail(req, res);
    if (isAlreadyExistAccount.length !== 0) {
        return res.status(409).send()
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


usersController.getUserByEmail= async (req, res) => {
    let email = req.body.email;
    const item = User.findAll({
        where: {
            email: email
        }
    })
    return item;
}

module.exports = usersController;