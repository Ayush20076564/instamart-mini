const API = '/api';
let currentUser = null;

async function fetchUser() {
  // Not stored on backend? Skip for demo
  const res = await fetch(`${API}/items`);
  loadItems();
}

async function loadItems() {
  const res = await fetch(`${API}/items`);
  const data = await res.json();
  const cont = document.getElementById('items');
  cont.innerHTML = '';

  data.forEach(i => {
    const div = document.createElement('div');
    div.className = 'col-md-3 mb-4';
    div.innerHTML = `
      <div class="card item-card h-100 shadow-sm">
        <img src="/static/images/${i.image || 'default.jpg'}" class="card-img-top item-img" alt="${i.name}">
        <div class="card-body">
          <h6 class="fw-bold">${i.name}</h6>
          <p class="text-muted">$${i.price} | Qty: ${i.quantity}</p>
          <button class="btn btn-success btn-sm" onclick="addToCart(${i.id})">Add to Cart</button>
        </div>
      </div>
    `;
    cont.appendChild(div);
  });

  loadCart();
}

async function addToCart(id) {
  const res = await fetch(`${API}/cart`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({item_id: id})
  });

  if (res.status === 200) {
    alert('Item added to cart');
    loadCart();
  } else {
    alert('Please login first');
    window.location.href = '/login';
  }
}

async function loadCart() {
  const res = await fetch(`${API}/cart`);
  if (res.status !== 200) {
    document.getElementById('cart').innerHTML = '<p>Please login to view your cart.</p>';
    return;
  }

  const data = await res.json();
  const cont = document.getElementById('cart');
  cont.innerHTML = '';
  data.items.forEach(c => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span><b>${c.name}</b> x ${c.quantity} = $${c.subtotal.toFixed(2)}</span>
      <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${c.id})">Remove</button>
    `;
    cont.appendChild(div);
  });

  if (data.items.length > 0) {
    cont.innerHTML += `<hr><b>Total: $${data.total.toFixed(2)}</b>`;
    document.getElementById('checkoutBtn').style.display = 'block';
  } else {
    cont.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('checkoutBtn').style.display = 'none';
  }
}

async function removeFromCart(id) {
  await fetch(`${API}/cart/${id}`, {method:'DELETE'});
  loadCart();
}

async function checkout() {
  const res = await fetch(`${API}/checkout`, {method:'POST'});
  const data = await res.json();
  if (res.status === 200) {
    alert(data.message);
    loadCart();
  } else {
    alert(data.error);
  }
}

async function logout() {
  await fetch(`${API}/logout`, {method:'POST'});
  alert('Logged out');
  window.location.reload();
}

window.onload = loadItems;
