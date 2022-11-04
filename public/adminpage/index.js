const uparrow = document.getElementById("uparrow");
// const bodyHeight = innerHeight.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.screenY > 1000) {
    uparrow.classList.add("active");
  } else {
    uparrow.classList.remove("active");
  }
});
