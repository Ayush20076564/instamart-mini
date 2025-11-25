const API = '/api';

async function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Please enter both username and password.');
    return; // stop here if missing
  }

  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (res.status === 200) {
    if (data.user.role === 'admin')
      window.location.href = '/store';
    else
      window.location.href = '/shop';
  } else {
    alert(data.error || 'Login failed');
  }
}

async function register() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert("Enter username and password");
    return;
  }

  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (res.status === 201) {
    alert('Registered! Now login.');
    window.location.href = '/login';
  } else {
    alert('Registration failed.');
  }
}
