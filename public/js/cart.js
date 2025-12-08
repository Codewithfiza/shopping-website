let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const el = document.querySelector(".cart-count");
  if (!el) return;
  el.textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function renderCart() {
  const emptyUI = document.getElementById("cart-empty");
  const cartUI = document.getElementById("cart-section");
  const itemsBox = document.getElementById("cart-items");

  if (!itemsBox) return; // maybe not on cart page

  if (cart.length === 0) {
    emptyUI.classList.remove("hidden");
    cartUI.classList.add("hidden");
    return;
  }

  emptyUI.classList.add("hidden");
  cartUI.classList.remove("hidden");

  itemsBox.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, i) => {
    subtotal += item.price * item.qty;

    itemsBox.innerHTML += `
      <div class="cart-item">
        <img src="/img/${item.image}" />

        <div class="item-info">
          <p class="item-title">${item.name}</p>
          <p class="item-price">Rs ${item.price}</p>

          <div class="qty-box">
            <button class="qty-btn" onclick="decreaseQty(${i})">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="increaseQty(${i})">+</button>
          </div>
        </div>

        <i class="fa-solid fa-trash remove-icon" onclick="removeItem(${i})"></i>
      </div>`;
  });

  document.getElementById("summary-subtotal").innerText = `Rs ${subtotal}`;
  document.getElementById("summary-total").innerText = `Rs ${subtotal}`;
}

function increaseQty(i) {
  cart[i].qty++;
  saveCart();
  renderCart();
}

function decreaseQty(i) {
  if (cart[i].qty > 1) cart[i].qty--;
  else cart.splice(i, 1);

  saveCart();
  renderCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  saveCart();
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();

  const proceedBtn = document.getElementById("proceed-checkout");
  const checkoutSection = document.getElementById("checkout-section");
  const summaryBox = document.getElementById("summary-box");

  proceedBtn?.addEventListener("click", () => {
    // summaryBox.classList.add("hidden");
    checkoutSection.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const cancelOrderBtn = document.getElementById("cancel-order");
  cancelOrderBtn?.addEventListener("click", () => {
    // clear cart
    cart = [];
    saveCart();
    renderCart();

    // hide checkout form, show summary again
    checkoutSection.classList.add("hidden");
    summaryBox.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
    alert("Order cancelled — cart cleared.");
  });

  // handle place order form if present
  const checkoutForm = document.getElementById("checkout-form");
  checkoutForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderData = {
      items: cart,
      subtotal: cart.reduce((s, i) => s + i.price * i.qty, 0),
      shipping: 0,
      total: cart.reduce((s, i) => s + i.price * i.qty, 0),
      customer: {
        name: document.getElementById("cust-name").value.trim(),
        phone: document.getElementById("cust-phone").value.trim(),
        address: document.getElementById("cust-address").value.trim(),
        city: document.getElementById("cust-city").value.trim()
      }
    };

    const res = await fetch("/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });

    const data = await res.json();

    if (data.ok) {
      localStorage.removeItem("cart");
      window.location.href = "/thank-you";
    } else {
      alert("Error placing order.");
    }
  });
});
