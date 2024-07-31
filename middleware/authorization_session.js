/* Autorización */

var authorizationSession = (req, res, next) => {
    if(process.env.ALL_GRANTED.includes(req.session.role)) {
        return next()
    } else{
        return res.redirect("/")
    }
}

module.exports = authorizationSession;