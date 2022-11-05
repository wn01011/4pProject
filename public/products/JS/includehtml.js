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

includeHTML(document.getElementById("header_include"), "../header.html");
includeHTML(document.getElementById("footer_include"), "../footer.html");
// item slide html include하는 함수입니다.

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
