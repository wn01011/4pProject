function includeHTML(divContainer, urlHTML) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        divContainer.innerHTML = this.responseText;
      }
      if (this.status == 404) {
        divContainer.innerHTML = "페이지를 찾을 수 없습니다.";
      }
    }
  };
  xhttp.open("GET", urlHTML, true);
  xhttp.send();
}

includeHTML(document.getElementById("header_include"), "header.html");
includeHTML(document.getElementById("footer_include"), "footer.html");
