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

router.route("/update").post(async (req, res) => {
  console.log("/update 라우터 접근");
  console.log("req.body", req.body);
  const updateData = await db.UserTable.update({
    userId: req.body.id,
    pw: crypto.SHA256(req.body.pw).toString(),
    name: req.body.name,
    isManager: 0,
    address: req.body.address,
    gender: req.body.gender,
    birthday: `${req.body.birthday.year}-${req.body.birthday.month}-${req.body.birthday.day}`,
  });
  res.send({ updateData: updateData });
});

router.route("/duplication").post(async (req, res) => {
  console.log("라우터에서 중복 체크 받음 : " + req.body.id);
  try {
    const tempId = await db.UserTable.findAll();
    let tempIdArr = Array.from(tempId);
    for (let i = 0; i < tempIdArr.length; i++) {
      if (tempId[i].dataValues.userId == req.body.id) {
        res.send({ status: 200, data: "exist Id" });
      }
    }
    res.send({ status: 400 });
  } catch (error) {
    console.error(error);
  }
});

router.route("/").post(async (req, res) => {
  console.log(" / 라우터 접근");
  res.send({ list: tempNoticeList });
});

module.exports = router;
