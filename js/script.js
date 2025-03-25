// const cart = document.querySelector("#cart");

// // start when the document is ready
// if (document.readyState == "loading") {
//   document.addEventListener("DOMContentLoaded", start);
// } else {
//   start();
// }

// // ==============Start=============
// function start() {
//   addEvents();
// }

// // ==============Update & Re-Render=============
// function update() {
//   addEvents();
//   updateTotal();
// }

// // ==============Add Events=============
// function addEvents() {
//   // remove items from cart
//   let cartRemove_btns = document.querySelectorAll(".cart-remove");
//   cartRemove_btns.forEach((btn) => {
//     btn.addEventListener("click", handle_removeCartItem);
//   });

//   // change item quantity
//   let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
//   cartQuantity_inputs.forEach((input) => {
//     input.addEventListener("change", handle_changeItemQuantity);
//   });

//   // Add items to cart
//   let addCart_btns = document.querySelectorAll(".add-cart");
//   addCart_btns.forEach((btn) => {
//       btn.addEventListener("click", handle_addCartItem);
//   });

//   const buy_btn = document.querySelector('.btn-buy');
//     buy_btn.addEventListener('click', handle_buyOrder);

//   // const shipping = document.querySelector('.customer');
//   // shipping.addEventListener('submit', handle_shipping_address);

// }

// //==============Handle Events Functions==============

// // function handle_shipping_address(){
// //   if (customer_form == ' '){
// //     alert('Please, Fill the Form.');
// //     return;
// //   }else if(itemsAdded == ' '){
// //     shipping_form.style.display = 'none';
// //   }
// //   const checkout_btn = document.querySelector('.btn-buy');
// //   // checkout_btn
  
// //   update();
// // };


// let itemsAdded = [ ]

// function handle_addCartItem() {
//   let product = this.parentElement;
//   let title = product.querySelector(".product-title").innerHTML;
//   let price = product.querySelector(".product-price").innerHTML;
//   let imgSrc = product.querySelector(".product-image").src;

//   let newToAdd = {
//     title,
//     price,
//     imgSrc,
//   };
  

//   //   handle item if already in cart
//   if (itemsAdded.find((el) => el.title == newToAdd.title)) {
//     alert("This Item is Already Exist!");
//     return;
//   } else {
//       itemsAdded.push(newToAdd);
//        alert('Item Added to Cart Successfully :)');
//   };

//   // Add product to Cart
//   let cartBoxElement = CartBoxComponent(title, price, imgSrc);
//   let newNode = document.createElement("td");
//   newNode.innerHTML = cartBoxElement;
//   const cartContent = cart.querySelector(".cart-content");
//   cartContent.appendChild(newNode);
//   update();
// }

// function handle_removeCartItem() {
//   this.parentElement.remove();
//     itemsAdded = itemsAdded.filter(el => el.title == this.parentElement.querySelector('.cart-product-title'));
//   update();
// }

// function handle_changeItemQuantity() {
//   if (isNaN(this.value) || this.value < 1) {
//     this.value = 1;
//   }
//   this.value = Math.floor(this.value); //to keep it integer

//   update();
// }

// function handle_buyOrder(){
//   if(itemsAdded.length <= 0){
//     alert("There is No Order to Place Yet! \nPlease Make an Order first. ");
//     return;
//   }else{
//     const cartContent = cart.querySelector('.cart-content');
//     const shipping_form = document.querySelector('.customer');
//     if(itemsAdded.length === 0){
//       shipping_form.style.display = 'none';
//     }else{
//       shipping_form.style.display = 'block';
      
//     }
//   }
//   cartContent.innerHTML = ' ';
//   alert('Your Order is Placed Successfully :)');
//   location.reload();

//   update();
// }




// //==============Update & Renders Total Sum of cart itmes price==============
// function updateTotal() {
//   let cartBoxes = document.querySelectorAll(".cart-box");
//   const totalElement = cart.querySelector(".total-price");
//   let total = 0;

