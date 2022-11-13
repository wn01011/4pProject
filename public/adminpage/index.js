document.body.onload = () => {
  // 최상단으로 올려주는 버튼 보이게하는 스크롤이벤트
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

  // 아래는 DB 컴컴

  const sthManage2 = document.getElementById("sth-manage2");
  sthManage2.style = `
  width : 100%;
  max-height: 500px;
  overflow:hidden;
`;

  // 상품 목록
  function makeProductList(search) {
    if (!search)
      axios
        .post("/api/adminpage/product", { name: "" })
        .then((data) => {
          sthManage2.innerHTML = "";
          for (let i = 0; i < data.data.length; i++) {
            const productListTR = document.createElement("tr");
            productListTR.style.height = "40px";

            // div 엘리먼트를 생성해서 productListElem 변수에 초기화
            let productListTD0 = document.createElement("td");
            let productListTD1 = document.createElement("td");
            let productListTD2 = document.createElement("td");
            let productListTD3 = document.createElement("td");
            let productListTD4 = document.createElement("td");
            let delBtn = document.createElement("button");
            delBtn.style = `
              width : 100%;
              height: 100%;
              min-height: 50px;
              border: #bbb solid 1px;
            `;
            productListTD1.style.whiteSpace = "wrap";

            productListTD0.classList.add("tg-db-lineodd");
            productListTD1.classList.add("tg-db-lineeven");
            productListTD2.classList.add("tg-db-lineeven");
            productListTD3.classList.add("tg-db-lineodd");
            productListTD4.classList.add("tg-db-lineodd");

            productListTD0.innerText = data.data[i].manufacturer;
            // productLTDtElem의 내용(innerText)을 data.data.~ 라고 정의
            productListTD1.innerHTML = data.data[i].name;
            productListTD2.innerText = data.data[i].price + "원";
            productListTD3.innerText = data.data[i].delivery;
            productListTD4.innerText = Object.values(data.data[i].category[0]);
            delBtn.innerHTML =
              '<img src="./Images/delIcon.png" alt="" style="width: 40%; height: 40%">';

            // productManage.append(tempElem);
            // productManage 엘리먼트에 productListElem 엘리먼트를 마지막 자식으로 추가한다 (뒤에서부터)
            sthManage2.append(productListTR);
            productListTR.append(productListTD0);
            productListTR.append(productListTD1);
            productListTR.append(productListTD2);
            productListTR.append(productListTD3);
            productListTR.append(productListTD4);
            productListTR.append(delBtn);

            // 상품관리 삭제버튼 구현
            delBtn.onclick = () => {
              if (confirm("삭제하시려면 확인 아니라면 취소를 선택해 주세요")) {
                axios
                  .post("/api/product/delProduct", {
                    productName: data.data[i].name,
                  })
                  .then((data) => {
                    makeProductList();
                  });
              } else {
                return;
              }
            };
          }
          // productManage 엘리먼트에 productListElem 엘리먼트를 첫 번째 자식으로 추가한다
        })
        .catch((error) => {
          throw error;
        });
    if (search) {
      axios
        .post("/api/product/search", { sword: search })
        .then((data) => {
          sthManage2.innerHTML = "";
          for (let i = 0; i < data.data.length; i++) {
            const productListTR = document.createElement("tr");
            productListTR.style.height = "40px";

            // div 엘리먼트를 생성해서 productListElem 변수에 초기화
            let productListTD0 = document.createElement("td");
            let productListTD1 = document.createElement("td");
            let productListTD2 = document.createElement("td");
            let productListTD3 = document.createElement("td");
            let productListTD4 = document.createElement("td");
            let delBtn = document.createElement("button");
            delBtn.style = `
              width : 100%;
              height: 100%;
              min-height: 50px;
              border: #bbb solid 1px;
            `;
            productListTD1.style.whiteSpace = "wrap";

            productListTD0.classList.add("tg-db-lineodd");
            productListTD1.classList.add("tg-db-lineeven");
            productListTD2.classList.add("tg-db-lineeven");
            productListTD3.classList.add("tg-db-lineodd");
            productListTD4.classList.add("tg-db-lineodd");

            productListTD0.innerText = data.data[i].manufacturer;
            // productLTDtElem의 내용(innerText)을 data.data.~ 라고 정의
            productListTD1.innerHTML = data.data[i].name;
            productListTD2.innerText = data.data[i].price + "원";
            productListTD3.innerText = data.data[i].delivery;
            productListTD4.innerText = Object.values(data.data[i].category[0]);
            delBtn.innerHTML =
              '<img src="./Images/delIcon.png" alt="" style="width: 40%; height: 40%">';

            // productManage.append(tempElem);
            // productManage 엘리먼트에 productListElem 엘리먼트를 마지막 자식으로 추가한다 (뒤에서부터)
            sthManage2.append(productListTR);
            productListTR.append(productListTD0);
            productListTR.append(productListTD1);
            productListTR.append(productListTD2);
            productListTR.append(productListTD3);
            productListTR.append(productListTD4);
            productListTR.append(delBtn);

            // 상품관리 삭제버튼 구현
            delBtn.onclick = () => {
              if (confirm("삭제하시려면 확인 아니라면 취소를 선택해 주세요")) {
                axios
                  .post("/api/product/delProduct", {
                    productName: data.data[i].name,
                  })
                  .then((data) => {
                    makeProductList();
                  });
              } else {
                return;
              }
            };
          }
          // productManage 엘리먼트에 productListElem 엘리먼트를 첫 번째 자식으로 추가한다
        })
        .catch((error) => {
          throw error;
        });
    }
  }
  makeProductList();

  // 카테고리 관리

  // 주문 내역
  axios
    .post("/api/adminpage/order", { name: "" })
    .then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        axios
          .post("/api/product/findone", { name: data.data[i].product })
          .then((curData) => {
            const odrManage = document.getElementById("order-manage2");
            const odrListTR = document.createElement("tr");

            let odrListTD0 = document.createElement("td");
            let odrListTD1 = document.createElement("td");
            let odrListTD2 = document.createElement("td");
            let odrListTD3 = document.createElement("td");
            let odrListTD4 = document.createElement("td");
            let odrListTD5 = document.createElement("td");
            let odrListTD6 = document.createElement("td");
            let odrListTD7 = document.createElement("td");

            odrListTD0.classList.add("tg-db-lineodd");
            odrListTD1.classList.add("tg-db-lineeven");
            odrListTD2.classList.add("tg-db-lineodd");
            odrListTD3.classList.add("tg-db-lineodd");
            odrListTD4.classList.add("tg-db-lineeven");
            odrListTD5.classList.add("tg-db-lineeven");
            odrListTD6.classList.add("tg-db-lineeven");
            odrListTD7.classList.add("tg-db-lineodd");

            odrListTD0.innerText = data.data[i].id;
            odrListTD1.innerText = curData.data.name;
            odrListTD2.innerText = curData.data.manufacturer;
            odrListTD3.innerText = Object.values(curData.data.category[0]);
            odrListTD4.innerText = data.data[i].userId;
            odrListTD5.innerText =
              +data.data[i].price * +data.data[i].count + "원";
            odrListTD6.innerText = data.data[i].count;

            // 주문 시간으로 부터 계산해서 배송 중인지 여부 결정
            const diffTime =
              (new Date(Date.now()).getTime() -
                new Date(data.data[i].createdAt).getTime()) /
              60000;
            if (diffTime > 30) {
              odrListTD7.innerText = "배송 끝";
            } else {
              odrListTD7.innerText = "배송 중";
            }
            odrManage.append(odrListTR);
            odrListTR.append(odrListTD0);
            odrListTR.append(odrListTD1);
            odrListTR.append(odrListTD2);
            odrListTR.append(odrListTD3);
            odrListTR.append(odrListTD4);
            odrListTR.append(odrListTD5);
            odrListTR.append(odrListTD6);
            odrListTR.append(odrListTD7);
          });
      }
    })
    .catch((error) => {
      throw error;
    });

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
        let qnaListTD5 = document.createElement("td");

        qnaListTD0.classList.add("tg-db-lineeven");
        qnaListTD1.classList.add("tg-db-lineeven");
        qnaListTD2.classList.add("tg-db-lineeven");
        qnaListTD3.classList.add("tg-db-lineodd");
        qnaListTD4.classList.add("tg-db-lineodd");
        qnaListTD5.classList.add("tg-db-lineeven");

        qnaListTD0.innerText = data.data[i].name;
        qnaListTD1.innerText = data.data[i].productName;
        qnaListTD2.innerText = data.data[i].userId;
        qnaListTD3.innerText = data.data[i].createdAt.slice(0, 10);
        if (data.data[i].isAnswer == "0") qnaListTD4.innerText = "대기중";
        else qnaListTD4.innerText = "완료";
        const tempAnswerBtn = document.createElement("button");
        tempAnswerBtn.innerText = "답변하기";
        qnaListTD5.appendChild(tempAnswerBtn);

        qnaManage.append(qnaListTR);
        qnaListTR.append(qnaListTD0);
        qnaListTR.append(qnaListTD1);
        qnaListTR.append(qnaListTD2);
        qnaListTR.append(qnaListTD3);
        qnaListTR.append(qnaListTD4);
        qnaListTR.append(qnaListTD5);
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

  const logoutBtn = document.getElementsByClassName("admin-logout")[0];
  logoutBtn.style = `
    white-space: nowrap;
  `;
  const productSearch = document.getElementById("productSearch");

  logoutBtn.onclick = function logoutFunction() {
    console.log("로그아웃");
    // logout.onclick = logoutFunction2();
    // logout.addEventListener("click", logoutFunction2());
    deleteCookie(getUserId());

    // logout.addEventListener("click", temp());
  };
  productSearch.onchange = () => {
    axios
      .post("/api/product/search", { sword: productSearch.value })
      .then(() => {
        makeProductList(productSearch.value);
      });
  };

  // 상품 등록에서 카테고리 등록
  const categoryBtn = document.getElementsByClassName("big btn")[0];
  const dropdownCategoryList = document.getElementById(
    "regi-dropdown-category"
  );
  const selectedCategory = document.getElementById("selectedCategory");
  categoryBtn.onmouseover = () => {
    axios.post("/api/product/categoryType").then((data) => {
      dropdownCategoryList.innerHTML = "";
      data.data.forEach((item) => {
        const tempList = document.createElement("li");
        tempList.innerHTML = `<button class="regi-dropdown-item" style="border:none; width: 100%; margin-bottom: 5px; background-color: lightgrey" >${item.name}</button>`;
        tempList.onmousedown = () => {
          tempList.children[0].style.backgroundColor = "pink";
        };
        tempList.onmouseup = () => {
          tempList.children[0].style.backgroundColor = "lightgrey";
          selectedCategory.innerText = `선택된 카테고리 : ${item.name}`;
        };
        dropdownCategoryList.appendChild(tempList);
      });
    });
  };

  // 상품 등록 폼
  // 0 : 브랜드명, 1 : 상품명, 2 : 배송, 3 : 판매자, 4 : 포장상태, 5 : 판매단위, 6 : 중량/용량, 7 : 원산지, 8 : 판매가, 9 : 등록버튼
  const productAdd = document.getElementById("productAdd");
  const productAddSubmitBtn = document.getElementById("regi-submit");
  let img;
  productAdd.onsubmit = (e) => {
    let brandName = e.srcElement[0].value;
    let productName = e.srcElement[1].value;
    let delivery = e.srcElement[2].value;
    let seller = e.srcElement[3].value;
    let package = e.srcElement[4].value;
    let unit = e.srcElement[5].value;
    let weight = e.srcElement[6].value;
    let origin = e.srcElement[7].value;
    let price = e.srcElement[8].value;
    let categoryName = selectedCategory.innerText.split(": ")[1];
    if (categoryName == "(없음)") categoryName = undefined;
    if (
      !brandName ||
      !productName ||
      !delivery ||
      !seller ||
      !package ||
      !unit ||
      !weight ||
      !origin ||
      !price ||
      !categoryName ||
      !img
    )
      return false;
    onSubmitFunction(
      {
        brandName: brandName,
        productName: productName,
        delivery: delivery,
        seller: seller,
        package: package,
        unit: unit,
        weight: weight,
        origin: origin,
        price: price,
        categoryName: categoryName,
        img: img,
      },
      curExt
    );
    return false;
  };

  // img multer uploadBtn
  const imgMulterUploadBtn = document.getElementById("originBtn");
  const originInput = document.getElementById("originInput");
  let curExt;
  imgMulterUploadBtn.onclick = () => {
    const form = new FormData();
    // form tag 의 name과 연결됨
    curExt = "." + originInput.files[0].name.split(".")[1];
    form.append("attachment", originInput.files[0]);
    axios
      .post("/uploadFileWithOriginalFilename", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        console.log((img = data.data.length));
      });
  };

  const originImg = document.getElementById("originImg");

  function onSubmitFunction(data, ext) {
    axios
      .post("/api/product/newData", [
        {
          img: data.img,
          manufacturer: data.brandName,
          name: data.productName,
          price: data.price,
          description: "메롱",
          delivery: data.delivery,
          seller: data.seller,
          package: data.package,
          unit: data.unit,
          weight: data.weight,
          origin: data.origin,
          category: [{ 0: data.categoryName }],
        },
        curExt,
      ])
      .then((data) => {
        console.log(img);
        originImg.src = "/api/product/download" + img;
        img = undefined;
        curExt = undefined;
        console.log("생성완료", data.data);
      });
  }
  // 카테고리 분류
  const korReg = /^[가-힣]{2,8}$/; //한글 2~8글자 정규식
  const categoryInput = document.getElementById("bigcatip");
  const categoryAddBtn = document.getElementsByClassName("bigBtn")[0];
  const categoryBox = document.getElementById("categoryBox");
  categoryAddBtn.onclick = () => {
    // 카테고리 추가.
    // 일단 기존 카테고리 불러옴
    axios.post("/api/product/categoryType").then((data) => {
      if (
        korReg.test(categoryInput.value) &&
        !data.data.find((e) => e.name == categoryInput.value)
      ) {
        categoryBox.innerHTML = "";
        // 입력이 제대로 되었다면 카테고리 생성을 해주고 다시 리스트를 만들어준다.
        axios
          .post("/api/product/addCategory", { name: categoryInput.value })
          .then(() => {
            makeCategoryList();
          });
      }
    });
  };
};
function makeCategoryList() {
  axios.post("/api/product/categoryType").then((data) => {
    categoryBox.innerHTML = "";
    data.data.forEach((item) => {
      const tempDiv = document.createElement("div");
      const tempBtn = document.createElement("button");
      tempDiv.innerText = `/  ${item.name}  /`;
      tempBtn.innerText = `삭제`;
      tempDiv.style = `
        width : 40%;
      `;
      tempBtn.style = `
        margin-left: 20px;
        border: none;
      `;
      tempBtn.onclick = () => {
        // db에 해당 카테고리 삭제 요청
        axios
          .post("/api/product/destroyCategory", { name: item.name })
          .then(() => {
            makeCategoryList();
          });
        // 삭제하고 나면 다시 생성
      };
      tempDiv.appendChild(tempBtn);
      categoryBox.appendChild(tempDiv);
    });
  });
}
makeCategoryList();
