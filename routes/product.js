const { Router } = require("express");
const db = require("../models/index.js");
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../models/index.js");
const router = Router();
const seq = require("sequelize");
const { send } = require("process");
const op = seq.Op;

console.log("프로덕트 라우트 안이다!!!!!!");

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

// ======== 상품 뿌려죠 ========
router.route("/category").post((req, res) => {
  const tempVegi = [];
  const brandFilterAry = [];
  const priceFilterAry = [];
  db.ProductTable.findAll().then((data) => {
    data.forEach((item) => {
      if (
        Object.values(item.dataValues.category[0]).includes(`${req.body.data}`)
      ) {
        tempVegi.push(item.dataValues);
      }
    });
    if (req.body.brand.length > 0) {
      if (req.body.brand.includes(item.manufacturer)) brandFilterAry.push(item);
    } else {
      brandFilterAry.push(item);
    }
    switch (req.body.price) {
      case 0:
        brandFilterAry.forEach((item) => {
          if (item.price <= 2590) priceFilterAry.push(item);
        });
        res.send(priceFilterAry);
        break;
      case 1:
        brandFilterAry.forEach((item) => {
          if (item.price <= 3800 && item.price > 2590)
            priceFilterAry.push(item);
        });
        res.send(priceFilterAry);
        break;
      case 2:
        brandFilterAry.forEach((item) => {
          if (item.price <= 5490 && item.price > 3800)
            priceFilterAry.push(item);
        });
        res.send(priceFilterAry);
        break;
      case 3:
        brandFilterAry.forEach((item) => {
          if (item.price > 5490) priceFilterAry.push(item);
        });
        res.send(priceFilterAry);
        break;
      default:
        res.send(brandFilterAry);
        break;
    }
  });
});
router.route("/getImage").post(async (req, res) => {
  let imgList = [];
  for (let i = 0; i < req.body.data.length; i++) {
    const productBox = await db.ProductTable.findOne({
      where: {
        name: req.body.data[i],
      },
    });
    imgList.push(productBox.img);
  }
  res.send({ list: imgList });
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
// ----------- 상세페이지 보여죠 ------------
router.route("/item").post((req, res) => {
  const itemLink = req.body.itemLink;
  console.log(itemLink);
  db.ProductTable.findOne({ where: { img: itemLink } }).then((data) => {
    // console.log(data.dataValues);
    const itemData = data.dataValues;
    console.log(itemData);
    res.send(itemData);
  });
});

// ======= 상품 후기 ========
router.route("/productReview").post((req, res) => {
  const tempSend = [];
  // console.log(req.body.productName);
  db.ReviewTable.findAll({
    where: {
      productName: req.body.productName,
    },
  }).then((data) => {
    res.send(data);
  });
});

// product.json 파일 넣는 곳
// fs.readFile("./product.json", "utf-8", function (err, data) {
//   if (err) {
//     console.error(err.message);
//   } else {
//     if (data) {
//       JSON.parse(data).forEach((item) => {
//         try {
//           db.ProductTable.create(item);
//         } catch (err) {
//           console.error(err);
//         }
//       });
//     }
//   }
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

// =========검색기능이닷==========
router.route("/search").post((req, res) => {
  const sword = req.body.sword;
  const sendAry = [];
  const priceFilterAry = [];
  db.ProductTable.findAll().then((data) => {
    data.forEach((item) => {
      if (
        item.dataValues.name.match(sword) ||
        JSON.stringify(item.dataValues.category).toString().includes(sword) ||
        item.manufacturer.match(sword)
      ) {
        if (req.body.brand.length > 0) {
          if (req.body.brand.includes(item.manufacturer)) sendAry.push(item);
        } else {
          sendAry.push(item);
        }
      }
    });
    console.log(req.body.price);
    switch (req.body.price) {
      case 0:
        sendAry.forEach((item) => {
          if (item.price <= 2590) priceFilterAry.push(item);
        });
        res.send(priceFilterAry);
        break;
      case 1:
        sendAry.forEach((item) => {
          if (item.price <= 3800 && item.price > 2590)
            priceFilterAry.push(item);
        });
        res.send(priceFilterAry);
        break;
      case 2:
        sendAry.forEach((item) => {
          if (item.price <= 5490 && item.price > 3800)
            priceFilterAry.push(item);
        });
        res.send(priceFilterAry);
        break;
      case 3:
        sendAry.forEach((item) => {
          if (item.price > 5490) priceFilterAry.push(item);
        });
        res.send(priceFilterAry);
        break;
      default:
        res.send(sendAry);
        break;
    }
  });
});

module.exports = router;
