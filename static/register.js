const API = '/api';

// ---------------- REGISTER FUNCTION ----------------
async function registerUser() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;

  if (!username || !password) {
    alert('Please fill all fields');
    return;
  }

  try {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role })
    });

    const data = await res.json();

    if (res.status === 201) {
      alert('✅ Registered successfully! You can now login.');
      window.location.href = '/login';
    } else if (res.status === 409) {
      alert('⚠️ Username already exists. Please choose another.');
    } else {
      alert(`❌ Registration failed: ${data.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server error. Please try again later.');
  }
}
