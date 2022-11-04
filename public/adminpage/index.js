const uparrow = document.getElementById("uparrow");
// const bodyHeight = innerHeight.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.screenY > 1000) {
    uparrow.classList.add("active");
  } else {
    uparrow.classList.remove("active");
  }
});

const sellRegi = document.getElementById("sell-regi"),
  btnRegi = document.querySelector("regi-before-go");

btnRegi.addEventListener(
  "click",
  function () {
    sellRegi.classList.toggle("hidden");
  },
  false
);
