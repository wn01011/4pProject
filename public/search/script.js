const title = document.getElementById("item-head").children[0];
const sword = decodeURI(location.href.split("?")[1].split("=")[1]);
title.innerHTML = `<div style="font-size: 1.7rem">'<span style="color: purple;">${sword}</span>'에 대한 검색결과</div>`;

axios.post("/api/product/search", { sword: sword }).then((data) => {
  data.data.forEach((item) => {
    getList(
      item.img,
      item.manufacturer,
      item.name,
      item.description,
      item.price
    );
  });
});

const goods = document.getElementById("goods");

const getList = function (img, delivery, name, description, price) {
  try {
    const tempGoodsDiv = document.createElement("div");
    const tempGoodsA = document.createElement("a");
    const tempGoodsImg = document.createElement("img");
    const tempGoodsDel = document.createElement("p");
    const tempGoodsText = document.createElement("p");
    const tempGoodsPrice = document.createElement("p");
    const tempGoodsInfo = document.createElement("p");
    const tempGoodsCart = document.createElement("img");

    tempGoodsImg.src = `/api/product/download${img}`;
    tempGoodsDel.innerText = `${delivery}`;
    tempGoodsText.innerText = `${name}`;
    tempGoodsPrice.innerText = `${price}원`;
    tempGoodsInfo.innerText = `${description}`;
    tempGoodsCart.src = `/imges/cart3.svg`;

    tempGoodsCart.style = `
    width: 30px;
    position: relative;
    top:130px;
    left: -40px;
    `;

    tempGoodsText.style = `
    display:block;
    line-height: 1.5;
    margin-top: 8px;
    `;

    tempGoodsPrice.style = `
    margin-top: 8px;
    `;
    tempGoodsInfo.style = `
    padding-bottom: 10px;
    `;

    goods.style = `
    display: flex;
    width: 800px;
    `;

    tempGoodsImg.style = `
    width: 249px;
    `;

    tempGoodsDiv.style = `
    display:flex;
    flex-wrap:wrap;
    width:279px
    `;

    tempGoodsInfo.style = `
    font-size: 12px;
    color: rgb(205, 204, 204);
    `;

    tempGoodsPrice.style = `
    font-weight: bold;
    `;

    tempGoodsDel.style = `
    font-size: 14px;
    `;

    goods.appendChild(tempGoodsDiv);
    tempGoodsDiv.append(tempGoodsA);
    // tempGoodsImg.append(tempGoodsA);
    tempGoodsA.append(tempGoodsImg);
    tempGoodsDiv.append(tempGoodsDel);
    tempGoodsDiv.append(tempGoodsText);
    tempGoodsDiv.append(tempGoodsPrice);
    tempGoodsDiv.append(tempGoodsInfo);
    tempGoodsDiv.append(tempGoodsCart);
    tempGoodsA.after(tempGoodsCart);

    // 상세페이지로 이동
    function detailItem() {
      location.href = "/item?name=" + name;
    }
    // 이미지 클릭시
    tempGoodsA.onclick = (e) => {
      e.preventDefault();
      console.log(tempGoodsA);
      detailItem();
    };
  } catch (error) {
    console.log(error);
  }
};
