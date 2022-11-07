axios
  .post("/api/product", { data: "채소" })
  .then((data) => {
    console.log(data);
    getList(data.data[1].img);
    getList(data.data[1].manufacturer);
  })
  .catch((err) => {
    console.error(err);
  });

const itemList = document.getElementById("item-image");
const itemDelivery = document.getElementById("item-delivery");
const itemName = document.getElementById("item-name");
const categoriList = document.getElementById("item-list");

async function getList(img, manufacturer) {
  try {
    const itemDiv = document.createElement("div");
    const itemImg = document.createElement("img");
    const itemInfoP = document.createElement("p");
    const itemInfoDiv2 = document.createElement("div");
    const itemInfoLi = document.createElement("h2");
    const itemInfoDiv3 = document.createElement("div");
    const itemInfo2P = document.createElement("p");
    const itemInfoDiv4 = document.createElement("div");
    const itemInfoLi2 = document.createElement("h2");
    const itemInfoDiv5 = document.createElement("div");
    const itemInfo3P = document.createElement("p");

    itemImg.style = `
    width:420px;
    hight:920px;`;
    itemImg.src = `/api/product/download${img}`;

    itemInfoP.innerText = `${manufacturer}`;

    itemName.append(itemInfoP);
    itemDiv.append(itemImg);
    itemList.append(itemDiv);
  } catch (error) {
    console.log(error);
  }
}

// const itemList = document.getElementById("item-inner2");
// const categoriList = document.getElementById("item-list");

// getList();

// async function getList() {
//   try {
//     const tempDiv = document.createElement("div");

//     const childDiv = document.createElement("div");
//     childDiv.style = `
//     width : 50px;
//     height : 30px;
//     background-color: pink;
//   `;
//     tempDiv.appendChild(childDiv);
//     itemList.appendChild(tempDiv);
//     // const result = (await axios.get("/api/vegi")).data;
//     // itemList.innerHTML = "";

//     const tempUl = document.createElement("ul");
//     tempUl.style = `
//     display: flex;
//     width: 800px;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     padding: 20px;
//     `;
//     const tempLi = document.createElement("li");
//     tempLi.style = `
//     width: 290px;
//     height: 450px;
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     `;
//     tempLi.innerHTML = `<img src="/api/product/download20" alt="" />
//     <p>가격</p>
//     <p>가격</p>
//     <p>가격</p>
//     <span><img src="/imges/cart3.svg" alt="" /></span>
//     <img src="/api/product/download2" alt="" />
//     <p>가격</p>
//     <p>가격</p>
//     <p>가격</p>
//     <span><img src="/imges/cart3.svg" alt="" /></span>
//     <img src="/api/product/download20" alt="" />
//     <p>가격</p>
//     <p>가격</p>
//     <p>가격</p>
//     <span><img src="/imges/cart3.svg" alt="" /></span>`;

//     itemList.getElementsByTagName("ul")[0].append(tempLi);
//     const productItem = document.createElement("div");
//     const innerItem = document.createElement("div");
//   } catch (error) {
//     console.log(error);
//   }
// }
