// 여기는 DB에 연동될 모델 스크립트입니다.

"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const UserTable = require("./user.js");
const SampleTable = require("./sample.js");
const ProductTable = require("./product.js");
const db = { UserTable, SampleTable, ProductTable };

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

UserTable.init(sequelize);
ProductTable.init(sequelize);
SampleTable.init(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
