const { Router } = require("express");
const db = require("../models/index.js");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../models/index.js");
const router = Router();
const seq = require("sequelize");

console.log("관리자페이지 라우트 안이다!!!!!!");
// "/api/adminpage"

// router // 최근 주문 내역
//   .route("/")
//   .get((req, res) => {
//     res.send();
//   })
//   .post((req, res) => {
//     res.send();
//   });

// router // 최근 리뷰 내역
//   .route("/")
//   .get((req, res) => {
//     res.send();
//   })
//   .post((req, res) => {
//     res.send();
//   });

// router // 상품 목록
//   .route("/")
//   .get((req, res) => {
//     res.send();
//   })
//   .post((req, res) => {
//     res.send();
//   });

// router // 카테고리 관리
//   .route("/")
//   .get((req, res) => {
//     res.send();
//   })
//   .post((req, res) => {
//     res.send();
//   });

// router // 주문 내역
//   .route("/")
//   .get((req, res) => {
//     res.send();
//   })
//   .post((req, res) => {
//     res.send();
//   });

// router // 배송 관리
//   .route("/")
//   .get((req, res) => {
//     res.send();
//   })
//   .post((req, res) => {
//     res.send();
//   });

// router // 회원 목록
//   .route("/")
//   .get((req, res) => {
//     res.send();
//   })
//   .post((req, res) => {
//     res.send();
//   });

router // 문의 관리
  .route("/qna")
  .get((req, res) => {
    res.send();
  })
  .post((req, res) => {
    const adminSendAsk = [];
    db.ProductaskTable.findAll().then((data) => {
      console.log(data);
      res.send(data);
    });
  });
// router // 리뷰 관리
//   .route("/")
//   .get((req, res) => {
//     res.send();
//   })
//   .post((req, res) => {
//     res.send();
//   });

module.exports = router;
