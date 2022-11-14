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
  tempOrderhistoryList?.forEach((item, index) => {
    orderSave.push(tempOrderhistoryList[index].product);
  });
  console.log("orderSave : ", orderSave);
  for (let i = 0; i < orderSave.length; i++) {
    const imgBox = await db.ProductTable.findOne({
      where: {
        name: orderSave[i],
      },
    });
    if (imgBox?.img) imgList.push(imgBox?.img);
  }
  res.send({ imgList: imgList, orderList: tempOrderhistoryList });
});

router.route("/getReview").post(async (req, res) => {
  console.log("/getReview 라우터 접근");
  console.log("getReview req.body.userid", req.body.userid);
  const tempReview = await db.ReviewTable.findAll({
    where: {
      userId: req.body.userid,
    },
  });
  console.log("tempReview : ", tempReview);
  res.send({ reviewList: tempReview });
});
router.route("/setReview").post(async (req, res) => {
  const tempReview = await db.ReviewTable.create({
    userId: req.body.userid,
    productName: req.body.productName,
    text: req.body.text,
  });
  res.send();
});
router.route("/getInquire").post(async (req, res) => {
  console.log("/getInquire 라우터 접근");
  console.log("getInquire req.body.userid : ", req.body.userid);
  const tempInquire = await db.ProductaskTable.findAll({
    where: {
      userId: req.body.userid,
    },
  });
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
