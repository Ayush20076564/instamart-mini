const API = '/api';

// ---------------- LOAD ITEMS ----------------
async function loadItems() {
  try {
    const res = await fetch(`${API}/items`, { credentials: 'include' });
    const items = await res.json();
    const cont = document.getElementById('items');
    cont.innerHTML = '';

    if (!items.length) {
      cont.innerHTML = '<p class="text-muted">No items available.</p>';
      return;
    }

    items.forEach(i => {
      const div = document.createElement('div');
      div.className = 'col-md-3 mb-4';
      div.innerHTML = `
        <div class="card item-card h-100 shadow-sm">
          <img src="${i.image || '/static/images/default.jpg'}" class="card-img-top item-img" alt="${i.name}">
          <div class="card-body">
            <h6 class="fw-bold">${i.name}</h6>
            <p class="text-muted">€${i.price.toFixed(2)} | Qty: ${i.quantity}</p>
            <button class="btn btn-success btn-sm w-100" onclick="addToCart(${i.id})">Add to Cart</button>
          </div>
        </div>
      `;
      cont.appendChild(div);
    });

    loadCart();
  } catch (err) {
    console.error('Error loading items:', err);
  }
}

// ---------------- ADD TO CART ----------------
async function addToCart(id, qty = 1) {
  try {
    const res = await fetch(`${API}/cart`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: id, quantity: qty })
    });

    const data = await res.json();
    if (res.ok) {
      loadCart();
    } else if (res.status === 401) {
      alert('Please login first');
      window.location.href = '/login';
    } else {
      alert(data.error || 'Failed to add item.');
    }
  } catch (err) {
    console.error('Error adding to cart:', err);
  }
}

// ---------------- REMOVE FROM CART ----------------
async function removeFromCart(itemId) {
  try {
    const res = await fetch(`${API}/cart/${itemId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await res.json();

    if (res.ok) {
      loadCart();
    } else {
      alert(data.error || 'Failed to remove item.');
    }
  } catch (err) {
    console.error('Error removing item:', err);
  }
}

// ---------------- UPDATE QUANTITY ----------------
async function updateQuantity(itemId, currentQty, change) {
  const newQty = currentQty + change;
  if (newQty <= 0) {
    await removeFromCart(itemId);
    return;
  }

  try {
    const res = await fetch(`${API}/cart`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: itemId, quantity: change })
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'Failed to update quantity.');
    }
    loadCart();
  } catch (err) {
    console.error('Error updating quantity:', err);
  }
}

// ---------------- LOAD CART ----------------
async function loadCart() {
  try {
    const res = await fetch(`${API}/cart`, { credentials: 'include' });
    const cont = document.getElementById('cart');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (res.status !== 200) {
      cont.innerHTML = '<p>Please login to view your cart.</p>';
      checkoutBtn.style.display = 'none';
      return;
    }

    const data = await res.json();
    cont.innerHTML = '';

    if (!data.items.length) {
      cont.innerHTML = '<p>Your cart is empty.</p>';
      checkoutBtn.style.display = 'none';
      return;
    }

    data.items.forEach(c => {
      const div = document.createElement('div');
      div.className = 'cart-item d-flex justify-content-between align-items-center border-bottom py-2';
      div.innerHTML = `
        <span><b>${c.name}</b></span>
        <div>
          <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${c.id}, ${c.quantity}, -1)">−</button>
          <span class="mx-2">${c.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${c.id}, ${c.quantity}, 1)">+</button>
          <span class="ms-3 text-success">€${c.subtotal.toFixed(2)}</span>
          <button class="btn btn-sm btn-outline-danger ms-3" onclick="removeFromCart(${c.id})">🗑️</button>
        </div>
      `;
      cont.appendChild(div);
    });

    cont.innerHTML += `<hr><b>Total: €${data.total.toFixed(2)}</b>`;
    checkoutBtn.style.display = 'block';
  } catch (err) {
    console.error('Error loading cart:', err);
  }
}

// ---------------- CHECKOUT ----------------
async function checkout() {
  try {
    const res = await fetch(`${API}/checkout`, {
      method: 'POST',
      credentials: 'include'
    });
    const data = await res.json();

    if (res.ok) {
      window.location.href = data.redirect || '/receipt';
    } else {
      alert(data.error || 'Checkout failed.');
    }
  } catch (err) {
    console.error('Checkout error:', err);
  }
}

// ---------------- LOGOUT ----------------
async function logout() {
  try {
    await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' });
    window.location.href = '/login';
  } catch (err) {
    console.error('Logout error:', err);
  }
}

// ---------------- INIT ----------------
window.onload = loadItems;
