# Laptop Rental API Documentation

This document provides a comprehensive list of all API endpoints for the Laptop Rental application.

## Base URL

The base URL for all API endpoints is `/api`.

---

## Authentication

Most endpoints require authentication. Authenticated routes are protected using a JSON Web Token (JWT). The token should be included in the `Authorization` header of the request as a Bearer token.

- **Header:** `Authorization: Bearer <token>`

---

## User API

**File:** `backend/routes/userRoutes.js`

| Method  | Endpoint                 | Description            | Access  |
| ------- | ------------------------ | ---------------------- | ------- |
| `POST`  | `/users/register`        | Register a new user    | Public  |
| `POST`  | `/users/login`           | Login a user           | Public  |
| `GET`   | `/users/profile`         | Get user profile       | Private |
| `PATCH` | `/users/profile`         | Update user profile    | Private |
| `POST`  | `/users/upload-kyc`      | Upload KYC document    | Private |
| `POST`  | `/users/forgot-password` | Request password reset | Public  |
| `POST`  | `/users/reset-password`  | Reset user password    | Public  |

---

## Laptop API

**File:** `backend/routes/laptopRoutes.js`

| Method   | Endpoint                    | Description               | Access |
| -------- | --------------------------- | ------------------------- | ------ |
| `GET`    | `/laptops`                  | Get all laptops           | Public |
| `GET`    | `/laptops/:id`              | Get a single laptop       | Public |
| `POST`   | `/laptops`                  | Add a new laptop          | Admin  |
| `PUT`    | `/laptops/:id`              | Update a laptop           | Admin  |
| `DELETE` | `/laptops/:id`              | Delete a laptop           | Admin  |
| `GET`    | `/laptops/availability/:id` | Check laptop availability | Public |

---

## Rental API

**File:** `backend/routes/rentalRoutes.js`

| Method   | Endpoint       | Description         | Access  |
| -------- | -------------- | ------------------- | ------- |
| `GET`    | `/rentals`     | Get user's rentals  | Private |
| `POST`   | `/rentals`     | Create a new rental | Private |
| `PUT`    | `/rentals/:id` | Return a laptop     | Private |
| `DELETE` | `/rentals/:id` | Cancel a rental     | Private |

---

## Payment API

**File:** `backend/routes/paymentRoutes.js`

| Method | Endpoint                     | Description                | Access  |
| ------ | ---------------------------- | -------------------------- | ------- |
| `POST` | `/payments/create-order`     | Create a payment order     | Private |
| `POST` | `/payments/verify`           | Verify a payment           | Private |
| `GET`  | `/payments/my-history`       | Get user's payment history | Private |
| `GET`  | `/payments/all`              | Get all payments           | Admin   |
| `POST` | `/payments/refund/:rentalId` | Process a refund           | Admin   |

---

## Review API

**File:** `backend/routes/reviewRoutes.js`

| Method   | Endpoint                    | Description                  | Access  |
| -------- | --------------------------- | ---------------------------- | ------- |
| `POST`   | `/reviews`                  | Add a review for a laptop    | Private |
| `GET`    | `/reviews/my-reviews`       | Get user's reviews           | Private |
| `GET`    | `/reviews/laptop/:laptopId` | Get all reviews for a laptop | Public  |
| `DELETE` | `/reviews/:id`              | Delete a review              | Admin   |
