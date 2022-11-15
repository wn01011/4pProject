const { Router } = require("express");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const dotenv = require("dotenv");
const router = Router();

dotenv.config();

// "/api/user"
router
  .route("/")
  .get((req, res) => {
    res.send();
  })
  .post((req, res) => {
    res.send("post로 요청을 보냈군요?");
  });

router.route("/login").post(async (req, res) => {
  try {
    const tempUser = await db.UserTable.findOne({
      where: { userId: req.body.id },
    });
    if (!tempUser) {
      if (
        req.body.id == process.env.ADMIN_ID &&
        req.body.pw == process.env.ADMIN_PW
      ) {
        res.cookie(req.body.id, "관리자다", {
          expires: new Date(Date.now() + 1000 * 1000),
        });
        res.send({ status: 200, id: req.body.id, name: "관리자" });
        return;
      } else {
        res.send({ status: 402, message: "no ID" });
      }
    }
    if (tempUser.pw == crypto.SHA256(req.body.pw).toString()) {
      let currToken = createJwt(tempUser.userId, process.env.ADMIN_PW);
      let currTokenVerified = jwt.verify(currToken, process.env.ADMIN_PW);
      res.cookie(tempUser.userId, currToken, {
        expires: new Date(
          Date.now() + 1000 * (currTokenVerified.exp - currTokenVerified.iat)
        ),
      });
      res.send({
        status: 200,
        id: tempUser.id,
        name: tempUser.name,
      });
      return;
    } else {
      res.send({ status: 402, message: "wrong password", name: tempUser.name });
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie(req.body.userId);
  res.send();
});

router.route("/deduplication").post(async (req, res) => {
  try {
    const tempId = await db.UserTable.findAll();
    let tempIdArr = Array.from(tempId);
    for (let i = 0; i < tempIdArr.length; i++) {
      if (tempId[i].dataValues.userId == req.body.id) {
        res.send({ status: 401, data: "exist Id" });
      }
      if (
        i == tempIdArr.length - 1 &&
        tempId[i].dataValues.userId != req.body.id
      ) {
        res.send({ status: 200, data: "available" });
      }
    }
  } catch (error) {
    console.error(error);
  }
});

router.route("/regist").post((req, res) => {
  db.UserTable.create({
    userId: req.body.id,
    pw: crypto.SHA256(req.body.pw).toString(),
    name: req.body.name,
    isManager: 0,
    address: req.body.address,
    gender: req.body.gender,
    birthday: `${req.body.birthday.year}-${req.body.birthday.month}-${req.body.birthday.day}`,
  }).then((data) => {
    res.send(data);
  });
});

router.route("/getAddress").post(async (req, res) => {
  const data = await db.UserTable.findOne({
    where: { userId: req.body.id },
  });
  res.send({ address: data.address });
});

router.route("/setAddress").post(async (req, res) => {
  await db.UserTable.update(
    {
      address: req.body.address,
    },
    {
      where: {
        userId: req.body.userid,
      },
    }
  );
  res.send({});
});
let jwtKey = "abcd";

function createJwt(name, key) {
  const expireTime = "20";
  const tempJwt = jwt.sign({ name: `${name}` }, key, {
    algorithm: "HS256",
    expiresIn: `${expireTime}m`,
    issuer: "kjk",
  });
  return tempJwt;
}

router.route("/getMyDelivery").post((req, res) => {
  if (req.body.userId) {
    db.OrderTable.findAll({
      where: {
        userId: req.body.userId,
      },
    }).then((data) => {
      res.send(data);
    });
  } else {
    res.send(data);
  }
});

module.exports = router;
