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

instamart-mini/
│
├── app.py # Main Flask app & API routes
├── requirements.txt # Python dependencies
│
├── templates/ # Jinja2 HTML templates
│ ├── login.html
│ ├── register.html
│ ├── index.html # User shop view
│ ├── store.html # Admin dashboard
│ └── receipt.html # Checkout summary
│
├── static/ # Frontend assets
│ ├── script.js # Main logic for cart & checkout
│ ├── login.js
│ ├── register.js
│ └── styles.css
│
└── README.md # Documentation (this file)


## 🚀 Setup & Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Ayush20076564/instamart-mini.git
cd instamart-mini

### 2️⃣ Create and activate a virtual environment
python -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows

### 3️⃣ Install dependencies
pip install -r requirements.txt

### 4️⃣ Initialize database

By default, the app uses SQLite locally:

python
>>> from app import db
>>> db.create_all()
>>> exit()

### 5️⃣ Start the app
python app.py


Then open → http://127.0.0.1:5000

☁️ Deploying to Render
Step-by-Step:

Push your project to GitHub

Log into Render.com

Create a New Web Service

Connect your GitHub repo

Set environment variable:

DATABASE_URL = postgresql://<user>:<password>@<host>/<dbname>


Build command:

pip install -r requirements.txt


Start command:

gunicorn app:app


Click Deploy — Render auto-creates your PostgreSQL database and links it to your Flask app.



