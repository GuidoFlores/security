var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 1. Importe el módulo crypto */
let crypto = require('crypto');

/* 2. Cargue los modelos de acuerdo con la configuración de la conexión */
const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

/* POST user. */
/* 3. Cree el callback asíncrono que responda al método POST */
router.post('/login', async function (req, res, next) {

  /* 4. Desestructure los elementos en el cuerpo del requerimiento */
  let { username, password } = req.body

  /* 5. Verifique que username sea diferente de null, y que password sea diferente de null. */
  if (username != null && password != null) {

    try {

      /* 6. 
        Del modelo users, use el método findOne para encontrar un registro
        cuyo campo name sea igual que username
      */
      let userData = await models.users.findOne({
        where: {
          name: username
        }
      })

      /* 7. Verifique que userData sea diferente de null, y que userData.password sea diferente de null. */
      if (userData != null && userData.password != null) {

        /* 8. Divida userData.password por el símbolo "$", y use el primer elemento como SALT. */
        let salt = userData.password.split("$")[0]
        let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
        let passwordHash = salt + "$" + hash

        /* 9. Compare passwordHash y userData.password que sean iguales. */
        if (passwordHash === userData.password) {

          /* 1. Configuración de la expiración de la cookie */
          const options = {
            expires: new Date(
              Date.now() + (60 * 1000)
            )
          }

          /* 2. Cree la cookie 'username' con la variable user y la configuración de options  */
          res.cookie("username", username, options)
          /* 10. En caso de éxito, redirija a '/users' */
          res.redirect('/users');
        } else {
          /* 11. En caso de fallo, redirija a '/' */
          res.redirect('/');
        }
      } else {
        res.redirect('/');
      }

    } catch (error) {
      /* 12. En caso de error, retorne el estado 400 y el objeto error */
      res.status(400).send(error)
    }
  } else {
    res.redirect('/');
  }

});

module.exports = router;
