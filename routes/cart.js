const { Router } = require("express");
const db = require("../models/index.js");
const router = Router();

router.route("/cartlist").post(async (req, res) => {
  console.log("/cartlist 진입");
  const tempList = await db.CartTable.findAll({
    where: {
      userId: req.body.userid,
    },
  });
  console.log("tempList : ", tempList);
  res.send({ tempList: tempList });
});

router.route("/address").post(async (req, res) => {
  const tempAddress = await db.UserTable.findOne({
    where: {
      user_id: req.body.userid,
    },
  });
  console.log("tempAddress : ", tempAddress);
  console.log("tempAddress : ", tempAddress.address);
  res.send({ address: tempAddress.address });
});

module.exports = router;
