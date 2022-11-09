const { Router } = require("express");
const db = require("../models/index.js");
const fs = require("fs");
const path = require("path");
const { rejects } = require("assert");
const router = Router();

// "/api/notice"
router
  .route("/")
  .get((req, res) => {
    res.send();
  })
  .post((req, res) => {
    res.send("post로 요청을 보냈군요?");
  });

router
  .route("/askRequest")
  .get((req, res) => {
    res.send();
  })
  .post((req, res) => {
    db.AskanswerTable.create({
      userId: req.body.userId,
      name: req.body.name,
      text: req.body.text,
      isAnswer: 0,
    });
    res.send("create fin");
  });

router
  .route("/askanswer")
  .get((req, res) => {
    res.send();
  })
  .post(async (req, res) => {
    //   db.AskanswerTable.create({
    //     userId: req.body.userId,
    //     name: req.body.name,
    //     isAnswer: 0,
    //   });
    //   res.send({
    //     userId: req.body.userId,
    //     name: req.body.name,
    //     isAnswer: 0,
    //     createdDate: getToday(),
    //   });
    if (req.body.userId) {
      const tempData = await db.AskanswerTable.findAll({
        where: { userId: req.body.userId.toString() },
      });
      res.send(tempData);
    } else {
      res.send();
    }
  });

router.route("/productask").post((req, res) => {
  db.ProductaskTable.findAll({
    where: { product_name: req.body.productName },
  }).then((data) => {
    res.send(data);
  });
});

router.route("/modalask").post((req, res) => {
  db.ProductaskTable.create({
    userId: req.body.userId,
    productName: req.body.productName,
    name: req.body.name,
    text: req.body.text,
    answerText: req.body.answerText,
    isAnswer: req.body.isAnswer,
  }).then((data) => {
    res.send(data);
  });
});

function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "." + month + "." + day;
}

function getAskAnswerTable(userId) {
  db.AskanswerTable.findAll({
    where: { userId: userId.toString() },
  }).then((data) => {
    console.log(data);
    return data;
  });
}
// askanswer create 양식

// db.AskanswerTable.create({
//   userId: "1",
//   name: "내가유저다",
//   isAnswer: 0,
// });

// userdb select 양식

// db.userdb.UserTable.findOne({ where: { id: 1 } })
//   .then((data) => {
//     console.log(data.dataValues);
//   })
//   .catch((err) => console.error(err));

module.exports = router;
