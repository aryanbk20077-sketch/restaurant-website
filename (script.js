// script.js

let cart = [];

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    
    // Add remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.style.marginLeft = "10px";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      updateCart();
    };
    
    li.appendChild(removeBtn);
    cartList.appendChild(li);

    total += parseInt(item.price);
  });

  totalEl.textContent = total;
}

// Add-to-cart buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = button.dataset.price;

    cart.push({ name, price });
    updateCart();
  });
});

// Checkout button - WhatsApp
document.getElementById("checkout").addEventListener("click", () => {
  if(cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello, I want to place an order:%0A";
  cart.forEach(item => {
    message += `${item.name} - ₹${item.price}%0A`;
  });

  const whatsappUrl = `https://wa.me/917063385345?text=${message}`;
  window.open(whatsappUrl, "_blank");
});
