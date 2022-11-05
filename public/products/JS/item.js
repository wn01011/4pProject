const itemList = document.getElementById("item-list");
const categoriList = document.getElementById("item-list");

getList();

async function getList() {
  try {
    console.log("hi");
    const tempDiv = document.createElement("div");
    tempDiv.style = `
    width : 100px;
    height : 100px;
    background-color: blue;
  `;
    const childDiv = document.createElement("div");
    childDiv.style = `
    width : 50px;
    height : 30px;
    background-color: pink;
  `;
    tempDiv.appendChild(childDiv);
    itemList.appendChild(tempDiv);
    // const result = (await axios.get("/api/vegi")).data;
    // itemList.innerHTML = "";
    const tempLi = document.createElement("li");
    tempLi.innerHTML = `<img src="/api/product/download20" alt="" />
    <p>${data.data[0].name}</p>
    <p>${data.data[0].price}</p>
    <p>${data.data[0].info}</p>
    <span><img src="/imges/cart3.svg" alt="" /></span>`;

    itemList.getElementsByTagName("ul")[0].append(tempLi);
    const productItem = document.createElement("div");
    const innerItem = document.createElement("div");
  } catch (error) {
    console.log(error);
  }
}

axios.post("/api/product/getCategory", { category: "야채" }).then((data) => {
  console.log(data);
  const tempDiv = document.createElement("div");
  tempDiv.style = `
    width : 100px;
    height : 100px;
    background-color: blue;
  `;
  const childDiv = document.createElement("div");
  childDiv.style = `
    width : 50px;
    height : 30px;
    background-color: pink;
  `;
  tempDiv.appendChild(childDiv);
  itemList.appendChild(tempDiv);
  // const result = (await axios.get("/api/vegi")).data;
  // itemList.innerHTML = "";
  const tempLi = document.createElement("li");
  tempLi.innerHTML = `<img src="/api/product/download20" alt="" />
    <p>이름 : ${data.data[0].name}</p>
    <p>가격</p>
    <p>정보</p>
    <span><img src="/imges/cart3.svg" alt="" /></span>`;

  itemList.getElementsByTagName("ul")[0].append(tempLi);
});

// function 요청(categoryname){return 원하는 리스트}
