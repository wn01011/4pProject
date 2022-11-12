const { Router } = require("express");
const crypto = require("crypto-js");
const db = require("../models/index.js");
const router = Router();

// "/api/myinfo"

router.route("/orderhistory").post(async (req, res) => {
  console.log("/orderhistory 라우터 접근");
  console.log("req.body.userid : ", req.body.userid);
  let orderSave = [];
  let imgList = [];
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
    imgList.push(imgBox.img);
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

router.route("/getInquire").post(async (req, res) => {
  console.log("/getInquire 라우터 접근");
  console.log("getInquire req.body.userid : ", req.body.userid);
  const tempInquire = await db.ProductaskTable.findAll({
    where: {
      userId: req.body.userid,
    },
  });
  console.log("getInquire : ", tempInquire);
  res.send({ inquireList: tempInquire });
});

router.route("/update").post((req, res) => {
  console.log("/update 라우터 접근");
  console.log("req.body", req.body);
  const updateData = db.UserTable.update(
    {
      pw: crypto.SHA256(req.body.pw).toString(),
      name: req.body.name,
      isManager: 0,
      address: req.body.address,
      gender: req.body.gender,
      birthday: `${req.body.birthday.year}-${req.body.birthday.month}-${req.body.birthday.day}`,
    },
    {
      where: {
        userId: req.body.id,
      },
    }
  );
  res.send({ updateData: updateData, status: 200 });
});

router.route("/").post(async (req, res) => {
  console.log(" / 라우터 접근");
  res.send({ list: tempNoticeList });
});

module.exports = router;
