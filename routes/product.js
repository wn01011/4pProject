const { Router } = require("express");
const db = require("../models/index.js");
const fs = require("fs");
const router = Router();

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
  if (!req.body.brand) {
    db.ProductTable.findAll().then((data) => {
      data.forEach((item) => {
        if (
          Object.values(item.dataValues.category[0]).includes(
            `${req.body.data}`
          )
        ) {
          tempVegi.push(item.dataValues);
        }
      });
      res.send(tempVegi);
    });
  } else {
    db.ProductTable.findAll().then((data) => {
      data.forEach((item) => {
        if (
          Object.values(item.dataValues.category[0]).includes(
            `${req.body.data}`
          )
        ) {
          if (req.body.brand.length > 0) {
            if (req.body.brand.includes(item.manufacturer))
              brandFilterAry.push(item);
          } else {
            brandFilterAry.push(item);
          }
        }
      });
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
  }
});
router.route("/getImage").post(async (req, res) => {
  let imgList = [];
  for (let i = 0; i < req.body.data.length; i++) {
    const productBox = await db.ProductTable.findOne({
      where: {
        name: req.body.data[i],
      },
    }).then((data) => {
      imgList.push(data?.img);
    });
  }
  res.send({ list: imgList });
});

router.route("/item").post((req, res) => {
  const itemLink = req.body.itemLink;
  db.ProductTable.findOne({ where: { img: itemLink } }).then((data) => {
    const itemData = data.dataValues;
    res.send(itemData);
  });
});

router.route("/productReview").post((req, res) => {
  db.ReviewTable.findAll({
    where: {
      productName: req.body.productName,
    },
  }).then((data) => {
    res.send(data);
  });
});

// product.json 파일 넣는 곳
fs.readFile("./product.json", "utf-8", function (err, data) {
  if (err) {
    console.error(err.message);
  } else {
    if (data && JSON.parse(data).length < 10) {
      JSON.parse(data).forEach((item) => {
        try {
          db.ProductTable.create(item);
        } catch (err) {
          console.error(err);
        }
      });
    }
  }
});

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

router.route("/cartDamgi").post((req, res) => {
  if (encodeURIComponent(req.query.productName)) {
    db.UserTable.findOne({
      where: {
        userId: req.query.userId,
      },
    }).then((data) => {
      const productName = decodeURIComponent(req.query.productName);
      db.CartTable.create({
        userId: req.query.userId,
        name: productName,
        amount: 1,
        price: req.query.price,
        address: data?.address,
      });
    });
  } else {
    db.UserTable.findOne({
      where: {
        userId: req.body.userId,
      },
    }).then((data) => {
      db.CartTable.create({
        userId: req.body.userId,
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price,
        address: data.address,
      });
    });
  }
  res.send();
});

router.route("/delProduct").post((req, res) => {
  db.ProductTable.destroy({ where: { name: req.body.productName } }).then(
    () => {
      res.send(req.body.productName + "이(가) 지워졌어요");
    }
  );
});

router.route("/categoryType").post((req, res) => {
  db.CategoryTable.findAll().then((data) => {
    res.send(data);
  });
});

router.route("/addCategory").post((req, res) => {
  db.CategoryTable.create({ name: req.body.name }).then(() => {
    res.send();
  });
});

router.route("/destroyCategory").post((req, res) => {
  db.CategoryTable.destroy({ where: { name: req.body.name } }).then(() => {
    res.send();
  });
});

router.route("/newData").post((req, res) => {
  db.ProductTable.create(req.body[0]).then(() => {
    setImages();
  });
});

router.route("/findone").post((req, res) => {
  db.ProductTable.findOne({
    where: {
      name: req.body.name,
    },
  }).then((data) => {
    res.send(data);
  });
});

module.exports = router;
