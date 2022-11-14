const { Router } = require("express");
const db = require("../models/index.js");
const router = Router();

router.route("/cartlist").post(async (req, res) => {
  const tempList = await db.CartTable.findAll({
    where: {
      userId: req.body.userid,
    },
  });
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
  res.send({ address: tempAddress.address });
});
router.route("/order").post(async (req, res) => {
  // req.body.orderlist.forEach(async (item, index) => {
  //   const aaa = {
  //     user_id: req.body.orderlist[index].userid,
  //     price: req.body.orderlist[index].price,
  //     product: req.body.orderlist[index].product,
  //     count: req.body.orderlist[index].count,
  //     address: req.body.orderlist[index].address,
  //   };
  //   console.log("aaa : ", aaa);
  // });

  req.body.orderlist.forEach(async (item, index) => {
    const tempOrder = await db.OrderTable.create({
      userId: req.body.orderlist[index].userid,
      price: req.body.orderlist[index].price,
      product: req.body.orderlist[index].product,
      count: req.body.orderlist[index].count,
      address: req.body.orderlist[index].address,
    });
  });
  await db.CartTable.destroy({
    where: { userId: req.body.orderlist[0].userid },
  });

  res.send();
});
module.exports = router;
