const orderhistory = document.getElementById("myinfo_main_orderhistory");
const review = document.getElementById("myinfo_main_review");
const infoupdate = document.getElementById("myinfo_main_infoupdate");
const orderhistoryNone = document.getElementById(
  "myinfo_main_orderhistory_list_none"
);

const orderhistoryList = document.getElementById(
  "myinfo_main_orderhistory_list"
);

async function orderhistoryGetList() {
  orderhistory.classList.add("on");
  try {
    console.log("쿠키 : ", document.cookie.split("=")[0]);
    if (!document.cookie) {
      location.href = "/SignIn";
    }
    const data = await axios.post("/api/myinfo/orderhistory", {
      userid: document.cookie.split("=")[0],
    });

    console.log("data?.data?.imgList : ", data?.data?.imgList);
    console.log("data?.data?.orderList : ", data?.data?.orderList);
    if (data?.data?.imgList?.length == 0) {
      orderhistoryNone.classList.add("on");
    }
    data?.data?.imgList?.forEach((item, index) => {
      const orderhistoryItem = document.createElement("li");
      const orderhistoryImgBox = document.createElement("div");
      const orderhistoryImg = document.createElement("img");
      const orderhistoryTextBox = document.createElement("div");

      const orderhistoryProductName = document.createElement("span");
      const orderhistoryPriceCountBox = document.createElement("div");
      const orderhistoryPrice = document.createElement("span");
      const orderhistoryCount = document.createElement("span");
      const orderhistoryAddressCreatedAtBox = document.createElement("div");
      const orderhistoryAddress = document.createElement("span");
      const orderhistoryCreatedAt = document.createElement("span");

      orderhistoryImg.setAttribute(
        "src",
        `/api/product/download${data.data.imgList[index]}`
      );
      orderhistoryProductName.innerText = data.data.orderList[index].product;
      orderhistoryPrice.innerText = data.data.orderList[index].price + " 원";
      orderhistoryCount.innerText =
        data.data.orderList[index].count + " 개 구매";
      orderhistoryAddress.innerText = data.data.orderList[index].address;
      orderhistoryCreatedAt.innerText =
        data.data.orderList[index].createdAt.split("T")[0];

      orderhistoryItem.classList.add("myinfo_main_orderhistory_list_item");
      orderhistoryItem.setAttribute(
        "id",
        `myinfo_main_orderhistory_list_item${index}`
      );
      orderhistoryImgBox.classList.add(
        "myinfo_main_orderhistory_list_item_imgBox"
      );
      orderhistoryImgBox.setAttribute(
        "id",
        `myinfo_main_orderhistory_list_item_imgBox${index}`
      );
      orderhistoryImg.classList.add("myinfo_main_orderhistory_list_item_img");
      orderhistoryImg.setAttribute(
        "id",
        `myinfo_main_orderhistory_list_item_img${index}`
      );
      orderhistoryTextBox.classList.add(
        "myinfo_main_orderhistory_list_item_textBox"
      );
      orderhistoryTextBox.setAttribute(
        "id",
        `myinfo_main_orderhistory_list_item_textBox${index}`
      );
      orderhistoryProductName.classList.add(
        "myinfo_main_orderhistory_list_item_productName"
      );
      orderhistoryProductName.setAttribute(
        "id",
        `myinfo_main_orderhistory_list_item_productName${index}`
      );
      orderhistoryPriceCountBox.classList.add(
        "myinfo_main_orderhistory_list_item_countBox"
      );
      orderhistoryPriceCountBox.setAttribute(
        "id",
        `myinfo_main_orderhistory_list_item_countBox${index}`
      );
      orderhistoryPrice.classList.add(
        "myinfo_main_orderhistory_list_item_price"
      );
      orderhistoryPrice.setAttribute(
        "id",
        `myinfo_main_orderhistory_list_item_price${index}`
      );
      orderhistoryCount.classList.add(
        "myinfo_main_orderhistory_list_item_count"
      );
      orderhistoryCount.setAttribute(
        "id",
        `myinfo_main_orderhistory_list_item_count${index}`
      );
      orderhistoryAddressCreatedAtBox.classList.add(
        "myinfo_main_orderhistory_list_item_addressCreatedAtBox"
      );
      orderhistoryAddressCreatedAtBox.setAttribute(
        "id",
        ` myinfo_main_orderhistory_list_item_addressCreatedAtBox${index}`
      );
      orderhistoryAddress.classList.add(
        "myinfo_main_orderhistory_list_item_address"
      );
      orderhistoryAddress.setAttribute(
        "id",
        `myinfo_main_orderhistory_list_item_address${index}`
      );
      orderhistoryCreatedAt.classList.add(
        "myinfo_main_orderhistory_list_item_createdAt"
      );
      orderhistoryCreatedAt.setAttribute(
        "id",
        `myinfo_main_orderhistory_list_item_createdAt${index}`
      );

      orderhistoryImgBox.append(orderhistoryImg);
      orderhistoryTextBox.append(orderhistoryProductName);
      orderhistoryTextBox.append(orderhistoryPriceCountBox);
      orderhistoryPriceCountBox.append(orderhistoryPrice);
      orderhistoryPriceCountBox.append(orderhistoryCount);
      orderhistoryAddressCreatedAtBox.append(orderhistoryAddress);
      orderhistoryAddressCreatedAtBox.append(orderhistoryCreatedAt);
      orderhistoryItem.append(orderhistoryImgBox);
      orderhistoryItem.append(orderhistoryTextBox);
      orderhistoryItem.append(orderhistoryAddressCreatedAtBox);
      orderhistoryList.append(orderhistoryItem);
    });
  } catch (error) {
    console.error(error);
  }
}
const reviewTitle = document.getElementById("myinfo_main_review_title");
const reviewTitleInnerBox = document.getElementById(
  "myinfo_main_reviewInquire_title_innerBox"
);
const reviewTip = document.getElementById("myinfo_main_review_tip");
const inquireTitle = document.getElementById("myinfo_main_inquire_title");
const inquireTip = document.getElementById("myinfo_main_inquire_tip");
const reviewList = document.getElementById("myinfo_main_review_list");
const inquireList = document.getElementById("myinfo_main_inquire_list");
const reviewNone = document.getElementById("myinfo_main_review_list_none");
const inquireNone = document.getElementById("myinfo_main_inquire_list_none");

