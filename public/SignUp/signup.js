const inputId = document.getElementById("signup_board_id_input_input");
const inputPw = document.getElementById("signup_board_pw_input_input");
const inputConfirmpw = document.getElementById(
  "signup_board_confirmpw_input_input"
);
const inputName = document.getElementById("signup_board_name_input_input");
const inputGender = document.querySelector(
  'input[name="gender_radio"]:checked'
);
const inputYear = document.getElementById(
  "signup_board_birthday_inputbox_year"
);
const inputMonth = document.getElementById(
  "signup_board_birthday_inputbox_month"
);
const inputDay = document.getElementById("signup_board_birthday_inputbox_day");
let myAddress;
let regIdTestOkay = false;
const idReg = document.getElementById("signup_board_id_reg");
const idRegText = document.getElementById("signup_board_id_reg_text");
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
const pwReg = document.getElementById("signup_board_pw_reg");
const pwRegText = document.getElementById("signup_board_pw_reg_text");
inputPw.onchange = function (e) {
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
const confirmpw = document.getElementById("signup_board_confirmpw_reg");
const confirmpwText = document.getElementById(
  "signup_board_confirmpw_reg_text"
);

inputConfirmpw.onchange = function (e) {
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

const signUpModal = document.getElementById("deduplication_modal");
const signUpModalBody = document.getElementById("deduplication_modal_body");
const signUpModalText = document.getElementById(
  "deduplication_modal_body_text"
);
const signUpModalExit = document.getElementById("deduplication_modal_exit");
let availableId = 0;
document.getElementById("signup_board_id_deduplication").onclick =
  async function () {
    if (!inputId.value) {
      document.getElementById("thebody").classList.add("body_onmodal");
      signUpModalText.innerText = "아이디를 입력하십시오";
      signUpModal.classList.add("show");
      availableId = 0;
      return;
    }
    if (!regIdTestOkay) {
      document.getElementById("thebody").classList.add("body_onmodal");
      signUpModalText.innerText = "아이디를 형식에 맞게 작성하십시오.";
      signUpModal.classList.add("show");
      availableId = 0;
      return;
    }
    try {
      const data = await axios.post("/api/user/deduplication", {
        id: inputId.value,
      });
      if (data.data.status == 200) {
        document.getElementById("thebody").classList.add("body_onmodal");
        signUpModalText.innerText = "사용 가능한 아이디입니다.";
        signUpModal.classList.add("show");
        availableId = 1;
      } else if (data.data.status == 401) {
        document.getElementById("thebody").classList.add("body_onmodal");
        signUpModalText.innerText = "이미 있는 아이디입니다.";
        signUpModal.classList.add("show");
        availableId = 0;
      }
    } catch (error) {
      console.error(error);
    }
  };
document.getElementById("deduplication_modal_body_exit").onclick = () => {
  document.getElementById("thebody").classList.remove("body_onmodal");
  signUpModal.deduplication_modal_bodyinnerText == "";
  signUpModal.classList.remove("show");
};
document.getElementById("deduplication_modal").onclick = () => {
  document.getElementById("thebody").classList.remove("body_onmodal");
  signUpModal.deduplication_modal_bodyinnerText == "";
  signUpModal.classList.remove("show");
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

document.getElementById("signup_btn_btn").onclick = async () => {
  if (!inputId.value) {
    alert("아이디를 입력하십시오.");
    inputId.focus();
    return;
  }
  if (availableId == 0) {
    alert("아이디가 중복인지 체크하십시오.");
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

  if (inputPw.value != inputConfirmpw.value) {
    alert("비밀번호를 확인하십시오.");
    inputPw == "";
    return;
  }
  try {
    const data = await axios.post("/api/user/regist", {
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
    location.href = "/SignUp/signupclear.html";
  } catch (error) {}
};

const addressCover = document.getElementById("signup_board_address_result");
const addressResult = document.getElementById(
  "signup_board_address_result_text"
);
document.getElementById("signup_board_address_btn").onclick = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      myAddress = data.address;
      addressCover.classList.add("on");
      addressResult.innerText = data.address;
    },
  }).open();
};
