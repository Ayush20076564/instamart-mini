const API = '/api';

// ---------------- LOGIN FUNCTION ----------------
async function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('⚠️ Please enter both username and password.');
    return;
  }

  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.status === 200) {
      alert('✅ Login successful!');
      if (data.user.role === 'admin') {
        window.location.href = '/store';
      } else {
        window.location.href = '/shop';
      }
    } else {
      alert(`❌ ${data.error || 'Invalid credentials'}`);
    }
  } catch (err) {
    console.error(err);
    alert('⚠️ Server error. Please try again later.');
  }
}
