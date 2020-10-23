module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn && role != "admin") {
        return res.redirect('/login');
    }
    next();
}