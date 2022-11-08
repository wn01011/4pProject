const askBtn = document.getElementById("askBtn");
const tableList = document.getElementById("tableList");
const tablePlaceHolder = document.getElementById("tablePlaceHolder");

askBtn.onclick = () => {
  popup();
};

function popup() {
  const url = "/serviceCenter/askanswer/popup.html";
  const name = "popup test";
  const option =
    "width = 800, height = 800, top =100, left = 200, location = no";
  const curWindow = window.open(url, name, option);
  curWindow.onbeforeunload = () => {
    console.log("닫겼다.");
    location.reload();
  };
}

init();

function init() {
  axios.post("/api/notice/askanswer", { userId: 1 }).then((data) => {
    if (data.data.length > 0) tablePlaceHolder.classList.add("off");
    data.data.forEach((item) => {
      makeTableList(
        item.name,
        item.userId,
        item.createdAt,
        item.isAnswer,
        item.text
      );
    });
  });
}

function makeTableList(name, userId, createdDate, isAnswer, text) {
  const tempDiv = document.createElement("div");
  const nameDiv = document.createElement("div");
  const dateDiv = document.createElement("div");
  const isAnswerDiv = document.createElement("div");
  const detailDiv = document.createElement("div");

  nameDiv.innerText = name;
  // YYYY-MM-DD : 10글자
  dateDiv.innerText = createdDate.slice(0, 10);
  isAnswerDiv.innerText = isAnswer;

  tempDiv.style = `
    display: flex;
    text-align: center;
    padding: 15px 0px;
    border-top: 1px lightgrey solid;
    border-bottom: 1px lightgrey solid;
    font-size: 0.7rem;
    width : 100%;
    cursor: pointer;
  `;
  nameDiv.style = `
    width : 60%;
  `;
  dateDiv.style = `
    width : 20%;
  `;
  isAnswerDiv.style = `
    width : 20%;
  `;

  detailDiv.style = `
    width : 100%;
    padding : 20px 0px;
    margin: auto;
    font-size: 1rem;
    text-align: center;
  `;
  detailDiv.innerText = text;
  detailDiv.classList.add("off");
  tempDiv.onclick = () => {
    detailDiv.classList.toggle("off");
  };

  tableList.appendChild(tempDiv);
  tempDiv.appendChild(nameDiv);
  tempDiv.appendChild(dateDiv);
  tempDiv.appendChild(isAnswerDiv);
  tempDiv.after(detailDiv);
}
