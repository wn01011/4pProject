const address = document.getElementById("checklist_shipping_address_address");
// async function getAddress() {
//   const data = await axios.post("/api/");
// }
getAddress();

const addressResult = document.getElementById("signup_board_address_result");
document.getElementById("checklist_shipping_address_btn").onclick = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      myAddress = data.address;
      addressResult.classList.add("on");
      addressResult.innerText = data.address;
    },
  }).open();
};
