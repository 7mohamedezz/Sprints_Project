# Al-Karnak Store

A simple web-based e-commerce application for browsing products, managing a shopping cart, placing orders, and handling user authentication.  
All data is stored in the browser's `localStorage` and products are fetched from [Fake Store API](https://fakestoreapi.com/).

## Features

- **Product Listing:** Browse products with images, prices, and categories.
- **Category Filter:** Filter products by category.
- **Cart:** Add products to your cart, view cart contents, and see the total price.
- **Checkout:** Place orders and view your order history.
- **Authentication:** Register and log in with username/email and password.
- **Responsive Design:** Works on desktop and mobile devices.

## Project Structure

```
Sprints_Project/
├── css/
│   └── styles.css
├── js/
│   ├── auth.js
│   ├── cart.js
│   ├── nav.js
│   ├── orders.js
│   └── products.js
├── cart.html
├── index.html
├── login.html
├── orders.html
├── register.html
└── README.md
```

## Getting Started

1. **Clone or Download** this repository.
2. **Open `index.html`** in your browser to start using the app.

## Usage

- **Register:** Go to the Register page and create a new account.
- **Login:** Log in with your credentials.
- **Browse Products:** View and filter products on the home page.
- **Add to Cart:** Click "Add to Cart" on any product.
- **View Cart:** Go to the Cart page to see your selected items.
- **Checkout:** Click "Checkout" to place your order.
- **View Orders:** Go to the Orders page to see your order history.

## Notes

- All user, cart, and order data is stored in your browser's localStorage.
- Products are fetched from [Fake Store API](https://fakestoreapi.com/).
- For demonstration purposes only. Do not use for real transactions.