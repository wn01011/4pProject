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
      data.data[0].price,
      data.data[0].manufacturer,
      data.data[0].package,
      data.data[0].unit,
      data.data[0].weight,
      data.data[0].origin
    );
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
const total = document.getElementById("total-price");
const totalText = document.getElementById("total-price-text");
const totalWonText = document.getElementById("total-price-won");

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
    const itemTotalPrice = document.createElement("span");
    const itemSelectPriceLi = document.createElement("li");

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
    totalText.innerText = `총 상품금액:`;
    itemSelectPrice.innerText = `${price}원`;
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
