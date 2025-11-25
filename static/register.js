async function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!username || !password) {
    alert("Please enter both username and password");
    return;
  }

  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role })
  });

  const data = await res.json();
  if (res.status === 201) {
    alert("Registration successful! You can now login.");
    window.location.href = "/login";
  } else {
    alert(data.error || "Registration failed.");
  }
}