reviewTitle.onclick = function () {
  reviewTitleInnerBox.classList.remove("on");
  inquireTitle.classList.remove("on");
  reviewTitle.classList.add("on");
  inquireTip.classList.remove("on");
  reviewTip.classList.add("on");
  inquireList.classList.remove("on");
  reviewList.classList.add("on");
};
inquireTitle.onclick = function () {
  reviewTitleInnerBox.classList.add("on");
  reviewTitle.classList.remove("on");
  inquireTitle.classList.add("on");
  reviewTip.classList.remove("on");
  inquireTip.classList.add("on");
  reviewList.classList.remove("on");
  inquireList.classList.add("on");
};

async function getReviewList() {
  console.log("getReviewList 실행");
  try {
    const data = await axios.post("/api/myinfo/getReview", {
      userid: document.cookie.split("=")[0],
    });
    console.log("review data.data.reviewList", data.data.reviewList);
    if (data?.data?.reviewList?.length == 0) {
      reviewNone.classList.add("on");
    }
    data?.data?.reviewList?.forEach((item, index) => {
      const reviewItem = document.createElement("li");
      const reviewTitle = document.createElement("div");
      const reviewProductName = document.createElement("span");
      const reviewCreatedAt = document.createElement("span");
      const reviewTextBox = document.createElement("div");
      const reviewText = document.createElement("span");

      reviewProductName.innerText = data.data.reviewList[index].productName;
      reviewCreatedAt.innerText =
        data.data.reviewList[index].createdAt.split("T")[0];
      reviewText.innerText = data.data.reviewList[index].text;

      reviewItem.classList.add("myinfo_main_review_list_item");
      reviewItem.setAttribute("id", `myinfo_main_review_list_item${index}`);
      reviewTitle.classList.add("myinfo_main_review_list_item_title");
      reviewTitle.setAttribute(
        "id",
        `myinfo_main_review_list_item_title${index}`
      );
      reviewProductName.classList.add(
        "myinfo_main_review_list_item_productName"
      );
      reviewProductName.setAttribute(
        "id",
        `myinfo_main_review_list_item_productName${index}`
      );
      reviewCreatedAt.classList.add("myinfo_main_review_list_item_createdAt");
      reviewCreatedAt.setAttribute(
        "id",
        `myinfo_main_review_list_item_createdAt${index}`
      );
      reviewTextBox.classList.add("myinfo_main_review_list_item_textBox");
      reviewTextBox.setAttribute(
        "id",
        `myinfo_main_review_list_item_textBox${index}`
      );
      reviewText.classList.add("myinfo_main_review_list_item_text");
      reviewText.setAttribute(
        "id",
        `myinfo_main_review_list_item_text${index}`
      );

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
      const inquireTitle = document.createElement("h5");
      const inquireProductNameCreatedAtBox = document.createElement("div");
      const inquireProductName = document.createElement("span");
      const inquireCreatedAt = document.createElement("span");
      const inquireTextBox = document.createElement("div");
      const inquireText = document.createElement("div");
      console.log(
        "data.data.inquire[index].name",
        data.data.inquireList[index].name
      );
      inquireTitle.innerText = data.data.inquireList[index].name;
      inquireProductName.innerText = data.data.inquireList[index].productName;
      inquireCreatedAt.innerText =
        data.data.inquireList[index].createdAt.split("T")[0];
      inquireText.innerText = data.data.inquireList[index].text;

      inquireItem.classList.add("myinfo_main_inquire_list_item");
      inquireItem.setAttribute("id", `myinfo_main_inquire_list_item${index}`);
      inquireTitleBox.classList.add("myinfo_main_inquire_list_item_titleBox");
      inquireTitleBox.setAttribute(
        "id",
        `myinfo_main_inquire_list_item_titleBox${index}`
      );
      inquireTitle.classList.add("myinfo_main_inquire_list_item_title");
      inquireTitle.setAttribute(
        "id",
        `myinfo_main_inquire_list_item_title${index}`
      );
      inquireProductNameCreatedAtBox.classList.add(
        "myinfo_main_inquire_list_item_ProductNameCreatedAtBox"
      );
      inquireProductNameCreatedAtBox.setAttribute(
        "id",
        `myinfo_main_inquire_list_item_ProductNameCreatedAtBox"${index}`
      );
      inquireProductName.classList.add(
        "myinfo_main_inquire_list_item_ProductName"
      );
      inquireProductName.setAttribute(
        "id",
        `myinfo_main_inquire_list_item_ProductName${index}`
      );
      inquireCreatedAt.classList.add("myinfo_main_inquire_list_item_createdAt");
      inquireCreatedAt.setAttribute(
        "id",
        `myinfo_main_inquire_list_item_createdAt${index}`
      );
      inquireTextBox.classList.add("myinfo_main_inquire_list_item_textBox");
      inquireTextBox.setAttribute(
        "id",
        `myinfo_main_inquire_list_item_textBox${index}`
      );
      inquireText.classList.add("myinfo_main_inquire_list_item_text");
      inquireText.setAttribute(
        "id",
        `myinfo_main_inquire_list_item_text${index}`
      );

      inquireTitleBox.append(inquireTitle);
      inquireProductNameCreatedAtBox.append(inquireProductName);
      inquireProductNameCreatedAtBox.append(inquireCreatedAt);
      inquireTextBox.append(inquireText);
      inquireItem.append(inquireTitleBox);
      inquireItem.append(inquireProductNameCreatedAtBox);
      inquireItem.append(inquireTextBox);
      inquireList.append(inquireItem);

      inquireItem.onclick = function () {
        inquireTextBox.classList.toggle("on");
      };
    });
  } catch (error) {
    console.error(error);
  }
}
getInquireList();

