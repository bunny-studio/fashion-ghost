document.addEventListener("DOMContentLoaded", function () {
  loadCartItems();
});

// Function to load cart items from localStorage
function loadCartItems() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let cartContent = document.querySelector(".cart-content");

  cartContent.innerHTML = "";

  if (cartItems.length === 0) {
    cartContent.innerHTML = "<tr><td colspan='4'>Your cart is empty</td></tr>";
    updateTotal();
    return;
  }

  cartItems.forEach((item, index) => {
    let newRow = document.createElement("tr");
    newRow.innerHTML = CartBoxComponent(item, index);
    cartContent.appendChild(newRow);
  });

  updateTotal();
}

// Function to create cart row
function CartBoxComponent(item, index) {
  return `
    <tr class="cart-box">
      <td>
        <div class="cart-info">
          <img src="${item.imgSrc}" class="cart-img">
          <span class="cart-product-title">${item.title}</span>
        </div>
      </td>
      <td>
        <input type="number" value="${item.quantity}" class="cart-quantity" data-index="${index}" min="1">
      </td>
      <td>
        ₹ <span class="cart-price">${item.price}</span>
      </td>
      <td>
        <button class="btn cart-remove" data-index="${index}"><i class="far fa-trash"></i></button>
      </td>
    </tr>
  `;
}

// Handle remove item event
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("cart-remove")) {
    let index = e.target.getAttribute("data-index");

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    loadCartItems();
  }
});

// Handle quantity change event
document.addEventListener("change", function (e) {
  if (e.target.classList.contains("cart-quantity")) {
    let index = e.target.getAttribute("data-index");
    let newQuantity = parseInt(e.target.value);

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (newQuantity < 1) newQuantity = 1;
    
    cartItems[index].quantity = newQuantity;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateTotal();
  }
});

// Checkout functionality
document.querySelector(".btn-buy").addEventListener("click", function () {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Your order has been placed successfully!");
  localStorage.removeItem("cartItems");
  loadCartItems();
});

// Function to update total price
function updateTotal() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  document.querySelector(".total-price span").innerText = "₹" + total.toFixed(2);
}
