var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const tokenSecret = process.env.TOKEN_SECRET;

router.get('/', async function (req, res, next) {
    const username = req.cookies['username'];

    const token = jwt.sign({ username: username }, tokenSecret , { expiresIn: '1h' });

    res.render('token', { username: username, token: token, title: 'Token' });
});

module.exports = router;