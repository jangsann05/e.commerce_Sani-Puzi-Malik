let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    const item = cart.find(p => p.name === name);
    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCart();
    alert('${name} ditambahkan ke keranjang!');
}

function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Rp ${item.price.toLocaleString()} x ${item.qty}</p>
            <button onclick="removeItem('${item.name}')">Hapus</button>
            <hr>
        `;
        cartItems.appendChild(itemEl);
        total += item.price * item.qty;
        count += item.qty;
    });

    cartTotal.textContent = 'Rp ${total.toLocaleString()'};
    cartCount.textContent = count;
    localStorage.setItem("cart", JSON.stringify(cart));

function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

function showCart() {
    document.getElementById("cart").scrollIntoView({ behavior: "smooth" });
}

window.onload = updateCart;