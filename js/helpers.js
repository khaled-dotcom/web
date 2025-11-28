/**
 * HELPERS.JS - Simple utility functions for the Food Ordering Platform
 * Beginner-friendly code with clear function names and comments
 * Phase 1: In-memory data (no LocalStorage, no JSON)
 * Data resets when page is refreshed (this is simple for Phase 1 beginners)
 */

// ============= GLOBAL DATA (IN-MEMORY) =============
// These variables hold all the data while the user is on the page
// They reset when the page is refreshed (this is simple for Phase 1 beginners)

let currentUser = null;
let allUsers = [];
let cart = [];
let allOrders = [];

// ============= AUTHENTICATION HELPERS =============

/**
 * Check if a user is logged in
 * Returns true/false
 */
function isLoggedIn() {
  return currentUser !== null;
}

/**
 * Check if the logged-in user is an admin
 * Returns true/false
 */
function isAdmin() {
  return currentUser && currentUser.role === 'admin';
}

/**
 * Log in a user by email and password
 * Returns true if login successful, false otherwise
 */
function login(email, password) {
  // Find user in allUsers array
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === email && allUsers[i].password === password) {
      currentUser = allUsers[i];
      return true;
    }
  }
  
  // Check admin hardcoded credentials
  if (email === 'admin@foodorder.com' && password === 'admin123') {
    currentUser = {
      id: 0,
      email: 'admin@foodorder.com',
      fullName: 'Admin',
      role: 'admin'
    };
    return true;
  }
  
  return false;
}

/**
 * Log out the current user
 */
function logout() {
  currentUser = null;
}

/**
 * Register a new user (customer)
 * Returns true if successful, false if email already exists
 */
function register(fullName, email, phone, address, password) {
  // Check if email already exists
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === email) {
      return false; // Email already taken
    }
  }
  
  // Create new user object
  const newUser = {
    id: allUsers.length + 1,
    fullName: fullName,
    email: email,
    phone: phone,
    address: address,
    password: password,
    role: 'customer',
    createdAt: new Date().toISOString()
  };
  
  // Add to users list
  allUsers.push(newUser);
  
  // Auto-login after registration
  currentUser = newUser;
  
  return true;
}

/**
 * Get current logged-in user
 * Returns user object or null
 */
function getCurrentUser() {
  return currentUser;
}

/**
 * Get user's full name (or email if fullName not available)
 * Returns string
 */
function getUserName() {
  return currentUser ? (currentUser.fullName || currentUser.email) : 'Guest';
}

// ============= CART HELPERS =============

/**
 * Get the shopping cart
 * Returns array of items
 */
function getCart() {
  return cart;
}

/**
 * Get total price of all items in cart (price * quantity)
 * Returns number
 */
function getCartTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}

/**
 * Get total count of items in cart (sum of all quantities)
 * Returns number
 */
function getCartItemCount() {
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count += cart[i].quantity;
  }
  return count;
}

/**
 * Add item to cart (or increase quantity if already in cart)
 * item should have: id, name, price, image
 * Returns true
 */
function addToCart(item) {
  // Check if item already in cart
  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === item.id) {
      cart[i].quantity += 1;
      found = true;
      break;
    }
  }
  
  // Add new item if not found
  if (!found) {
    item.quantity = 1;
    cart.push(item);
  }
  
  updateCartBadge();
  return true;
}

/**
 * Remove item from cart by ID
 * Returns true
 */
function removeFromCart(itemId) {
  // Filter out the item
  let newCart = [];
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id !== itemId) {
      newCart.push(cart[i]);
    }
  }
  cart = newCart;
  
  updateCartBadge();
  return true;
}

/**
 * Update quantity of item in cart
 * quantity must be > 0 (or item is removed)
 * Returns true/false
 */
function updateCartQuantity(itemId, quantity) {
  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    return removeFromCart(itemId);
  }
  
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === itemId) {
      cart[i].quantity = quantity;
      updateCartBadge();
      return true;
    }
  }
  
  return false;
}

/**
 * Clear entire cart
 * Returns true
 */
function clearCart() {
  cart = [];
  updateCartBadge();
  return true;
}

// ============= ORDER HELPERS =============

/**
 * Create and save an order
 * Returns order object with ID or null
 */
function createOrder() {
  if (!currentUser) {
    return null;
  }
  
  if (cart.length === 0) {
    return null; // Can't order empty cart
  }
  
  // Make a copy of cart items for the order
  let orderItems = [];
  for (let i = 0; i < cart.length; i++) {
    orderItems.push(cart[i]);
  }
  
  const order = {
    id: Date.now(), // Simple unique ID using timestamp
    userId: currentUser.id,
    items: orderItems,
    total: getCartTotal(),
    status: 'pending', // pending, processing, completed, delivered
    createdAt: new Date().toISOString()
  };
  
  // Save order to allOrders
  allOrders.push(order);
  
  // Clear cart
  clearCart();
  
  return order;
}

/**
 * Get all orders for current user
 * Returns array of orders
 */
function getUserOrders() {
  if (!currentUser) {
    return [];
  }
  
  let userOrders = [];
  for (let i = 0; i < allOrders.length; i++) {
    if (allOrders[i].userId === currentUser.id) {
      userOrders.push(allOrders[i]);
    }
  }
  return userOrders;
}

/**
 * Get order by ID
 * Returns order object or null
 */
function getOrderById(orderId) {
  for (let i = 0; i < allOrders.length; i++) {
    if (allOrders[i].id === parseInt(orderId)) {
      return allOrders[i];
    }
  }
  return null;
}

// ============= UI HELPERS =============

/**
 * Update the cart badge (number shown on cart icon)
 */
function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    const count = getCartItemCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

/**
 * Show alert message (wrapper for convenience)
 */
function showMessage(message) {
  alert(message);
}

/**
 * Redirect to a page
 */
function goToPage(page) {
  window.location.href = page;
}

/**
 * Check if user is logged in, redirect to login if not
 * Returns true/false
 */
function requireLogin() {
  if (!isLoggedIn()) {
    alert('Please log in first');
    goToPage('/login.html');
    return false;
  }
  return true;
}

/**
 * Check if user is admin, redirect to login if not
 * Returns true/false
 */
function requireAdmin() {
  if (!isAdmin()) {
    alert('Admin access required');
    goToPage('/login.html');
    return false;
  }
  return true;
}

/**
 * END OF HELPERS.JS
 * All functions are now simple, beginner-friendly, and use in-memory data only
 * No LocalStorage, no JSON parsing
 */
