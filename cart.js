function renderCart() {
    const cart = JSON.parse(localStorage.getItem('myntraCart')) || [];
    const container = document.getElementById('cartItemsList');
    
    document.getElementById('count-header').innerText = cart.length;

    if (cart.length === 0) {
        container.innerHTML = "<h2>Your bag is empty!</h2><a href='product.html' style = 'text-decoration: none; font-size: 25px; color: #ff3f6c' >Go Shopping &hearts;</a>";
        updateBill(0);
        return;
    }

    let cartHTML = "";
    let totalMRP = 0;

    cart.forEach((item, index) => {
        totalMRP += Number(item.price);
        cartHTML += `
            <div class="cart-item-card">
                <img src="${item.image_url}" alt="${item.product_name}">
                <div class="item-details">
                    <h4>${item.brand}</h4>
                    <p>${item.product_name}</p>
                    <p><strong>Rs. ${item.price}</strong></p>
                </div>
                <div class="remove-btn" onclick="removeFromCart(${index})">✕</div>
            </div>
        `;
    });

    container.innerHTML = cartHTML;
    updateBill(totalMRP);
}

function updateBill(mrp) {
    document.getElementById('totalMRP').innerText = mrp;
    let discount = Math.floor(mrp * 0.1); 
    document.getElementById('totalDiscount').innerText = discount;
    document.getElementById('finalAmount').innerText = mrp - discount;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('myntraCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('myntraCart', JSON.stringify(cart));
    renderCart();
}

function proceedToPayment() {
    const cart = JSON.parse(localStorage.getItem('myntraCart')) || [];
    if (cart.length === 0) {
        alert("Your bag is empty!");
        return;
    }
    document.getElementById('addressModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('addressModal').style.display = 'none';
}

function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('userName').value;
    const address = document.getElementById('userStreet').value + ", " + document.getElementById('userCity').value;

    localStorage.removeItem('myntraCart');

    document.querySelector('.cart-wrapper').style.display = 'none';
    closeModal();

    document.getElementById('summ-name').innerText = name;
    document.getElementById('summ-address').innerText = address;
    document.getElementById('summ-orderid').innerText = "MYN-" + Math.floor(Math.random() * 1000000);

    document.getElementById('orderSuccess').style.display = 'flex';
}


renderCart();