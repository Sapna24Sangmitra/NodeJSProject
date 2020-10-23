module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn && role != "user") {
        return res.redirect('/login');
    }
    next();
}