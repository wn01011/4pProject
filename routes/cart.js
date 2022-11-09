const { Router } = require("express");
const db = require("../models/index.js");
const router = Router();

router.route("/address").post(async (req, res) => {
  const tempAddress = await db.UserTable.findOne({
    where: {
      userid: req.body.userid,
    },
  });
  res.send({ address: tempAddress });
});

module.exports = router;
