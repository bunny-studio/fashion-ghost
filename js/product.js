document.addEventListener("DOMContentLoaded", function () {
  let addCartButtons = document.querySelectorAll(".add-cart");

  addCartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default action

      let product = this.closest(".col-4"); // Adjusted selector to target the correct product container
      let title = product.querySelector(".product-title").innerText;
      let price = product.querySelector(".product-price").innerText.replace("₹", "").trim();
      let imgSrc = product.querySelector(".product-image").src;

      let newItem = { title, price, imgSrc, quantity: 1 };

      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      // Check if item already exists
      let existingItem = cartItems.find((item) => item.title === newItem.title);
      if (existingItem) {
        alert("This item is already in your cart!");
        return;
      }

      // Add item to cart storage
      cartItems.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      alert("Item added to cart successfully!");
    });
  });
var menuitems = document.getElementById("menuitems");
menuitems.style.maxHeight = "0px";

function menutoggle() {
  if (menuitems.style.maxHeight == "0px") {
    menuitems.style.maxHeight = "200px";
  } else {
    menuitems.style.maxHeight = "0px";
  }
}
});
