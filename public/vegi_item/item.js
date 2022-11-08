let currItemName = "";
let currUserId = "1";
axios
  .post("/api/product", { data: "채소" })
  .then((data) => {
    console.log(data);
    console.log(data.data[1].img);
    getList(
      data.data[1].img,
      data.data[1].delivery,
      data.data[1].name,
      data.data[1].description,
      data.data[1].price,
      data.data[1].manufacturer,
      data.data[1].package,
      data.data[1].unit,
      data.data[1].weight,
      data.data[1].origin
    );
    currItemName = data.data[1].name;
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

async function getList(
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
    const itemSelectPriceSpan = document.createElement("span");
    const itemTotalPrice = document.createElement("span");

    itemImg.style = `
    width:420px;
    hight:920px;`;
    itemImg.src = `/api/product/download${img}`;
    itemInfoP.innerText = `${delivery}`;
    itemInfoh2.innerText = `${name}`;
    itemInfo2P.innerText = `${description}`;
    itemPrice_h2.innerText = `${price}원`;
    itemSaleP.innerText = `${manufacturer}`;
    itemPackP.innerText = `${package}`;
    itemUnitP.innerText = `${unit}`;
    itemWeightP.innerText = `${weight}`;
    itemOriginP.innerText = `${origin}`;
    itemSelectSpan.innerText = `${name}`;
    itemSelectPrice.innerText = `${price}원`;
    itemSelectPriceSpan.innerText = `${price}원`;

    itemSelect.append(itemSelectPrice);
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

    let count = 0;
    itemPlus.onclick = () => {
      count++;
      itemEa.innerText = count;
      itemTotalPrice.innerText = `총 상품금액: ${price * count} 원`;

      itemTotal.append(itemTotalPrice);
    };

    itemMinus.onclick = () => {
      if (count > 1) {
        count--;
        itemEa.innerText = count;
        itemTotalPrice.innerText = `총 상품금액: ${price * count} 원`;

        itemTotal.append(itemTotalPrice);
      }
    };

    itemMinus.onclick = () => {
      if (count > 1) {
        count--;
        itemEa.innerText = count;
        itemTotalPrice.innerText = `총 상품금액: ${price * count} 원`;

        itemTotal.append(itemTotalPrice);
      }
    };
  } catch (error) {
    console.log(error);
  }
}

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
  askModal.classList.remove("off");
};

const modalSubmitBtn = document.getElementsByClassName("submit-area")[0];
const modalTextArea = document.getElementById("modal-ask-area");
const modalName = document.getElementById("modal-name");

modalSubmitBtn.onclick = () => {
  const name = modalName.value;
  const value = modalTextArea.value;
  if (name == "" || value == "") return;
  axios
    .post("/api/notice/modalask", {
      userId: "2",
      productName: currItemName,
      name: name,
      text: value,
      answerText: undefined,
      isAnswer: 0,
    })
    .then((data) => {
      console.log(data);
      askModal.classList.toggle("off");
      window.location.reload();
    });
};
//
