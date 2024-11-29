from fastapi import FastAPI, Request
from typing import Optional
import sqlite3

app = FastAPI()

# Database connection (Poor practice: No connection pool)
conn = sqlite3.connect("example.db", check_same_thread=False)
cursor = conn.cursor()

# Create users table (Missing parameterized queries)
cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)")

@app.get("/")
async def root():
    # Missing proper content-type and security headers
    return {"message": "Hello, World!"}

@app.get("/user")
async def get_user(id: Optional[int] = None):
    # SQL Injection vulnerability
    query = f"SELECT * FROM users WHERE id = {id}"
    result = cursor.execute(query).fetchone()
    if result:
        return {"id": result[0], "username": result[1]}
    else:
        return {"error": "User not found"}, 404

@app.post("/add_user")
async def add_user(request: Request):
    data = await request.json()
    username = data.get("username")
    password = data.get("password")
    
    # No input validation and password storage in plain text
    query = f"INSERT INTO users (username, password) VALUES ('{username}', '{password}')"
    cursor.execute(query)
    conn.commit()
    return {"message": "User added successfully"}

@app.get("/files")
async def read_file(file_path: str):
    # Path Traversal vulnerability
    try:
        with open(file_path, "r") as file:
            content = file.read()
        return {"content": content}
    except Exception as e:
        return {"error": str(e)}

@app.get("/reverse-proxy")
async def proxy(url: str):
    # SSRF vulnerability
    import requests
    response = requests.get(url)
    return {"content": response.text}
