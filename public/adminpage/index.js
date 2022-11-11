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
      for (let i = 0; i < data.data.length; i++) {
        const productManage = document.getElementById("sth-manage2");

        const productListTR = document.createElement("tr");

        // div 엘리먼트를 생성해서 productListElem 변수에 초기화
        let productListTD0 = document.createElement("td");
        let productListTD1 = document.createElement("td");
        let productListTD2 = document.createElement("td");
        let productListTD3 = document.createElement("td");
        let productListTD4 = document.createElement("td");

        productListTD0.classList.add("tg-db-lineodd");
        productListTD1.classList.add("tg-db-lineeven");
        productListTD2.classList.add("tg-db-lineeven");
        productListTD3.classList.add("tg-db-lineodd");
        productListTD4.classList.add("tg-db-lineodd");

        productListTD0.innerText = data.data[i].manufacturer;
        // productLTDtElem의 내용(innerText)을 data.data.~ 라고 정의
        productListTD1.innerText = data.data[i].name;
        productListTD2.innerText = data.data[i].price + "원";
        productListTD3.innerText = data.data[i].delivery;
        productListTD4.innerText = Object.values(data.data[i].category[0]);

        // productManage.append(tempElem);
        // productManage 엘리먼트에 productListElem 엘리먼트를 마지막 자식으로 추가한다 (뒤에서부터)
        productManage.append(productListTR);
        productListTR.append(productListTD0);
        productListTR.append(productListTD1);
        productListTR.append(productListTD2);
        productListTR.append(productListTD3);
        productListTR.append(productListTD4);
      }
      // productManage 엘리먼트에 productListElem 엘리먼트를 첫 번째 자식으로 추가한다
    })
    .catch((error) => {
      throw error;
    });

  // 카테고리 관리

  // 주문 내역
  // axios
  //   .post("/api/adminpage/order", { name: "" })
  //   .then((data) => {
  //     for (let i = 0; i < data.data.length; i++) {
  //       const odrManage = document.getElementById("order-manage2");

  //       const odrListTR = document.createElement("tr");

  //       let odrListTD0 = document.createElement("td");
  //       let odrListTD1 = document.createElement("td");
  //       let odrListTD2 = document.createElement("td");
  //       let odrListTD3 = document.createElement("td");
  //       let odrListTD4 = document.createElement("td");
  //       let odrListTD5 = document.createElement("td");
  //       let odrListTD6 = document.createElement("td");

  //       odrListTD0.classList.add("tg-db-lineodd");
  //       odrListTD1.classList.add("tg-db-lineeven");
  //       odrListTD2.classList.add("tg-db-lineodd");
  //       odrListTD3.classList.add("tg-db-lineodd");
  //       odrListTD4.classList.add("tg-db-lineeven");
  //       odrListTD5.classList.add("tg-db-lineeven");
  //       odrListTD6.classList.add("tg-db-lineeven");

  //       odrListTD0.innerText = data.data[i].userId;
  //       odrListTD1.innerText = data.data[i].productName;
  //       odrListTD2.innerText = data.data[i].manufacturer;
  //       odrListTD3.innerText = data.data[i].category;
  //       odrListTD4.innerText = data.data[i].name;
  //       odrListTD5.innerText = data.data[i].totalPrice + "원";
  //       odrListTD6.innerText = data.data[i].totalUnit;

  //       odrManage.append(odrListTR);
  //       odrListTR.append(odrListTD0);
  //       odrListTR.append(odrListTD1);
  //       odrListTR.append(odrListTD2);
  //       odrListTR.append(odrListTD3);
  //       odrListTR.append(odrListTD4);
  //       odrListTR.append(odrListTD5);
  //       odrListTR.append(odrListTD6);
  //     }
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });

  // 배송 관리
  // axios
  //   .post("/api/adminpage/delivery", { name: "" })
  //   .then((data) => {
  //     for (let i = 0; i < data.data.length; i++) {
  //       const delManage = document.getElementById("del-manage2");

  //       const delListTR = document.createElement("tr");

  //       let delListTD0 = document.createElement("td");
  //       let delListTD1 = document.createElement("td");
  //       let delListTD2 = document.createElement("td");
  //       let delListTD3 = document.createElement("td");
  //       let delListTD4 = document.createElement("td");
  //       let delListTD5 = document.createElement("td");
  //       let delListTD6 = document.createElement("td");

  //       delListTD0.classList.add("tg-db-lineodd");
  //       delListTD1.classList.add("tg-db-lineeven");
  //       delListTD2.classList.add("tg-db-lineodd");
  //       delListTD3.classList.add("tg-db-lineodd");
  //       delListTD4.classList.add("tg-db-lineeven");
  //       delListTD5.classList.add("tg-db-lineeven");
  //       delListTD6.classList.add("tg-db-lineeven");

  //       delListTD0.innerText = data.data[i].userId;
  //       delListTD1.innerText = data.data[i].productName;
  //       delListTD2.innerText = data.data[i].manufacturer;
  //       delListTD3.innerText = data.data[i].category;
  //       delListTD4.innerText = data.data[i].name;
  //       delListTD5.innerText = data.data[i].totalPrice + "원";
  //       delListTD6.innerText = data.data[i].totalUnit;

  //       delManage.append(delListTR);
  //       delListTR.append(delListTD0);
  //       delListTR.append(delListTD1);
  //       delListTR.append(delListTD2);
  //       delListTR.append(delListTD3);
  //       delListTR.append(delListTD4);
  //       delListTR.append(delListTD5);
  //       delListTR.append(delListTD6);
  //     }
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });

  // 회원 관리
  axios
    .post("/api/adminpage/user", { userId: "" })
    .then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        const userManage = document.getElementById("ppl-manage2");

        const userListTR = document.createElement("tr");

        let userListTD0 = document.createElement("td");
        let userListTD1 = document.createElement("td");
        let userListTD2 = document.createElement("td");
        let userListTD3 = document.createElement("td");
        let userListTD4 = document.createElement("td");
        let userListTD5 = document.createElement("td");

        userListTD0.classList.add("tg-db-lineeven");
        userListTD1.classList.add("tg-db-lineeven");
        userListTD2.classList.add("tg-db-lineodd");
        userListTD3.classList.add("tg-db-lineodd");
        userListTD4.classList.add("tg-db-lineodd");
        userListTD5.classList.add("tg-db-lineodd");

        userListTD0.innerText = data.data[i].userId;
        userListTD1.innerText = data.data[i].name;
        userListTD2.innerText = data.data[i].address;
        userListTD3.innerText = data.data[i].gender;
        userListTD4.innerText = data.data[i].birthday;
        userListTD5.innerText = data.data[i].createdAt.slice(0, 10);

        userManage.append(userListTR);
        userListTR.append(userListTD0);
        userListTR.append(userListTD1);
        userListTR.append(userListTD2);
        userListTR.append(userListTD3);
        userListTR.append(userListTD4);
        userListTR.append(userListTD5);
      }
    })
    .catch((error) => {
      throw error;
    });

  // Q&A 문의 관리
  axios
    .post("/api/adminpage/qna", { productName: "" })
    .then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        const qnaManage = document.getElementById("qna-manage2");

        const qnaListTR = document.createElement("tr");

        let qnaListTD0 = document.createElement("td");
        let qnaListTD1 = document.createElement("td");
        let qnaListTD2 = document.createElement("td");
        let qnaListTD3 = document.createElement("td");
        let qnaListTD4 = document.createElement("td");

        qnaListTD0.classList.add("tg-db-lineeven");
        qnaListTD1.classList.add("tg-db-lineeven");
        qnaListTD2.classList.add("tg-db-lineeven");
        qnaListTD3.classList.add("tg-db-lineodd");
        qnaListTD4.classList.add("tg-db-lineodd");

        qnaListTD0.innerText = data.data[i].name;
        qnaListTD1.innerText = data.data[i].productName;
        qnaListTD2.innerText = data.data[i].userId;
        qnaListTD3.innerText = data.data[i].createdAt.slice(0, 10);
        qnaListTD4.innerText = data.data[i].isAnswer;

        qnaManage.append(qnaListTR);
        qnaListTR.append(qnaListTD0);
        qnaListTR.append(qnaListTD1);
        qnaListTR.append(qnaListTD2);
        qnaListTR.append(qnaListTD3);
        qnaListTR.append(qnaListTD4);
      }
    })
    .catch((error) => {
      throw error;
    });

  // 리뷰 관리
  axios
    .post("/api/adminpage/review", { productName: "" })
    .then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        const rvwManage = document.getElementById("review-manage2");

        const rvwListTR = document.createElement("tr");

        let rvwListTD0 = document.createElement("td");
        let rvwListTD1 = document.createElement("td");
        let rvwListTD2 = document.createElement("td");
        let rvwListTD3 = document.createElement("td");

        rvwListTD0.classList.add("tg-db-lineodd");
        rvwListTD1.classList.add("tg-db-lineeven");
        rvwListTD2.classList.add("tg-db-lineeven");
        rvwListTD3.classList.add("tg-db-lineodd");

        rvwListTD0.innerText = data.data[i].userId;
        rvwListTD1.innerText = data.data[i].productName;
        rvwListTD2.innerText = data.data[i].text;
        rvwListTD3.innerText = data.data[i].createdAt.slice(0, 10);

        rvwManage.append(rvwListTR);
        rvwListTR.append(rvwListTD0);
        rvwListTR.append(rvwListTD1);
        rvwListTR.append(rvwListTD2);
        rvwListTR.append(rvwListTD3);
      }
    })
    .catch((error) => {
      throw error;
    });

  // 상품목록 토글토글
  // const productToggle = document.getElementsByClassName("fa-person-skiing"),
  //   productList = document.getElementById("sth-manage1");

  // productToggle.addEventListener("click", function () {
  //   productList.classList.toggle("product-active");
  // });

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
