function isLoggedIn() {
    return localStorage.getItem('loggedInUser') !== null;
}

function renderNav() {
    const nav = document.getElementById('main-nav');
    const loggedIn = isLoggedIn();
    nav.innerHTML = `
        <a href="index.html">Home</a>
        <a href="cart.html" id="nav-cart" style="display:${loggedIn ? '' : 'none'};">Cart</a>
        <a href="orders.html" id="nav-orders" style="display:${loggedIn ? '' : 'none'};">Orders</a>
        <a href="login.html" id="nav-login" style="display:${!loggedIn ? '' : 'none'};">Login</a>
        <a href="register.html" id="nav-register" style="display:${!loggedIn ? '' : 'none'};">Register</a>
        <a href="#" id="nav-logout" style="display:${loggedIn ? '' : 'none'};">Logout</a>
    `;

    // Logout handler
    const logoutBtn = document.getElementById('nav-logout');
    if (logoutBtn) {
        logoutBtn.onclick = function (e) {
            e.preventDefault();
            localStorage.removeItem('loggedInUser');
            renderNav();
            window.location.href = "index.html";
        };
    }
}

document.addEventListener('DOMContentLoaded', renderNav);