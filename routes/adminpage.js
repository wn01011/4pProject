const { Router } = require("express");
const db = require("../models/index.js");
const fs = require("fs");
const path = require("path");
const { sequelize, ProductaskTable } = require("../models/index.js");
const router = Router();
const seq = require("sequelize");

console.log("관리자페이지 라우트 안이다!!!!!!");
// "/api/adminpage"

// router // 상품 목록

// router // 카테고리 관리

// router // 주문 내역

// router // 배송 관리

// router // 회원 목록

router // 문의 관리
  .route("/qna")
  .get((req, res) => {
    res.send();
  })
  .post((req, res) => {
    const adminSendAsk = [];
    db.ProductaskTable.findAll().then((data) => {
      data.forEach((item) => {
        console.log(item);
        adminSendAsk.push(item.dataValues);
      });
      console.log(data);
      res.send(adminSendAsk);
    });
  });

router // 리뷰 관리
  .route("/review")
  .get((req, res) => {
    res.send();
  })
  .post((req, res) => {
    const adminSendReview = [];
    db.ProductaskTable.findAll().then((data) => {
      data.forEach((item) => {
        console.log(item);
        adminSendAsk.push(item.dataValues);
      });
      console.log(data);
      res.send(adminSendAsk);
    });
  });

module.exports = router;
