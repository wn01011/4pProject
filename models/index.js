// 여기는 DB에 연동될 모델 스크립트입니다.

"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const UserTable = require("./user.js");
const userdb = { UserTable };

const SampleTable = require("./sample.js");
const sampledb = { SampleTable };

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

userdb.sequelize = sequelize;
userdb.Sequelize = Sequelize;

sampledb.sequelize = sequelize;
sampledb.Sequelize = Sequelize;

UserTable.init(sequelize);
UserTable.associate(userdb);

SampleTable.init(sequelize);
SampleTable.associate(sampledb);

exports.userdb = userdb;
exports.sampledb = sampledb;
