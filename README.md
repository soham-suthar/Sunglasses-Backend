# 🕶️ Sunglasses E-Commerce Backend

A production-inspired **RESTful E-Commerce Backend API** built with **Node.js, Express.js, MongoDB, and JWT Authentication** following the **MVC Architecture**.

This project provides secure authentication with email verification, password reset, refresh-token-based sessions, role-based authorization, product management, shopping cart functionality, order management, invoice generation, a complete admin dashboard, and fully documented REST APIs using **Swagger (OpenAPI)** — backed by an automated Jest/Supertest test suite.

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
- **Access + refresh token session model**, with httpOnly refresh cookies and token rotation on every refresh
- **Forgot / reset password flow** with account-enumeration-safe responses
- Role-based authorization (User / Admin)
- Secure password hashing (bcrypt)
- Runtime request validation using Zod
- Rate limiting on authentication endpoints (register/login/forgot-password)
- Helmet security headers
- CORS restricted to a configured origin allowlist
- Swagger (OpenAPI) documentation, live and interactive
- Admin dashboard with aggregation-based analytics
- Shopping cart system with stock validation
- Order management with PDF invoice generation
- Pagination, searching, filtering, and sorting across all admin resources
- Automated test suite (Jest + Supertest + in-memory MongoDB) — all tests passing
- Deployed on Render with MongoDB Atlas

---

## 📌 Features

### 🔐 Authentication & Sessions

- User registration (email verification required before first login)
- Email verification via a tokenized link (sent through Brevo)
- Resend verification email endpoint
- JWT-based login: short-lived access token (response body) + long-lived refresh token (httpOnly cookie)
- Refresh token rotation — every refresh issues a brand-new refresh token and invalidates the previous one
- Logout endpoint that clears the session both client-side (cookie) and server-side (stored token hash)
- Forgot password / reset password flow, reusing the same tokenized-email pattern as verification
- Password reset invalidates any existing refresh token, forcing re-authentication on all sessions
- Protected routes via JWT middleware
- Role-based authorization (User/Admin)
- Password hashing with bcrypt
- Rate limiting on register/login/forgot-password (100 requests / 15 min window)

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

| Category       | Technologies                              |
| -------------- | ----------------------------------------- |
| Backend        | Node.js, Express.js                       |
| Database       | MongoDB, Mongoose                         |
| Authentication | JWT (access + refresh), bcrypt            |
| Validation     | Zod                                       |
| Email          | Brevo (transactional email API)           |
| Security       | Helmet, express-rate-limit, cookie-parser |
| Documentation  | Swagger / OpenAPI                         |
| Testing        | Jest, Supertest, mongodb-memory-server    |
| Deployment     | Render, MongoDB Atlas                     |

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
POST /api/refresh-token               Issue a new access token via the refresh cookie (rotates the refresh token)
POST /api/logout                      Clear the session (cookie + stored token hash)
POST /api/forgot-password             Request a password reset email (rate limited)
POST /api/reset-password/:token       Set a new password using the emailed reset token
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
- Access + refresh token model — short-lived access tokens, httpOnly refresh cookies, full rotation on every refresh
- Refresh tokens hashed (SHA-256) at rest, never stored in plaintext
- Forgot-password flow never reveals whether an email is registered (prevents account enumeration)
- Password reset invalidates any existing session/refresh token on the account
- Role-based authorization
- Password hashing (bcrypt)
- Runtime request validation (Zod)
- Helmet security headers
- CORS restricted to a configured origin (`CLIENT_URL`), with credentials support for the refresh-token cookie
- Rate limiting on authentication endpoints
- ObjectId validation middleware
- Centralized error handling

---

## 🧪 Testing

This project has an automated test suite built with **Jest** and **Supertest**, running against an isolated **in-memory MongoDB instance** (`mongodb-memory-server`) — no real database connection is touched during tests.

Run the full suite:

```bash
npm test
```

**34 tests, all passing**, covering:

- User registration (success, duplicate email, invalid data)
- Email verification and resend-verification flows
- Login (success, wrong password, unknown user)
- Authenticated profile access (including rejection when unauthenticated)
- Refresh token issuance, rotation, and rejection of reused/invalid/missing tokens — both at the HTTP layer and as an isolated model-level unit test
- Logout (cookie clearing + server-side session invalidation)
- Forgot password (generic response regardless of whether the email exists, validation)
- Reset password (success, expired/invalid token, session invalidation on reset, weak password rejection)
- Product listing and filtering
- Cart and order flows

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
JWT_SECRET_KEY=your_access_token_secret
JWT_REFRESH_SECRET_KEY=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
BREVO_API_KEY=your_brevo_api_key
CLIENT_URL=http://localhost:3000
```

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

| Variable               | Description                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- |
| PORT                   | Server port                                                                         |
| MONGODB_URI            | MongoDB Atlas connection string                                                     |
| JWT_SECRET_KEY         | Secret key used to sign access tokens                                               |
| JWT_REFRESH_SECRET_KEY | Secret key used to sign refresh tokens (kept separate from the access token secret) |
| ACCESS_TOKEN_EXPIRY    | Access token lifetime (default: `15m`)                                              |
| REFRESH_TOKEN_EXPIRY   | Refresh token lifetime (default: `7d`)                                              |
| BREVO_API_KEY          | API key for Brevo transactional email service                                       |
| CLIENT_URL             | Base URL used for verification/reset email links, and as the allowed CORS origin    |

---

## 📈 Future Improvements

- Razorpay payment integration
- MongoDB transactions for the checkout flow
- Product reviews
- Wishlist
- Product image uploads
- CI/CD pipeline
- Docker support

---

## 👨‍💻 Author

**Soham Suthar**

GitHub: https://github.com/soham-suthar
LinkedIn: https://www.linkedin.com/in/soham-suthar/

---

## 📄 License

This project is intended for **educational and portfolio purposes**.
