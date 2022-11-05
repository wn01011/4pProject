let slides = document.querySelector(".main-slider-img"),
  slide = document.querySelectorAll(".main-slider-img li"),
  currentIdx = 0,
  slideCount = slide.length,
  slideWidth = 1920,
  slideMargin = 0,
  prevBtn = document.querySelector(".btn-left"),
  nextBtn = document.querySelector(".btn-right");

makeClone();

function makeClone() {
  for (let i = 0; i < slideCount; i++) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.appendChild(cloneSlide);
  }
  for (let i = slideCount - 1; i >= 0; i--) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.prepend(cloneSlide);
  }
  updateWidth();
  setInitialPos();

  setTimeout(function () {
    slides.classList.add("transition");
  }, 100);
}

function updateWidth() {
  let currentSlides = document.querySelectorAll(".prom-container li");
  let newSlideCount = currentSlides.length;
  let newWidth =
    (slideWidth + slideMargin) * newSlideCount - slideMargin + "px";
  slides.style.width = newWidth;
}
function setInitialPos() {
  let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
  slides.style.transform = "translateX" + initialTranslateValue + "px";
}

nextBtn.addEventListener("click", function () {
  moveSlide(currentIdx + 1);
});

prevBtn.addEventListener("click", function () {
  moveSlide(currentIdx - 1);
});
// 이미지 슬라이드
function moveSlide(num) {
  slides.style.left = -num * (slideWidth + slideMargin) + "px";
  currentIdx = num;
  if (currentIdx == slideCount || currentIdx == -slideCount) {
    setTimeout(function () {
      slides.classList.remove("transition");
      slides.style.left = "0px";
      currentIdx = 0;
    }, 300);
    setTimeout(function () {
      slides.classList.add("transition");
    }, 400);
  }
}

let slideImg = 0;

slideImg = setInterval(reset, 3000);

function reset() {
  moveSlide(currentIdx + 1);
}
