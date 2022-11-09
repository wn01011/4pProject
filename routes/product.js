const { Router } = require("express");
const db = require("../models/index.js");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../models/index.js");
const router = Router();
const seq = require("sequelize");
const op = seq.Op;

console.log("프로덕트 라우트 안이다!!!!!!");
// "/api/product"
// ======== DB랑 연결해죠 ========
router
  .route("/")
  .get((req, res) => {
    res.send();
  })
  .post((req, res) => {
    const tempSend = [];
    db.ProductTable.findAll().then((data) => {
      data.forEach((item) => {
        if (
          Object.values(item.dataValues.category[0]).includes(
            `${req.body.data}`
          )
        ) {
          tempSend.push(item.dataValues);
        }
      });
      res.send(tempSend);
    });
  });

// ======== 채소 연결해죠 ========
router.route("/category").post((req, res) => {
  const tempVegi = [];
  db.ProductTable.findAll().then((data) => {
    data.forEach((item) => {
      if (
        Object.values(item.dataValues.category[0]).includes(`${req.body.data}`)
      ) {
        tempVegi.push(item.dataValues);
      }
    });
    res.send(tempVegi);
  });
});

// // ======== 과일 연결해죠 ========
// router.route("/fruit").post((req, res) => {
//   const tempVegi = [];
//   db.ProductTable.findAll().then((data) => {
//     data.forEach((item) => {
//       if (
//         Object.values(item.dataValues.category[0]).includes(`${req.body.data}`)
//       ) {
//         tempVegi.push(item.dataValues);
//       }
//     });
//     res.send(tempVegi);
//   });
// });
// // ======== 수산 연결해죠 ========
// router.route("/fish").post((req, res) => {
//   const tempVegi = [];
//   db.ProductTable.findAll().then((data) => {
//     data.forEach((item) => {
//       if (
//         Object.values(item.dataValues.category[0]).includes(`${req.body.data}`)
//       ) {
//         tempVegi.push(item.dataValues);
//       }
//     });
//     res.send(tempVegi);
//   });
// });

// // ======== 정육 연결해죠 ========
// router.route("/gogi").post((req, res) => {
//   const tempVegi = [];
//   db.ProductTable.findAll().then((data) => {
//     data.forEach((item) => {
//       if (
//         Object.values(item.dataValues.category[0]).includes(`${req.body.data}`)
//       ) {
//         tempVegi.push(item.dataValues);
//       }
//     });
//     res.send(tempVegi);
//   });
// });

// // ======== 국 연결해죠 ========
// router.route("/gug").post((req, res) => {
//   const tempVegi = [];
//   db.ProductTable.findAll().then((data) => {
//     data.forEach((item) => {
//       if (
//         Object.values(item.dataValues.category[0]).includes(`${req.body.data}`)
//       ) {
//         tempVegi.push(item.dataValues);
//       }
//     });
//     res.send(tempVegi);
//   });
// });

// // ======== 샐러드 연결해죠 ========
// router.route("/salad").post((req, res) => {
//   const tempVegi = [];
//   db.ProductTable.findAll().then((data) => {
//     data.forEach((item) => {
//       if (
//         Object.values(item.dataValues.category[0]).includes(`${req.body.data}`)
//       ) {
//         tempVegi.push(item.dataValues);
//       }
//     });
//     res.send(tempVegi);
//   });
// });

// // ======== 면 연결해죠 ========
// router.route("/noodle").post((req, res) => {
//   const tempVegi = [];
//   db.ProductTable.findAll().then((data) => {
//     data.forEach((item) => {
//       if (
//         Object.values(item.dataValues.category[0]).includes(`${req.body.data}`)
//       ) {
//         tempVegi.push(item.dataValues);
//       }
//     });
//     res.send(tempVegi);
//   });
// });

// // ======== 생수 연결해죠 ========
// router.route("/drink").post((req, res) => {
//   const tempVegi = [];
//   db.ProductTable.findAll().then((data) => {
//     data.forEach((item) => {
//       if (
//         Object.values(item.dataValues.category[0]).includes(`${req.body.data}`)
//       ) {
//         tempVegi.push(item.dataValues);
//       }
//     });
//     res.send(tempVegi);
router.route("/productReview").post((req, res) => {
  const tempSend = [];
  console.log(req.body.productName);
  db.ReviewTable.findAll({
    where: {
      productName: req.body.productName,
    },
  }).then((data) => {
    res.send(data);
  });
});

// router.get("/category", async (req, res) => {
//   const tempItem = await db.ProductTable.findAll()({
//     where: {
//       category: item.dataValues.category[0],
//     },
//   });
// });

// product.json 파일 넣는 곳
// fs.readFile("./product.json", "utf-8", function (err, data) {
// if (err) {
// console.error(err.message);
// } else {
// if (data) {
// JSON.parse(data).forEach((item) => {
// try {
// db.ProductTable.create(item);
// } catch (err) {
// console.error(err);
// }
// });
// }
// }
// });

async function setImages() {
  let len = 0;
  await fs.readdir("./Images", (err, datas) => {
    len = datas.length;
    for (let i = 1; i <= len; ++i) {
      router.get(`/download${i}`, (req, res) => {
        fs.readFile("./Images/" + i + ".jpg", (err, data) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        });
      });
    }
  });
}
setImages();

// 이미지 인덱스로 등록하기
// async function setImages(idx) {
//   let len = 0;
//   await fs.readdir("./Images", (err, datas) => {
//     len = datas.length;
//     router.get(`/download${idx}`, (req, res) => {
//       fs.readFile("./Images/" + idx + ".jpg", (err, data) => {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(data);
//       });
//     });
//   });
// }

// productdb create 양식

// db.ProductTable.create({
//   img: "1",
//   manufacturer: "브로드카세",
//   name: "부드러운 비엔나 쿠키 4종",
//   price: 5500,
//   description: "버터 풍미의 쿠키와 부드러운 여유",
//   delivery: "샛별배송",
//   seller: "컬리",
//   package: "상온(종이포장)",
//   unit: "1봉",
//   weight: "100g",
//   origin: "상세페이지 별도 표기",
//   allergy: "밀, 우유, 난류",
//   category: [{ 0: "쿠키" }],
// });

// userdb select 양식

// db.userdb.UserTable.findOne({ where: { id: 1 } })
//   .then((data) => {
//     console.log(data.dataValues);
//   })
//   .catch((err) => console.error(err));

module.exports = router;
