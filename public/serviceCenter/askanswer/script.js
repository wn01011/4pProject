const askBtn = document.getElementById("askBtn");
const tableList = document.getElementById("tableList");

askBtn.onclick = () => {
  axios
    .post("/api/notice/askanswer", { userId: 1, name: "문의올린다." })
    .then((data) => {
      //   makeTableList(
      //     data.data.name,
      //     data.data.userId,
      //     data.data.createdDate,
      //     data.data.isAnswer
      //   );
      console.log(data);
    });
};

function makeTableList(name, userId, createdDate, isAnswer) {
  const tempDiv = document.createElement("div");
  const nameDiv = document.createElement("div");
  const dateDiv = document.createElement("div");
  const isAnswerDiv = document.createElement("div");

  nameDiv.innerText = name;
  dateDiv.innerText = createdDate;
  isAnswerDiv.innerText = isAnswer;

  tempDiv.style = `
    display: flex;
    text-align: center;
    padding: 15px 0px;
    border-top: 1px lightgrey solid;
    border-bottom: 1px lightgrey solid;
    font-size: 0.7rem;
    width : 100%;
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

  tableList.appendChild(tempDiv);
  tempDiv.appendChild(nameDiv);
  tempDiv.appendChild(dateDiv);
  tempDiv.appendChild(isAnswerDiv);
}
