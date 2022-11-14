const { Router } = require("express");
const db = require("../models/index.js");
const fs = require("fs");
const path = require("path");
const { sequelize, ProductaskTable } = require("../models/index.js");
const router = Router();
const seq = require("sequelize");
const { send } = require("process");

console.log("관리자페이지 라우트 안이다!!!!!!");
// "/api/adminpage"

router // 상품 목록
  .route("/product")
  .get(async (req, res) => {
    res.send();
  }) //{status: 200, list: adproductPL.slice(5 * (req.query.count - 1)),
  // maxCount: parseInt(5 * req.query.count)}
  .post(async (req, res) => {
    const adminSendProduct = [];
    const data = await db.ProductTable.findAll();
    data.forEach((item) => {
      adminSendProduct.push(item.dataValues);
    });
    res.send(adminSendProduct);
  });

// router // 카테고리 관리

// router // 주문 내역
router
  .route("/order")
  .get(async (req, res) => {
    res.send();
  })
  .post(async (req, res) => {
    const adminSendOrder = [];
    const data = await db.OrderTable.findAll();
    data.forEach((item) => {
      adminSendOrder.push(item.dataValues);
    });
    res.send(adminSendOrder);
  });

// router // 배송 관리
router
  .route("/delivery")
  .get(async (req, res) => {
    res.send();
  })
  .post(async (req, res) => {
    const data = await db.OrderTable.findAll().then((data) => {
      res.send(data);
    });
  });

router // 회원 목록
  .route("/user")
  .get((req, res) => {
    res.send();
  })
  .post(async (req, res) => {
    const adminSendUser = [];
    const data = await db.UserTable.findAll();
    data.forEach((item) => {
      adminSendUser.push(item.dataValues);
    });
    res.send(adminSendUser);
  });

router // 문의 관리
  .route("/qna")
  .get((req, res) => {
    res.send();
  })
  .post(async (req, res) => {
    const adminSendAsk = [];
    const data = await db.ProductaskTable.findAll();
    data.forEach((item) => {
      adminSendAsk.push(item.dataValues);
    });
    res.send(adminSendAsk);
  });

router // 리뷰 관리
  .route("/review")
  .get((req, res) => {
    res.send();
  })
  .post(async (req, res) => {
    const adminSendReview = [];
    const data = await db.ReviewTable.findAll();
    data.forEach((item) => {
      adminSendReview.push(item.dataValues);
    });
    res.send(adminSendReview);
  });

router.route("/qnaAnswer").post((req, res) => {
  db.ProductaskTable.findOne({ where: { id: req.body.id } }).then((data) => {
    db.ProductaskTable.update(
      { answerText: req.body.text, isAnswer: 1 },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then((data) => {
      res.send(data);
    });
  });
});

module.exports = router;
