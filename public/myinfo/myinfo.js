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

      reviewTitle.append(reviewProductName);
      reviewTitle.append(reviewCreatedAt);
      reviewTextBox.append(reviewText);
      reviewItem.append(reviewTitle);
      reviewItem.append(reviewTextBox);
      reviewList.append(reviewItem);
    });
  } catch (error) {
    console.error(error);
  }
}
getReviewList();
async function getInquireList() {
  console.log("getInquireList 실행");
  try {
    const data = await axios.post("/api/myinfo/getInquire", {
      userid: document.cookie.split("=")[0],
    });
    console.log("inquire data.data.inquireList : ", data.data.inquireList);
    if (data?.data?.inquireList?.length == 0) {
      inquireNone.classList.add("on");
    }
    data?.data?.inquireList?.forEach((item, index) => {
      const inquireItem = document.createElement("li");
      const inquireTitleBox = document.createElement("div");
      const inquireTitle = document.createElement("div");
      const inquireProductNameCreatedAtBox = document.createElement("div");
      const inquireProductName = document.createElement("span");
      const inquireCreatedAt = document.createElement("span");
      const inquireTextBox = document.createElement("div");
      const inquireText = document.createElement("div");

      inquireTitle.innerText = data.data.inquire[index].name;
      inquireProductName.innerText = data.data.inquire[index].productName;
      inquireCreatedAt.innerText =
        data.data.inquireList[index].createdAt.split("T")[0];
      inquireText.innerText = data.data.inquireList[index].text;

      inquireTitleBox.append(inquireTitle);
      inquireProductNameCreatedAtBox.append(inquireProductName);
      inquireProductNameCreatedAtBox.append(inquireCreatedAt);
      inquireTextBox.append(inquireText);
      inquireItem.append(inquireTitleBox);
      inquireItem.append(inquireProductNameCreatedAtBox);
      inquireItem.append(inquireTextBox);
      inquireList.append(inquireItem);
    });
  } catch (error) {
    console.error(error);
  }
}
// getInquireList();
const inputId = document.getElementById(
  "myinfo_main_infoupdate_list_id_input_input"
);

function getId() {
  inputId.innerText = document.cookie.split("=")[0];
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
