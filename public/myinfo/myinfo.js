async function orderhistoryGetList() {
  try {
    const data = await axios.post("/api/myinfo/orderhistory", {
      userid: document.cookie.split("=")[0],
    });
  } catch (error) {}
}

async function reviewGetList() {}

async function userInfoUpdate() {
  const data = await axois.post("/api/myinfo/update", {});
}

orderhistoryGetList();

const orderhistory = document.getElementById("myinfo_main_orderhistory");
const review = document.getElementById("myinfo_main_review");
const infoupdate = document.getElementById("myinfo_main_infoupdate");

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
