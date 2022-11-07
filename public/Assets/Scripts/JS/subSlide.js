console.log("come");

let subSlides = document.getElementById("items"),
  subslide = document.getElementById("items li"),
  currentIdx1 = 0,
  subslideWidth = 1090,
  subslideMargin = 12,
  leftBtn = document.getElementsByClassName("left"),
  rightBtn = document.getElementsByClassName("right");

[...rightBtn].forEach((item, idx) => {
  item.addEventListener("click", function () {
    console.log("click");
    moveSlide1(currentIdx1 + 1);
  });

  leftBtn[idx].addEventListener("click", function () {
    moveSlide1(currentIdx1 - 1);
  });
});

// 이미지 슬라이드
function moveSlide1(num) {
  currentIdx1 = num;
  subSlides.style.left = -num * (subslideWidth + subslideMargin) + "px";
}
