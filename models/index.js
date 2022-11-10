// 여기는 DB에 연동될 모델 스크립트입니다.

"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const UserTable = require("./user.js");
const SampleTable = require("./sample.js");
const ProductTable = require("./product.js");
const AskanswerTable = require("./askanswer.js");
const ProductaskTable = require("./productask.js");
const NoticeTable = require("./notice.js");
const ReviewTable = require("./review.js");
const CartTable = require("./cart.js");
const OrderTable = require("./order.js");

const db = {
  UserTable,
  SampleTable,
  ProductTable,
  AskanswerTable,
  ProductaskTable,
  NoticeTable,
  ReviewTable,
  CartTable,
  OrderTable,
};

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
AskanswerTable.init(sequelize);
ProductaskTable.init(sequelize);
NoticeTable.init(sequelize);
ReviewTable.init(sequelize);
CartTable.init(sequelize);
OrderTable.init(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
module.exports = db;
