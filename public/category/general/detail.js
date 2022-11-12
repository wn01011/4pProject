let currImg = "";
let currDelivery = "";
let currName = "";
let currDescription = "";
let currPrice = "";
let originName = decodeURI(
  window.location.href.split("?")[1].split("=")[1].replaceAll("-", "·")
);
const currCategory = decodeURI(
  window.location.href.split("?")[1].split("=")[1].split("-")[0]
);

// 상품
const goods = document.getElementById("goods");

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

    tempGoodsDel.classList.add(`deliveryTxt`);

    goods.appendChild(tempGoodsDiv);
    tempGoodsDiv.append(tempGoodsImgDiv);
    tempGoodsImgDiv.append(tempGoodsImg);
    tempGoodsDiv.append(tempGoodsDel);
    tempGoodsDiv.append(tempGoodsText);
    tempGoodsDiv.append(tempGoodsPrice);
    tempGoodsDiv.append(tempGoodsInfo);
    tempGoodsDiv.append(tempGoodsCart);
    // tempGoodsImgDiv.after(tempGoodsCart);

    // 제품 상세페이지로 이동
    function detailItem() {
      location.href = "/item?product=" + img;
    }
    // 이미지 클릭시
    tempGoodsImgDiv.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };

    // tempGoodsCart.onclick = (e) => {
    //   e.preventDefault();
    //   console.log(name);
    //   axios
    //     .post(
    //       "/api/product/cartDamgi?productName=" +
    //         name +
    //         "&userId=" +
    //         getUserId() +
    //         "&price=" +
    //         price
    //     )
    //     .then((data) => {
    //       location.href = "/Cart";
    //     });
    // };
  } catch (error) {
    console.log(error);
  }
};

const categoryList = [
  [
    "전체보기",
    `브로콜리·파프리카·양배추`,
    `콩나물·버섯`,
    `친환경`,
    `양파·대파·마늘·배추`,
    `고구마·감자·당근`,
    `오이·호박·고추`,
    `시금치·쌈채소·나물`,
    `냉동·이색·간편채소`,
  ],
  [
    "전체보기",
    `수입과일`,
    `쌀·잡곡`,
    `친환경`,
    `간편과일`,
    `제철과일`,
    `냉동·건과일`,
    `국산과일`,
    `견과류`,
  ],
  [
    "전체보기",
    `오징어·낙지·문어`,
    `김·미역·해조류`,
    `제철수산`,
    `새우·게·랍스터`,
    `건어물·다시팩`,
    `생선류`,
    `해산물·조개류`,
    `굴비·반건류`,
    `수산가공품`,
  ],
  [
    "전체보기",
    `계란류`,
    `국내산 소고기`,
    `닭·오리고기`,
    `수입산 소고기`,
    `양념육·돈까스`,
    `돼지고기`,
    `양고기`,
  ],
  [
    "전체보기",
    `김치·젓갈·장류`,
    `국·탕·찌개`,
    `두부·어묵·부침개`,
    `밀키트·메인요리`,
    `베이컨·햄·통조림`,
    `밑반찬`,
  ],
  [
    "전체보기",
    `떡볶이·튀김·순대`,
    `선식·시리얼`,
    `샐러드·닭가슴살`,
    `피자·핫도그·만두`,
    `도시락·밥류`,
    `폭립·떡갈비·안주`,
    `파스타·면류`,
    `죽·스프·카레`,
  ],
  [
    "전체보기",
    `식용유·참기름·오일`,
    `파스타·면류`,
    `소금·설탕·향신료`,
    `식초·소스·드레싱`,
    `밀가루·가루·믹스`,
    `양념·액젓·장류`,
  ],
  ["전체보기", `커피`, `생수·탄산수`, `차`, `음료·주스`, `우유·두유·요거트`],
  ["전체보기", `쿠키!!!`],
];

