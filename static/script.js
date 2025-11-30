const API = '/api';

// ---------------- INITIAL LOAD ----------------
window.addEventListener('DOMContentLoaded', async () => {
  await loadItems();
  await loadCart();
});

// ---------------- LOAD ITEMS ----------------
async function loadItems() {
  const container = document.getElementById('items');
  container.innerHTML = '<p class="text-muted">Loading items...</p>';

  try {
    const res = await fetch(`${API}/items`);
    const data = await res.json();

    container.innerHTML = '';
    if (!data.length) {
      container.innerHTML = `<p class="text-muted">No products available yet.</p>`;
      return;
    }

    data.forEach(i => {
      const card = document.createElement('div');
      card.className = 'col-md-3 mb-4';
      card.innerHTML = `
        <div class="card h-100 text-center shadow-sm">
          <img src="${i.image || 'https://via.placeholder.com/150'}" 
               class="card-img-top" style="height:150px; object-fit:contain;" alt="${i.name}">
          <div class="card-body">
            <h6 class="fw-bold">${i.name}</h6>
            <p class="text-success mb-1">$${i.price.toFixed(2)}</p>
            <p class="text-muted small">Qty: ${i.quantity}</p>
            <button class="btn btn-success btn-sm" onclick="addToCart(${i.id})">Add to Cart</button>
          </div>
        </div>`;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p class="text-danger">Error loading items.</p>`;
  }
}

// ---------------- ADD TO CART ----------------
async function addToCart(itemId) {
  const res = await fetch(`${API}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: itemId, quantity: 1 }),
  });

  if (res.status === 200) {
    const data = await res.json();
    alert(data.message || 'Item added to cart');
    await loadCart();
  } else if (res.status === 401) {
    alert('Please login first.');
    window.location.href = '/login';
  } else {
    const data = await res.json();
    alert(data.error || 'Unable to add item.');
  }
}

// ---------------- LOAD CART ----------------
async function loadCart() {
  const cartDiv = document.getElementById('cart');
  const checkoutBtn = document.getElementById('checkoutBtn');

  try {
    const res = await fetch(`${API}/cart`);
    if (res.status !== 200) {
      cartDiv.innerHTML = '<p class="text-muted">Please login to view your cart.</p>';
      checkoutBtn.style.display = 'none';
      return;
    }

    const data = await res.json();
    if (!data.items || !data.items.length) {
      cartDiv.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
      checkoutBtn.style.display = 'none';
      return;
    }

    let html = '<ul class="list-group">';
    data.items.forEach(c => {
      html += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${c.name} (${c.quantity})</span>
          <span>$${c.subtotal.toFixed(2)}</span>
          <button class="btn btn-sm btn-danger" onclick="removeFromCart(${c.id})">Remove</button>
        </li>`;
    });
    html += `</ul><div class="mt-3 fw-bold">Total: $${data.total.toFixed(2)}</div>`;

    cartDiv.innerHTML = html;
    checkoutBtn.style.display = 'block';
  } catch (err) {
    cartDiv.innerHTML = '<p class="text-danger">Error loading cart.</p>';
  }
}

// ---------------- REMOVE ITEM ----------------
async function removeFromCart(cartId) {
  const res = await fetch(`${API}/cart/${cartId}`, { method: 'DELETE' });
  const data = await res.json();
  alert(data.message || data.error);
  await loadCart();
}

// ---------------- CHECKOUT ----------------
async function checkout() {
  const res = await fetch(`${API}/checkout`, { method: 'POST' });
  const data = await res.json();
  alert(data.message || data.error);
  await loadCart();
}

// ---------------- LOGOUT ----------------
async function logout() {
  await fetch(`${API}/logout`, { method: 'POST' });
  alert('Logged out successfully.');
  window.location.href = '/login';
}
