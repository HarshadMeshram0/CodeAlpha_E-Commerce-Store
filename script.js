// Mock database
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productsGrid = document.getElementById('products');

// Load products
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        displayProducts(products);
    });

function displayProducts(products) {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">$${product.price}</div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name} added to cart!`);
        });
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('nav a[href="cart.html"]');
    if (cartCount) {
        cartCount.textContent = `Cart (${cart.length})`;
    }
}

// Initialize
updateCartCount();
