document.addEventListener('DOMContentLoaded', function () {
  const productList = document.getElementById('product-list');
  const categoryFilter = document.getElementById('category-filter');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let allProducts = [];

  // Fetch products and categories
  fetch('https://fakestoreapi.com/products')
    .then(res => {
      return res.json();
    })
    .then(data => {
      allProducts = data;

      // Get unique categories and populate filter
      const categories = [...new Set(allProducts.map(product => product.category))];
      populateCategoryFilter(categories);

      // Display all products initially
      displayProducts(allProducts);
    })

  // Function to populate category filter dropdown
  function populateCategoryFilter(categories) {
    categoryFilter.innerHTML = '';

    // Add "All Categories" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Categories';
    categoryFilter.appendChild(allOption);

    // Add each category as an option
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = formatCategory(category);
      categoryFilter.appendChild(option);
    });

    // Add event listener for category filter
    categoryFilter.addEventListener('change', function () {
      const selectedCategory = this.value;
      if (selectedCategory === 'all') {
        displayProducts(allProducts);
      } else {
        const filteredProducts = allProducts.filter(
          product => product.category === selectedCategory
        );
        displayProducts(filteredProducts);
      }
    });
  }

  // Function to display products
  function displayProducts(products) {
    productList.innerHTML = '';

    if (products.length === 0) {
      productList.innerHTML = '<p class="error-message">No products found in this category.</p>';
      return;
    }

    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';

      productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <h3>${product.title}</h3>
                <p class="product-description">${truncateDescription(product.description, 15)}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-category">${formatCategory(product.category)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;

      productList.appendChild(productCard);
    });

    // Add event listeners to all Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', addToCart);
    });
  }

  // Add to cart function
  function addToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const product = allProducts.find(p => p.id === productId);

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Visual feedback
    event.target.textContent = 'Added!';
    event.target.style.backgroundColor = '#2E7D32';
    setTimeout(() => {
      event.target.textContent = 'Add to Cart';
      event.target.style.backgroundColor = '#4CAF50';
    }, 1500);
  }

  // Helper function to truncate descriptions
  function truncateDescription(desc, maxWords) {
    const words = desc.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return desc;
  }

  // Helper function to format category names
  function formatCategory(category) {
    return category.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
});