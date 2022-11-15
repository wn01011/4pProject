const title = document.getElementById("item-head").children[0];
const sword = decodeURI(location.href.split("?")[1].split("=")[1]);
title.innerHTML = `<div style="font-size: 1.7rem">'<span style="color: purple;">${sword}</span>'에 대한 검색결과</div>`;
let brandSet = new Set();
let selectedBrand = [];

let selectedPrice = -1;
const goods = document.getElementById("goods");
const filter = document.getElementById("filter");
const list = document.getElementById("list");
const totalCount = document.getElementById("totalCount");
const productNone = document.getElementById("productNone");
function searchFunc() {
  goods.innerHTML = "";
  axios
    .post("/api/product/search", {
      sword: sword,
      brand: selectedBrand,
      price: selectedPrice,
    })
    .then((data) => {
      totalCount.innerText = "총 " + data.data.length + "건";
      data.data.forEach((item) => {
        getList(
          item.img,
          item.manufacturer,
          item.name,
          item.description,
          item.price
        );
        if (!brandSet.has(item.manufacturer) && item.manufacturer != "") {
          brandSet.add(item.manufacturer);
          getFilter(item.manufacturer);
        }
      });
      if (data.data.length == 0) {
        productNone.style.display = "flex";
        list.style.display = "none";
        if (selectedBrand.length == 0 && selectedPrice == -1)
          filter.style.display = "none";
      } else {
        productNone.style.display = "none";
        list.style.display = "block";
        filter.style.display = "block";
      }
    });
}
searchFunc();

