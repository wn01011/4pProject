const noticeList = document.getElementById("noticeList");
async function getList() {
  try {
    const result = await axios.post("/api/notice/");
    console.log(result);
    result?.data?.list?.forEach((item) => {
      console.log(item);
      const boardItem = document.createElement("div");
      const boardNumber = document.createElement("span");
      const boardTitle = document.createElement("span");
      const boardWriter = document.createElement("span");
      const boardDate = document.createElement("span");

      boardItem.classList.add("noticeList_item");
      boardNumber.classList.add("noticeList_number");
      boardTitle.classList.add("noticeList_title");
      boardWriter.classList.add("noticeList_writer");
      boardDate.classList.add("noticeList_date");

      boardNumber.innerText = item.id;
      boardTitle.innerText = item.noticeName;
      boardWriter.innerText = item.writer;
      boardDate.innerText = item.createat;
      boardItem.append(boardNumber);
      boardItem.append(boardTitle);
      boardItem.append(boardWriter);
      boardItem.append(boardDate);
      noticeList.append(boardItem);
    });
  } catch (error) {
    console.error(error);
  }
}
getList();
