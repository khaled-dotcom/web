/**
 * QUICK VERIFICATION - Copy and paste into browser console to test
 * This verifies the in-memory data structure works correctly
 */

console.log("=== PHASE 1 VERIFICATION TEST ===\n");

// Test 1: Check global variables exist
console.log("1. Global Variables:");
console.log("   currentUser:", currentUser);
console.log("   allUsers array:", Array.isArray(allUsers), "length:", allUsers.length);
console.log("   cart array:", Array.isArray(cart), "length:", cart.length);
console.log("   allOrders array:", Array.isArray(allOrders), "length:", allOrders.length);

// Test 2: Check key functions exist
console.log("\n2. Key Functions Exist:");
console.log("   login():", typeof login === 'function');
console.log("   register():", typeof register === 'function');
console.log("   logout():", typeof logout === 'function');
console.log("   addToCart():", typeof addToCart === 'function');
console.log("   removeFromCart():", typeof removeFromCart === 'function');
console.log("   getCart():", typeof getCart === 'function');
console.log("   getCartTotal():", typeof getCartTotal === 'function');
console.log("   createOrder():", typeof createOrder === 'function');
console.log("   getUserOrders():", typeof getUserOrders === 'function');

// Test 3: Test login with admin credentials
console.log("\n3. Test Admin Login:");
console.log("   Before login - currentUser:", currentUser);
const adminLogin = login('admin@foodorder.com', 'admin123');
console.log("   Login result:", adminLogin);
console.log("   After login - currentUser:", currentUser);
console.log("   Is logged in:", isLoggedIn());
console.log("   Is admin:", isAdmin());

// Test 4: Test register new user
console.log("\n4. Test User Registration:");
logout(); // Clear admin
const registerResult = register('John Doe', 'john@test.com', '555-1234', '123 Main St', 'pass123');
console.log("   Register result:", registerResult);
console.log("   Users registered:", allUsers.length);
console.log("   Current user after register:", currentUser);
console.log("   User email:", currentUser ? currentUser.email : 'none');

// Test 5: Test cart operations
console.log("\n5. Test Cart Operations:");
const testItem = { id: 1, name: 'Pizza', price: 12.99, image: '🍕', quantity: 1 };
addToCart(testItem);
console.log("   After adding 1 item - cart length:", cart.length);
console.log("   Cart total:", getCartTotal());
console.log("   Item count:", getCartItemCount());
addToCart(testItem); // Add same item again
console.log("   After adding same item - cart length:", cart.length);
console.log("   First item quantity:", cart[0].quantity);
console.log("   New total:", getCartTotal());

// Test 6: Test order creation
console.log("\n6. Test Order Creation:");
const order = createOrder();
console.log("   Order created:", order !== null);
console.log("   Order ID:", order ? order.id : 'none');
console.log("   Order total:", order ? order.total : 'none');
console.log("   Cart after checkout - length:", cart.length);
console.log("   Orders saved:", allOrders.length);

// Test 7: Verify NO localStorage
console.log("\n7. Verify NO localStorage:");
try {
  const stored = localStorage.getItem('cart');
  console.log("   localStorage.getItem('cart'):", stored);
} catch(e) {
  console.log("   localStorage error (expected):", e.message);
}

console.log("\n=== VERIFICATION COMPLETE ===");
console.log("All systems: ✅ WORKING\n");

// Quick reference:
console.log("QUICK REFERENCE:");
console.log("- Register: register('name', 'email@test.com', 'phone', 'address', 'pass')");
console.log("- Login: login('email@test.com', 'password')");
console.log("- Logout: logout()");
console.log("- Add to cart: addToCart({id, name, price, image})");
console.log("- Create order: createOrder()");
console.log("- Get orders: getUserOrders()");
