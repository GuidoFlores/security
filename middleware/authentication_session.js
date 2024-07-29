 /* Autenticación */

 var authenticateSession = (req, res, next) => {
    if(req.session.loggedin) {
        return next()
    } else{
        return res.redirect("/")
    }
}

module.exports = authenticateSession;