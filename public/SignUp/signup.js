const inputId = document.getElementById("signup_board_id_input_input");
const inputIdValue = document.getElementById(
  "signup_board_id_input_input"
).value;
const inputPw = document.getElementById("signup_board_pw_input_input");
const inputPwValue = document.getElementById(
  "signup_board_pw_input_input"
).value;
const inputConfirmPw = document.getElementById(
  "signup_board_confirmpw_input_input"
);
const inputConfirmPwValue = document.getElementById(
  "signup_board_confirmpw_input_input"
).value;
const inputName = document.getElementById("signup_board_name_input_input");
const inputNameValue = document.getElementById(
  "signup_board_name_input_input"
).value;
// const inputAddress = document.getElementById(
//   "signup_board_address_input_input"
// ).value;
const inputGender = document.querySelector(
  'input[name="gender_radio"]:checked'
);
const inputGenderValue = document.querySelector(
  'input[name="gender_radio"]:checked'
).value;
const inputYear = document.getElementById(
  "signup_board_birthday_inputbox_year"
);
const inputYearValue = document.getElementById(
  "signup_board_birthday_inputbox_year"
).value;
const inputMonth = document.getElementById(
  "signup_board_birthday_inputbox_month"
);
const inputMonthValue = document.getElementById(
  "signup_board_birthday_inputbox_month"
).value;
const inputDay = document.getElementById("signup_board_birthday_inputbox_day");
const inputDayValue = document.getElementById(
  "signup_board_birthday_inputbox_day"
).value;

document.getElementById("signup_btn_btn").onclick = async () => {
  if (!inputIdValue) {
    alert("아이디를 입력하십시오.");
    document.getElementById("signup_board_id_input_input").focus();
    return;
  }
  if (!inputPw) {
    alert("비밀번호를 입력하십시오.");
    document.getElementById("signup_board_pw_input_input").focus();
    return;
  }
  if (!inputConfirmPw) {
    alert("비밀번호 확인을 입력하십시오.");
    document.getElementById("signup_board_confirmpw_input_input").focus();
    return;
  }
  if (!inputName) {
    alert("이름을 입력하십시오.");
    document.getElementById("signup_board_name_input_input").focus();
    return;
  }
  // if (!inputAddress)) {
  //   alert("주소를 입력하십시오.");
  //   document.getElementById("signup_board_address_input_input").focus();
  //   return;
  // }
  if (inputPw == inputConfirmPw) {
    alert("비밀번호를 확인하십시오.");
    inputPw == "";
    return;
  }
  try {
    const data = await axios.post("/api/user/regist", {
      id: inputIdValue,
      pw: inputPw,
      name: inputName,
      // address:,
      gender: inputGender,
      birthday: {
        year: inputYear,
        month: inputMonth,
        day: inputDay,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
