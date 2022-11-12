// 서버에 대한 요청 예시

//   만약 로그인에 대한 요청을 보내신다면
// 1. 로그인을 위해 필요한 데이터를 담아서 서버로 보냅니다.
// ex) id, pw => {id: "testId", pw : "testPw"}
// 이에 대해 원하는 응답을 담당자에게 전달해주시면 담당자가 해당 응답을 전해주게 됩니다.
// 응답은 then 이후의 data 에 담겨서 정달 되게 됩니다.
// 응답 예시 data.data = {data : "로그인 가능"}

// 로그아웃 기능
// document.getElementById("user_info_dropdown_logout").onclick =
//   async function () {
//     try {
//       const data = await axios.get("/api/user/logout");
//     } catch (error) {
//       console.error(error.response.data.message);
//     }
//   };

const itemHowDiv = document.getElementById("item-how");

// how
function getItemList(img, name, price, manufacturer) {
  try {
    const tempItemDiv = document.createElement("div");
    const tempItemDivImg = document.createElement("div");
    const tempItemImg = document.createElement("img");
    const tempItemNameP = document.createElement("p");
    const tempItemPriceP = document.createElement("p");
    const tempItemCartBtn = document.createElement("button");

    const productImg = `/api/product/download${img}`;

    tempItemImg.src = `${productImg}`;
    tempItemNameP.innerText = `[${manufacturer}]` + `${name}`;
    tempItemPriceP.innerText = `${price.toLocaleString("ko-KR")}원`;

    tempItemDiv.style = `
    position: relative;
    left: 0;
    margin: 0;
    padding: 0;
    `;

    tempItemDivImg.classList.add(`imgDiv`);
    tempItemImg.classList.add(`img`);
    tempItemCartBtn.classList.add(`cartBtn`);
    tempItemNameP.classList.add(`itemNameTxt`);
    tempItemPriceP.classList.add(`itemPriceTxt`);

    if (!manufacturer) {
      tempItemNameP.innerText = `${name}`;
    }

    itemHowDiv.append(tempItemDiv);
    tempItemDiv.append(tempItemDivImg);
    tempItemDivImg.append(tempItemImg);
    tempItemDiv.append(tempItemNameP);
    tempItemDiv.append(tempItemPriceP);
    tempItemDiv.append(tempItemCartBtn);

    // 제품 상세페이지로 이동
    function detailItem() {
      location.href = "/item?product=" + img;
    }
    // 이미지 클릭시
    tempItemNameP.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };
    tempItemImg.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };

    let subSlides = document.getElementById("item-how"),
      currentIdx1 = 0,
      subslideWidth = 1090,
      subslideMargin = 30,
      leftBtn = document.getElementsByClassName("how-left"),
      rightBtn = document.getElementsByClassName("how-right");

    [...rightBtn].forEach((item) => {
      item.onclick = function () {
        if (currentIdx1 < 5) {
          moveSlide1(currentIdx1 + 1);
          leftBtn[0].style.display = "flex";

          return;
        }
      };
    });

    [...leftBtn].forEach((item) => {
      item.onclick = function () {
        if (currentIdx1 <= 0) {
          leftBtn[0].style.display = "none";
          return;
        } else if (currentIdx1 == 0) {
          leftBtn[0].style.display = "none";
        } else {
          moveSlide1(currentIdx1 - 1);
        }
      };
    });

    // 이미지 슬라이드
    function moveSlide1(num) {
      currentIdx1 = num;
      subSlides.style.left = -num * (subslideWidth + subslideMargin) + "px";
    }
  } catch (error) {}
}

// 생수픽
const itemPickDiv = document.getElementById("item1");

