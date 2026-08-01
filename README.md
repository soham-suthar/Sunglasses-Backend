# 🕶️ Sunglasses E-Commerce Backend

A production-inspired **RESTful E-Commerce Backend API** built with **Node.js, Express.js, MongoDB, and JWT Authentication** following the **MVC Architecture**.

This project provides secure authentication with email verification, role-based authorization, product management, shopping cart functionality, order management, invoice generation, a complete admin dashboard, and fully documented REST APIs using **Swagger (OpenAPI)** — backed by an automated Jest/Supertest test suite.

---

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Swagger](https://img.shields.io/badge/API-Swagger-85EA2D?logo=swagger)
![Jest](https://img.shields.io/badge/Tested_with-Jest-C21325?logo=jest&logoColor=white)
![License](https://img.shields.io/badge/License-Portfolio-blue)

---

## 🚀 Live Demo

### REST API

https://sungalsses-backend.onrender.com

### Swagger Documentation

https://sungalsses-backend.onrender.com/api-docs

> ⚠️ Hosted on Render's free tier — the first request after inactivity may take 30–50s while the instance spins back up.

---

## ✨ Highlights

- RESTful API architecture with MVC project structure
- JWT authentication with **email verification required before login**
- Role-based authorization (User / Admin)
- Secure password hashing (bcrypt)
- Runtime request validation using Zod
- Rate limiting on authentication endpoints (register/login)
- Helmet security headers
- Swagger (OpenAPI) documentation, live and interactive
- Admin dashboard with aggregation-based analytics
- Shopping cart system with stock validation
- Order management with PDF invoice generation
- Pagination, searching, filtering, and sorting across all admin resources
- Automated test suite (Jest + Supertest + in-memory MongoDB) — all tests passing
- Deployed on Render with MongoDB Atlas

---

## 📌 Features

### 🔐 Authentication & Email Verification

- User registration (email verification required before first login)
- Email verification via a tokenized link (sent through Brevo)
- Resend verification email endpoint
- JWT-based login, issued only after verification
- Protected routes via JWT middleware
- Role-based authorization (User/Admin)
- Password hashing with bcrypt
- Rate limiting on register/login (100 requests / 15 min window)

### 🛍 Products

- View all products
- Filter products by color
- Retrieve available colors

### 🛒 Shopping Cart

- Add product to cart
- Update quantity
- Remove product
- Clear cart
- Automatic stock validation

### 📦 Orders

- Checkout
- View all orders / a specific order
- Cancel order
- Simulated payment
- PDF invoice generation

### 👨‍💼 Admin Panel

**Dashboard** — total users, products, orders, revenue, order status breakdown (via MongoDB aggregation)
**User management** — list, search, update, delete (with safeguards against removing the last admin or self-demotion)
**Product management** — full CRUD, search, filter, pagination, sorting
**Order management** — view, update status, filter by payment/order status, pagination, sorting
**Cart management** — view all carts, search by user, view a specific cart

---

## 🛠 Tech Stack

| Category       | Technologies                           |
| -------------- | -------------------------------------- |
| Backend        | Node.js, Express.js                    |
| Database       | MongoDB, Mongoose                      |
| Authentication | JWT, bcrypt                            |
| Validation     | Zod                                    |
| Email          | Brevo (transactional email API)        |
| Security       | Helmet, express-rate-limit             |
| Documentation  | Swagger / OpenAPI                      |
| Testing        | Jest, Supertest, mongodb-memory-server |
| Deployment     | Render, MongoDB Atlas                  |

---

## 📂 Project Structure

```
src
│
├── config/
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
│   ├── validation/
│   └── rate-limiting.js
│
├── models/
├── router/
│   ├── admin/
│   └── user/
│
├── util/
├── validation/
│
tests/
│   ├── setup.js
│   └── *.test.js
│
app.js
sunglasses.js
```

---

## 📖 API Documentation

Interactive Swagger documentation, live at:

```
GET /api-docs
```

---

## 📊 API Overview

### Authentication

```
POST /api/register                    Register a new account (rate limited)
GET  /api/verify-email/:token         Verify email via emailed link
POST /api/resend-verification         Resend the verification email
POST /api/login                       Log in (rate limited, requires verified email)
GET  /api/profile                     Get authenticated user's profile
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

## 🔒 Security Features

- JWT authentication with mandatory email verification before login
- Role-based authorization
- Password hashing (bcrypt)
- Runtime request validation (Zod)
- Helmet security headers
- Rate limiting on authentication endpoints
- ObjectId validation middleware
- Centralized error handling
  > **Note:** CORS is currently configured to allow all origins (`origin: "*"`) for ease of frontend integration during development. This should be restricted to an explicit allowlist before any production use beyond a portfolio context.

---

## 🧪 Testing

This project has an automated test suite built with **Jest** and **Supertest**, running against an isolated **in-memory MongoDB instance** (`mongodb-memory-server`) — no real database connection is touched during tests.

Run the full suite:

```bash
npm test
```

Coverage includes:

- User registration (success, duplicate email, invalid data)
- Email verification and resend-verification flows
- Login (success, wrong password, unknown user)
- Authenticated profile access (including rejection when unauthenticated)

---

## ⚙ Installation

Clone the repository

```bash
git clone https://github.com/soham-suthar/Sunglasses-Backend.git
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
BREVO_API_KEY=your_brevo_api_key
```

> ⚠️ Confirm the exact Brevo-related variable name(s) against `src/config/` — update this list to match exactly what your code reads.

Run the project (development, with auto-restart)

```bash
npm run dev
```

Run in production mode

```bash
npm start
```

Run tests

```bash
npm test
```

---

## 🌍 Environment Variables

| Variable      | Description                                   |
| ------------- | --------------------------------------------- |
| PORT          | Server port                                   |
| MONGODB_URI   | MongoDB Atlas connection string               |
| JWT_SECRET    | Secret key used to sign JWT tokens            |
| BREVO_API_KEY | API key for Brevo transactional email service |

---

## 📈 Future Improvements

- Restrict CORS to a specific origin allowlist
- Forgot / reset password flow
- Refresh tokens
- Product reviews
- Wishlist
- Product image uploads
- CI/CD pipeline
- MongoDB transactions for the checkout flow
- Docker support

---

## 👨‍💻 Author

**Soham Suthar**

GitHub: https://github.com/soham-suthar
LinkedIn: https://www.linkedin.com/in/soham-suthar/

---

## 📄 License

This project is intended for **educational and portfolio purposes**.
