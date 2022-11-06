let subSlides = document.getElementById("items"),
  subslide = document.getElementById("items li"),
  currentIdx1 = 1,
  subslideWidth = 1090,
  subslideMargin = 12,
  leftBtn = document.getElementById("left"),
  rightBtn = document.getElementById("right");

rightBtn.addEventListener("click", function () {
  moveSlide1(currentIdx1 + 1);
  leftBtn.style.display = "flex";
});

leftBtn.addEventListener("click", function () {
  moveSlide1(currentIdx1 - 1);
});

// 이미지 슬라이드
function moveSlide1(num) {
  currentIdx1 = num;
  subSlides.style.left = -num * (subslideWidth + subslideMargin) + "px";
}
