const { Router } = require("express");
const db = require("../models/index.js");
const fs = require("fs");
const path = require("path");
const { sequelize, ProductaskTable } = require("../models/index.js");
const router = Router();
const seq = require("sequelize");

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

router // 주문 내역
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

router // 배송 관리
  .route("/delivery")
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

router // 문의 답변 기능
  .route("/replyQna")
  .get((req, res) => {
    res.send();
  })
  .post(async (req, res) => {
    console.log("어디 오류인가ㅁㅁ");
    console.log("req.body : ", req.body);
    console.log("req.body.id : ", req.body.id);
    db.ProductaskTable.update(
      {
        answerText: req.body.answerText,
        isAnswer: 1,
      },
      {
        where: { id: req.body.id },
      }
    ).then(() => {
      console.log("어디냐");
      res.send({ answerText: req.body.answerText });
      console.log("어디 오류인가");
    });
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

module.exports = router;