const getPickItemList = function (img, name, price, manufacturer) {
  try {
    const tempPickItemDiv = document.createElement("div");
    const tempPickItemDivImg = document.createElement("div");
    const tempPickItemImg = document.createElement("img");
    const tempPickItemNameP = document.createElement("p");
    const tempPickItemPriceP = document.createElement("p");
    const tempPickCartBtn = document.createElement("button");

    const productImg = `/api/product/download${img}`;

    tempPickItemImg.src = `${productImg}`;
    tempPickItemNameP.innerText = `[${manufacturer}]` + `${name}`;
    tempPickItemPriceP.innerText = `${price.toLocaleString("ko-KR")}원`;

    tempPickItemDiv.style = `
    position: relative;
    left: 0;
    margin: 0;
    padding: 0;
    `;

    tempPickItemDivImg.classList.add(`imgDiv`);
    tempPickItemImg.classList.add(`img`);
    tempPickCartBtn.classList.add(`cartBtn`);
    tempPickItemNameP.classList.add(`itemNameTxt`);
    tempPickItemPriceP.classList.add(`itemPriceTxt`);

    if (!manufacturer) {
      tempPickItemNameP.innerText = `${name}`;
    }

    itemPickDiv.append(tempPickItemDiv);
    tempPickItemDiv.append(tempPickItemDivImg);
    tempPickItemDivImg.append(tempPickItemImg);
    tempPickItemDiv.append(tempPickItemNameP);
    tempPickItemDiv.append(tempPickItemPriceP);
    tempPickItemDiv.append(tempPickCartBtn);

    // 제품 상세페이지로 이동
    function detailItem() {
      location.href = "/item?product=" + img;
    }
    // 이미지 클릭시
    tempPickItemNameP.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };
    tempPickItemImg.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };

    let subSlides1 = document.getElementById("item1"),
      currentIdx1 = 0;
    (subslideWidth1 = 1090),
      (subslideMargin1 = 30),
      (leftBtn1 = document.getElementsByClassName("pick-left")),
      (rightBtn1 = document.getElementsByClassName("pick-right"));

    [...rightBtn1].forEach((item) => {
      item.onclick = function () {
        if (currentIdx1 < 5) {
          moveSlide1(currentIdx1 + 1);
          leftBtn1[0].style.display = "flex";
          return;
        }
      };
    });

    [...leftBtn1].forEach((item) => {
      item.onclick = function () {
        if (currentIdx1 <= 0) {
          leftBtn1[0].style.display = "none";
          return;
        } else if (currentIdx1 == 0) {
          leftBtn1[0].style.display = "none";
        } else {
          moveSlide1(currentIdx1 - 1);
        }
      };
    });

    // 이미지 슬라이드
    function moveSlide1(num) {
      currentIdx1 = num;
      subSlides1.style.left = -num * (subslideWidth1 + subslideMargin1) + "px";
    }
  } catch (error) {}
};

// 샐러드픽
const itemPick2Div = document.getElementById("item2");

const getPickItem2List = function (img, name, price, manufacturer) {
  try {
    const tempPickItem2Div = document.createElement("div");
    const tempPickItem2DivImg = document.createElement("div");
    const tempPickItem2Img = document.createElement("img");
    const tempPickItem2NameP = document.createElement("p");
    const tempPickItem2PriceP = document.createElement("p");
    const tempPick2CartBtn = document.createElement("button");

    const productImg = `/api/product/download${img}`;

    tempPickItem2Img.src = `${productImg}`;
    tempPickItem2NameP.innerText = `[${manufacturer}]` + `${name}`;
    tempPickItem2PriceP.innerText = `${price.toLocaleString("ko-KR")}원`;

    tempPickItem2Div.style = `
    position: relative;
    left: 0;
    margin: 0;
    padding: 0;
    `;

    tempPickItem2DivImg.classList.add(`imgDiv`);
    tempPickItem2Img.classList.add(`img`);
    tempPick2CartBtn.classList.add(`cartBtn`);
    tempPickItem2NameP.classList.add(`itemNameTxt`);
    tempPickItem2PriceP.classList.add(`itemPriceTxt`);

    if (!manufacturer) {
      tempPickItem2NameP.innerText = `${name}`;
    }

    itemPick2Div.append(tempPickItem2Div);
    tempPickItem2Div.append(tempPickItem2DivImg);
    tempPickItem2DivImg.append(tempPickItem2Img);
    tempPickItem2Div.append(tempPickItem2NameP);
    tempPickItem2Div.append(tempPickItem2PriceP);
    tempPickItem2Div.append(tempPick2CartBtn);

    // 제품 상세페이지로 이동
    function detailItem() {
      location.href = "/item?product=" + img;
    }
    function cartItem() {
      location.href = "/item?cart=" + img;
    }
    // 이미지 클릭시
    tempPickItem2NameP.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };

    tempPickItem2Img.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };
    // 카트 기능으로 넘기기
    tempPick2CartBtn.onclick = (e) => {
      e.preventDefault();
      cartItem();
    };

    let subSlides2 = document.getElementById("item2"),
      currentIdx2 = 0;
    (subslideWidth2 = 1090),
      (subslideMargin2 = 30),
      (leftBtn2 = document.getElementsByClassName("pick2-left")),
      (rightBtn2 = document.getElementsByClassName("pick2-right"));

    [...rightBtn2].forEach((item) => {
      item.onclick = function () {
        if (currentIdx2 < 5) {
          moveSlide2(currentIdx2 + 1);
          leftBtn2[0].style.display = "flex";
          // return;
        }
      };
    });

    [...leftBtn2].forEach((item) => {
      item.onclick = function () {
        if (currentIdx2 <= 0) {
          leftBtn2[0].style.display = "none";
          return;
        } else if (currentIdx2 == 0) {
          leftBtn2[0].style.display = "none";
        } else {
          moveSlide2(currentIdx2 - 1);
        }
      };
    });

    // 이미지 슬라이드
    function moveSlide2(num) {
      currentIdx2 = num;
      subSlides2.style.left = -num * (subslideWidth2 + subslideMargin2) + "px";
    }
  } catch (error) {}
};

