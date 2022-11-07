const itemList = document.getElementById("item-inner2");
const categoriList = document.getElementById("item-list");

getList();

async function getList() {
  try {
    const tempDiv = document.createElement("div");

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

    const tempUl = document.createElement("ul");
    tempUl.style = `
    display: flex;
    width: 800px;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
    `;
    const tempLi = document.createElement("li");
    tempLi.style = `
    width: 290px;
    height: 450px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    `;
    tempLi.innerHTML = `<img src="/api/product/download20" alt="" />
    <p>가격</p>
    <p>가격</p>
    <p>가격</p>
    <span><img src="/imges/cart3.svg" alt="" /></span>
    <img src="/api/product/download2" alt="" />
    <p>가격</p>
    <p>가격</p>
    <p>가격</p>
    <span><img src="/imges/cart3.svg" alt="" /></span>
    <img src="/api/product/download20" alt="" />
    <p>가격</p>
    <p>가격</p>
    <p>가격</p>
    <span><img src="/imges/cart3.svg" alt="" /></span>`;

    itemList.getElementsByTagName("ul")[0].append(tempLi);
    // const productItem = document.createElement("div");
    // const innerItem = document.createElement("div");
  } catch (error) {
    console.log(error);
  }
}

axios.post("/api/product/getCategory", { category: "야채" }).then((data) => {
  console.log(data);
  // const tempDiv = document.createElement("div");
  // tempDiv.style = `
  //     width : 100px;
  //     height : 100px;
  //     background-color: blue;
  //   `;
  // const childDiv = document.createElement("div");
  // childDiv.style = `
  //     width : 50px;
  //     height : 30px;
  //     background-color: pink;
  //     display : flex;
  //   `;
  //   tempDiv.appendChild(childDiv);
  //   itemList.appendChild(tempDiv);
  //   const tempLi = document.createElement("li");
  //   tempLi.innerHTML = `<img src="/api/product/download20" alt="" />
  //     <p>이름 : ${data.data[0].name}</p>
  //     <p>가격</p>
  //     <p>정보</p>
  //     <span><img src="/imges/cart3.svg" alt="" /></span>`;
  //   itemList.getElementsByTagName("ul")[0].append(tempLi);
});

// function 요청(categoryname){return 원하는 리스트}
