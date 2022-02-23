const crtypto = require('crypto')

function genPassword(password){
    let salt = crtypto.randomBytes(32).toString('hex');
    let genHash = crtypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');

    return {
        salt: salt,
        hash: genHash
    }
}

function validPassword(password, hash, salt){
    let hashVerify = crtypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    return hash === hashVerify;
}

module.exports.validPassword = validPassword
module.exports.genPassword = genPassword