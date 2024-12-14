function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/sign-in');
}

module.exports = {isLoggedIn};