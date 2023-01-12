const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize);
db.channels = require("./channel.model")(sequelize, Sequelize);
db.messages = require("./message.model")(sequelize, Sequelize);
db.roles = require("../models/role.model.js")(sequelize, Sequelize);


db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.roles.belongsToMany(db.channels, {
  through: "channel_roles",
  foreignKey: "roleId",
  otherKey: "channelId"
});
db.channels.belongsToMany(db.roles, {
  through: "channel_roles",
  foreignKey: "channelId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
