const noticeList = document.getElementById("noticeList");
async function getList() {
  try {
    const result = await axios.post("/api/notice/");
    console.log(result);
    result?.data?.list?.forEach((item) => {
      console.log(item);
      const boardItem = document.createElement("div");
      const boardTitleBox = document.createElement("div");
      const boardNumber = document.createElement("span");
      const boardTitle = document.createElement("span");
      const boardWriter = document.createElement("span");
      const boardDate = document.createElement("span");
      const boardTextBox = document.createElement("div");
      const boardText = document.createElement("div");

      boardItem.classList.add("noticeList_item");
      boardTitleBox.classList.add("noticeList_titleBox");
      boardNumber.classList.add("noticeList_number");
      boardTitle.classList.add("noticeList_title");
      boardWriter.classList.add("noticeList_writer");
      boardDate.classList.add("noticeList_date");
      boardTextBox.classList.add("noticeList_textBox");
      boardText.classList.add("noticeList_text");

      boardNumber.innerText = item.id;
      boardTitle.innerText = item.noticeName;
      boardWriter.innerText = item.writer;
      boardDate.innerText = item.createdAt.split("T")[0];
      boardText.innerText = item.text;

      boardTextBox.append(boardText);

      boardTitleBox.append(boardNumber);
      boardTitleBox.append(boardTitle);
      boardTitleBox.append(boardWriter);
      boardTitleBox.append(boardDate);

      boardItem.append(boardTitleBox);
      boardItem.append(boardTextBox);

      noticeList.append(boardItem);

      boardTitleBox.onclick = function () {
        boardTextBox.classList.toggle("on");
      };
    });
  } catch (error) {
    console.error(error);
  }
}
getList();
