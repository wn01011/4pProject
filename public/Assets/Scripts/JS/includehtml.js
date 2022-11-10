function includeHTML(divContainer, urlHTML) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        divContainer.innerHTML = this.responseText;
      }
    }
  };
  xhttp.open("GET", urlHTML, true);
  xhttp.send();
}
// header footer를 include하는 함수입니다.

includeHTML(document.getElementById("header_include"), "/header.html");
includeHTML(document.getElementById("footer_include"), "/footer.html");
// item slide html include하는 함수입니다.

function getCookie(cookieName) {
  cookieName = `${cookieName}=`;
  let cookieData = document.cookie;
  let cookieValue = "";
  let start = cookieData.indexOf(cookieName);
  if (start !== -1) {
    start += cookieName.length;
    let end = cookieData.indexOf(";", start);
    if (end === -1) end = cookieData.length;
    cookieValue = cookieData.substring(start, end);
  }
  console.log("unescape : ", unescape(cookieValue));
  return cookieValue;
}

window.onscroll = function () {
  if (
    document.body.scrollTop > 180 ||
    document.documentElement.scrollTop > 180
  ) {
    document.getElementById("header_scroll").classList.add("on");
  } else {
    document.getElementById("header_scroll").classList.remove("on");
  }
};

let currAudio;
let search;

window.onload = () => {
  const id = setInterval(() => {
    currAudio = document.getElementsByTagName("audio")[0];
    search = document.getElementById("search_input");

    if (currAudio && search) {
      OnLoadCallBack();
      clearInterval(id);
    }
  }, 100);
};

function OnLoadCallBack() {
  window.onclick = () => {
    currAudio.play();
    window.onclick = () => {};
  };

  search.onchange = () => {
    location.href = "/search?sword=" + search.value;
  };
}

let signup;
let signin;
let userinfo;
let userinfotext;
let logout;
let loop = setInterval(() => {
  let cookieResult = document.cookie;

  signup = document.getElementById("sign_up");
  signin = document.getElementById("sign_in");
  userinfo = document.getElementById("user_info");
  userinfotext = document.getElementById("user_info_text");
  logout = document.getElementById("user_info_dropdown_logout");
  if (cookieResult) {
    if (signup && signin && userinfo && userinfotext && logout) {
      signup.classList.add("off");
      signin.classList.add("off");
      userinfo.classList.add("on");
      logout.onclick = () => {
        logoutFunction();
      };
      console.log(document.cookie);
      if (
        decodeURI(document.cookie.split(";")[0].split("=")[1]) == "관리자다"
      ) {
        location.href = "/adminpage";
      }
      userinfotext.innerText =
        document.cookie.split("=")[0] + " 님 어서오십시오.";
      console.log("로드 완료");
      // logoutFunction();
      clearInterval(loop);
    }
  }
  // document.getElementById("user_info_dropdown_logout").onclick =
  //   async function () {
  //     try {
  //       const data = await axios.get("/api/user/logout");
  //     } catch (error) {
  //       console.error(error.response.data.message);
  //     }
  //   };
}, 50);

function deleteCookie(name) {
  signup.classList.remove("off");
  signin.classList.remove("off");
  userinfo.classList.remove("on");
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
}

function getUserId() {
  return document.cookie?.split(";")[0].split("=")[0];
}

function logoutFunction() {
  console.log("로그아웃");
  // logout.onclick = logoutFunction2();
  // logout.addEventListener("click", logoutFunction2());
  deleteCookie(getUserId());
  // logout.addEventListener("click", temp());
}
async function logoutFunction2() {
  console.log("쿠키제거하러 갔다.");

  await axios.post("/api/user/logout", {
    userId: document.cookie.split("=")[0],
  });
  console.log("쿠키 제거하고 왔다.");
  location.href = "/index.html";
}