// 과일픽
const itemPick3Div = document.getElementById("item3");

const getPickItem3List = function (img, name, price, manufacturer) {
  try {
    const tempPickItem3Div = document.createElement("div");
    const tempPickItem3DivImg = document.createElement("div");
    const tempPickItem3Img = document.createElement("img");
    const tempPickItem3NameP = document.createElement("p");
    const tempPickItem3PriceP = document.createElement("p");
    const tempPick3CartBtn = document.createElement("button");

    const productImg = `/api/product/download${img}`;

    tempPickItem3Img.src = `${productImg}`;
    tempPickItem3NameP.innerText = `[${manufacturer}]` + `${name}`;
    tempPickItem3PriceP.innerText = `${price.toLocaleString("ko-KR")}원`;

    tempPickItem3Div.style = `
    position: relative;
    left: 0;
    margin: 0;
    padding: 0;
    `;

    tempPickItem3DivImg.classList.add(`imgDiv`);
    tempPickItem3Img.classList.add(`img`);
    tempPick3CartBtn.classList.add(`cartBtn`);
    tempPickItem3NameP.classList.add(`itemNameTxt`);
    tempPickItem3PriceP.classList.add(`itemPriceTxt`);

    if (!manufacturer) {
      tempPickItem3NameP.innerText = `${name}`;
    }

    itemPick3Div.append(tempPickItem3Div);
    tempPickItem3Div.append(tempPickItem3DivImg);
    tempPickItem3DivImg.append(tempPickItem3Img);
    tempPickItem3Div.append(tempPickItem3NameP);
    tempPickItem3Div.append(tempPickItem3PriceP);
    tempPickItem3Div.append(tempPick3CartBtn);

    // 제품 상세페이지로 이동
    function detailItem() {
      location.href = "/item?product=" + img;
    }
    function cartItem() {
      location.href = "/item?cart=" + img;
    }
    // 이미지 클릭시
    tempPickItem3NameP.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };

    tempPickItem3Img.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };

    tempPick3CartBtn.onclick = (e) => {
      e.preventDefault();
      cartItem();
    };

    let subSlides3 = document.getElementById("item3"),
      currentIdx3 = 0,
      subslideWidth3 = 1090,
      subslideMargin3 = 30,
      leftBtn3 = document.getElementsByClassName("pick3-left"),
      rightBtn3 = document.getElementsByClassName("pick3-right");

    [...rightBtn3].forEach((item) => {
      item.onclick = function () {
        if (currentIdx3 < 5) {
          moveSlide3(currentIdx3 + 1);
          leftBtn3[0].style.display = "flex";
          return;
        }
      };
    });

    [...leftBtn3].forEach((item) => {
      item.onclick = function () {
        if (currentIdx3 <= 0) {
          leftBtn3[0].style.display = "none";
          return;
        } else if (currentIdx3 == 0) {
          leftBtn3[0].style.display = "none";
        } else {
          moveSlide3(currentIdx3 - 1);
        }
      };
    });

    // 이미지 슬라이드
    function moveSlide3(num) {
      currentIdx3 = num;
      subSlides3.style.left = -num * (subslideWidth3 + subslideMargin3) + "px";
    }
  } catch (error) {}
};

// 면픽
const itemPick4Div = document.getElementById("item4");

