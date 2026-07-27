# 🕶️ Sunglasses E-Commerce Backend

A production-inspired **RESTful E-Commerce Backend API** built with **Node.js, Express.js, MongoDB, and JWT Authentication** following the **MVC Architecture**.

This project provides secure authentication, role-based authorization, product management, shopping cart functionality, order management, invoice generation, a complete admin dashboard, and fully documented REST APIs using **Swagger (OpenAPI)**.

---

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Swagger](https://img.shields.io/badge/API-Swagger-85EA2D?logo=swagger)
![License](https://img.shields.io/badge/License-Portfolio-blue)

---

# 🚀 Live Demo

### REST API

https://sungalsses-backend.onrender.com

### Swagger Documentation

https://sungalsses-backend.onrender.com/api-docs

---

# ✨ Highlights

- RESTful API Architecture
- MVC Project Structure
- JWT Authentication
- Role-Based Authorization
- Secure Password Hashing (bcrypt)
- Runtime Validation using Zod
- Swagger (OpenAPI) Documentation
- Admin Dashboard
- Shopping Cart System
- Order Management
- PDF Invoice Generation
- Pagination
- Searching
- Filtering
- Sorting
- Helmet Security Headers
- Rate Limiting
- MongoDB Atlas Deployment
- Render Deployment

---

# 📌 Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Authorization (User/Admin)
- Password Hashing using bcrypt

---

## 🛍 Products

- View Products
- Filter Products by Color
- Retrieve Available Colors

---

## 🛒 Shopping Cart

- Add Products
- Update Quantity
- Remove Products
- Clear Cart
- Automatic Stock Validation

---

## 📦 Orders

- Checkout
- View Orders
- View Specific Order
- Cancel Orders
- Simulated Payment Workflow
- PDF Invoice Generation

---

## 👨‍💼 Admin Panel

### Dashboard

- Total Users
- Total Products
- Total Orders
- Total Revenue
- Order Status Statistics

### User Management

- View Users
- Search Users
- Update Users
- Delete Users
- Pagination
- Sorting

### Product Management

- Add Products
- Update Products
- Delete Products
- Search
- Filter
- Pagination
- Sorting

### Order Management

- View Orders
- Update Order Status
- Search
- Filter by Payment Status
- Filter by Order Status
- Pagination
- Sorting

### Cart Management

- View All Carts
- Search by User
- View Specific Cart

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt

## Validation

- Zod

## Documentation

- Swagger / OpenAPI

## Security

- Helmet
- Express Rate Limit

## Deployment

- Render
- MongoDB Atlas

---

# 📂 Project Structure

```
src
│
├── config/
│
├── controller/
│   ├── admin/
│   └── user/
│
├── docs/
│   ├── paths/
│   ├── requestBodies/
│   ├── responses/
│   ├── schemas/
│   └── reusable/
│
├── middleware/
│   ├── admin/
│   └── validation/
│
├── models/
│
├── router/
│   ├── admin/
│   └── user/
│
├── util/
│
├── validation/
│
└── server.js
```

---

# 📖 API Documentation

Interactive Swagger documentation is available at:

```
GET /api-docs
```

---

# 📊 API Overview

### Authentication

```
POST /api/register
POST /api/login
GET  /api/profile
```

### Products

```
GET /api/products
GET /api/colors
```

### Shopping Cart

```
GET    /api/cart
POST   /api/cart
PATCH  /api/cart/:id
DELETE /api/cart/:id
DELETE /api/cart
```

### Orders

```
POST  /api/checkout
GET   /api/order
GET   /api/orders/:id
PATCH /api/orders/:id/pay
PATCH /api/orders/:id/cancel
GET   /api/orders/:id/invoice
```

### Admin

```
GET    /api/admin/dashboard

GET    /api/admin/users
GET    /api/admin/users/:id
PATCH  /api/admin/users/:id
DELETE /api/admin/users/:id

GET    /api/admin/products
POST   /api/admin/products
GET    /api/admin/products/:id
PATCH  /api/admin/products/:id
DELETE /api/admin/products/:id

GET    /api/admin/orders
GET    /api/admin/orders/:id
PATCH  /api/admin/orders/:id/status

GET    /api/admin/carts
GET    /api/admin/carts/:id
```

---

# 🔒 Security Features

- JWT Authentication
- Role-Based Authorization
- Password Hashing using bcrypt
- Runtime Request Validation using Zod
- Helmet Security Headers
- Login & Registration Rate Limiting
- ObjectId Validation Middleware
- Protected Routes
- Centralized Error Handling

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/soham-suthar/Sunglasses-Backend.git
```

Move into the project

```bash
cd Sunglasses-Backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run the project

```bash
npm run dev
```

---

# 🌍 Environment Variables

| Variable    | Description                        |
| ----------- | ---------------------------------- |
| PORT        | Server Port                        |
| MONGODB_URI | MongoDB Atlas Connection String    |
| JWT_SECRET  | Secret Key used to sign JWT Tokens |

---

# 📈 Future Improvements

- Razorpay / Stripe Integration
- Email Verification
- Forgot Password
- Refresh Tokens
- Product Reviews
- Wishlist
- Product Image Uploads
- Docker Support
- CI/CD Pipeline
- Automated Testing (Jest + Supertest)
- MongoDB Transactions for Checkout

---

# 👨‍💻 Author

**Soham Suthar**

GitHub  
https://github.com/soham-suthar

LinkedIn  
https://www.linkedin.com/in/soham-suthar/

---

# 📄 License

This project is intended for **educational and portfolio purposes**.
