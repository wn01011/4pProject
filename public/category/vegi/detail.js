let currImg = "";
let currDelivery = "";
let currName = "";
let currDescription = "";
let currPrice = "";

// 상품
const goods = document.getElementById("goods");

// 카테고리
const categoryAll = document.getElementById("item-all");
const categoryBro = document.getElementById("item-bro");
const categoryBean = document.getElementById("item-bean");
const categoryEnv = document.getElementById("item-env");
const categoryOni = document.getElementById("item-onion");
const categoryPota = document.getElementById("item-potato");
const categoryCuc = document.getElementById("item-cucumber");
const categorySpi = document.getElementById("item-spinach");
const categoryFro = document.getElementById("item-frozen");

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
    const tempGoodsA = document.createElement("a");
    const tempGoodsImg = document.createElement("img");
    const tempGoodsDel = document.createElement("p");
    const tempGoodsText = document.createElement("p");
    const tempGoodsPrice = document.createElement("p");
    const tempGoodsInfo = document.createElement("p");
    const tempGoodsCart = document.createElement("img");

    categoryAll.onclick = (e) => {
      e.preventDefault();
    };

    tempGoodsImg.src = `/api/product/download${img}`;
    tempGoodsDel.innerText = `${delivery}`;
    tempGoodsText.innerText = `[${manufacturer}]` + `${name}`;
    tempGoodsPrice.innerText = `${price.toLocaleString("ko-KR")}원`;
    tempGoodsInfo.innerText = `${description}`;
    tempGoodsCart.src = `/imges/cart3.svg`;

    if (!manufacturer) {
      tempGoodsText.innerText = `${name}`;
    }

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
    width: 837px;
    `;

    tempGoodsA.style = `
    width: 249px;
    height: 320px;
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

    // 제품 상세페이지로 이동
    function detailItem() {
      location.href = "/item?product=" + img;
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

// 필터 사이드바 (브랜드명)
const brandFilter = document.getElementById("filter-brand");
const priceBrand = document.getElementById("brand-price");
let brandSet = new Set();
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
opacity: 0.7;
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

const vegiCategories = function (category) {
  try {
    categoryAll.innerHTML = "";
    categoryBro.innerHTML = "";
    categoryBean.innerHTML = "";
    categoryEnv.innerHTML = "";
    categoryOni.innerHTML = "";
    categoryPota.innerHTML = "";
    categoryCuc.innerHTML = "";
    categorySpi.innerHTML = "";
    categoryFro.innerHTML = "";
    const tempAllA = document.createElement("a");
    const tempBroA = document.createElement("a");
    const tempBeanA = document.createElement("a");
    const tempEnvA = document.createElement("a");
    const tempOniA = document.createElement("a");
    const tempPotaA = document.createElement("a");
    const tempCucA = document.createElement("a");
    const tempSpiA = document.createElement("a");
    const tempFroA = document.createElement("a");

    tempAllA.innerText = "전체보기";
    tempBroA.innerText = `브로콜리·파프리카·양배추`;
    tempBeanA.innerText = `콩나물·버섯`;
    tempEnvA.innerText = `친환경`;
    tempOniA.innerText = `양파·대파·마늘·배추`;
    tempPotaA.innerText = `고구마·감자·당근`;
    tempCucA.innerText = `오이·호박·고추`;
    tempSpiA.innerText = `시금치·쌈채소·나물`;
    tempFroA.innerText = `냉동·이색·간편채소`;

    categoryAll.append(tempAllA);
    categoryBro.append(tempBroA);
    categoryBean.append(tempBeanA);
    categoryEnv.append(tempEnvA);
    categoryOni.append(tempOniA);
    categoryPota.append(tempPotaA);
    categoryCuc.append(tempCucA);
    categorySpi.append(tempSpiA);
    categoryFro.append(tempFroA);
  } catch (error) {
    console.log(error);
  }
};

// 카테고리 데이터 요청
// 채소
let selectedBrand = [];
let selectedPrice = -1;
const filter = document.getElementById("filter");
const list = document.getElementById("list");
const totalCount = document.getElementById("totalCount");
const productNone = document.getElementById("productNone");
function searchFunc() {
  goods.innerHTML = "";
  axios
    .post("/api/product/category", {
      data: "채소",
      brand: selectedBrand,
      price: selectedPrice,
    })
    .then((data) => {
      totalCount.innerText = "총 " + data.data.length + "건";
      vegiCategories();
      data.data.forEach((item) => {
        // 카테고리별 아이템 추출
        const category = Object.values(item.category[0]);
        getList(
          item.img,
          item.delivery,
          item.name,
          item.description,
          item.price,
          item.manufacturer,
          category
        );
        // 브랜드 추출
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
    })
    .catch((err) => {
      console.error(err);
    });
}
searchFunc();

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
