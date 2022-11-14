// 라우터 집합소
const router = require("express").Router();
const user = require("./user.js");
const product = require("./product.js");
const notice = require("./notice.js");
const audio = require("./audio.js");
const adminpage = require("./adminpage.js");
const cart = require("./cart.js");
const myinfo = require("./myinfo.js");
router.use("/", (req, res, next) => {
  console.log("routes/index.js : " + req.url);
  next();
});

router.use("/user", user);
router.use("/product", product);
router.use("/notice", notice);
router.use("/audio", audio);
router.use("/adminpage", adminpage);
router.use("/cart", cart);
router.use("/myinfo", myinfo);

module.exports = router;
