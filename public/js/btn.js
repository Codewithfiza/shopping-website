// -----------------------------
//   CART INITIAL SETUP
// -----------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Update cart count badge
function updateCartCount() {
    const cartCountEl = document.querySelector(".cart-count");
    if (cartCountEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountEl.textContent = totalItems;
    }
}

// -----------------------------
//   ADD ITEM TO CART
// -----------------------------
function addToCart(name, price, image, button) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            name,
            price: Number(price),
            image,
            qty: 1
        });
    }

    saveCart();

    // Show toast near the clicked button
    showToast(`${name} added to cart`, button);
}

// -----------------------------
//   TOAST POPUP (Nice Alert)
// -----------------------------
function showToast(message, button) {
    let toast = document.createElement("div");
    toast.className = "cart-toast";
    toast.innerText = message;
    
    console.log("🎉 Toast created:", message);

    document.body.appendChild(toast);
    console.log("✅ Toast appended to body, element:", toast);

    // Get button position
    if (button) {
        const rect = button.getBoundingClientRect();
        toast.style.top = (rect.bottom + window.scrollY + 10) + "px";
        toast.style.left = (rect.left + rect.width / 2) + "px";
        toast.style.transform = "translateX(-50%)";
    }

    // Force a reflow to ensure the transition works
    setTimeout(() => {
        toast.classList.add("show");
       
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        
        setTimeout(() => {
            toast.remove();
            console.log("🗑️ Toast removed from DOM");
        }, 400);
    }, 2000);
}

// -----------------------------
//   BUTTON CLICK HANDLER
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    // Initialize cart count on page load
    updateCartCount();
    
    document.querySelectorAll(".product-cart-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const button = e.currentTarget;

            addToCart(
                button.dataset.name,
                button.dataset.price,
                button.dataset.image,
                button
            );
        });
    });
});
