// // const bodyHeight = innerHeight.getBoundingClientRect().height;

// document.addEventListener("scroll", () => {
//   const uparrow = document.getElementById("uparrow");
//   const y = window.pageYOffset;
//   if (y > 1000) {
//     uparrow.classList.add("active");
//   } else {
//     uparrow.classList.remove("active");
//   }
// });

// const sellRegi = document.getElementById("sell-regi"),
//   btnRegi = document.querySelector(".regi-before-go"),
//   regiSubmit = document.getElementById("regi-submit");

// btnRegi.addEventListener("click", function () {
//   sellRegi.classList.add("add");
// });

// regiSubmit.addEventListener("click", function () {
//   sellRegi.classList.remove("add");
// });

// const bCatInput = document.getElementById("b-cat-input");
// const bigCatIp = document.getElementById("bigcatip");
// const bCatSave = document.getElementById("b-cat-save");

// bCatInput.addEventListener("click", function () {
//   bigCatIp.classList.add("bigdirinput");
// });

// bCatInput.addEventListener("click", function () {
//   bCatSave.classList.add("bigdirsave");
// });

// 아래는 DB 컴컴

// 상품 목록
axios
  .post("/api/adminpage/product", { name: "" })
  .then((data) => {
    console.log(data);
    let count = 0;
    const sthManage1 = document
      .getElementById("sth-manage1")
      .getElementsByTagName("table")[0];
    console.log(data.data[0].name);
    for (let i = 0; i < data.data.length; i++) {
      let curRow = sthManage1
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr")[count++];
      let curTds = curRow.getElementsByTagName("td");
      // console.log(data.data[i]);
      curTds[0].innerText = data.data[i].manufacturer;
      curTds[1].innerText = data.data[i].name;
      curTds[2].innerText = data.data[i].price + "원";
      curTds[3].innerText = data.data[i].delivery;
      curTds[4].innerText = JSON.stringify(data.data[i].category[0]);
    }
  })
  .catch((error) => {
    throw error;
  });

// 회원 관리
axios
  .post("/api/adminpage/user", { userId: "" })
  .then((data) => {
    console.log(data);
    let count = 0;
    const userManage1 = document
      .getElementById("ppl-manage1")
      .getElementsByTagName("table")[0];
    console.log(data.data[0].userId);
    for (let i = 0; i < data.data.length; i++) {
      let curRow = userManage1
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr")[count++];
      let curTds = curRow.getElementsByTagName("td");
      curTds[0].innerText = data.data[i].userId;
      curTds[1].innerText = data.data[i].name;
      curTds[2].innerText = data.data[i].address;
      curTds[3].innerText = data.data[i].gender;
      curTds[4].innerText = data.data[i].birthday;
      curTds[5].innerText = data.data[i].createdAt.slice(0, 10);
    }
  })
  .catch((error) => {
    throw error;
  });

// Q&A 문의 관리

axios
  .post("/api/adminpage/qna", { productName: "" })
  .then((data) => {
    console.log(data);
    let count = 0;
    const qnaManage1 = document
      .getElementById("qna-manage1")
      .getElementsByTagName("table")[0];
    console.log(data.data[0].userId);
    for (let i = 0; i < data.data.length; i++) {
      let curRow = qnaManage1
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr")[count++];
      let curTds = curRow.getElementsByTagName("td");
      curTds[0].innerText = data.data[i].name;
      curTds[1].innerText = data.data[i].productName;
      curTds[2].innerText = data.data[i].userId;
      curTds[3].innerText = data.data[i].createdAt.slice(0, 10);
      curTds[4].innerText = data.data[i].isAnswer;
    }
  })
  .catch((error) => {
    throw error;
  });

// 리뷰 관리
axios
  .post("/api/adminpage/review", { productName: "" })
  .then((data) => {
    console.log(data);
    let count = 0;
    const reviewManage1 = document
      .getElementById("review-manage1")
      .getElementsByTagName("table")[0];
    for (let i = 0; i < data.data.length; i++) {
      let curRow = reviewManage1
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr")[count++];
      let curTds = curRow.getElementsByTagName("td");
      curTds[0].innerText = data.data[i].userId;
      curTds[1].innerText = data.data[i].productName;
      curTds[2].innerText = data.data[i].text;
      curTds[3].innerText = data.data[i].createdAt.slice(0, 10);
    }
  })
  .catch((error) => {
    throw error;
  });

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  // console.log((document.cookie = cookie), cookie, document.cookie);
  location.href = "http://localhost:8080/";
}

function getUserId() {
  let userId = document.cookie?.split(";")[0].split("=")[0];
  console.log(userId);
  return userId;
}

function logoutFunction() {
  console.log("로그아웃");
  // logout.onclick = logoutFunction2();
  // logout.addEventListener("click", logoutFunction2());
  deleteCookie(getUserId());

  // logout.addEventListener("click", temp());
}
