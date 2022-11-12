const orderhistory = document.getElementById("myinfo_main_orderhistory");
const review = document.getElementById("myinfo_main_review");
const infoupdate = document.getElementById("myinfo_main_infoupdate");

const orderhistoryList = document.getElementById(
  "myinfo_main_orderhistory_list"
);

async function orderhistoryGetList() {
  orderhistory.classList.add("on");
  try {
    console.log("쿠키 : ", document.cookie.split("=")[0]);
    const data = await axios.post("/api/myinfo/orderhistory", {
      userid: document.cookie.split("=")[0],
    });

    console.log("data?.data?.imgList : ", data?.data?.imgList);
    console.log("data?.data?.orderList : ", data?.data?.orderList);
    data?.data?.imgList?.forEach((item, index) => {
      const orderhistoryItem = document.createElement("li");
      const orderhistoryImgBox = document.createElement("div");
      const orderhistoryImg = document.createElement("img");
      const orderhistoryTextBox = document.createElement("div");
      const orderhistoryProductName = document.createElement("span");
      const orderhistoryPriceCountBox = document.createElement("div");
      const orderhistoryPrice = document.createElement("span");
      const orderhistoryCount = document.createElement("span");

      orderhistoryImg.setAttribute(
        "src",
        `/api/product/download${data.data.imgList[index]}`
      );
      orderhistoryProductName.innerText = data.data.orderList[index].product;
      orderhistoryPrice.innerText = data.data.orderList[index].price + " 원";
      orderhistoryCount.innerText =
        data.data.orderList[index].count + " 개 구매";

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

      orderhistoryImgBox.append(orderhistoryImg);
      orderhistoryTextBox.append(orderhistoryProductName);
      orderhistoryTextBox.append(orderhistoryPriceCountBox);
      orderhistoryPriceCountBox.append(orderhistoryPrice);
      orderhistoryPriceCountBox.append(orderhistoryCount);

      orderhistoryItem.append(orderhistoryImgBox);
      orderhistoryItem.append(orderhistoryTextBox);

      orderhistoryList.append(orderhistoryItem);
    });
  } catch (error) {
    console.error(error);
  }
}

// async function reviewGetList() {}

const inputId = document.getElementById(
  "myinfo_main_infoupdate_list_id_input_input"
);
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
inputId.oninput = function (e) {
  if (e.target.value.length > 0) {
    if (regTest.test(e.target.value)) {
      if (startEng.test(e.target.value)) {
        if (e.target.value.length > 7) {
          if (e.target.value.length < 17) {
            // 8글자이상, 16글자 이하
            if (!onlyEngNum.test(e.target.value)) {
              idReg.classList.add("on");
              idRegText.classList.add("okay");
              idRegText.innerText = "올바른 아이디 형식입니다.";
              regIdTestOkay = true;
            } else {
              idRegText.classList.remove("okay");
              idReg.classList.add("on");
              idRegText.innerText =
                "아이디는 영어와 숫자로만 구성할 수 있습니다.";
              regIdTestOkay = false;
            }
          } else {
            idRegText.classList.remove("okay");
            idReg.classList.add("on");
            idRegText.innerText = "아이디는 16글자 이하이어야 합니다.";
            regIdTestOkay = false;
          }
        } else {
          idRegText.classList.remove("okay");
          idReg.classList.add("on");
          idRegText.innerText = "아이디는 8글자 이상이어야 합니다.";
          regIdTestOkay = false;
        }
      } else {
        idRegText.classList.remove("okay");
        idReg.classList.add("on");
        idRegText.innerText = "아이디는 영어로 시작해야 합니다.";
        regIdTestOkay = false;
      }
    } else {
      idRegText.classList.remove("okay");
      idReg.classList.add("on");
      idRegText.innerText = "아이디는 영어와 숫자만 사용 가능합니다.";
      regIdTestOkay = false;
    }
  } else {
    idRegText.classList.remove("okay");
    idReg.classList.remove("on");
    idRegText.innerText = "";
    regIdTestOkay = false;
  }
};

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

const modal = document.getElementById("deduplication_modal");
const modalBody = document.getElementById("deduplication_modal_body");
const modalText = document.getElementById("deduplication_modal_body_text");
const modalExit = document.getElementById("deduplication_modal_exit");

document.getElementById(
  "myinfo_main_infoupdate_list_id_deduplication"
).onclick = async function () {
  if (!inputId.value) {
    modalText.innerText = "아이디를 입력하십시오";
    modal.classList.add("show");
    return;
  }
  if (!regIdTestOkay) {
    modalText.innerText = "아이디를 형식에 맞게 작성하십시오.";
    modal.classList.add("show");
    return;
  }
  try {
    const data = await axios.post("/api/myinfo/duplication", {
      id: inputId.value,
    });
    console.log("data.data.status : ", data.data.status);
    if (data.data.status == 200) {
      modalText.innerText = "사용 가능한 아이디입니다.";
      modal.classList.add("show");
    } else if (data.data.status == 401) {
      modalText.innerText = "이미 있는 아이디입니다.";
      modal.classList.add("show");
    }
  } catch (error) {
    console.error(error);
  }
};
document.getElementById("deduplication_modal_body_exit").onclick = () => {
  modal.deduplication_modal_bodyinnerText == "";
  modal.classList.remove("show");
};
document.getElementById("deduplication_modal").onclick = () => {
  modal.deduplication_modal_bodyinnerText == "";
  modal.classList.remove("show");
};

// 연착 증명서 : 서울 교통 공사, 지하철역
// 교통어플 캡처 : 도착 예정시간이 지연인지 아닌지
// 지각한 날을 포함해서 7일치 교통내역

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
  if (!inputId.value) {
    alert("아이디를 입력하십시오.");
    console.log(inputId.value);
    inputId.focus();
    return;
  }
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

  // if (!inputAddress)) {
  //   alert("주소를 입력하십시오.");
  //   document.getElementById("myinfo_main_infoupdate_list_address_input_input").focus();
  //   return;
  // }
  console.log(inputPw.value, inputConfirmpw.value);
  if (inputPw.value != inputConfirmpw.value) {
    alert("비밀번호를 확인하십시오.");
    inputPw == "";
    return;
  }
  try {
    console.log(myAddress);
    const data = await axios.post("/api/myinfo/update", {
      id: inputId.value,
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
    console.log(data);
    modalText.innerText = "수정이 완료되었습니다.";
    modal.classList.add("show");
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