function vegiCategories(category) {
  let currCategoryList = categoryList[8];
  switch (category) {
    case "채소":
      currCategoryList = categoryList[0];
      break;
    case "과일":
      currCategoryList = categoryList[1];
      break;
    case "수산":
      currCategoryList = categoryList[2];
      break;
    case "정육":
      currCategoryList = categoryList[3];
      break;
    case "국":
      currCategoryList = categoryList[4];
      break;
    case "샐러드":
      currCategoryList = categoryList[5];
      break;
    case "면":
      currCategoryList = categoryList[6];
      break;
    case "생수":
      currCategoryList = categoryList[7];
      break;
    case "간식":
      currCategoryList = categoryList[8];
      break;
    default:
      currCategoryList = categoryList[0];
      break;
  }
  try {
    const itemInner = document.getElementsByClassName("item-inner")[0];
    itemInner.style.columnGap = "50px";
    itemInner.style.rowGap = "30px";
    itemInner.style.flexWrap = "wrap";
    currCategoryList.forEach((innerText) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerText = innerText;
      tempDiv.style = `
        width : 200px;
        white-space:nowrap;
        text-align: center;
      `;
      itemInner.appendChild(tempDiv);
    });
  } catch (error) {
    console.log(error);
  }
}
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
  // vegiCategories();
};
checkList[1].onclick = () => {
  if (selectedPrice == 1) selectedPrice = -1;
  else selectedPrice = 1;
  pricesFilter();
  searchFunc();
  // vegiCategories();
};
checkList[2].onclick = () => {
  if (selectedPrice == 2) selectedPrice = -1;
  else selectedPrice = 2;
  pricesFilter();
  searchFunc();
  // vegiCategories();
};
checkList[3].onclick = () => {
  if (selectedPrice == 3) selectedPrice = -1;
  else selectedPrice = 3;
  pricesFilter();
  searchFunc();
  // vegiCategories();
};
// let filterSet = new Set();

// 필터리스트
const getFilter = function (manufacturer) {
  try {
    // categoryList.innerHTML = "";
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
      // vegiCategories();
      // vegiCategories();
    };

    brandFilter.append(filterLi);
    filterA.append(filterImg);
    filterLi.append(filterA);
    filterLi.append(filterAa);
  } catch (error) {
    console.log(error);
  }
};

// 카테고리 데이터 요청
let selectedBrand = [];
let selectedPrice = -1;
const filter = document.getElementById("filter");
const list = document.getElementById("list");
const totalCount = document.getElementById("totalCount");
const arrayPrice = document.getElementById("arrayPrice");
const productNone = document.getElementById("productNone");
function searchFunc() {
  goods.innerHTML = "";
  axios
    .post("/api/product/category", {
      data: currCategory,
      brand: selectedBrand,
      price: selectedPrice,
    })
    .then((data) => {
      totalCount.innerText = "총 " + data.data.length + "건";
      vegiCategories(currCategory);
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
// vegiCategories();

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

function getUserId() {
  for (let i = 0; i < document.cookie.split(";").length; ++i) {
    return document.cookie.split(";")[i].split("=")[0];
  }
}

// 페이지 카테고리 제목
const itemHead = document
  .getElementById("item-head")
  .getElementsByTagName("h1")[0];

itemHead.innerText = originName;

// 배너 정하기
const banner = document.getElementById("banner").getElementsByTagName("img")[0];
switch (originName) {
  case "채소":
    banner.src = "/category/imges/banner/vegi_banner.jpg";
    break;
  case "과일·견과·쌀":
    banner.src = "/category/imges/banner/fruit_banner.jpeg";
    break;
  case "수산·해산물·건어물":
    banner.src = "/category/imges/banner/sea_banner.jpeg";
    break;
  case "정육·계란":
    banner.src = "/category/imges/banner/meat_banner.jpg";
    break;
  case "국·반찬·메인요리":
    banner.src = "/category/imges/banner/soup_banner.jpg";
    break;
  case "샐러드·간편식":
    banner.src = "/category/imges/banner/salad_banner.jpeg";
    break;
  case "면·양념·오일":
    banner.src = "/category/imges/banner/oil_banner.jpeg";
    break;
  case "생수·음료·우유·커피":
    banner.src = "/category/imges/banner/drink_banner.jpg";
    break;
  case "간식·과자·떡":
    banner.src = "/category/imges/banner/cookie_banner.jpg";
    break;
  default:
    banner.src = "/category/imges/banner/cookie_banner.jpg";
    break;
}
