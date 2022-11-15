const sendBtn = document.getElementById("sendBtn");
const textArea = document.getElementsByTagName("textarea")[0];
const nameInput = document.getElementsByTagName("input")[0];

function getUserId() {
  for (let i = 0; i < document.cookie.split(";").length; ++i) {
    return document.cookie.split(";")[i].split("=")[0];
  }
}

sendBtn.onclick = () => {
  if (textArea.value == "" || nameInput.value == "") return;
  let curUserId = getUserId();
  if (curUserId) {
    axios
      .post("/api/notice/askRequest", {
        userId: getUserId(),
        name: nameInput.value,
        text: textArea.value,
      })
      .then((item) => {
        if (item.data == "create fin") window.close();
      });
  }
};