const getList = function (
  img,
  delivery,
  name,
  description,
  price,
  manufacturer
) {
  try {
    const tempGoodsDiv = document.createElement("div");
    const tempGoodsImgDiv = document.createElement("div");
    const tempGoodsTxtDiv = document.createElement("div");
    const tempGoodsImg = document.createElement("img");
    const tempGoodsDel = document.createElement("p");
    const tempGoodsText = document.createElement("p");
    const tempGoodsPrice = document.createElement("p");
    const tempGoodsInfo = document.createElement("p");
    const tempGoodsCart = document.createElement("button");

    tempGoodsImg.src = `/api/product/download${img}`;
    tempGoodsDel.innerText = `${delivery}`;
    tempGoodsText.innerText = `[${manufacturer}]` + `${name}`;
    tempGoodsPrice.innerText = `${price.toLocaleString("ko-KR")}원`;
    tempGoodsInfo.innerText = `${description}`;

    if (!manufacturer) {
      tempGoodsText.innerText = `${name}`;
    }

    tempGoodsCart.classList.add(`goodsCartBtn`);
    tempGoodsText.classList.add(`goodsTxt`);
    tempGoodsPrice.classList.add(`priceTxt`);
    tempGoodsInfo.classList.add(`goodsInfoTxt`);

    goods.style = `
    display: flex;
    width: 837px;
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
    tempGoodsTxtDiv.style = `
    width : 250px;
    `;
    tempGoodsCart.style = `
    cursor: pointer;
    `;

    tempGoodsDel.classList.add(`deliveryTxt`);
    tempGoodsImg.classList.add(`goodsImg`);
    tempGoodsImgDiv.classList.add(`goodsItemDiv`);

    goods.appendChild(tempGoodsDiv);
    tempGoodsDiv.append(tempGoodsImgDiv);
    tempGoodsImgDiv.append(tempGoodsImg);
    tempGoodsDiv.append(tempGoodsTxtDiv);
    tempGoodsTxtDiv.append(tempGoodsDel);
    tempGoodsTxtDiv.append(tempGoodsText);
    tempGoodsTxtDiv.append(tempGoodsPrice);
    tempGoodsTxtDiv.append(tempGoodsInfo);
    tempGoodsDiv.append(tempGoodsCart);

    // 제품 상세페이지로 이동
    function detailItem() {
      location.href = "/item?product=" + img;
    }
    // 이미지 클릭시
    tempGoodsImgDiv.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };

    tempGoodsCart.onclick = (e) => {
      e.preventDefault();
      if (currUserId == "") return (location.href = "/SignIn");
      axios
        .post(
          "/api/product/cartDamgi?productName=" +
            name +
            "&userId=" +
            getUserId() +
            "&price=" +
            price
        )
        .then((data) => {
          location.href = "/Cart";
        });
    };
  } catch (error) {}
};

// 필터 사이드바 (브랜드명)
const brandFilter = document.getElementById("filter-brand");
const priceBrand = document.getElementById("brand-price");
const checkList = document.getElementsByClassName("check-list");
checkList[0].onclick = () => {
  if (selectedPrice == 0) selectedPrice = -1;
  else selectedPrice = 0;
  pricesFilter();
  searchFunc();
};
checkList[1].onclick = () => {
  if (selectedPrice == 1) selectedPrice = -1;
  else selectedPrice = 1;
  pricesFilter();
  searchFunc();
};
checkList[2].onclick = () => {
  if (selectedPrice == 2) selectedPrice = -1;
  else selectedPrice = 2;
  pricesFilter();
  searchFunc();
};
checkList[3].onclick = () => {
  if (selectedPrice == 3) selectedPrice = -1;
  else selectedPrice = 3;
  pricesFilter();
  searchFunc();
};
// let filterSet = new Set();

const getFilter = function (manufacturer) {
  try {
    const filterLi = document.createElement("li");
    const filterImg = document.createElement("img");
    const filterA = document.createElement("button");
    const filterAa = document.createElement("button");

    filterImg.src = `/category/imges/detailImg/check-circle.svg`;
    filterA.style = `
    border : none;
    background-color : transparent;
    border-radius: 50%;
    padding : 0;
    `;

    filterAa.innerText = `${manufacturer}`;
    filterAa.style = `
    margin-left: 20px;
    line-height: 2;
    border : none;
    background-color : transparent; 
    `;
    filterImg.style = `
    opacity: 0.3;
    `;
    filterLi.onclick = () => {
      if (selectedBrand.includes(filterAa.innerText)) {
        const tempAry = [];
        selectedBrand.filter((elem) => {
          if ((elem, filterAa.innerText, elem !== filterAa.innerText)) {
            tempAry.push(elem);
          }
          elem !== filterAa.innerText;
        });
        selectedBrand = tempAry;
      } else {
        selectedBrand.push(filterAa.innerText);
      }
      if (selectedBrand.includes(filterAa.innerText)) {
        filterA.style.backgroundColor = "rgba(75, 0, 130, 0.7)";
      } else {
        filterA.style.backgroundColor = "transparent";
      }
      searchFunc();
    };

    brandFilter.append(filterLi);
    filterA.append(filterImg);
    filterLi.append(filterA);
    filterLi.append(filterAa);
  } catch (error) {}
};

const pricesFilter = function () {
  switch (selectedPrice) {
    case -1:
      [...checkList].forEach((item) => {
        const currImg = item.getElementsByTagName("img")[0];
        currImg.style.backgroundColor = "transparent";
      });
      break;
    case 0:
      [...checkList].forEach((item, idx) => {
        const currImg = item.getElementsByTagName("img")[0];
        currImg.style.backgroundColor = "transparent";
        if (idx == 0) currImg.style.backgroundColor = "rgba(75, 0, 130, 0.7)";
      });
      break;
    case 1:
      [...checkList].forEach((item, idx) => {
        const currImg = item.getElementsByTagName("img")[0];
        currImg.style.backgroundColor = "transparent";
        if (idx == 1) currImg.style.backgroundColor = "rgba(75, 0, 130, 0.7)";
      });
      break;
    case 2:
      [...checkList].forEach((item, idx) => {
        const currImg = item.getElementsByTagName("img")[0];
        currImg.style.backgroundColor = "transparent";
        if (idx == 2) currImg.style.backgroundColor = "rgba(75, 0, 130, 0.7)";
      });
      break;
    case 3:
      [...checkList].forEach((item, idx) => {
        const currImg = item.getElementsByTagName("img")[0];
        currImg.style.backgroundColor = "transparent";
        if (idx == 3) currImg.style.backgroundColor = "rgba(75, 0, 130, 0.7)";
      });
      break;
  }
};
