document.forms["login_form"].onsubmit = async function (e) {
  e.preventDefault();
  if (
    !document.getElementById("login_input_id").value ||
    !document.getElementById("login_input_pw").value
  )
    return;
  try {
    const data = await axios.post("/api/user/login", {
      id: document.getElementById("login_input_id").value,
      pw: e.target["login_input_pw"].value,
    });
    if (data.data.status != 200) {
      // 로그인 실패 시
      document.getElementById("login_input_id").value = document.getElementById(
        "login_input_pw"
      ).value = "";
      // 아이디 비밀번호 입력값 제거
      alert("아이디와 비밀번호를 확인하십시오.");
    } else {
      // 로그인 성공 시
      document.getElementById("sign_up").classList.add("off");
      document.getElementById("sign_in").classList.add("off");
      document.getElementById("user_info").classList.add("on");
    }
  } catch (error) {
    console.error(error.response.data.message);
  }
};
