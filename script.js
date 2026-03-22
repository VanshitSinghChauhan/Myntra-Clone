const productGrid = document.getElementById('products-grid');
const landingPage = document.querySelector('.shopping-container');
const productListing = document.getElementById('product-listing');
const categoryTitle = document.getElementById('category-title');
const homeBtn = document.getElementById('home-btn');

async function fetchFromDB(category) {
    try {
        const response = await fetch(`http://localhost:8081/api/products`);
        const data = await response.json();
        
        const filtered = data.filter(p => p.category.toLowerCase() === category.toLowerCase());
        renderGrid(filtered);
    } catch (err) {
        console.error("Database connection failed. Is server.js running?", err);
    }
}

function renderGrid(list) {
    productGrid.innerHTML = '';
    list.forEach(p => {
        productGrid.innerHTML += `
            <div class="product-card">
                <div class="s2box2">
                    <img src="https://via.placeholder.com/200x250?text=${p.brand}" alt="${p.product_name}">
                </div>
                <div class="text-container" style="color: black; text-align: left;">
                    <p class="brand" style="font-weight: bold;">${p.brand}</p>
                    <p class="name" style="font-size: 12px; color: #535766;">${p.product_name}</p>
                    <p class="price" style="font-size: 14px; font-weight: bold;">
                        Rs. ${p.price} 
                        <span style="text-decoration: line-through; color: gray; font-size: 12px;">Rs. ${p.old_price}</span>
                    </p>
                    <p style="color: #ff3f6c; font-size: 12px;">(${p.discount_percentage}% OFF)</p>
                    <button class="add-to-cart-btn" onclick="goToProduct(${p.id})">View Details</button>
                </div>
            </div>
        `;
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const cat = link.getAttribute('data-category');
        categoryTitle.innerText = cat.toUpperCase() + " COLLECTION";
        
        landingPage.style.display = 'none';
        productListing.style.display = 'block'; 
        fetchFromDB(cat);
    });
});

homeBtn.addEventListener('click', () => {
    landingPage.style.display = 'block';
    productListing.style.display = 'none';
});

function goToProduct(id) {
    window.location.href = `product.html?id=${id}`;
}