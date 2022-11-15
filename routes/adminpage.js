const { Router } = require("express");
const db = require("../models/index.js");
const fs = require("fs");
const path = require("path");
const { sequelize, ProductaskTable } = require("../models/index.js");
const router = Router();
const seq = require("sequelize");
const { send } = require("process");

// "/api/adminpage"

router // 상품 목록
  .route("/product")
  .get(async (req, res) => {
    res.send();
  })
  .post(async (req, res) => {
    const adminSendProduct = [];
    const data = await db.ProductTable.findAll();
    data.forEach((item) => {
      adminSendProduct.push(item.dataValues);
    });
    res.send(adminSendProduct);
  });

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

router
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

router
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

router
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
