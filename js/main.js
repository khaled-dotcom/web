/**
 * MAIN.JS - Main JavaScript file for Food Ordering Platform
 * Beginner-friendly: Simple menu data and initialization
 * Phase 1: Client-side only, no server needed
 */

// ============= MENU DATA =============
// Simple array of food items with all details
var menuData = [
    {
        id: 1,
        name: "Margherita Pizza",
        description: "Classic pizza with fresh tomatoes, mozzarella, and basil",
        price: 12.99,
        category: "Main Course",
        image: "🍕",
        rating: 4.5,
        reviews: 24
    },
    {
        id: 2,
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
        price: 8.99,
        category: "Appetizer",
        image: "🥗",
        rating: 4.2,
        reviews: 18
    },
    {
        id: 3,
        name: "Grilled Chicken Burger",
        description: "Juicy grilled chicken breast with lettuce, tomato, and special sauce",
        price: 11.99,
        category: "Main Course",
        image: "🍔",
        rating: 4.7,
        reviews: 32
    },
    {
        id: 4,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center, served with vanilla ice cream",
        price: 6.99,
        category: "Dessert",
        image: "🍰",
        rating: 4.8,
        reviews: 45
    },
    {
        id: 5,
        name: "French Fries",
        description: "Crispy golden fries served with ketchup",
        price: 4.99,
        category: "Side",
        image: "🍟",
        rating: 4.3,
        reviews: 28
    },
    {
        id: 6,
        name: "Chicken Wings",
        description: "Spicy buffalo wings with blue cheese dip",
        price: 9.99,
        category: "Appetizer",
        image: "🍗",
        rating: 4.6,
        reviews: 36
    },
    {
        id: 7,
        name: "Pasta Carbonara",
        description: "Creamy pasta with bacon, eggs, and parmesan cheese",
        price: 13.99,
        category: "Main Course",
        image: "🍝",
        rating: 4.4,
        reviews: 21
    },
    {
        id: 8,
        name: "Ice Cream Sundae",
        description: "Vanilla ice cream with chocolate sauce, nuts, and cherry",
        price: 5.99,
        category: "Dessert",
        image: "🍨",
        rating: 4.5,
        reviews: 19
    },
    {
        id: 9,
        name: "Fresh Orange Juice",
        description: "Freshly squeezed orange juice",
        price: 3.99,
        category: "Beverage",
        image: "🍹",
        rating: 4.1,
        reviews: 15
    },
    {
        id: 10,
        name: "Fish and Chips",
        description: "Beer-battered fish with crispy fries and tartar sauce",
        price: 14.99,
        category: "Main Course",
        image: "🐟",
        rating: 4.7,
        reviews: 29
    }
];

// ============= CATEGORIES =============
const categories = ["All", "Appetizer", "Main Course", "Dessert", "Side", "Beverage"];

// ============= INITIALIZATION =============
/**
 * Initialize the page when it loads
 */
document.addEventListener('DOMContentLoaded', function() {
    // Update cart badge on every page load
    updateCartBadge();
});

// ============= SIMPLE FUNCTIONS =============

/**
 * Get menu item by ID
 */
function getMenuItem(id) {
    return menuData.find(item => item.id === parseInt(id));
}

/**
 * Get menu items filtered by category
 */
function getMenuByCategory(category) {
    if (category === 'All') {
        return menuData;
    }
    return menuData.filter(item => item.category === category);
}

/**
 * Search menu items by name
 */
function searchMenu(keyword) {
    const lower = keyword.toLowerCase();
    return menuData.filter(item => 
        item.name.toLowerCase().includes(lower) ||
        item.description.toLowerCase().includes(lower)
    );
}
