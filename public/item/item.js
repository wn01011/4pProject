let currItemName = "";
let currUserId = getUserId();
// ===== 상품 =====
let currImg = "";
let currDelivery = "";
let currName = "";
let currDescription = "";
let currPrice = "";
let currManufacturer = "";
let currPackage = "";
let currUnit = "";
let currWeight = "";
let currOrigin = "";

const itemList = document.getElementById("item-image");
const itemDelivery = document.getElementById("item-delivery");
const itemName = document.getElementById("item-name");
const itemDes = document.getElementById("item-des");
const itemPrice = document.getElementById("item-price");
const itemSales = document.getElementById("item-sales");
const itemPack = document.getElementById("item-package");
const itemUnit = document.getElementById("item-unit");
const itemWeight = document.getElementById("item-weight");
const itemOrigin = document.getElementById("item-origin");
const itemSelect = document.getElementById("item-select");
const itemSelectPrice = document.getElementById("item-select-price");
const itemMinus = document.getElementById("item-Minus");
const itemPlus = document.getElementById("item-Plus");
const itemEa = document.getElementById("item-count");
const itemTotal = document.getElementById("item-total-price");
const cartDamgi = document.getElementById("cart-damgi");
const total = document.getElementById("total-price");
const totalText = document.getElementById("total-price-text");
const totalWonText = document.getElementById("total-price-won");

async function itemDetailList(
  img,
  delivery,
  name,
  description,
  price,
  manufacturer,
  package,
  unit,
  weight,
  origin
) {
  try {
    // for (let i = 0; i > data.length; ++i) {}
    const itemDiv = document.createElement("div");
    const itemImg = document.createElement("img");
    const itemInfoP = document.createElement("p");
    const itemInfoh2 = document.createElement("h2");
    const itemInfo2P = document.createElement("p");
    const itemPrice_h2 = document.createElement("h2");
    const itemSaleP = document.createElement("p");
    const itemPackP = document.createElement("p");
    const itemUnitP = document.createElement("p");
    const itemWeightP = document.createElement("p");
    const itemOriginP = document.createElement("p");
    const itemSelectSpan = document.createElement("span");
    const itemSelectPrice = document.createElement("span");
    const itemTotalPrice = document.createElement("span");
    const itemSelectPriceLi = document.createElement("li");

    itemImg.style = `
    width:420px;
    hight:920px;`;
    itemImg.src = `/api/product/download${img}`;
    itemInfoP.innerText = `${delivery}`;
    itemInfoh2.innerText = `${name}`;
    itemInfo2P.innerText = `${description}`;
    itemPrice_h2.innerText = `${price.toLocaleString("ko-KR")}원`;
    itemSaleP.innerText = `${manufacturer}`;
    itemPackP.innerText = `${package}`;
    itemUnitP.innerText = `${unit}`;
    itemWeightP.innerText = `${weight}`;
    itemOriginP.innerText = `${origin}`;
    itemSelectSpan.innerText = `${name}`;
    totalText.innerText = `총 상품금액:`;
    itemSelectPrice.innerText = `${price.toLocaleString("ko-KR")}원`;
    total.innerText = `${price * 1}`;
    totalWonText.innerText = "원";
    itemTotal.style = `
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
    `;

    totalWonText.style = `
    font-size: 15px;
    font-weight: bold;
    `;

    totalText.style = `
    width: 80px;
    font-size: 13px;
    `;

    total.style = `
    display:flex;
    justify-content: flex-end;
    font-size : 40px;
    width: 140px;
    font-weight : bold;
    margin-right: 10px
    `;

    itemEa.style = `
    width: 150px;
    text-align: center;
    `;

    totalWonText.append(itemSelectPriceLi);
    totalText.append(itemSelectPriceLi);
    total.append(itemSelectPriceLi);
    itemSelect.append(itemSelectPrice);
    itemSelect.append(itemSelectPriceLi);
    itemSelect.append(itemSelectSpan);
    itemOrigin.append(itemOriginP);
    itemWeight.append(itemWeightP);
    itemUnit.append(itemUnitP);
    itemPack.append(itemPackP);
    itemSales.append(itemSaleP);
    itemPrice.append(itemPrice_h2);
    itemDes.append(itemInfo2P);
    itemName.append(itemInfoh2);
    itemDelivery.append(itemInfoP);
    itemDiv.append(itemImg);
    itemList.append(itemDiv);

    let count = 1;
    itemEa.innerText = count;

    itemPlus.onclick = () => {
      count++;
      itemEa.innerText = count;
      total.innerText = `${price * count}`;
      itemTotal.append(itemTotalPrice);
    };

    itemMinus.onclick = () => {
      if (count > 1) {
        count--;
        itemEa.innerText = count;
        total.innerText = `${price * count}`;
        itemTotal.append(itemTotalPrice);
      }
    };
  } catch (error) {
    console.log(error);
  }
}
const itemLink = decodeURI(location.href.split("?")[1].split("=")[1]);

