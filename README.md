# 🥦 Instamart Mini — Full-Stack Grocery Web App

A lightweight, responsive Flask + Bootstrap + PostgreSQL grocery web app demonstrating full-stack engineering concepts — user authentication, admin inventory management, shopping cart, checkout flow, and digital receipt generation.

It’s simple, cloud-ready, and fully deployed on Render with automated database integration.  

## https://instamart-mini.onrender.com/

###  Main Idea of Template - https://vibecodingwithfred.com/tutorials/shopping-flask/


#  🧩 Features  

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




### 💾 Technical Highlights  
• RESTful backend under /api/*  
• Session-based authentication using Flask cookies  
• ORM-based persistence for User, Item, and Cart  
• Works locally (SQLite) and on Render (PostgreSQL)  
• Frontend built with plain JavaScript + Bootstrap 5  
• Responsive UI for both desktop and mobile  


### 🏗️ Tech Stack  

Frontend: HTML5, CSS3, Bootstrap 5, Vanilla JavaScript  
Backend: Python 3.10+ with Flask  
Database: SQLite (Local) / PostgreSQL (Render)  
ORM: SQLAlchemy  
Authentication: Flask sessions + Werkzeug password hashing  
Deployment: Render Cloud Platform  
AI Assistance: ChatGPT (OpenAI GPT-5)  


### ⚙️ Project Structure  
instamart-mini/  
├── app.py  
├── requirements.  
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




## 🚀 Setup & Run Locally  
### 1️⃣ Clone repository:  
   git clone https://github.com/Ayush20076564/instamart-mini.git  
   cd instamart-mini

### 2️⃣ Create virtual environment:  
   python -m venv venv  
   source venv/bin/activate   (macOS/Linux)  
   venv\Scripts\activate      (Windows)  

### 3️⃣ Install dependencies:  
   pip install -r requirements.txt

### 4️⃣ Initialize database:  
   from app import db  
   db.create_all()  
   exit()  

### 5️⃣ Start app:  
   python app.py  
   (open http://127.0.0.1:5000)





### https://chatgpt.com/share/693ac9b8-8234-8010-bb76-90becc13cf7d -- Resolving Render issue ( version Mismatch )  
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




## 🧠 Architecture  
Backend (Flask): Auth, CRUD, cart, checkout  
Frontend (JS): Dynamic UI with fetch()  
Database: SQLAlchemy ORM  
Session: Flask cookies (30 min expiry)  
Render: PostgreSQL auto-linked  
Receipt: Shows checkout summary  



## 🔗 References  \
 
[1] Flask Project, Flask Web Framework Documentation, Pallets Project, 2024. [Online]. Available: https://flask.palletsprojects.com/  
[2] Bootstrap Team, Bootstrap 5 Documentation, 2024. [Online]. Available: https://getbootstrap.com/docs/5.3/  
[3] SQLAlchemy Developers, SQLAlchemy ORM Documentation v3.0, 2024. [Online]. Available: https://docs.sqlalchemy.org/  
[4] Werkzeug Developers, Password Hashing Utilities, Pallets Project, 2024. [Online]. Available: https://werkzeug.palletsprojects.com/  
[5] Mozilla Foundation, Fetch API Reference, 2024. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API  
[6] Pallets Project, Jinja2 Templating Engine Docs, 2024. [Online]. Available: https://jinja.palletsprojects.com/  
[7] Render Inc., Deploy Flask on Render Platform, 2024. [Online]. Available: https://render.com/docs/deploy-flask  
[8] National Institute of Standards and Technology (NIST), Recommendation for Password-Based Key Derivation Part 1: PBKDF2, NIST SP 800-132, 2010. [Online].  
[9] Flask-CORS Developers, Cross Origin Resource Sharing Extension Docs, 2024. [Online]. Available: https://flask-cors.readthedocs.io/  
[10] Pytest Project, Pytest Testing Framework Documentation, 2024. [Online]. Available: https://docs.pytest.org/  
[11] https://medium.com/@denis.mutunga/back-end-architecture-for-the-cart-system-7c222bb99ef3  
[12] https://dev.to/francescoxx/build-a-crud-rest-api-in-python-using-flask-sqlalchemy-postgres-docker-28lo  
[13] OpenAI, ChatGPT (GPT-5)  - https://chatgpt.com/share/693acb2a-77b4-8010-9cee-1f6fdccff3b4  
[14] Readme Generation - https://chatgpt.com/share/693acb2a-77b4-8010-9cee-1f6fdccff3b4  
 


## 🧑‍💻 Author
Ayush Sharma  
📧 20076564@mydbs.ie  
Built with ❤️ using Flask, PostgreSQL, and ChatGPT guidance.  

## 💡 Credits  
Hands-on development: Ayush Sharma  ( template/style from - vibecodingwithfred.com ( shopping cart)
AI Pair Programming: ChatGPT (GPT-5)  
https://chatgpt.com/
Open-source libraries: Flask, SQLAlchemy, Bootstrap  
