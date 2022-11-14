// // const bodyHeight = innerHeight.getBoundingClientRect().height;

document.body.onload = () => {
  document.addEventListener("scroll", () => {
    const uparrow = document.getElementById("uparrow");
    const y = window.pageYOffset;
    if (y > 1000) {
      uparrow.classList.add("active");
    } else {
      uparrow.classList.remove("active");
    }
  });

  const sellRegi = document.getElementById("sell-regi"),
    btnRegi = document.querySelector(".regi-before-go"),
    regiSubmit = document.getElementById("regi-submit");

  btnRegi.addEventListener("click", function () {
    sellRegi.classList.add("add");
  });

  regiSubmit.addEventListener("click", function () {
    sellRegi.classList.remove("add");
  });

  const bCatInput = document.getElementById("b-cat-input");
  const bigCatIp = document.getElementById("bigcatip");
  const bCatSave = document.getElementById("b-cat-save");

  bCatInput.addEventListener("click", function () {
    bigCatIp.classList.add("bigdirinput");
  });
  function deleteCookie(name) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
    // console.log((document.cookie = cookie), cookie, document.cookie);
    location.href = "http://localhost:8080/";
  }

  function getUserId() {
    let userId = document.cookie?.split(";")[0].split("=")[0];
    console.log(userId);
    return userId;
  }

  bCatInput.addEventListener("click", function () {
    bCatSave.classList.add("bigdirsave");
  });

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
      console.log(data.data.length);
      for (let i = 0; i < data.data.length; i++) {
        let curRow = sthManage1
          .getElementsByTagName("tbody")[0]
          .getElementsByTagName("tr")[count++];
        let curTds = curRow?.getElementsByTagName("td");
        // console.log(curTds);
        console.log(data.data[i]);
        curTds[0].innerText = data.data[i].manufacturer;
        curTds[1].innerText = data.data[i].name;
        curTds[2].innerText = data.data[i].price + "원";
        curTds[3].innerText = data.data[i].delivery;
        curTds[4].innerText = Object.values(data.data[i].category[0]);
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
      const qnaManage1 = document.getElementById("qna-manage1");
      // .getElementsByClassName("tg");
      console.log(data.data[0].userId);
      console.log(data.data.length);
      console.log(qnaManage1);
      for (let i = 0; i < data.data.length; i++) {
        let curRow = qnaManage1
          ?.getElementsByTagName("tbody")[0]
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
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
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
};

// ** page list
// axios.get("/api/adminpage/productpl?count=0").then((data) => {
//   let maxCount = 70; // 총 페이지 수
//   let count = 0; // 현재 페이지

//   const sthlistElem = document.getElementById("sth-manage1");
//   const orderlistElem = document.getElementById("order-manage1");
//   const dellistElem = document.getElementById("del-manage1");
//   const ppllistElem = document.getElementById("ppl-manage1");
//   const qnalistElem = document.getElementById("qna-manage1");
//   const reviewlistElem = document.getElementById("review-manage1");

//   const pageElem = document.getElementsByClassName("pagination");

//   async function getList() {
//     try {
//       // 서버에 요청을 보낼 때 현재 페이지도 같이 보낸다.
//       // 만약 count가 0이면 /api/board?count=0

//       // 페이지 초기화
//       maxCount = data.data.maxCount;
//       for (let i = 0; i < maxCount; ++i) {
//         const tempLi = document.createElement("li");
//         tempLi.innerText = i + 1;
//         tempLi.onclick = function (e) {
//           count = i;

//           pageElem.getElementsByClassName("now")[0].classList.remove("now");
//           tempLi.classList.add("now");
//         };
//         if (count === i) {
//           tempLi.classList.add("now");
//         }

//         pageElem.append(tempLi);
//         // pageElem.unshift(tempLi);
//         console.log(tempLi);
//       }
//     } catch (err) {
//       throw err;
//     }
//   }
//   getList();
// });

// page list 라우터
// router.get("/productpl", (req, res) => {
//   // 응답을 보내는 메소드
//   // 목록화와 페이징을 위해
//   // == axios.get("/api/adminpage/product?page=");
//   res.send(req.route + "get으로 받음");
// });
// logout.addEventListener("click", temp());
