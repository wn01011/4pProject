const Sequelize = require("sequelize");

module.exports = class ProductTable extends Sequelize.Model {
  // static == class를 new 하지 않고 메서드를 불러온다.
  static init(sequelize) {
    return super.init(
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        img: { type: Sequelize.STRING(255), allowNull: true },
        manufacturer: { type: Sequelize.STRING(255), allowNull: true },
        name: { type: Sequelize.STRING(255), allowNull: true },
        price: { type: Sequelize.INTEGER, allowNull: true },
        description: { type: Sequelize.STRING(255), allowNull: true },
        delivery: { type: Sequelize.STRING(255), allowNull: true },
        seller: { type: Sequelize.STRING(255), allowNull: true },
        package: { type: Sequelize.STRING(255), allowNull: true },
        unit: { type: Sequelize.STRING(255), allowNull: true },
        weight: { type: Sequelize.STRING(255), allowNull: true },
        origin: { type: Sequelize.STRING(255), allowNull: true },
        allergy: { type: Sequelize.STRING(1024), allowNull: true },
        category: { type: Sequelize.JSON, allowNull: true },
      },
      {
        sequelize, // 기본
        timestamps: false,
        underscored: true, // 테이블과 컬럼명을 카멜 케이스로 수정
        modelName: "ProductTable", // Javascript에서 사용하는 테이블명
        tableName: "product_table", // MySQL에 있는 테이블명
        paranoid: false,
        charset: "utf8mb4", // 언어 포멧 설정
        collate: "utf8mb4_general_ci", // 언어 포멧 설정
      }
    );
  }

  static associate(db) {
    // 데이터 베이스 관계 설정에 필요함
  }
};
