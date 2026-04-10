# CaterServ - Backend (API)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

This is the backend API for the **CaterServ** web application. Built purely as a REST API server using Node.js, Express, and MongoDB, it intelligently handles authentication, authorization, transactional emails, and CRUD operations for the platform's Content Management System.

### 🚀 Live Deployment
**Backend Production URL:** [https://restaurant-backredux.onrender.com](https://restaurant-backredux.onrender.com)

---

## 🌟 Key Features

*   **API-Only Architecture:** Completely decoupled from static file serving. It responds exclusively to `/api/...` endpoints.
*   **Security & Scalability:** Integrated `helmet` for HTTP header security, `express-mongo-sanitize` to defend against injection attacks, and `compression` for payload optimization.
*   **Case-Insensitive Database Auth:** Resolves typical registration bugs by casting emails to strict lowercase formats and matching against rigid Enum schema roles (`"user"`, `"admin"`, `"superadmin"`).
*   **Cross-Domain JWT Authentication:** Completely abandons third-party `HttpOnly` cookies to avoid CORS/SameSite issues. Intercepts tokens securely through the `Authorization: Bearer` Header payload sent from the Frontend.
*   **OTP & Mail Integration:** Built-in NodeMailer configurations delivering instant One-Time-Password (OTP) multi-step registration sequences.

## 📂 Project Architecture

*   `src/app.js`: Central Express app configuration, Middleware aggregation, and Route bootstrapping.
*   `src/server.js`: Node.js server initiation and Database connection handlers.
*   `src/model/`: Mongoose Models strictly defining MongoDB Data Schemas.
*   `src/controller/`: Business logic driving individual endpoint processes.
*   `src/routes/`: Express routers explicitly mapping HTTP methods to designated Controllers.
*   `src/middleware/`: Reusable validation (e.g., `authMiddleware.js` for JWT extraction, `isAdmin.js` for RBAC mapping).

## 🛠️ Local Development Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the `/server` directory.
   ```env
   PORT=3000
   MONGODB_URI=your_mongo_db_connection_url
   JWT_SECRET=your_super_secret_jwt_key
   
   # NodeMailer (Gmail Configuration)
   GMAIL_ID=your_gmail_address
   GMAIL_PASSWORD=your_gmail_app_password
   
   # Strict Production Variables
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   *The server typically runs on `http://localhost:3000`. Test cross-environment workflows seamlessly through the Vite frontend Proxy!*

## 🚢 Deployment (Render)

This repository is optimized for deployment on **Render.com**. 
*   **Build Command:** `npm install`
*   **Start Command:** `node src/server.js` (or `node server.js` relative to structure)
*   **Environment Configuration:** Make sure you correctly bind `FRONTEND_URL` on Render to match your exact Vercel deployment link (`https://restaurant-frontend-amber-kappa.vercel.app`) to strictly permit CORS requests.
