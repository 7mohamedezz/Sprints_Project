const container = document.getElementById('cart-items');
const totalElement = document.getElementById('cart-total'); // Add this element in your HTML

function loadCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const cart = loadCart();
  if (!container) return;

  container.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item'; // Add CSS class for styling

    // Create and append image element
    const img = document.createElement('img');
    img.src = item.image || 'placeholder.jpg'; // Use placeholder if no image
    img.alt = item.title;
    img.style.width = '50px'; // Adjust as needed
    div.appendChild(img);

    // Create and append title and quantity
    const info = document.createElement('span');
    info.textContent = `${item.title} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    div.appendChild(info);

    container.appendChild(div);

    // Calculate total
    total += item.price * item.quantity;
  });

  // Display total
  if (totalElement) {
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }
}

function setupCheckoutButton() {
  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    const cart = loadCart();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({
      id: Math.floor(Math.random() * 10000),
      items: loadCart(),
      date: new Date().toISOString(),
      total: calculateCartTotal() // Add total to order
    });
    localStorage.setItem('orders', JSON.stringify(orders));
    saveCart([]);
    alert('Order placed!');
    window.location.href = 'orders.html';
  });
}

function calculateCartTotal() {
  const cart = loadCart();
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Initialize the cart functionality
renderCart();
setupCheckoutButton();