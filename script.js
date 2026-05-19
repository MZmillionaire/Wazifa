// سلة التسوق
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;

    if (cartItems) {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>${item.price} ج.م × ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart('${item.name}')">حذف</button>
            </div>
        `).join('');
    }

    if (cartTotal) cartTotal.textContent = totalPrice;

    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartUI();
    alert(`تمت إضافة "${name}" إلى السلة`);
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

function toggleCart() {
    document.querySelector('.cart-overlay').classList.toggle('active');
    document.querySelector('.cart-sidebar').classList.toggle('active');
}

// تهيئة
updateCartUI();
