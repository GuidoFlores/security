var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  /* 1. Renderización de la vista crud.ejs */
  res.render('crud');
});

module.exports = router;
