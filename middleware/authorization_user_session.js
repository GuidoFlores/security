 /* Autorización */

 var authorizationSession = (req, res, next) => {
    if(req.session.role == 'user') {
        return next()
    } else{
        return res.redirect("/")
    }
}

module.exports = authorizationSession;