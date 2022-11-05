const { Router } = require("express");
const db = require("../models/index.js");
const fs = require("fs");
const path = require("path");
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
  .route("/askanswer")
  .get((req, res) => {
    res.send();
  })
  .post((req, res) => {
    console.log(req.body);
    try {
      db.AskanswerTable.create({
        userId: req.body.userId,
        name: req.body.name,
        isAnswer: 0,
      });
      res.send({
        userId: req.body.userId,
        name: req.body.name,
        isAnswer: 0,
        createData: getToday(),
      });
    } catch {
      res.send("db askanswer 에러났다");
    }
  });

function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "." + month + "." + day;
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
