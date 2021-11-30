const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/userModel.js")(sequelize, Sequelize);
db.role = require("../models/roleModel.js")(sequelize, Sequelize);
db.auto = require("../models/autoModel.js")(sequelize, Sequelize);
db.orders = require("../models/orderModel.js")(sequelize, Sequelize);
db.fact = require("../models/factModel.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshModel.js")(sequelize, Sequelize);


db.user.hasOne(db.fact, { onDelete: "cascade"})


db.auto.belongsToMany(db.user,{
  through: "orders",
  foreignKey: "autoId",
  otherKey: "userId"
})

db.user.belongsToMany(db.auto,{
  through: "orders",
  foreignKey: "userId",
  otherKey: "autoId"
})

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "autoId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id'
});

db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});

db.ROLES = ["user", "admin"];

module.exports = db;