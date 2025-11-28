/**
 * CART.JS - Shopping Cart Functionality
 * Beginner-friendly: Simple add/remove/update functions using helpers
 * Phase 1: All data stored in-memory (no LocalStorage)
 */

/**
 * Display cart items on the cart page
 */
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;
    
    const cartItems = getCart();
    
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p style="text-align:center;padding:20px;color:#666;">Your cart is empty</p>';
        displayCartSummary();
        return;
    }
    
    // Create HTML for each cart item
    let html = '';
    cartItems.forEach(item => {
        html += `
            <div class="cart-item">
                <div style="min-width:64px;text-align:center;font-size:2rem;">${item.image}</div>
                <div class="cart-item-details" style="flex:1;margin-left:10px;">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">−</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                        <button class="quantity-btn" style="background:#dc3545;color:#fff;" onclick="removeFromCart(${item.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    displayCartSummary();
}

/**
 * Display cart summary (subtotal, total)
 */
function displayCartSummary() {
    const summaryContainer = document.getElementById('cart-summary');
    if (!summaryContainer) return;
    
    const total = getCartTotal();
    const itemCount = getCartItemCount();
    
    summaryContainer.innerHTML = `
        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>Free</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="btn btn-primary" style="width:100%;margin-top:1rem;" onclick="checkoutCart()">
                Proceed to Checkout
            </button>
            <button class="btn btn-outline" style="width:100%;margin-top:0.5rem;" onclick="continueShopping()">
                Continue Shopping
            </button>
        </div>
    `;
}

/**
 * Increase item quantity
 */
function increaseQuantity(itemId) {
    const cartItems = getCart();
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
        updateCartQuantity(itemId, item.quantity + 1);
        displayCart();
    }
}

/**
 * Decrease item quantity
 */
function decreaseQuantity(itemId) {
    const cartItems = getCart();
    const item = cartItems.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
        updateCartQuantity(itemId, item.quantity - 1);
    } else {
        removeFromCart(itemId);
    }
    displayCart();
}

/**
 * Proceed to checkout
 */
function checkoutCart() {
    if (getCartItemCount() === 0) {
        showMessage('Your cart is empty');
        return;
    }
    
    if (!isLoggedIn()) {
        showMessage('Please log in to checkout');
        goToPage('/login.html');
        return;
    }
    
    // Create order
    const order = createOrder();
    if (order) {
        showMessage('Order placed successfully!\nOrder ID: ' + order.id);
        goToPage('/order-tracking.html?id=' + order.id);
    } else {
        showMessage('Error creating order. Please try again.');
    }
}

/**
 * Continue shopping
 */
function continueShopping() {
    goToPage('/menu.html');
}

/**
 * Initialize cart page on load
 */
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    updateCartBadge();
});
