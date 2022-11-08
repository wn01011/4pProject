document.getElementById("sign_in_btn").onclick = async function (e) {
  if (!document.getElementById("login_input_id").value) {
    alert("아이디를 입력하십시오.");
    return;
  }
  if (!document.getElementById("login_input_pw").value) {
    alert("비밀번호를 입력하십시오.");
    return;
  }
  // try {
  console.log("아이디와 비밀번호 둘다 있음");
  const data = await axios.post("/api/user/login", {
    id: document.getElementById("login_input_id").value,
    pw: document.getElementById("login_input_pw").value,
  });
  console.log(data.data);
  if (data.data.status != 200) {
    // 로그인 실패 시
    document.getElementById("login_input_id").value = document.getElementById(
      "login_input_pw"
    ).value = "";
    // 아이디 비밀번호 입력값 제거
    alert("아이디와 비밀번호를 확인하십시오.");
  } else if (data.data.status == 200) {
    // 로그인 성공 시
    alert("login 성공");

    location.href = "/index.html";
  }
};
document.getElementById("sign_up_btn").onclick = function () {
  location.href = "/SignUp/index.html";
};