axios
  .post("/api/product/item", {
    data: "채소",
    itemLink: location.href.split("?")[1].split("=")[1],
  })
  .then((itemData) => {
    // data.data.forEach((item) => {
    itemDetailList(
      itemData.data.img,
      itemData.data.delivery,
      itemData.data.name,
      itemData.data.description,
      itemData.data.price,
      itemData.data.manufacturer,
      itemData.data.package,
      itemData.data.unit,
      itemData.data.weight,
      itemData.data.origin
    );

    currItemName = itemData.data.name;
    // console.log(itemData);
    currItemcategory = itemData.data.category[0];

    // 상품 문의쪽 정보 불러오는 곳
    axios
      .post("/api/notice/productask", { productName: currItemName })
      .then((data) => {
        if (data.data.length > 0) askDefault.classList.add("off");
        data.data.forEach((item) => {
          createAskList(
            item.name,
            item.userId,
            item.createdAt.slice(0, 10),
            item.isAnswer,
            item.text,
            item.answerText
          );
        });
      });
  })
  .catch((err) => {
    console.error(err);
  });

const askTable = document.getElementById("ask-table");
const askDefault = document.getElementById("ask-default");

function createAskList(title, user, date, state, q, a) {
  // Q&A 간략 내용
  const tempList = document.createElement("div");
  const titleDiv = document.createElement("div");
  const userDiv = document.createElement("div");
  const dateDiv = document.createElement("div");
  const stateDiv = document.createElement("div");

  tempList.style = `
    width : 100%;
    display: flex;
    cursor : pointer;
  `;
  titleDiv.style = `
    text-align : center;
    width : 60%;
    padding : 10px 0px;
    border-bottom: lightgrey solid 1px;
  `;
  userDiv.style = `
    text-align : center;
    width : 15%;
    padding : 10px 0px;
    border-bottom: lightgrey solid 1px;
  `;
  dateDiv.style = `
    text-align : center;
    width : 15%;
    padding : 10px 0px;
    border-bottom: lightgrey solid 1px;
  `;
  stateDiv.style = `
    text-align : center;
    width : 10%;
    padding : 10px 0px;
    border-bottom: lightgrey solid 1px;
  `;

  titleDiv.innerText = title;
  userDiv.innerText = user;
  dateDiv.innerText = date;
  if (state == 0) stateDiv.innerText = "대기중";
  else stateDiv.innerText = "답변완료";

  tempList.appendChild(titleDiv);
  tempList.appendChild(userDiv);
  tempList.appendChild(dateDiv);
  tempList.appendChild(stateDiv);
  askTable.appendChild(tempList);

  if (state == 0 && currUserId != user) return;
  // Q&A 상세 내용
  const detailDiv = document.createElement("div");
  const detailQ = document.createElement("div");
  const detailA = document.createElement("div");

  detailDiv.classList.add("off");
  tempList.onclick = () => {
    detailDiv.classList.toggle("off");
  };

  detailQ.style = `
    text-align : left;
    width : 100%;
    padding : 20px;
    padding-left: 50px;
    background-color: rgb(228, 228, 228);
  `;

  detailA.style = `
    text-align : left;
    width : 100%;
    padding : 20px;
    padding-left: 50px;
    background-color: rgb(228, 228, 228);
  `;

  detailQ.innerText = "Q : " + q;
  detailA.innerText = "A : " + a;
  detailDiv.appendChild(detailQ);
  detailDiv.appendChild(detailA);
  tempList.after(detailDiv);
}

