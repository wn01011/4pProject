async function getCartList() {
  try {
    const data = await axios.post("/api/cart/cartlist", {
      userid: document.cookie.split("=")[0],
    });
    console.log(data.data.tempList);
  } catch (error) {
    console.error(error);
  }
}

getCartList();

const address = document.getElementById("checklist_shipping_address_address");
let myAddress;

async function getAddress() {
  try {
    const data = await axios.post("/api/cart/address", {
      userid: document.cookie.split("=")[0],
    });
    address.innerText = data.data.address;
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("checklist_shipping_address_btn").onclick = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      myAddress = data.address;
      address.innerText = data.address;
    },
  }).open();
};

getAddress();