const inputId = document.getElementById(
  "myinfo_main_infoupdate_list_id_input_input"
);

function getId() {
  inputId.innerText = document.cookie.split("=")[0];
}
getId();
const inputPw = document.getElementById(
  "myinfo_main_infoupdate_list_pw_input_input"
);
const inputConfirmpw = document.getElementById(
  "myinfo_main_infoupdate_list_confirmpw_input_input"
);
const inputName = document.getElementById(
  "myinfo_main_infoupdate_list_name_input_input"
);
// const inputAddress = document.getElementById(
//   "myinfo_main_infoupdate_list_address_input_input"
// ).value;
const inputGender = document.querySelector(
  'input[name="gender_radio"]:checked'
);
const inputYear = document.getElementById(
  "myinfo_main_infoupdate_list_birthday_inputbox_year"
);
const inputMonth = document.getElementById(
  "myinfo_main_infoupdate_list_birthday_inputbox_month"
);
const inputDay = document.getElementById(
  "myinfo_main_infoupdate_list_birthday_inputbox_day"
);
let myAddress;
let regIdTestOkay = false;
const idReg = document.getElementById("myinfo_main_infoupdate_list_id_reg");
const idRegText = document.getElementById(
  "myinfo_main_infoupdate_list_id_reg_text"
);
const regTest = /[a-zA-Z0-9]/;
const startEng = /^[a-zA-Z]/;
const onlyEngNum = /[^a-zA-Z0-9]+/;

