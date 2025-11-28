// Order Tracking Functionality

// Dummy order data
const orders = [
    {
        id: 1001,
        date: '2024-11-25T14:30:00',
        items: [
            { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
            { name: 'Caesar Salad', quantity: 2, price: 8.99 }
        ],
        total: 35.97,
        status: 'preparing',
        estimatedDelivery: '2024-11-25T15:30:00'
    },
    {
        id: 1002,
        date: '2024-11-24T18:00:00',
        items: [
            { name: 'Grilled Chicken Burger', quantity: 2, price: 11.99 },
            { name: 'French Fries', quantity: 1, price: 4.99 }
        ],
        total: 31.97,
        status: 'delivered',
        estimatedDelivery: '2024-11-24T19:00:00',
        actualDelivery: '2024-11-24T18:55:00'
    },
    {
        id: 1003,
        date: '2024-11-23T12:15:00',
        items: [
            { name: 'Pasta Carbonara', quantity: 1, price: 13.99 },
            { name: 'Chocolate Lava Cake', quantity: 1, price: 6.99 }
        ],
        total: 23.98,
        status: 'delivered',
        estimatedDelivery: '2024-11-23T13:15:00',
        actualDelivery: '2024-11-23T13:10:00'
    }
];

// Order status stages
const statusStages = [
    { key: 'pending', label: 'Order Placed', icon: '📝' },
    { key: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
    { key: 'on_the_way', label: 'On the Way', icon: '🚗' },
    { key: 'delivered', label: 'Delivered', icon: '✅' }
];

// Get order by ID
function getOrderById(orderId) {
    return orders.find(order => order.id === parseInt(orderId));
}

// Get status index
function getStatusIndex(status) {
    return statusStages.findIndex(stage => stage.key === status);
}

// Display order tracking
function displayOrderTracking(orderId) {
    const order = getOrderById(orderId);
    if (!order) {
        document.getElementById('order-tracking').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">❌</div>
                <h3>Order not found</h3>
                <p>The order ID you're looking for doesn't exist.</p>
            </div>
        `;
        return;
    }

    const currentStatusIndex = getStatusIndex(order.status);
    const orderDate = new Date(order.date);
    const estimatedDelivery = new Date(order.estimatedDelivery);

    let trackingHTML = `
        <div class="card">
            <div class="card-header">Order #${order.id}</div>
            <p style="color: var(--text-light); margin-bottom: 2rem;">
                Placed on ${orderDate.toLocaleDateString()} at ${orderDate.toLocaleTimeString()}
            </p>

            <div class="order-status">
    `;

    statusStages.forEach((stage, index) => {
        let stepClass = '';
        if (index < currentStatusIndex) {
            stepClass = 'completed';
        } else if (index === currentStatusIndex) {
            stepClass = 'active';
        }

        trackingHTML += `
            <div class="status-step ${stepClass}">
                <div class="status-icon">${stage.icon}</div>
                <div class="status-label">${stage.label}</div>
            </div>
        `;
    });

    trackingHTML += `
            </div>

            <div style="margin-top: 2rem;">
                <h3 style="margin-bottom: 1rem;">Order Details</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    order.items.forEach(item => {
        trackingHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `;
    });

    trackingHTML += `
                    </tbody>
                    <tfoot>
                        <tr style="font-weight: bold; border-top: 2px solid var(--border-color);">
                            <td colspan="3" style="text-align: right;">Total:</td>
                            <td>$${order.total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div style="margin-top: 2rem; padding: 1rem; background: var(--light-color); border-radius: 5px;">
                <p><strong>Estimated Delivery:</strong> ${estimatedDelivery.toLocaleDateString()} at ${estimatedDelivery.toLocaleTimeString()}</p>
                ${order.actualDelivery ? `<p><strong>Actual Delivery:</strong> ${new Date(order.actualDelivery).toLocaleDateString()} at ${new Date(order.actualDelivery).toLocaleTimeString()}</p>` : ''}
            </div>
        </div>
    `;

    document.getElementById('order-tracking').innerHTML = trackingHTML;
}

// Display order history
function displayOrderHistory() {
    const orderHistory = document.getElementById('order-history');
    if (!orderHistory) return;

    if (orders.length === 0) {
        orderHistory.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📦</div>
                <h3>No orders yet</h3>
                <p>Start ordering delicious food from our menu!</p>
                <a href="menu.html" class="btn btn-primary mt-2">Browse Menu</a>
            </div>
        `;
        return;
    }

    orderHistory.innerHTML = orders.map(order => {
        const orderDate = new Date(order.date);
        const statusClass = {
            'pending': 'warning',
            'preparing': 'primary',
            'on_the_way': 'secondary',
            'delivered': 'success'
        }[order.status] || '';

        return `
            <div class="card" style="cursor: pointer;" onclick="window.location.href='order-tracking.html?id=${order.id}'">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <div>
                        <h3>Order #${order.id}</h3>
                        <p style="color: var(--text-light); font-size: 0.9rem;">
                            ${orderDate.toLocaleDateString()} at ${orderDate.toLocaleTimeString()}
                        </p>
                    </div>
                    <span class="btn btn-${statusClass} btn-small" style="text-transform: capitalize;">
                        ${order.status.replace('_', ' ')}
                    </span>
                </div>
                <div style="margin-bottom: 1rem;">
                    <p><strong>Items:</strong> ${order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 1.2rem; font-weight: bold; color: var(--primary-color);">
                        $${order.total.toFixed(2)}
                    </div>
                    <a href="order-tracking.html?id=${order.id}" class="btn btn-outline btn-small">Track Order</a>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on order tracking page
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    
    if (orderId && document.getElementById('order-tracking')) {
        displayOrderTracking(orderId);
    }
    
    if (document.getElementById('order-history')) {
        displayOrderHistory();
    }
});

