axios
  .post("/api/product/", { data: "채소" })
  .then((data) => {
    console.log(data.data[0].category[0]);
    console.log(data);
    getList(
      data.data[0].img,
      data.data[0].delivery,
      data.data[0].name,
      data.data[0].description,
      data.data[0].price
    );
  })
  .catch((err) => {
    console.error(err);
  });

const goods = document.getElementById("goods");
const goodsImg = document.getElementById("goods-img");
const goodsText = document.getElementById("goods-name");
const goodsPrice = document.getElementById("goods-price");
const goodsInfo = document.getElementById("goods-info");
const goodsCart = document.getElementById("goods-cart");

async function getList(img, delivery, name, description, price) {
  try {
    const tempGoodsDiv = document.createElement("div");
    const tempGoodsImg = document.createElement("img");
    const tempGoodsDel = document.createElement("p");
    const tempGoodsText = document.createElement("p");
    const tempGoodsPrice = document.createElement("p");
    const tempGoodsInfo = document.createElement("p");
    const tempGoodsCart = document.createElement("img");

    console.log(`/api/product/download${img}`);

    tempGoodsImg.style = `
    width:420px;
    hight:920px;`;

    tempGoodsImg.src = `/api/product/download${img}`;
    tempGoodsDel.innerText = `${delivery}`;
    tempGoodsText.innerText = `${name}`;
    tempGoodsPrice.innerText = `${price}원`;
    tempGoodsInfo.innerText = `${description}`;
    tempGoodsCart.src = `/imges/cart3.svg`;

    goods.append(tempGoodsDiv);
    goodsImg.append(tempGoodsImg);
    goodsText.append(tempGoodsDel);
    goodsPrice.append(tempGoodsPrice);
    goodsInfo.append(tempGoodsInfo);
    goodsCart.append(tempGoodsCart);
  } catch (error) {
    console.log(error);
  }
}
