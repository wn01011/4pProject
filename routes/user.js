const { Router } = require("express");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
//const db = require("../models/index.js");

const router = Router();

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
  .post((req, res) => {
    res.send();
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

// db.userdb.sequelize
//   .sync({ force: false })
//   // db 서버와 연결한다, force는 설정된 테이블을 강제로 생성한다.
//   // 우리가 express 서버에서 설정한 테이블 데이터와 실제 DB서버의 테이블 데이터가 다를 경우에 서버의 테이블을 새로 생성하기 위해 사용한다.
//   .then((data) => {
//     console.log(`db connected`);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// userdb create 양식

// db.userdb.UserTable.create({
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