const getPickItem4List = function (img, name, price, manufacturer) {
  try {
    const tempPickItem4Div = document.createElement("div");
    const tempPickItem4DivImg = document.createElement("div");
    const tempPickItem4Img = document.createElement("img");
    const tempPickItem4NameP = document.createElement("p");
    const tempPickItem4PriceP = document.createElement("p");
    const tempPick4CartBtn = document.createElement("button");

    const productImg = `/api/product/download${img}`;

    tempPickItem4Img.src = `${productImg}`;
    tempPickItem4NameP.innerText = `[${manufacturer}]` + `${name}`;
    tempPickItem4PriceP.innerText = `${price.toLocaleString("ko-KR")}원`;

    tempPickItem4Div.style = `
    position: relative;
    left: 0;
    margin: 0;
    padding: 0;
    `;

    tempPickItem4DivImg.classList.add(`imgDiv`);
    tempPickItem4Img.classList.add(`img`);
    tempPick4CartBtn.classList.add(`cartBtn`);
    tempPickItem4NameP.classList.add(`itemNameTxt`);
    tempPickItem4PriceP.classList.add(`itemPriceTxt`);

    if (!manufacturer) {
      tempPickItem4NameP.innerText = `${name}`;
    }
    itemPick4Div.append(tempPickItem4Div);
    tempPickItem4Div.append(tempPickItem4DivImg);
    tempPickItem4DivImg.append(tempPickItem4Img);
    tempPickItem4Div.append(tempPickItem4NameP);
    tempPickItem4Div.append(tempPickItem4PriceP);
    tempPickItem4Div.append(tempPick4CartBtn);

    // 제품 상세페이지로 이동
    function detailItem() {
      location.href = "/item?product=" + img;
    }
    function cartItem() {
      location.href = "/item?cart=" + img;
    }
    // 이미지 클릭시
    tempPickItem4NameP.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };

    tempPickItem4Img.onclick = (e) => {
      e.preventDefault();
      detailItem();
    };

    tempPick4CartBtn.onclick = (e) => {
      e.preventDefault();
      cartItem();
    };

    let subSlides4 = document.getElementById("item4"),
      currentIdx4 = 0,
      subslideWidth4 = 1090,
      subslideMargin4 = 30,
      leftBtn4 = document.getElementsByClassName("pick4-left"),
      rightBtn4 = document.getElementsByClassName("pick4-right");

    [...rightBtn4].forEach((item) => {
      item.onclick = function () {
        if (currentIdx4 < 5) {
          moveSlide4(currentIdx4 + 1);
          leftBtn4[0].style.display = "flex";
          return;
        }
      };
    });

    [...leftBtn4].forEach((item) => {
      item.onclick = function () {
        if (currentIdx4 <= 0) {
          leftBtn4[0].style.display = "none";
          return;
        } else if (currentIdx4 == 0) {
          leftBtn4[0].style.display = "none";
        } else {
          moveSlide4(currentIdx4 - 1);
        }
      };
    });

    // 이미지 슬라이드
    function moveSlide4(num) {
      currentIdx4 = num;
      subSlides4.style.left = -num * (subslideWidth4 + subslideMargin4) + "px";
    }
  } catch (err) {
    console.log(err);
  }
};

axios
  .post("/api/product/category", { data: "채소" })
  .then((data) => {
    data.data.forEach((item) => {
      // 카테고리별 아이템 추출
      // const category = Object.values(item.category[0]);
      const category = Object.values(item.category[0]);

      getItemList(item.img, item.name, item.price, item.manufacturer);
    });
  })
  .catch((err) => {
    console.error(err);
  });

axios
  .post("/api/product/category", { data: "생수" })
  .then((data) => {
    data.data.forEach((item) => {
      getPickItemList(item.img, item.name, item.price, item.manufacturer);
    });
  })
  .catch((err) => {
    console.error(err);
  });

axios
  .post("/api/product/category", { data: "샐러드" })
  .then((data) => {
    data.data.forEach((item) => {
      getPickItem2List(item.img, item.name, item.price, item.manufacturer);
    });
  })
  .catch((err) => {
    console.error(err);
  });
axios
  .post("/api/product/category", { data: "과일" })
  .then((data) => {
    data.data.forEach((item) => {
      getPickItem3List(item.img, item.name, item.price, item.manufacturer);
    });
  })
  .catch((err) => {
    console.error(err);
  });

axios
  .post("/api/product/category", { data: "면" })
  .then((data) => {
    data.data.forEach((item) => {
      getPickItem4List(item.img, item.name, item.price, item.manufacturer);
    });
  })
  .catch((err) => {
    console.error(err);
  });
