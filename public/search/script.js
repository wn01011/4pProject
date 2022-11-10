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
    box-sizing: border-box;
    width: 30px;
    height : 30px;
    flex: 1;
    position: relative;
    display:flex;
    flex-direction: column;
    justify-content: end;
    top: 270px;
    right: 50px;
    background-color: purple;
    border-radius: 50%;
    box-shadow: 0 0 0px 8px purple;
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
    width: 900px;
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
      detailItem();
    };
  } catch (error) {
    console.log(error);
  }
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

    filterImg.src = `/Category/imges/detailImg/check-circle.svg`;
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
  } catch (error) {
    console.log(error);
  }
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
