# Phase 1 - Food Ordering Platform (In-Memory Data)

## ✅ Completed Tasks

### 1. **Removed LocalStorage and JSON**
- ❌ No `localStorage.getItem()` or `localStorage.setItem()`
- ❌ No `JSON.parse()` or `JSON.stringify()`
- ✅ All data now stored in simple JavaScript variables

### 2. **Deleted Test Files**
- ✅ Removed `test.html`
- ✅ Removed `test_cart_arabic.html`

### 3. **Global Variables (In-Memory Data)**
```javascript
let currentUser = null;    // Currently logged-in user
let allUsers = [];         // Registered customers
let cart = [];             // Shopping cart items
let allOrders = [];        // Customer orders
```

**Important:** All data resets when the page is refreshed (simple for Phase 1 beginners)

## 📁 Project Structure

```
WebProject/
├── index.html              (Main home page)
├── menu.html               (Menu display)
├── cart.html               (Shopping cart)
├── checkout.html           (Checkout form)
├── login.html              (Login page)
├── register.html           (Registration page)
├── order-tracking.html     (Order status)
├── admin/
│   └── dashboard.html      (Admin dashboard)
├── css/
│   └── style.css           (Single consolidated stylesheet)
└── js/
    ├── helpers.js          (All utility functions - NO LocalStorage!)
    ├── main.js             (Menu data)
    ├── cart.js             (Cart display)
    ├── validation.js       (Form validation)
    └── order-tracking.js   (Order tracking)
```

## 🔐 Authentication

### Admin Login (Hardcoded)
- **Email:** admin@foodorder.com
- **Password:** admin123

### Customer Registration
- Users can register on `register.html`
- Registered users saved in `allUsers` array (in-memory)
- Auto-login after registration

## 🛒 Shopping Features

### Cart Functions
- `addToCart(item)` - Add item or increase quantity
- `removeFromCart(itemId)` - Remove item from cart
- `updateCartQuantity(itemId, quantity)` - Change quantity
- `clearCart()` - Empty the cart
- `getCart()` - Get all cart items
- `getCartTotal()` - Get total price
- `getCartItemCount()` - Get number of items

### Order Functions
- `createOrder()` - Create and save order
- `getUserOrders()` - Get all orders for logged-in user
- `getOrderById(orderId)` - Get specific order

## 💻 How to Run

### Option 1: Using Python's Built-in Server
```bash
cd /home/khaledghalwash/Downloads/WebProject
python3 -m http.server 8000
```
Then open: http://localhost:8000

### Option 2: Using Node.js http-server
```bash
cd /home/khaledghalwash/Downloads/WebProject
npx http-server
```

### Option 3: Using VS Code Live Server Extension
- Install "Live Server" extension in VS Code
- Right-click on `index.html` → "Open with Live Server"

## 🧪 Test Workflow

1. **Register a new user**
   - Go to `register.html`
   - Fill in the form
   - Click "Register" (auto-login happens)

2. **Browse menu**
   - Go to `index.html` or `menu.html`
   - View food items

3. **Add to cart**
   - Click "Add to Cart" on any item
   - Quantity increases if adding same item again

4. **View cart**
   - Click "Cart" in header
   - See all items, prices, total

5. **Checkout**
   - Click "Checkout" button
   - View order confirmation

6. **Track order**
   - Go to `order-tracking.html`
   - See your order history

## 📝 Key Function Reference

### Authentication
- `login(email, password)` → `true/false`
- `logout()` → `void`
- `register(fullName, email, phone, address, password)` → `true/false`
- `isLoggedIn()` → `true/false`
- `isAdmin()` → `true/false`
- `getCurrentUser()` → `user object or null`

### Cart Management
- `addToCart(item)` → `true`
- `removeFromCart(itemId)` → `true`
- `updateCartQuantity(itemId, quantity)` → `true/false`
- `clearCart()` → `true`
- `getCart()` → `array of items`
- `getCartTotal()` → `number`
- `getCartItemCount()` → `number`

### Orders
- `createOrder()` → `order object or null`
- `getUserOrders()` → `array of orders`
- `getOrderById(orderId)` → `order object or null`

### UI Helpers
- `updateCartBadge()` → Updates cart count in header
- `requireLogin()` → Redirect to login if not logged in
- `requireAdmin()` → Redirect to login if not admin
- `goToPage(page)` → Redirect to page
- `showMessage(message)` → Show alert

## 🎨 CSS Classes Available

All CSS is in `css/style.css`. Key utility classes:

- `.container-centered` - Center container
- `.w-100` - Full width
- `.btn-primary` - Blue button
- `.btn-outline` - Outline button
- `.flex-checkbox` - Checkbox styling
- `.link-primary` - Blue link
- `.menu-grid` - Menu items grid
- `.cart-table` - Order table
- `.form-group` - Form section

## 🚀 For Beginners

### Simple Variable Names
```javascript
let currentUser = null;    // Who is logged in
let allUsers = [];         // All registered users
let cart = [];             // Items to buy
let allOrders = [];        // Completed orders
```

### Simple Loop Patterns
```javascript
// Loop through users
for (let i = 0; i < allUsers.length; i++) {
  if (allUsers[i].email === email) {
    // Found the user
  }
}
```

### Simple Function Calls
```javascript
login('test@email.com', 'password123');  // Returns true/false
addToCart(item);                         // Add to cart
createOrder();                           // Place order
```

## 📌 Important Notes

✅ **Phase 1 Only** - This project is for learning, not production
✅ **No Server Needed** - Everything runs in the browser
✅ **In-Memory Data** - Data is not saved to disk (resets on refresh)
✅ **Beginner-Friendly** - All code uses simple patterns
✅ **No Dependencies** - Vanilla JavaScript (no frameworks)

---

**Last Updated:** November 28, 2024  
**Status:** ✅ Complete - All LocalStorage and JSON removed!
