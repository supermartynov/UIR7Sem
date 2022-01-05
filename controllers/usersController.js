let genericCrud  = require('./genericController.js')
let User = require ('../model/users.js');
const genPassword = require("../authentication/pswrd").genPassword;
const mailError = require("../authentication/validation/mailValidation").mailError
const passwordLengthError = require("../authentication/validation/passwordValidation").passwordLengthError
const passwordConfirmError = require("../authentication/validation/passwordValidation").passwordConfirmError
const usersController = genericCrud(User)

usersController.create = async (req, res) => {
    const isAlreadyExistAccount = await usersController.getUserByEmail(req, res);
    const emailErrors = mailError(req.body.email)
    const passwordLengthErrors = passwordLengthError(req.body.password)
    const passwordConfirmErrors2 = passwordConfirmError(req.body.password, req.body['password_confirm'])
    if (isAlreadyExistAccount.length !== 0 || emailErrors || passwordLengthErrors || passwordConfirmErrors2) {
        return res.status(409).send()
    }
    delete req.body.password_confirm
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