var DataTypes = require("sequelize").DataTypes;
var _roles = require("./roles");
var _users = require("./users");
var _users_roles = require("./users_roles");

function initModels(sequelize) {
  var roles = _roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var users_roles = _users_roles(sequelize, DataTypes);

  users_roles.belongsTo(roles, { as: "roles_idrole_role", foreignKey: "roles_idrole"});
  roles.hasMany(users_roles, { as: "users_roles", foreignKey: "roles_idrole"});
  users_roles.belongsTo(users, { as: "users_iduser_user", foreignKey: "users_iduser"});
  users.hasMany(users_roles, { as: "users_roles", foreignKey: "users_iduser"});

  return {
    roles,
    users,
    users_roles,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
