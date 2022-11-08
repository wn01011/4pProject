// const bodyHeight = innerHeight.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  const uparrow = document.getElementById("uparrow");
  const y = window.pageYOffset;
  if (y > 1000) {
    uparrow.classList.add("active");
  } else {
    uparrow.classList.remove("active");
  }
});

const sellRegi = document.getElementById("sell-regi"),
  btnRegi = document.querySelector(".regi-before-go"),
  regiSubmit = document.getElementById("regi-submit");

btnRegi.addEventListener("click", function () {
  sellRegi.classList.add("add");
});

regiSubmit.addEventListener("click", function () {
  sellRegi.classList.remove("add");
});

const bCatInput = document.getElementById("b-cat-input");
const bigCatIp = document.getElementById("bigcatip");
const bCatSave = document.getElementById("b-cat-save");

bCatInput.addEventListener("click", function () {
  bigCatIp.classList.add("bigdirinput");
});

bCatInput.addEventListener("click", function () {
  bCatSave.classList.add("bigdirsave");
});
