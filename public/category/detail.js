let currImg = "";
let currDelivery = "";
let currName = "";
let currDescription = "";
let currPrice = "";

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

const filterBrand = document.getElementById("filter-brand");
let brandSet = new Set();

const getFilter = function (manufacturer) {
  try {
    const filterLi = document.createElement("li");
    const filterImg = document.createElement("img");
    const filterA = document.createElement("a");
    const filterAa = document.createElement("a");
    filterImg.src = `/category/imges/detailImg/check-circle.svg`;
    filterAa.innerText = `${manufacturer}`;
    filterAa.style = `
    margin-left: 20px;
    line-height: 2
    `;

    // brandSet.
    filterBrand.append(filterLi);
    filterA.append(filterImg);
    filterLi.append(filterA);
    filterLi.append(filterAa);
  } catch (error) {
    console.log(error);
  }
};
axios
  .post("/api/product/category", { data: "채소" })
  .then((data) => {
    console.log(data.data);
    data.data.forEach((item) => {
      // 카테고리별 아이템 추출
      const category = Object.values(item.category[0]);
      console.log(category[1]);
      // 전체보기
      getList(item.img, item.delivery, item.name, item.description, item.price);
      // 브랜드 추출
      if (!brandSet.has(item.manufacturer) && item.manufacturer != "") {
        brandSet.add(item.manufacturer);
        getFilter(item.manufacturer);
      }
      // 가격 추출
      // filterAa
      // console.log(brand);
    });
  })
  .catch((err) => {
    console.error(err);
  });

// axios
//   .post("/api/product/filter", { data: "채소" })
//   .then((data) => {
//     const category = Object.values(item.category[0]);
//     console.log(category[1]);
//     // console.log(item.category[0]);
//     data.data.forEach((item) => {
//       getList(item.img, item.delivery, item.name, item.description, item.price);
//       getFilter();
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });
