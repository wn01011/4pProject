const orderhistory = document.getElementById("myinfo_main_orderhistory");
const review = document.getElementById("myinfo_main_review");
const infoupdate = document.getElementById("myinfo_main_infoupdate");

const orderhistoryList = document.getElementById(
  "myinfo_main_orderhistory_list"
);

async function orderhistoryGetList() {
  orderhistory.classList.add("on");
  try {
    const data = await axios.post("/api/myinfo/orderhistory", {
      userid: document.cookie.split("=")[0],
    });
    console.log("data.data.orderhistoryList : ", data.data.orderhistoryList);

    const orderhistoryItem = document.createElement("li");
    const orderhistoryImgBox = document.createElement("div");
    const orderhistoryImg = document.createElement("img");
    const orderhistoryTextBox = documnet.createElement("div");
    const orderhistoryProductName = document.createElement("span");
    const orderhistoryPriceAmountBox = documnet.createElement("div");
    const orderhistoryPrice = document.createElement("span");
    const orderhistoryAmount = document.createElement("span");

    orderhistoryList.append();
  } catch (error) {}
}

async function reviewGetList() {}

async function userInfoUpdate() {
  const data = await axois.post("/api/myinfo/update", {});
}

orderhistoryGetList();

document.getElementById("myinfo_sidebar_list_item_1").onclick = function () {
  orderhistory.classList.add("on");
  review.classList.remove("on");
  infoupdate.classList.remove("on");
};
document.getElementById("myinfo_sidebar_list_item_2").onclick = function () {
  orderhistory.classList.remove("on");
  review.classList.add("on");
  infoupdate.classList.remove("on");
};
document.getElementById("myinfo_sidebar_list_item_3").onclick = function () {
  orderhistory.classList.remove("on");
  review.classList.remove("on");
  infoupdate.classList.add("on");
};
