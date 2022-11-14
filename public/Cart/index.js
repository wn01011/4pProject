const cartBoard = document.getElementById("cart_basket_bottom");
let cartData;
const noneCart = document.getElementById("cart_basket_bottom_none");
let imgNum = [];
async function getProductImg(nametoImgNum) {
  console.log("getProductImg 실행");
  try {
    const data = await axios.post("/api/product/getImage", {
      data: nametoImgNum,
    });
    console.log("getProductImg() data.data.list : ", data.data.list);
    imgNum = [...data.data.list];
    console.log("imgNum :", imgNum);
    callback();
  } catch (error) {
    console.error(error);
  }
}

let amountPrice = document.getElementById("checklist_amount_price");
let amountCost = document.getElementById("checklist_amount_cost");
let amountDue = document.getElementById("checklist_amount_amountdue");
let priceSum;
function amountCalculate() {
  priceSum = 0;
  cartData?.data?.list?.forEach((item, index) => {
    let amountItem = parseInt(
      document.getElementById(`textAmount${index}`)?.innerText
    );
    let priceItem = parseInt(cartData.data.list[index].price);
    priceSum += amountItem * priceItem;
    amountPrice.innerText = priceSum;
  });
  amountCost.innerText = 3000;
  amountDue.innerText = parseInt(priceSum) + parseInt(amountCost.innerText);
}
// amountCalculate();

function callback() {
  console.log(imgNum);
  cartData?.data?.list?.forEach((item, index) => {
    console.log("item : ", item);
    const listItem = document.createElement("div");
    const listCheckBox = document.createElement("div");
    const listCheck = document.createElement("input");
    const listImgBox = document.createElement("div");
    const listImg = document.createElement("img");
    const listTitle = document.createElement("div");
    const listAmountBox = document.createElement("div");
    const listAmountBox2 = document.createElement("div");
    const listAmountMinus = document.createElement("button");
    const listAmountPlus = document.createElement("button");
    const listAmount = document.createElement("div");
    const listPrice = document.createElement("div");
    const listDelete = document.createElement("div");
    console.log("index : ", index);
    console.log("imgNum : ", imgNum);
    // console.log("imgNum : ", imgNum[index]);
    listCheck.setAttribute("type", "checkbox");
    listImg.setAttribute("src", `/api/product/download${imgNum[index]}`);
    listTitle.innerText = cartData.data.list[index].name;
    listAmountMinus.innerText = "-";
    listAmount.innerText = cartData.data.list[index].amount;
    listAmountPlus.innerText = "+";
    listPrice.innerText =
      cartData.data.list[index].price * cartData.data.list[index].amount;
    listDelete.innerText = "×";

    listItem.classList.add("cart_basket_bottom_item");
    listCheckBox.classList.add("cart_basket_bottom_item_checkBox");
    listCheck.classList.add("cart_basket_bottom_item_check");
    listImgBox.classList.add("cart_basket_bottom_item_imgBox");
    listImg.classList.add("cart_basket_bottom_item_img");
    listTitle.classList.add("cart_basket_bottom_item_title");
    listAmountBox.classList.add("cart_basket_bottom_item_amountBox");
    listAmountBox2.classList.add("cart_basket_bottom_item_amountBox2");
    listAmountMinus.classList.add("cart_basket_bottom_item_amountMinus");
    listAmountMinus.setAttribute("id", `btnMinus${index}`);
    listAmountPlus.classList.add("cart_basket_bottom_item_amountPlus");
    listAmountPlus.setAttribute("id", `btnPlus${index}`);
    listAmount.classList.add("cart_basket_bottom_item_amount");
    listAmount.setAttribute("id", `textAmount${index}`);
    listPrice.classList.add("cart_basket_bottom_item_price");
    listPrice.setAttribute("id", `textPrice${index}`);
    listDelete.classList.add("cart_basket_bottom_item_delete");
    listDelete.setAttribute("id", `btnDelete${index}`);

    listCheckBox.append(listCheck);
    listImgBox.append(listImg);
    listAmountBox2.append(listAmountMinus);
    listAmountBox2.append(listAmount);
    listAmountBox2.append(listAmountPlus);
    listAmountBox.append(listAmountBox2);

    listItem.append(listCheckBox);
    listItem.append(listImgBox);
    listItem.append(listTitle);
    listItem.append(listAmountBox);
    listItem.append(listPrice);
    listItem.append(listDelete);
    cartBoard.append(listItem);

    const btnMinus = document.getElementById(`btnMinus${index}`);
    const btnPlus = document.getElementById(`btnPlus${index}`);
    const textAmount = document.getElementById(`textAmount${index}`);
    const btnDelete = document.getElementById(`btnDelete${index}`);
    const textPrice = document.getElementById(`textPrice${index}`);
    btnMinus.onclick = function () {
      if (textAmount.innerText > 1) {
        textAmount.innerText = textAmount.innerText - 1;
        textPrice.innerText =
          textAmount.innerText * cartData.data.list[index].price;
        amountCalculate();
      } else {
      }
    };
    btnPlus.onclick = function () {
      if (textAmount.innerText < 99) {
        textAmount.innerText = parseInt(textAmount.innerText) + 1;
        textPrice.innerText =
          textAmount.innerText * cartData.data.list[index].price;
        amountCalculate();
      }
    };
    console.log(cartData);
    // btnDelete.onclick = function () {
    //   // const productName =
    //   axios
    //     .post("/api/cart/delete", {
    //       name: cartData.data.list[index].name,
    //     })
    //     .then((result) => {
    //       console.log("result : ",  result);
    //       getCartList();
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // };
    btnDelete.onclick = async function () {
      // const productName =
      try {
        const productName = await axios.post("/api/cart/delete", {
          name: cartData.data.list[index].name,
        });
        console.log("productName : ", productName);
        getCartList();
      } catch (error) {
        console.error(error);
      }
    };
    amountCalculate();
  });
}

async function getCartList() {
  if (!document.cookie) {
    location.href = "/index.html";
    return;
  }
  try {
    cartData = await axios.post("/api/cart/cartlist", {
      userid: document.cookie.split("=")[0],
    });
    cartBoard.innerHTML = "";
    console.log("불러왔다구~");
    console.log("cartData.data.list", cartData.data.list);
    console.log("cartData.data.list.length : ", cartData.data.list.length);
    if (cartData.data.list.length == 0) {
      noneCart.classList.add("on");
    } else {
      noneCart.classList.remove("on");
      let nametoImgNum = [];
      cartData?.data?.list?.forEach((item, index) => {
        nametoImgNum.push(cartData.data.list[index].name);
      });
      getProductImg(nametoImgNum);
    }
  } catch (error) {
    console.error(error);
  }
}

getCartList();

const address = document.getElementById("checklist_shipping_address_address");
let myAddress;

async function getAddress() {
  try {
    const data = await axios.post("/api/cart/address", {
      userid: document.cookie.split("=")[0],
    });
    address.innerText = data.data.address;
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("checklist_shipping_address_btn").onclick = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      myAddress = data.address;
      address.innerText = data.address;
    },
  }).open();
};

getAddress();

const cartModal = document.getElementById("cart_modal");
const cartModalBody = document.getElementById("cart_modal_body");
const cartModalText = document.getElementById("cart_modal_body_text");
const cartModalExit = document.getElementById("cart_modal_exit");

document.getElementById("cart_order_orderbutton").onclick = async () => {
  let orderlist = [];
  cartData?.data?.list?.forEach((item, index) => {
    orderlist.push({
      userid: document.cookie.split("=")[0],
      price: parseInt(cartData.data.list[index].price),

      product: cartData.data.list[index].name,
      count: parseInt(document.getElementById(`textAmount${index}`)?.innerText),
      address: address.innerText,
    });
  });
  console.log("orderlist : ", orderlist);
  const data = await axios.post("/api/cart/order", {
    orderlist: orderlist,
  });
  document.getElementById("thebody").classList.add("body_onmodal");
  cartModal.classList.add("show");
};

document.getElementById("cart_modal").onclick = () => {
  window.location.reload();
  cartModal.classList.remove("show");
};
