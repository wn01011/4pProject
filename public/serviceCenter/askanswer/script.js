const askBtn = document.getElementById("askBtn");
const tableList = document.getElementById("tableList");

askBtn.onclick = () => {
  axios
    .post("/api/notice/askanswer", { userId: 1, name: "문의올린다." })
    .then((data) => {
      console.log(data);
    });
};

function makeTableList(name, userId, createData, isAnswer) {
  const tempDiv = document.createElement("div");
  const nameDiv = document.createElement("div");
  const dateDiv = document.createElement("div");
  const isAnswerDiv = document.createElement("div");
}
