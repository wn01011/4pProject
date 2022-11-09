const address = document.getElementById("checklist_shipping_address_address");
// async function getAddress() {
//   const data = await axios.post("/api/");
// }
getAddress();
async function getAddress() {
  try {
    const data = await axios.post("/api/cart/address");
    address.innerText = data.data.address;
  } catch (error) {
    console.error(error);
  }
}
let myAddress;
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
