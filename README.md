# 🥦 Instamart Mini — Full-Stack Grocery Web App

A lightweight, responsive **Flask + Bootstrap + PostgreSQL** grocery web app demonstrating full-stack engineering concepts — user authentication, admin inventory management, shopping cart, checkout flow, and digital receipt generation.

It’s simple, **cloud-ready**, and fully **deployed on Render** with automated database integration.

---

## 🧩 Features

### 👩‍💻 User Features
- 🔐 Secure registration and login (**passwords hashed via Werkzeug**)
- 🛍️ Browse all grocery items dynamically
- ➕ Add/remove items from cart with instant quantity validation
- 🚫 Prevent adding more than available stock
- 🧾 Checkout generates a live **receipt page** with a summary of all purchased items

### 🛠️ Admin Features
- 🧮 Admin dashboard (`/store`) for inventory management
- ➕ Add new products, update stock, and delete items
- 📉 Automatic stock deduction on checkout

---

## 💾 Technical Highlights

- 🧱 RESTful backend under `/api/*`
- 🍪 Session-based authentication using Flask cookies
- 🗄️ ORM-based persistence for **User**, **Item**, and **Cart**
- 🧩 Works locally (SQLite) and in the cloud (PostgreSQL via Render)
- 💻 Frontend built with **plain JavaScript** and **Bootstrap 5**
- 📱 Responsive UI supporting both desktop and mobile

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | HTML5, CSS3, Bootstrap 5, Vanilla JavaScript |
| **Backend** | Python 3.10+ with Flask |
| **Database** | SQLite (Local) / PostgreSQL (Render) |
| **ORM** | SQLAlchemy |
| **Authentication** | Flask sessions + Werkzeug password hashing |
| **Deployment** | Render Cloud Platform |
| **AI Assistance** | ChatGPT (OpenAI GPT-5) — design, debugging, and documentation |

---

## ⚙️ Project Structure

