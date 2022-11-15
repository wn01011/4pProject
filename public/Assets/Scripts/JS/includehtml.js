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

let currAudio;
let search;
let cartBtn;
// 카테고리 Btn
let vegiBtn;
let fruitBtn;
let fishBtn;
let meatBtn;
let soupBtn;
let saladBtn;
let noodleBtn;
let drinkBtn;
let cookieBtn;

window.onload = () => {
  const id = setInterval(() => {
    currAudio = document.getElementsByTagName("audio")[0];
    search = document.getElementById("search_input");
    cartBtn = document.getElementById("cartBtn");
    vegiBtn = document.getElementById("vegiBtn");
    fruitBtn = document.getElementById("fruitBtn");
    fishBtn = document.getElementById("fishBtn");
    meatBtn = document.getElementById("meatBtn");
    soupBtn = document.getElementById("soupBtn");
    saladBtn = document.getElementById("saladBtn");
    noodleBtn = document.getElementById("noodleBtn");
    drinkBtn = document.getElementById("drinkBtn");
    cookieBtn = document.getElementById("cookieBtn");

    if (
      currAudio &&
      search &&
      cartBtn &&
      vegiBtn &&
      fruitBtn &&
      fishBtn &&
      meatBtn &&
      soupBtn &&
      saladBtn &&
      saladBtn &&
      noodleBtn &&
      drinkBtn &&
      cookieBtn
    ) {
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

  cartBtn.onclick = () => {
    if (document.cookie) {
      location.href = "/Cart";
    } else {
      location.href = "/SignIn";
    }
  };

  vegiBtn.onclick = () => {
    const currText = vegiBtn.children[1].innerText.replaceAll("·", "-");
    location.href = "/category/general?pick=" + currText;
  };
  fruitBtn.onclick = () => {
    const currText = fruitBtn.children[1].innerText.replaceAll("·", "-");
    location.href = "/category/general?pick=" + currText;
  };
  fishBtn.onclick = () => {
    const currText = fishBtn.children[1].innerText.replaceAll("·", "-");
    location.href = "/category/general?pick=" + currText;
  };
  meatBtn.onclick = () => {
    const currText = meatBtn.children[1].innerText.replaceAll("·", "-");
    location.href = "/category/general?pick=" + currText;
  };
  soupBtn.onclick = () => {
    const currText = soupBtn.children[1].innerText.replaceAll("·", "-");
    location.href = "/category/general?pick=" + currText;
  };
  saladBtn.onclick = () => {
    const currText = saladBtn.children[1].innerText.replaceAll("·", "-");
    location.href = "/category/general?pick=" + currText;
  };
  noodleBtn.onclick = () => {
    const currText = noodleBtn.children[1].innerText.replaceAll("·", "-");
    location.href = "/category/general?pick=" + currText;
  };
  drinkBtn.onclick = () => {
    const currText = drinkBtn.children[1].innerText.replaceAll("·", "-");
    location.href = "/category/general?pick=" + currText;
  };
  cookieBtn.onclick = () => {
    const currText = cookieBtn.children[1].innerText.replaceAll("·", "-");
    location.href = "/category/general?pick=" + currText;
  };
}

let signup;
let signin;
let userinfo;
let userinfotext;
let myinfo;
let logout;
let modal;
let modalBody;
let modalText;
let modalExit;
let modalCancel;
let setAddress;
let thebody;
let addressChangeBtn;

let loop = setInterval(() => {
  let cookieResult = document.cookie;
  signup = document.getElementById("sign_up");
  signin = document.getElementById("sign_in");
  userinfo = document.getElementById("user_info");
  userinfotext = document.getElementById("user_info_text");
  myinfo = document.getElementById("user_info_dropdown_myinfo");
  logout = document.getElementById("user_info_dropdown_logout");
  setAddress = document.getElementById("shipping_address");
  modal = document.getElementById("modal");
  modalBody = document.getElementById("modal_body");
  modalText = document.getElementById("modal_body_text");
  modalExit = document.getElementById("modal_body_exit");
  modalCancel = document.getElementById("modal_body_cancel");
  thebody = document.getElementById("thebody");
  addressChangeBtn = document.getElementById("shipping_address_change_btn");
  window.onscroll = function () {
    if (
      document.body.scrollTop > 180 ||
      document.documentElement.scrollTop > 180
    ) {
      document.getElementById("header_scroll").classList.add("on");
    } else {
      document.getElementById("header_scroll").classList.remove("on");
    }
    console.log("마우스 움직인다.");
  };
  if (cookieResult) {
    if (
      signup &&
      signin &&
      userinfo &&
      userinfotext &&
      logout &&
      cartBtn &&
      setAddress &&
      modal
    ) {
      console.log("조건 맞췄당!");
      signup.classList.add("off");
      signin.classList.add("off");
      userinfo.classList.add("on");
      logout.onclick = () => {
        logoutFunction();
      };
      if (
        decodeURI(document.cookie.split(";")[0].split("=")[1]) == "관리자다"
      ) {
        location.href = "/adminpage";
      }
      userinfotext.innerText =
        document.cookie.split("=")[0] + " 님 어서오십시오.";
      // console.log("로드 완료");
      myinfo.onclick = function () {
        location.href = "/myinfo";
      };
      logout.onclick = async function () {
        try {
          console.log(document.cookie.split("=")[0]);
          await axios.post("/api/user/logout", {
            userId: document.cookie.split("=")[0],
          });
          console.log("액시오스 보냈음");
          signup.classList.remove("off");
          signin.classList.remove("off");
          userinfo.classList.remove("on");
          document.cookie =
            document.cookie?.split(";")[0].split("=")[0] +
            "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
          location.href = "/index.html";
        } catch (error) {
          console.error(error);
        }
      };
      cartBtn.onclick = function () {
        if (document.cookie) {
          location.href = "/Cart";
        } else {
          location.href = "/SigIn";
          console.log("로그인이 안되어있네");
        }
      };
      modalExit.onclick = async function () {
        const data = await axios.post("/api/user/setAddress", {
          userid: document.cookie.split("=")[0],
          address: modalText.innerText,
        });
        thebody.classList.remove("body_onmodal");
        modal.classList.remove("show");
      };
      modalCancel.onclick = async function () {
        thebody.classList.remove("body_onmodal");
        modal.classList.remove("show");
      };
      setAddress.onclick = async () => {
        if (document.cookie) {
          console.log(
            'document.cookie.split("=")[0] : ',
            document.cookie.split("=")[0]
          );
          const data = await axios.post("/api/user/getAddress", {
            id: document.cookie.split("=")[0],
          });
          modalText.innerText = data.data.address;
          modal.classList.add("show");
        } else {
          location.href = "/SignIn";
        }
      };
      addressChangeBtn.onclick = () => {
        new daum.Postcode({
          oncomplete: function (data) {
            console.log(
              'JSON.stringify(data.address).replace(/"/gi, "");',
              JSON.stringify(data.address).replace(/\"/gi, "")
            );
            modalText.innerText = JSON.stringify(data.address).replace(
              /\"/gi,
              ""
            );
          },
        }).open();
      };

      clearInterval(loop);
    }

    // document.getElementById("user_info_dropdown_logout").onclick =
    //   async function () {
    //     try {
    //       const data = await axios.get("/api/user/logout");
    //     } catch (error) {
    //       console.error(error.response.data.message);
    //     }
    //   };
  }
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

// const vegiLink = document.getElementById("cate-vegi")
// const fruitLink = document.getElementById("cate-fruit")

// vegiLink
