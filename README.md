### 🥦 Instamart Mini — Full-Stack Grocery Web App

A lightweight, responsive Flask + Bootstrap + PostgreSQL grocery web app demonstrating full-stack engineering concepts — user authentication, admin inventory management, shopping cart, checkout flow, and digital receipt generation.

It’s simple, cloud-ready, and fully deployed on Render with automated database integration.

────────────────────────────────────────────


### 🧩 Features

## 👩‍💻 User Features
• Secure registration and login (passwords hashed via Werkzeug)
• Browse grocery items dynamically
• Add/remove items from cart with instant quantity validation
• Prevent adding more than available stock
• Checkout generates a live receipt page with purchased items summary

## 🛠️ Admin Features
• Admin dashboard (/store) for inventory management
• Add, update, delete products
• Automatic stock deduction on checkout

────────────────────────────────────────────


### 💾 Technical Highlights
• RESTful backend under /api/*
• Session-based authentication using Flask cookies
• ORM-based persistence for User, Item, and Cart
• Works locally (SQLite) and on Render (PostgreSQL)
• Frontend built with plain JavaScript + Bootstrap 5
• Responsive UI for both desktop and mobile

────────────────────────────────────────────


###🏗️ Tech Stack

Frontend: HTML5, CSS3, Bootstrap 5, Vanilla JavaScript
Backend: Python 3.10+ with Flask
Database: SQLite (Local) / PostgreSQL (Render)
ORM: SQLAlchemy
Authentication: Flask sessions + Werkzeug password hashing
Deployment: Render Cloud Platform
AI Assistance: ChatGPT (OpenAI GPT-5)

────────────────────────────────────────────


### ⚙️ Project Structure
instamart-mini/
├── app.py
├── requirements.txt
├── templates/
│   ├── login.html
│   ├── register.html
│   ├── index.html
│   ├── store.html
│   └── receipt.html
├── static/
│   ├── script.js
│   ├── login.js
│   ├── register.js
│   └── styles.css
└── README.md

────────────────────────────────────────────


##🚀 Setup & Run Locally
1️⃣ Clone repository:
   git clone https://github.com/<your-username>/instamart-mini.git
   cd instamart-mini

## 2️⃣ Create virtual environment:
   python -m venv venv
   source venv/bin/activate   (macOS/Linux)
   venv\Scripts\activate      (Windows)

## 3️⃣ Install dependencies:
   pip install -r requirements.txt

## 4️⃣ Initialize database:
   from app import db
   db.create_all()
   exit()

## 5️⃣ Start app:
   python app.py
   (open http://127.0.0.1:5000)

────────────────────────────────────────────

## ☁️ Deploying to Render
1. Push to GitHub
2. Log into Render.com
3. Create new web service
4. Connect your repo
5. Set env var:
   DATABASE_URL=postgresql://<user>:<pass>@<host>/<db>
6. Build command:
   pip install -r requirements.txt
7. Start command:
   gunicorn app:app
8. Deploy

────────────────────────────────────────────


## 🧪 Unit Test Example
import json
from app import app, db

def test_register_and_login():
    client = app.test_client()
    db.create_all()
    res = client.post('/api/register', json={"username": "test", "password": "123"})
    assert res.status_code == 201
    res = client.post('/api/login', json={"username": "test", "password": "123"})
    assert res.status_code == 200

Run tests: pytest

────────────────────────────────────────────


### 🧠 Architecture
Backend (Flask): Auth, CRUD, cart, checkout
Frontend (JS): Dynamic UI with fetch()
Database: SQLAlchemy ORM
Session: Flask cookies (30 min expiry)
Render: PostgreSQL auto-linked
Receipt: Shows checkout summary

────────────────────────────────────────────

### 🔗 References
Flask Docs – https://flask.palletsprojects.com/
SQLAlchemy ORM – https://docs.sqlalchemy.org/
Bootstrap 5 – https://getbootstrap.com/docs/5.3/
Werkzeug Security – https://werkzeug.palletsprojects.com/
Render Flask Guide – https://render.com/docs/deploy-flask
ChatGPT GPT-5 – https://chat.openai.com

────────────────────────────────────────────

## 🧑‍💻 Author
Ayush Sharma
📧 20076564@mydbs.ie
Built with ❤️ using Flask, PostgreSQL, and ChatGPT guidance.

────────────────────────────────────────────

## 💡 Credits
Hands-on development: Ayush Sharma
AI Pair Programming: ChatGPT (GPT-5)
Open-source libraries: Flask, SQLAlchemy, Bootstrap
