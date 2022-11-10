const title = document.getElementById("item-head").children[0];
const sword = decodeURI(location.href.split("?")[1].split("=")[1]);
title.innerHTML = `<div style="font-size: 1.7rem">'<span style="color: purple;">${sword}</span>'에 대한 검색결과</div>`;

axios.post("/api/product/search", { sword: sword }).then((data) => {
  console.log(data);
});
