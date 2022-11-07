const uparrow = document.getElementById("uparrow");
// const bodyHeight = innerHeight.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.screenY > 1000) {
    uparrow.classList.add("active");
    console.log("ㅋㅋ");
  } else {
    uparrow.classList.remove("active");
    console.log("ㅋㅋ");
  }
});

const sellRegi = document.getElementById("sell-regi"),
  btnRegi = document.querySelector(".regi-before-go");

btnRegi.addEventListener("click", function () {
  sellRegi.classList.toggle("add");
});

const regiSubmit = document.getElementById("regi-submit");
//
regiSubmit.addEventListener("click", function () {
  sellRegi.classList.remove("add");
});
