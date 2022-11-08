function includeHTML(divContainer, urlHTML) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        divContainer.innerHTML = this.responseText;
      }
    }
  };
  xhttp.open("GET", urlHTML, true);
  xhttp.send();
}
// header footer를 include하는 함수입니다.

includeHTML(document.getElementById("header_include"), "/header.html");
includeHTML(document.getElementById("how"), "/how.html");
includeHTML(document.getElementById("main-slider"), "/mainSlide.html");
includeHTML(document.getElementById("md-recommend"), "/recommend.html");
includeHTML(document.getElementById("plus-deal"), "/plus.html");
includeHTML(document.getElementById("footer_include"), "/footer.html");
// item slide html include하는 함수입니다.

function getCookie(cookieName) {
  console.log("쿠키 가져오기 함수 실행");
  cookieName = `${cookieName}=`;
  console.log(cookieName);
  let cookieData = document.cookie;
  console.log("cookieData : ", cookieData);
  let cookieValue = "";
  let start = cookieData.indexOf(cookieName);
  console.log("start : ", start);
  if (start !== -1) {
    console.log("start는 -1이 아님");
    start += cookieName.length;
    let end = cookieData.indexOf(";", start);
    console.log("end : ", end);
    if (end === -1) end = cookieData.length;
    console.log("end : ");
    cookieValue = cookieData.substring(start, end);
    console.log("cookieValue : ", cookieValue);
  }
  console.log("unescape : ", unescape(cookieValue));
  return cookieValue;
}

getCookie("clearLogin");

window.onscroll = function () {
  if (
    document.body.scrollTop > 180 ||
    document.documentElement.scrollTop > 180
  ) {
    document.getElementById("header_scroll").classList.add("on");
  } else {
    document.getElementById("header_scroll").classList.remove("on");
  }
};
