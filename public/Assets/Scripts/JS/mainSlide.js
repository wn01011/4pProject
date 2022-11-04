const slides = document.getElementById("main-slider-img");
const slideImg = document.querySelectorAll("#main-slider-img li");
const leftBtn = document.getElementById("btn-left");
const rightBtn = document.getElementById("btn-right");

// rightBtn.addEventListener("click", () => {
//   console.log(slideImg);
//   slideImg = ;
// });

// let currIdx = 0,
//   slideCount = slideImg.length,
//   slideWidth = 1900;

// makeClone();

// function makeClone() {
//   for (let i = 0; i < slideCount; i++) {
//     let cloneSlide = slideImg[i].cloneNode(true);
//     cloneSlide.classList.add("clone");
//     slides.appendChild(cloneSlide);
//   }
//   for (let i = slideCount - 1; i >= 0; i--) {
//     let cloneSlide = slideImg[i].cloneNode(true);
//     cloneSlide.classList.add("clone");
//     slides.prepend(cloneSlide);
//   }
//   updateWidth();
//   setInitialPos();

//   setTimeout(function () {
//     slides.classList.add("transition");
//   }, 100);
// }

// function updateWidth() {
//   let currentSlides = slideImg;
//   let newSlideCount = currentSlides.length;
//   let newWidth = slideWidth * newSlideCount + "px";
//   slides.style.width = newWidth;
// }
// function setInitialPos() {
//   let initialTranslateValue = -slideWidth * slideCount;
//   slides.style.transform = "translateX" + initialTranslateValue + "px";
// }

// rightBtn.addEventListener("click", () => {
//   moveSlide(currentIdx + 1);
// });

// leftBtn.addEventListener("click", () => {
//   moveSlide(currentIdx - 1);
// });