//   cartBoxes.forEach((cartBox) => {
//     let priceElement = cartBox.querySelector(".cart-price");
//     let price = parseFloat(priceElement.innerHTML.replace("₹", ""));
//     let quantity = cartBox.querySelector(".cart-quantity").value;
//     total += price * quantity;
//   });

//   // keep 2 digits after the decimal point
//   total = total.toFixed(2);
//   // or you can use also
//   // total = Math.round(total * 100 / 100);

//   totalElement.innerHTML = "₹" + total;
// }

// // ==============HTML Components==============
// function CartBoxComponent(title, price, imgSrc) {
//   return `
//                         <td>
//                             <div class="cart-info">
//                                 <img src=${imgSrc} class="cart-img">
//                                 <span class="cart-product-title">${title}</span>
//                             </div>
//                         </td>
//                         <td><input type="number" value="1" class="cart-quantity"></td>
//                         <td> <span>₹ <span class="cart-price">${price}</span></span></td>
//                         <td>
//                             <div class="cart-info">
//                                 <a href="#delete" class="btn cart-remove"><i class="far fa-trash"></i></a>
//                             </div>
//                         </td>`;
// }

const cart = document.querySelector("#cart");

// Wait for the DOM to load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// ==============Start=============
function start() {
  addEvents();
}

// ==============Update & Re-Render=============
function update() {
  addEvents();
  updateTotal();
}

// ==============Add Events=============
function addEvents() {
  // Remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Change item quantity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Add items to cart
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Buy button event
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

// ============== Handle Events Functions ==============

let itemsAdded = [];

function handle_addCartItem() {
  let product = this.closest(".product"); // More reliable than parentElement
  let title = product.querySelector(".product-title").innerText;
  let price = product.querySelector(".product-price").innerText.replace("₹", ""); // Remove ₹ symbol
  let imgSrc = product.querySelector(".product-image").src;

  let newToAdd = { title, price, imgSrc };

  // Check if item is already in the cart
  if (itemsAdded.find((el) => el.title === newToAdd.title)) {
    alert("This Item is Already in the Cart!");
    return;
  }

  itemsAdded.push(newToAdd);
  alert("Item Added to Cart Successfully :)");

  // Add product to cart
  let cartContent = document.querySelector(".cart-content");
  let newRow = document.createElement("tr");
  newRow.innerHTML = CartBoxComponent(title, price, imgSrc);
  cartContent.appendChild(newRow);

  update();
}

function handle_removeCartItem() {
  let row = this.closest("tr"); // Find the row of the item
  let title = row.querySelector(".cart-product-title").innerText;

  // Remove from `itemsAdded` array
  itemsAdded = itemsAdded.filter((item) => item.title !== title);

  row.remove(); // Remove row from DOM
  update(); // Update total price
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // Ensure integer value
  update();
}

function handle_buyOrder() {
  if (itemsAdded.length === 0) {
    alert("There is No Order to Place Yet! \nPlease Make an Order first.");
    return;
  }

  const shipping_form = document.querySelector(".customer");
  shipping_form.style.display = "block";

  setTimeout(() => {
    alert("Your Order is Placed Successfully :)");
    location.reload();
  }, 500);
}

// ============== Update Total Price ==============
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price span");
  let total = 0;

  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerText.replace("₹", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  totalElement.innerText = `₹${total.toFixed(2)}`; // Keep 2 decimal places
}

// ============== HTML Components ==============
function CartBoxComponent(title, price, imgSrc) {
  return `
    <tr class="cart-box">
      <td>
        <div class="cart-info">
          <img src="${imgSrc}" class="cart-img">
          <span class="cart-product-title">${title}</span>
        </div>
      </td>
      <td>
        <input type="number" value="1" class="cart-quantity">
      </td>
      <td>
        <span>₹ <span class="cart-price">${price}</span></span>
      </td>
      <td>
        <button class="btn cart-remove">Remove</button>
      </td>
    </tr>
  `;
}
