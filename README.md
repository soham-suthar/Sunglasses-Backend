# 🕶️ Sunglasses E-Commerce Backend

A production-inspired RESTful backend API for an E-Commerce Sunglasses Store built using **Node.js, Express.js, MongoDB, and JWT Authentication**.

This project provides secure authentication, product management, shopping cart functionality, order management, invoice generation, and a complete admin panel with pagination, searching, filtering, sorting, and API documentation.

---

## 🚀 Live Demo

### API

https://sungalsses-backend.onrender.com

### Swagger Documentation

https://sungalsses-backend.onrender.com/api-docs

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Authorization (User/Admin)
- Password Hashing using bcrypt

---

## Products

- View all products
- Filter products by color
- Retrieve available colors

---

## Shopping Cart

- Add product to cart
- Update quantity
- Remove product
- Clear cart
- Automatic stock validation

---

## Orders

- Checkout
- View all orders
- View specific order
- Cancel order
- Simulated payment
- Invoice generation (PDF)

---

## Admin Panel

### Dashboard

- Total Users
- Total Products
- Total Orders
- Total Revenue
- Order Status Statistics

### User Management

- List Users
- Search Users
- Pagination
- Sorting
- Update User
- Delete User

### Product Management

- Add Product
- Update Product
- Delete Product
- Search
- Filter
- Pagination
- Sorting

### Order Management

- View Orders
- Update Order Status
- Search
- Pagination
- Sorting
- Filter by Payment Status
- Filter by Order Status

### Cart Management

- View all carts
- Search carts by user
- View specific cart

---

# Tech Stack

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

## Deployment

- Render
- MongoDB Atlas

---

# Folder Structure

```
src
│
├── config/
├── controller/
│   ├── admin/
│   └── user/
│
├── docs/
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

# API Documentation

Interactive API documentation is available through Swagger.

```
GET /api-docs
```

---

# Installation

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

# Environment Variables

| Variable    | Description                     |
| ----------- | ------------------------------- |
| PORT        | Server Port                     |
| MONGODB_URI | MongoDB Atlas Connection String |
| JWT_SECRET  | Secret used for JWT             |

---

# Example Endpoints

## Authentication

```
POST /api/register

POST /api/login

GET /api/profile
```

---

## Products

```
GET /api/products

GET /api/colors
```

---

## Cart

```
GET /api/cart

POST /api/cart

PATCH /api/cart/:id

DELETE /api/cart/:id

DELETE /api/cart
```

---

## Orders

```
POST /api/checkout

GET /api/order

GET /api/orders/:id

PATCH /api/orders/:id/pay

PATCH /api/orders/:id/cancel

GET /api/orders/:id/invoice
```

---

## Admin

```
GET /api/admin/dashboard

GET /api/admin/users

GET /api/admin/products

GET /api/admin/orders

GET /api/admin/carts
```

---

# Security Features

- JWT Authentication
- Role-Based Authorization
- Password Hashing (bcrypt)
- Input Validation (Zod)
- Protected Routes
- ObjectId Validation
- Centralized Error Handling

---

# Future Improvements

- Razorpay Payment Integration
- Email Verification
- Forgot Password
- Refresh Tokens
- Product Reviews
- Wishlist
- Product Images Upload
- Rate Limiting
- Docker Support
- CI/CD Pipeline

---

# Author

**Soham Suthar**

GitHub:
https://github.com/soham-suthar

LinkedIn:
https://www.linkedin.com/in/soham-suthar/

---

# License

This project is intended for educational and portfolio purposes.
