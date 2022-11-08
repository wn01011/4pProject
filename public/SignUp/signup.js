const inputId = document.getElementById("signup_board_id_input_input");
const inputPw = document.getElementById("signup_board_pw_input_input");
const inputConfirmPw = document.getElementById(
  "signup_board_confirmpw_input_input"
);
const inputName = document.getElementById("signup_board_name_input_input");
// const inputAddress = document.getElementById(
//   "signup_board_address_input_input"
// ).value;
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
document.getElementById("signup_btn_btn").onclick = async () => {
  if (!inputId.value) {
    alert("아이디를 입력하십시오.");
    console.log(inputId.value);
    document.getElementById("signup_board_id_input_input").focus();
    return;
  }
  if (!inputPw.value) {
    alert("비밀번호를 입력하십시오.");
    document.getElementById("signup_board_pw_input_input").focus();
    return;
  }
  if (!inputConfirmPw.value) {
    alert("비밀번호 확인을 입력하십시오.");
    document.getElementById("signup_board_confirmpw_input_input").focus();
    return;
  }
  if (!inputName.value) {
    alert("이름을 입력하십시오.");
    document.getElementById("signup_board_name_input_input").focus();
    return;
  }

  // if (!inputAddress)) {
  //   alert("주소를 입력하십시오.");
  //   document.getElementById("signup_board_address_input_input").focus();
  //   return;
  // }
  console.log(inputPw.value, inputConfirmPw.value);
  if (inputPw.value != inputConfirmPw.value) {
    alert("비밀번호를 확인하십시오.");
    inputPw == "";
    return;
  }
  try {
    const data = await axios.post("/api/user/regist", {
      id: inputId.value,
      pw: inputPw.value,
      name: inputName.value,
      address: "",
      gender: inputGender.value,
      birthday: {
        year: inputYear.value,
        month: inputMonth.value,
        day: inputDay.value,
      },
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
// 주소검색 api
document.getElementById("signup_board_address_btn").onclick = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
      // 예제를 참고하여 다양한 활용법을 확인해 보세요.
      console.log(data.address);
    },
  }).open();
};
