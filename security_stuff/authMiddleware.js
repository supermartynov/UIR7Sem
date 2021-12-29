module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send("Вы не авторизованы")
    }
}
//fkmdflm