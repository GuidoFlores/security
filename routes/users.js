var express = require('express');
 var router = express.Router();

 
 /* 1. Importe el módulo crypto */
 let crypto = require('crypto');

 /* 1. Cargue los modelos de acuerdo con la configuración de la conexión */
 const sequelize = require('../models/index.js').sequelize;
 var initModels = require("../models/init-models");
 var models = initModels( sequelize );  

 /* GET users listing. */
 /* 2. Convierta el callback en asíncrono */
 router.get('/', async function(req, res, next) {

   /* 3. Uso del método findAll */
   let usersCollection = await models.users.findAll({ })
   let rolesCollection = await models.roles.findAll({ })


   /* 4. Paso de parámetros a la vista */
   res.render('crud', { title: 'CRUD with users', usersArray: usersCollection, rolesArray: rolesCollection });

 });

 /* POST user. */
 /* 2. Cree el callback asíncrono que responda al método POST */
 router.post('/', async (req, res) => {

  /* 3. Desestructure los elementos en el cuerpo del requerimiento */
  let { name, password, idrole } = req.body;

  try {

    /* 4. Utilice la variable SALT para encriptar la variable password. */
    let salt = process.env.SALT
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    let passwordHash = salt + "$" + hash

    /* 5. Guarde el registro mediante el método create */
    let user = await models.users.create({ name: name, password: passwordHash })

    /* 6. Redireccione a la ruta con la vista principal '/users' */
    res.redirect('/users')

  } catch (error) {

    res.status(400).send(error)

  }

})

module.exports = router;
