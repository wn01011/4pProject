const sendBtn = document.getElementById("sendBtn");
const textArea = document.getElementsByTagName("textarea")[0];
const nameInput = document.getElementsByTagName("input")[0];
sendBtn.onclick = () => {
  if (textArea.value == "" || nameInput.value == "") return;
  axios
    .post("/api/notice/askRequest", {
      userId: "1",
      name: nameInput.value,
      text: textArea.value,
    })
    .then((item) => {
      if (item.data == "create fin") window.close();
    });
};
