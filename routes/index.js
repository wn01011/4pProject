// 라우터 집합소
const router = require("express").Router();
const user = require("./user.js");
const product = require("./product.js");

router.use("/", (req, res, next) => {
  console.log("routes/index.js : " + req.url);
  next();
});

router.use("/user", user);
router.use("/product", product);

module.exports = router;