let regPwTestOkay = false;
const pwReg = document.getElementById("myinfo_main_infoupdate_list_pw_reg");
const pwRegText = document.getElementById(
  "myinfo_main_infoupdate_list_pw_reg_text"
);
inputPw.onchange = function (e) {
  console.log(inputPw.value);
  if (e.target.value.length > 0) {
    if (regTest.test(e.target.value)) {
      if (startEng.test(e.target.value)) {
        if (e.target.value.length > 7) {
          if (e.target.value.length < 17) {
            if (!onlyEngNum.test(e.target.value)) {
              pwReg.classList.add("on");
              pwRegText.classList.add("okay");
              pwRegText.innerText = "올바른 비밀번호 형식입니다.";
              regPwTestOkay = true;
            } else {
              pwRegText.classList.remove("okay");
              pwReg.classList.add("on");
              pwRegText.innerText =
                "아이디는 영어와 숫자로만 구성할 수 있습니다.";
              regPwTestOkay = false;
            }
          } else {
            pwRegText.classList.remove("okay");
            pwReg.classList.add("on");
            pwRegText.innerText = "비밀번호는 16글자 이하이어야 합니다.";
            regPwTestOkay = false;
          }
        } else {
          pwRegText.classList.remove("okay");
          pwReg.classList.add("on");
          pwRegText.innerText = "비밀번호는 8글자 이상이어야 합니다.";
          regPwTestOkay = false;
        }
      } else {
        pwRegText.classList.remove("okay");
        pwReg.classList.add("on");
        pwRegText.innerText = "비밀번호는 영어로 시작해야 합니다.";
        regPwTestOkay = false;
      }
    } else {
      pwRegText.classList.remove("okay");
      pwReg.classList.add("on");
      pwRegText.innerText = "비밀번호는 영어와 숫자만 사용 가능합니다.";
      regPwTestOkay = false;
    }
  } else {
    pwRegText.classList.remove("okay");
    pwReg.classList.remove("on");
    pwRegText.innerText = "";
    regPwTestOkay = false;
  }
};

