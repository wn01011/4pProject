const { Router } = require("express");
const db = require("../models/index.js");
const router = Router();

// "/api/myinfo"
router.route("/").post(async (req, res) => {
  console.log("라우터 접근");
  const tempNoticeList = await db.NoticeTable.findAll({
    order: [["id", "ASC"]],
  });
  console.log(tempNoticeList);
  res.send({ list: tempNoticeList });
});

router.route("/orderhistory").post(async (req, res) => {
  console.log("orderhistory 라우터 접근");
  console.log("req.body.userid : ", req.body.userid);
  const tempOrderhistoryList = await db.OrderTable.findAll({
    userId: req.body.userid,
  });
  console.log("tempOrderhistoryList : ", tempOrderhistoryList);
  res.send({ orderhistoryList: tempNoticeList });
});

function getAskAnswerTable(userId) {
  db.AskanswerTable.findAll({
    where: { userId: userId.toString() },
  }).then((data) => {
    console.log(data);
    return data;
  });
}
module.exports = router;