// 상품 문의 모달창
const askModal = document.getElementById("ask-modal");
const modalClose = document.getElementsByClassName("close-area")[0];
const askBtn = document.getElementsByClassName("item-ask-btn")[0].children[0];
modalClose.onclick = () => {
  askModal.classList.toggle("off");
};
askBtn.onclick = () => {
  if (!getUserId()) return alert("로그인 해주세요");
  askModal.classList.remove("off");
};

const modalSubmitBtn = document.getElementsByClassName("submit-area")[0];
const modalTextArea = document.getElementById("modal-ask-area");
const modalName = document.getElementById("modal-name");

function getUserId() {
  for (let i = 0; i < document.cookie.split(";").length; ++i) {
    return document.cookie.split(";")[i].split("=")[0];
  }
}

modalSubmitBtn.onclick = () => {
  const name = modalName.value;
  const value = modalTextArea.value;
  if (name == "" || value == "" || !getUserId()) return;
  axios
    .post("/api/notice/modalask", {
      userId: getUserId(),
      productName: currItemName,
      name: name,
      text: value,
      answerText: undefined,
      isAnswer: 0,
    })
    .then((data) => {
      askModal.classList.toggle("off");
      window.location.reload();
    });
};

// 상품 리뷰

const reviewBox = document.getElementById("review-box");
const totalCount = document.getElementById("total-count");

const reviewId = setInterval(() => {
  if (itemName != "") {
    makeReview(getUserId(), currItemName, "가격 착하고 품질조아요2");
    clearInterval(reviewId);
  }
}, 100);

function makeReview(userId, productName, text) {
  axios
    .post("/api/product/productReview", {
      userId: userId,
      productName: productName,
      text: text,
    })
    .then((data) => {
      totalCount.innerText = "총 " + data.data.length + "개";
      data.data.forEach((item) => {
        // 2번째 글자 *으로 치환하는 구문
        let tempUserId = item.userId;
        tempUserId = [...tempUserId];
        tempUserId.splice(1, 1, "*");
        tempUserId = tempUserId.join("");
        // ****************************
        const tempList = document.createElement("li");
        tempList.innerHTML = `<li class="user-list">
        <div class="user-id">${tempUserId}</div>
        <div class="review-text-box">
          <div class="review-product-name">
            ${item.productName}
          </div>
          <div class="review-product-text">${item.text}</div>
          <div class="review-product-date">${item.createdAt.slice(0, 10)}</div>
        </div>
      </li>`;
        reviewBox.appendChild(tempList);
      });
    });
}

// 리뷰끝

// 장바구니 담기
cartDamgi.onclick = () => {
  if (currUserId == "") return (location.href = "/SignIn");
  console.log(
    currItemName,
    currUserId,
    +itemEa.innerText,
    +itemPrice.innerText.replace(/[^0-9]/g, ""),
    +itemTotal.innerText.replace(/[^0-9]/g, "")
  );
  axios.post("/api/product/cartDamgi", {
    name: currItemName,
    userId: currUserId,
    amount: +itemEa.innerText,
    price: +itemPrice.innerText.replace(/[^0-9]/g, ""),
  });
  window.alert("장바구니에 담겼습니다.");
  window.location.reload();
};
