const API = '/api';

// ---------------- LOAD ALL ITEMS ----------------
async function loadItems() {
  try {
    const res = await fetch(`${API}/items`, { credentials: 'include' });
    const items = await res.json();

    const grid = document.getElementById('itemGrid');
    grid.innerHTML = '';

    if (items.length === 0) {
      grid.innerHTML = '<p class="text-muted">No products yet. Add one below!</p>';
      return;
    }

    items.forEach(i => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${i.image || '/static/images/default.jpg'}" alt="${i.name}" width="100%">
        <h5 class="mt-2">${i.name}</h5>
        <p>💲${i.price.toFixed(2)} | Qty: ${i.quantity}</p>
        <button class="btn btn-danger btn-sm" onclick="deleteItem(${i.id})">🗑️ Delete</button>
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
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, quantity, image })
    });

    const data = await res.json();
    if (res.status === 201) {
      alert('✅ Item added successfully!');
      clearForm();
      loadItems();
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
      credentials: 'include'
    });
    const data = await res.json();

    if (res.status === 200) {
      alert('🗑️ Item deleted successfully.');
      loadItems();
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
    const res = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    });

    if (res.ok) {
      alert('👋 Logged out successfully!');
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = '/login';
    } else {
      alert('Logout failed. Redirecting anyway...');
      window.location.href = '/login';
    }
  } catch (err) {
    console.error('Logout error:', err);
    window.location.href = '/login';
  }
}

document.addEventListener('DOMContentLoaded', loadItems);
