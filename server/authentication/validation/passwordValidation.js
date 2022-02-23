module.exports = {
    passwordConfirmError : (password, password_confirm) => {
        if (password !== password_confirm) {
            return true
        }
        return false
    },
    passwordLengthError : (password) => {
        if (password.length < 5) {
            return true
        }
        return false
    }

}