let confirmpwTestOkay = false;
const confirmpw = document.getElementById(
  "myinfo_main_infoupdate_list_confirmpw_reg"
);
const confirmpwText = document.getElementById(
  "myinfo_main_infoupdate_list_confirmpw_reg_text"
);

inputConfirmpw.onchange = function (e) {
  console.log(inputConfirmpw.value);
  if (inputConfirmpw.value.length > 0) {
    if (inputPw.value == inputConfirmpw.value) {
      confirmpwText.classList.add("okay");
      confirmpw.classList.add("on");
      confirmpwText.innerText = "비밀번호가 일치합니다.";
      confirmpwTestOkay = true;
    } else {
      confirmpwText.classList.remove("okay");
      confirmpw.classList.add("on");
      confirmpwText.innerText = "비밀번호가 일치하지 않습니다.";
      confirmpwTestOkay = false;
    }
  } else {
    confirmpwText.classList.remove("okay");
    confirmpw.classList.remove("on");
    confirmpwText.innerText = "";
    confirmpwTestOkay = false;
  }
};

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal_body");
const modalText = document.getElementById("modal_body_text");
const modalExit = document.getElementById("modal_exit");

document.getElementById("modal_body_exit").onclick = () => {
  modal.modal_bodyinnerText == "";
  modal.classList.remove("show");
  location.href = "/";
};

const onlyNum = /[^0-9]+/;
let now = new Date();
let nowYear = now.getFullYear();
inputYear.onchange = function (e) {
  if (
    onlyNum.test(e.target.value) ||
    e.target.value > nowYear ||
    e.target.value < 1900
  )
    inputYear.value = "";
};

inputMonth.onchange = function (e) {
  if (onlyNum.test(e.target.value) || e.target.value > 12 || e.target.value < 1)
    inputMonth.value = "";
};
inputDay.onchange = function (e) {
  if (onlyNum.test(e.target.value) || e.target.value > 31 || e.target.value < 1)
    inputDay.value = "";
};

document.getElementById("update_btn_btn").onclick = async () => {
  if (!inputPw.value) {
    alert("비밀번호를 입력하십시오.");
    inputPw.focus();
    return;
  }
  if (!inputConfirmpw.value) {
    alert("비밀번호 확인을 입력하십시오.");
    inputConfirmpw.focus();
    return;
  }
  if (!inputName.value) {
    alert("이름을 입력하십시오.");
    inputName.focus();
    return;
  }

  if (addressResult.innerText == "") {
    alert("주소를 입력하십시오.");
    return;
  }
  console.log(inputPw.value, inputConfirmpw.value);
  if (inputPw.value != inputConfirmpw.value) {
    alert("비밀번호를 확인하십시오.");
    inputPw == "";
    return;
  }
  try {
    console.log(myAddress);
    const data = await axios.post("/api/myinfo/update", {
      id: document.cookie.split("=")[0],
      pw: inputPw.value,
      name: inputName.value,
      address: myAddress,
      gender: inputGender.value,
      birthday: {
        year: inputYear.value,
        month: inputMonth.value,
        day: inputDay.value,
      },
    });
    console.log("data : ", data);
    console.log("data.data.status : ", data.data.status);
    if (data.data.status == 200) {
      document.getElementById("thebody").classList.add("body_onmodal");
      modalText.innerText = "수정이 완료되었습니다.";
      modal.classList.add("show");
    }
  } catch (error) {
    console.error(error);
  }
};

const addressCover = document.getElementById(
  "myinfo_main_infoupdate_list_address_result"
);
const addressResult = document.getElementById(
  "myinfo_main_infoupdate_list_address_result_text"
);
document.getElementById("myinfo_main_infoupdate_list_address_btn").onclick =
  () => {
    new daum.Postcode({
      oncomplete: function (data) {
        myAddress = data.address;
        addressCover.classList.add("on");
        addressResult.innerText = data.address;
      },
    }).open();
  };

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
