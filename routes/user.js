const { Router } = require("express");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const dotenv = require("dotenv");
const router = Router();

dotenv.config();
// 유저 정보 일단 담아둘 곳
const users = [];

// "/api/user"
router
  .route("/")
  .get((req, res) => {
    res.send();
  })
  .post((req, res) => {
    res.send("post로 요청을 보냈군요?");
  });
// 로그인 들어왔을 때 예시
router
  .route("/login")
  .get((req, res) => {
    res.send();
  })
  .post(async (req, res) => {
    console.log("받았어", req.body);
    try {
      const tempUser = await db.findOne({ where: { userId: req.body.id } });
      // db
      if (!tempUser) {
        res.status(500);
        res.send({ message: "no ID" });
        return;
      }
      if (tempUser.userPw == crypto.SHA256(req.body.pw).toString()) {
        console.log();
        const expireTime = "20";
        res.cookie("clearLogin", createJwt(tempUser.id, process.env.ADMIN_PW), {
          expires: expireTime + "s",
        });
        res.send({
          status: 200,
          id: tempUser.id,
          name: tempUser.name,
        });
        return;
      }
      res.status(500);
      res.send({ message: "wrong password" });
    } catch {
      res.status(500);
      res.send(error);
    }
  });

router
  .route("/regist")
  .get((req, res) => {
    res.send();
  })
  .post((req, res) => {
    console.log(req.body);
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

// 로그인에 대한 토큰일 필요해 보여서 토큰 여기에 생성
// 토큰에 대한 키.. 일단 만들어둠
let jwtKey = "abcd";

/*****************************/
// jwt 생성 함수

function createJwt(name, key) {
  // JWT 토큰 만료시간 지정
  const expireTime = "20";
  // 토큰 생성
  // sign(토큰 이름, 키, 헤더(옵션))
  const tempJwt = jwt.sign({ name: `${name}` }, key, {
    algorithm: "HS256",
    expiresIn: `${expireTime}s`,
    issuer: "kjk",
  });
  return tempJwt;
}
/*****************************/
// userdb create 양식

// db.UserTable.create({
//   userId: "0",
//   pw: "1234",
//   name: "kjk",
//   isManager: 0,
// });

// userdb select 양식

// db.UserTable.findOne({ where: { id: 1 } })
//   .then((data) => {
//     console.log(data.dataValues);
//   })
//   .catch((err) => console.error(err));

// userdb create 양식

// db.UserTable.create({
//   userId: "0",
//   pw: "1234",
//   name: "kjk",
//   isManager: 0,
// });

// userdb select 양식

// db.userdb.UserTable.findOne({ where: { id: 1 } })
//   .then((data) => {
//     console.log(data.dataValues);
//   })
//   .catch((err) => console.error(err));

module.exports = router;
