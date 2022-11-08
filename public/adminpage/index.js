// const bodyHeight = innerHeight.getBoundingClientRect().height;

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

bCatInput.addEventListener("click", function () {
  bCatSave.classList.add("bigdirsave");
});

// 아래는 DB 컴컴
// Q&A 문의 관리

axios
  .post("/api/adminpage/qna", { productName: "" })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    throw error;
  });

//  이 아래로는.. 내일.. 수정하자...  create, formdata도 사용
async function qnaList(name, productName, userId, createdAtt, isAnswer) {
  try {
    const tempGoodsDiv = document.createElement("div");
    const tempGoodsDel = document.createElement("p");
    const tempGoodsText = document.createElement("p");
    const tempGoodsPrice = document.createElement("p");
    const tempGoodsInfo = document.createElement("p");
    const tempGoodsCart = document.createElement("img");

    console.log(`/api/adminpage/qna`);

    tempGoodsDel.innerText = `${delivery}`;
    tempGoodsText.innerText = `${name}`;
    tempGoodsPrice.innerText = `${price}원`;
    tempGoodsInfo.innerText = `${description}`;

    tempGoodsCart.style = `
      width: 30px;
      position: relative;
      top: -41px;
      left: 200px;
      `;

    goods.style = `
      display: block;
      `;

    goodsText.style = `
      line-height: 1.5;
      `;

    tempGoodsInfo.style = `
      padding-bottom: 10px;
      `;

    goods.append(tempGoodsDiv);
    goodsText.append(tempGoodsPrice);
    goodsText.append(tempGoodsText);
    goodsDel.append(tempGoodsDel);
    goodsInfo.append(tempGoodsInfo);
    goodsImg.after(tempGoodsCart);
  } catch (error) {
    console.log(error);
  }
}
