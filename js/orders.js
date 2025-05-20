document.addEventListener('DOMContentLoaded', function () {
    const ordersContainer = document.getElementById('orders-container');

    const orders = getOrderHistory();

    // Display orders
    ordersContainer.innerHTML = '';
    orders.forEach(order => {
        const orderElement = createOrderElement(order);
        ordersContainer.appendChild(orderElement);
    });
});

function createOrderElement(order) {
    const orderElement = document.createElement('div');
    orderElement.className = 'order-card';

    // Format order date
    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Calculate total
    const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order HTML
    orderElement.innerHTML = `
        <div class="order-header">
            <div>
                <span class="order-id">Order #${order.id}</span>
                <span class="order-date">Placed on ${formattedDate}</span>
            </div>
        </div>
        
        <div class="order-items">
            ${order.items.map(item => `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.title}" class="item-image">
                    <div class="item-details">
                        <div class="item-name">${item.title}</div>
                        <div class="item-price">$${item.price.toFixed(2)}</div>
                        <div class="item-quantity">Quantity: ${item.quantity}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="order-summary">
            <div>
                ${order.items.length} items
            </div>
            <div class="order-total">
                Total: $${total.toFixed(2)}
            </div>
        </div>
    `;

    return orderElement;
}


function getOrderHistory() {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    return savedOrders;
}