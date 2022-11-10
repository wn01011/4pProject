const { Router } = require("express");
const db = require("../models/index.js");
const router = Router();

router.route("/cartlist").post(async (req, res) => {
  console.log("userId:req.body.userid : ", req.body.userid);
  const tempList = await db.CartTable.findAll({
    where: {
      userId: req.body.userid,
    },
  });
  console.log("tempList : ", tempList);
  res.send({ list: tempList });
});
router.route("/delete").post(async (req, res) => {
  const tempDelete = await db.CartTable.destroy({
    where: { name: req.body.name },
  });
  res.end();
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
