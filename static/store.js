const API = '/api';

// ---------------- LOAD ALL ITEMS ----------------
async function loadItems() {
  try {
    const res = await fetch(`${API}/items`, { credentials: 'include' });
    const items = await res.json();

    const grid = document.getElementById('itemGrid');
    grid.innerHTML = '';

    if (!Array.isArray(items) || items.length === 0) {
      grid.innerHTML = '<p class="text-muted">No products found. Add one below!</p>';
      return;
    }

    items.forEach(i => {
      const card = document.createElement('div');
      card.className = 'card text-center shadow-sm p-3';
      card.style.borderRadius = '10px';
      card.innerHTML = `
        <img src="${i.image || '/static/images/default.jpg'}" alt="${i.name}" 
             class="img-fluid rounded mb-2" style="height:120px;object-fit:cover;">
        <h6 class="fw-bold">${i.name}</h6>
        <p class="text-muted mb-1">💲${i.price.toFixed(2)} | Qty: ${i.quantity}</p>
        <div class="d-flex justify-content-center gap-2 mt-2">
          <button class="btn btn-outline-danger btn-sm" onclick="deleteItem(${i.id})">🗑️ Delete</button>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error('Error loading items:', err);
    alert('Failed to load items.');
  }
}

// ---------------- ADD ITEM ----------------
async function addItem() {
  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const quantity = parseInt(document.getElementById('quantity').value);
  const image = document.getElementById('image').value.trim();

  if (!name || isNaN(price) || isNaN(quantity)) {
    alert('⚠️ Please fill all fields correctly.');
    return;
  }

  try {
    const res = await fetch(`${API}/items`, {
      method: 'POST',
      credentials: 'include', // ✅ include cookies/session
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, quantity, image })
    });

    const data = await res.json();
    if (res.status === 201) {
      alert('✅ Item added successfully!');
      clearForm();
      loadItems();
    } else if (res.status === 403) {
      alert('🚫 Admin access required.');
      window.location.href = '/login';
    } else {
      alert(`❌ ${data.error || 'Failed to add item.'}`);
    }
  } catch (err) {
    console.error('Error adding item:', err);
    alert('Server error.');
  }
}

// ---------------- DELETE ITEM ----------------
async function deleteItem(id) {
  if (!confirm('Are you sure you want to delete this item?')) return;

  try {
    const res = await fetch(`${API}/items/${id}`, {
      method: 'DELETE',
      credentials: 'include' // ✅ ensures admin session is sent
    });
    const data = await res.json();

    if (res.status === 200) {
      alert('🗑️ Item deleted successfully.');
      loadItems();
    } else if (res.status === 403) {
      alert('🚫 Admin access required.');
      window.location.href = '/login';
    } else {
      alert(`❌ ${data.error || 'Could not delete item.'}`);
    }
  } catch (err) {
    console.error('Error deleting item:', err);
    alert('Server error.');
  }
}

// ---------------- CLEAR FORM ----------------
function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('price').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('image').value = '';
}

// ---------------- LOGOUT ----------------
async function logout() {
  try {
    const res = await fetch(`${API}/logout`, {
      method: 'POST',
      credentials: 'include' // ✅ include session cookie
    });

    if (res.ok) {
      alert('👋 Logged out successfully!');
      window.location.href = '/login';
    } else {
      // fallback for safety
      window.location.href = '/logout';
    }
  } catch (err) {
    console.error('Error logging out:', err);
    window.location.href = '/logout';
  }
}

// ---------------- ON PAGE LOAD ----------------
document.addEventListener('DOMContentLoaded', loadItems);
