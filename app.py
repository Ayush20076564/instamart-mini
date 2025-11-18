from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/login')
def home():
    return render_template('login.html')


if __name__ == '__main__':
    app.run(debug=True)