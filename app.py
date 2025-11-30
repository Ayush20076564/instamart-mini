from flask import Flask, jsonify, request, render_template, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
from sqlalchemy import text
import os

app = Flask(__name__)
app.secret_key = "instamart-secret"

# ---------------- Database Config ---------------- #
db_url = os.getenv("DATABASE_URL", "sqlite:///instamart.db")
if db_url.startswith("postgres://"):  # Render uses postgres:// prefix
    db_url = db_url.replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.permanent_session_lifetime = timedelta(minutes=30)
app.config["SESSION_COOKIE_SECURE"] = False  # keep False for local dev
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

db = SQLAlchemy(app)
CORS(app, supports_credentials=True)

print("✅ Using database:", app.config["SQLALCHEMY_DATABASE_URI"])

# ---------------- Models ---------------- #
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(10), default="user")

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    price = db.Column(db.Float)
    quantity = db.Column(db.Integer)
    image = db.Column(db.String(200), nullable=True)

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'))
    quantity = db.Column(db.Integer, default=1)

# ---------------- Health Check ---------------- #
@app.route("/api/health")
def health_check():
    try:
        db.session.execute(text("SELECT 1"))
        return jsonify({"status": "ok", "db": "connected"})
    except Exception as e:
        return jsonify({"status": "error", "details": str(e)}), 500

# ---------------- Authentication ---------------- #
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data.get("username") or not data.get("password"):
        return jsonify({"error": "Missing username or password"}), 400
    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"error": "Username already exists"}), 409
    hashed = generate_password_hash(data["password"])
    new_user = User(username=data["username"], password=hashed, role=data.get("role", "user"))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get("username")).first()
    if not user or not check_password_hash(user.password, data.get("password")):
        return jsonify({"error": "Invalid username or password"}), 401
    session.permanent = True
    session["user"] = {"id": user.id, "username": user.username, "role": user.role}
    return jsonify({"message": "Login successful", "user": session["user"]})

@app.route("/api/logout", methods=["POST"])
def api_logout():
    session.pop("user", None)
    return jsonify({"message": "Logged out"}), 200

@app.route("/logout")
def page_logout():
    session.pop("user", None)
    return redirect("/login")

# ---------------- Item CRUD ---------------- #
@app.route("/api/items", methods=["GET"])
def get_items():
    items = Item.query.all()
    return jsonify([
        {"id": i.id, "name": i.name, "price": i.price, "quantity": i.quantity, "image": i.image}
        for i in items
    ])

@app.route("/api/items", methods=["POST"])
def add_item():
    user = session.get("user")
    if not user or user["role"] != "admin":
        return jsonify({"error": "Admin access required"}), 403
    data = request.get_json()
    if not data.get("name"):
        return jsonify({"error": "Missing item name"}), 400
    item = Item(
        name=data["name"],
        price=data.get("price", 0.0),
        quantity=data.get("quantity", 0),
        image=data.get("image")
    )
    db.session.add(item)
    db.session.commit()
    return jsonify({"message": "Item added"}), 201

@app.route("/api/items/<int:item_id>", methods=["PUT"])
def update_item(item_id):
    user = session.get("user")
    if not user or user["role"] != "admin":
        return jsonify({"error": "Admin access required"}), 403
    data = request.get_json()
    item = Item.query.get(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404
    item.name = data.get("name", item.name)
    item.price = data.get("price", item.price)
    item.quantity = data.get("quantity", item.quantity)
    item.image = data.get("image", item.image)
    db.session.commit()
    return jsonify({"message": "Item updated"})

@app.route("/api/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    user = session.get("user")
    if not user or user["role"] != "admin":
        return jsonify({"error": "Admin access required"}), 403
    item = Item.query.get(item_id)
    if not item:
        return jsonify({"error": "Item not found"}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item deleted"})

# ---------------- Cart ---------------- #
@app.route("/api/cart", methods=["GET"])
def get_cart():
    user = session.get("user")
    if not user:
        return jsonify({"error": "Login required"}), 401
    cart_items = Cart.query.filter_by(user_id=user["id"]).all()
    cart, total = [], 0
    for c in cart_items:
        item = Item.query.get(c.item_id)
        subtotal = item.price * c.quantity
        total += subtotal
        cart.append({
            "id": c.id,
            "name": item.name,
            "price": item.price,
            "quantity": c.quantity,
            "subtotal": subtotal
        })
    return jsonify({"items": cart, "total": total})

@app.route("/api/cart", methods=["POST"])
def add_to_cart():
    user = session.get("user")
    if not user:
        return jsonify({"error": "Login required"}), 401
    data = request.get_json()
    existing = Cart.query.filter_by(user_id=user["id"], item_id=data["item_id"]).first()
    if existing:
        existing.quantity += data.get("quantity", 1)
    else:
        db.session.add(Cart(user_id=user["id"], item_id=data["item_id"], quantity=data.get("quantity", 1)))
    db.session.commit()
    return jsonify({"message": "Item added to cart"})

@app.route("/api/cart/<int:cart_id>", methods=["DELETE"])
def remove_cart_item(cart_id):
    user = session.get("user")
    if not user:
        return jsonify({"error": "Login required"}), 401
    cart_item = Cart.query.get(cart_id)
    if not cart_item or cart_item.user_id != user["id"]:
        return jsonify({"error": "Item not found"}), 404
    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Item removed"})

@app.route("/api/checkout", methods=["POST"])
def checkout():
    user = session.get("user")
    if not user:
        return jsonify({"error": "Login required"}), 401
    cart_items = Cart.query.filter_by(user_id=user["id"]).all()
    if not cart_items:
        return jsonify({"error": "Cart is empty"}), 400
    total = 0
    for c in cart_items:
        item = Item.query.get(c.item_id)
        if item.quantity < c.quantity:
            return jsonify({"error": f"Not enough {item.name} in stock"}), 400
        item.quantity -= c.quantity
        total += item.price * c.quantity
        db.session.delete(c)
    db.session.commit()
    return jsonify({"message": f"Checkout successful! Total: ${total:.2f}"})

# ---------------- Pages ---------------- #
@app.route('/')
def home_redirect():
    if "user" not in session:
        return redirect("/login")
    user = session["user"]
    return redirect("/store" if user["role"] == "admin" else "/shop")

@app.route('/login')
def login_page():
    if "user" in session:
        user = session["user"]
        return redirect("/store" if user["role"] == "admin" else "/shop")
    return render_template("login.html")

@app.route('/register')
def register_page():
    if "user" in session:
        user = session["user"]
        return redirect("/store" if user["role"] == "admin" else "/shop")
    return render_template("register.html")

@app.route('/shop')
def shop_page():
    user = session.get('user')
    if not user:
        return redirect(url_for('login_page'))
    if user["role"] == "admin":
        return redirect("/store")
    return render_template("index.html")

@app.route('/store')
def store_page():
    user = session.get('user')
    if not user or user["role"] != "admin":
        return redirect(url_for('login_page'))
    return render_template("store.html")

# ---------------- Run ---------------- #
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)
