from flask import Flask, render_template, request, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# Database connection function
def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            port=3306,
            user='root',
            password='rootpass',
            database='weatherapp'
        )
        return conn
    except Error as e:
        print(f"Database connection error: {e}")
        return None

@app.route("/registration", methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        if conn:
            cursor = conn.cursor()
            try:
                cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                             (data['username'], data['email'], data['password']))
                conn.commit()
                return jsonify({"status": "success", "message": "User registered"})
            except Error as e:
                return jsonify({"status": "error", "message": str(e)})
            finally:
                cursor.close()
                conn.close()
        return jsonify({"status": "error", "message": "Database connection failed"})
    return render_template("registration.html")

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        if conn:
            cursor = conn.cursor(dictionary=True)
            try:
                cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s",
                             (data['username'], data['password']))
                user = cursor.fetchone()
                if user:
                    return jsonify({"status": "success", "user_id": user['id']})
                return jsonify({"status": "error", "message": "Invalid credentials"})
            except Error as e:
                return jsonify({"status": "error", "message": str(e)})
            finally:
                cursor.close()
                conn.close()
        return jsonify({"status": "error", "message": "Database connection failed"})
    return render_template("login.html")

@app.route("/landing")
def landing():
    return render_template("/landing.html")

@app.route("/forgotpass")
def forgotpass():
    return render_template("/forgotpass.html")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
