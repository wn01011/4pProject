const { Router } = require("express");
const db = require("../models/index.js");
const router = Router();

router.route("/").post(async (req, res) => {
  const tempNoticeList = await db.NoticeTable.findAll({
    order: [["id", "ASC"]],
  });
  res.send({ list: tempNoticeList });
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
    return data;
  });
}

module.exports = router;
