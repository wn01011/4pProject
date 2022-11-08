let subSlides = document.getElementById("items"),
  subslide = document.getElementById("items li"),
  currentIdx1 = 0,
  subslideWidth = 1090,
  subslideMargin = 29,
  leftBtn = document.getElementsByClassName("left"),
  rightBtn = document.getElementsByClassName("right");

[...rightBtn].forEach((item) => {
  item.onclick = function () {
    moveSlide1(currentIdx1 + 1);
    console.log(currentIdx1);
    if (currentIdx1 >= 1) {
      console.log("hey");
      leftBtn[0].style.display = "flex";
    }
  };
});

[...leftBtn].forEach((item) => {
  item.onclick = function () {
    console.log(currentIdx1);

    if (currentIdx1 <= 0) {
      return;
    } else {
      moveSlide1(currentIdx1 - 1);
    }
  };
});

// 이미지 슬라이드
function moveSlide1(num) {
  currentIdx1 = num;
  subSlides.style.left = -num * (subslideWidth + subslideMargin) + "px";
}
