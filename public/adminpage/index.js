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
