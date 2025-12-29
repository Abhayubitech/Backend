# Express + MySQL Demo Backend

A simple backend demo project built with **Express.js** and **MySQL** using the **mysql2** driver.  
This project demonstrates a clean folder structure with routes, controllers, services, and database configuration separated into different files.

---

## 📦 Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- nodemon (development)

---
npm init -y
npm install express mysql2 dotenv
npm install nodemon --save-dev

## 📁 Project Structure

express-mysql-demo/
├── src/
│ ├── app.js
│ ├── server.js
│ ├── config/
│ │ └── db.js
│ ├── routes/
│ │ └── user.routes.js
│ ├── controllers/
│ │ └── user.controller.js
│ └── services/
│ └── user.service.js
├── .env
├── package.json
└── README.md


---

## ⚙️ Installation

```bash
git clone <your-repo-url>
cd express-mysql-demo
npm install

🔐 Environment Variables

Create a .env file in the root directory:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=demo_db

🗄️ Database Setup
CREATE DATABASE demo_db;

USE demo_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  password VARCHAR(100),
  email VARCHAR(100)
);

🚀 Running the Project
Development Mode
npm run dev

Production Mode
npm start


The server will start at:

http://localhost:3000

📡 API Endpoints
Health Check
GET /


Response:

API is running

Get All Users
GET /api/users


Response:

[
  {
    "id": 1,
    "password": "John",
    "email": "john@example.com"
  }
]

Create User
POST /api/users
Content-Type: application/json


Request body:

{
  "password": "John",
  "email": "john@example.com"
}


Response:

{
  "id": 1,
  "password": "John",
  "email": "john@example.com"
}

🧠 Architecture Overview

Routes – Define API endpoints

Controllers – Handle request and response logic

Services – Handle database queries

Config – Database connection setup

App – Express app configuration

Server – Application entry point

📌 Notes

Uses mysql2/promise for async/await support

Uses MySQL connection pooling

No ORM (raw SQL for simplicity)
