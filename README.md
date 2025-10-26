# 👗 Vara Fashion — Full Stack E-Commerce Experience (MERN)

**Your Fashion, Your Style — Anytime, Anywhere.**

Vara Fashion is a dynamic, full-featured **MERN Stack** e-commerce platform built for modern shoppers and ambitious developers alike.  
From secure **JWT authentication** and **admin dashboards** to animated product displays and downloadable **PDF order receipts**, this app delivers a seamless, responsive experience across devices.
---
## 🚀 Live Demo & Media
- 🌐 **Live Demo:** []  
- 🎥 **Demo Video:** [Add demo video link here]  
- 🖼️ **Screenshots:**
  ![Home Page](./screenshots/home.jpg)
  ![Dashboard](./screenshots/dashboard.jpg)
---
### 🧩 Tech Stack
## Frontend (Client)
- ⚛️ React.js (Functional Components + Hooks)
- 🧠 Redux Toolkit (State Management)
- 💨 Tailwind CSS + 💅 Styled Components
- 🎞️ Framer Motion & GSAP (Animations)
- 📄 jsPDF (Downloadable PDF Receipts)
- 🌐 Axios (API Integration with `publicRequest` & `userRequest` Interceptors)
- 📊 Recharts (Admin Analytics)

## Backend (Server)
- 🌐 Node.js + Express.js
- 🗄️ MongoDB + Mongoose ODM
- 🔒 JWT Authentication & Role-based Authorization
- 🖼️ Multer (Product Image Uploads)
- 🧰 Bcrypt, Path, and Morgan (Security + Logging)
- 📁 Express Static for `/uploads`

## Admin Dashboard
- 🔧 Protected Admin Panel
- 📦 CRUD for Products, Users & Orders
- 📈 Analytics via Recharts
- 🧾 PDF Export with jsPDF

---
## 🔐 Authentication Flow
- **JWT Authentication** for both users and admin.  
- Tokens are stored securely and auto-attached to protected requests via Axios interceptors.  
- Role-based middleware ensures admin-only access for sensitive routes.
---
## 📦 API Endpoints Overview
### 🔹 Auth Routes — `/api/auth`
Authentication and user session management.
```http
POST /register    → registerUser  
POST /login       → loginUser  
```
### 🔹 User Routes — `/api/users`
Manage user data, including retrieval, updates with image uploads, and admin-level deletions.
```http
GET /             → getAllUser
GET /find/:id     → getUserById
GET /stats        → getUserStats
PUT /:id          → updateUser (with profile image upload, protected)
DELETE /:id       → deleteUser (admin only)
```
### 🔹 Product Routes — /api/products
CRUD operations for products, including image uploads and search functionality.
```http
POST /            → createProduct (upload.single("image"))
PUT /:id          → updateProduct (upload.single("image"))
GET /find/:id     → getProductById
GET /             → getAllProducts
DELETE /:id       → deleteProduct (admin)
GET /search       → searchProducts
```
### 🔹 Cart Routes — /api/carts
User-specific cart management with protected access.
```http
POST /            → createCart (protected)
PUT /:id          → updateCart (protected)
GET /find/:userId → getCartById (protected)
DELETE /:id       → deleteCart (protected)
```
### 🔹 Order Routes — /api/orders
Handles order creation, tracking, and admin-level order management.
```http
POST /            → createOrder (user)
GET /find/:userId → getUserOrders (user)
GET /             → getAllOrders (admin)
GET /:id          → getOrderById (admin)
PUT /:id          → updateOrder (admin)
DELETE /:id       → deleteOrder (admin)
```
### 🔌 Axios Setup (Client Side)
client/src/requestMethod.js
```js
import axios from "axios"
const BASE_URL = "http://localhost:4000/api"
// Public Requests
export const publicRequest = axios.create({
  baseURL: BASE_URL,
})
// Private Requests (auto-inject JWT)
export const userRequest = axios.create({
  baseURL: BASE_URL,
})
// Attach JWT token to every private request using Axios interceptor
userRequest.interceptors.request.use((config) => {
  try {
    // Retrieve persisted Redux state from localStorage
    const rootState = JSON.parse(localStorage.getItem("persist:root"))
    // Extract the 'user' slice from the persisted state
    const userState = rootState ? JSON.parse(rootState.user) : null

    // Get the JWT token from user state
    const token = userState?.token

    // If token exists, attach it to the Authorization header
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch (err) {
    // Log any errors during token extraction or header setup
    console.error("Error setting auth header:", err)
  }

  // Return the modified config to proceed with the request
  return config
})

```
### 🧠 Features Overview
## 👤 User
- Register / Login via JWT
- Browse, search & filter products
- Add to Cart, Checkout, and View Orders
- Download Order Receipt (PDF)
- Fully Responsive Animated UI
- Simple Chatbot for Help

## 🛠️ Admin
- Secure Login (Protected Routes)
- Add / Edit / Delete Products (Multer Image Upload)
- Manage Orders & Users
- Sales Analytics (Recharts)
- Export Orders as PDF

### 🧾 Key Highlights
- Built complete MERN stack app from scratch (frontend + backend)
- Implemented JWT auth & protected routes
- Used Multer for image upload and management
- Added PDF export using jsPDF for order receipts
- Animated UI with Framer Motion and GSAP
- Created interactive analytics using Recharts
- Designed modular, scalable backend architecture

### 🧠 Learning Outcomes
- Mastered secure auth flows (JWT + middleware).
- Integrated frontend Redux with backend APIs.
- Learned production-style folder structuring.
- Enhanced UX using motion libraries.
- Practiced CRUD + data visualization for admin control.

# .env (inside /server)
- PORT=4000
- MONGO_URI=your_mongo_uri
- JWT_SECRET=your_jwt_secret

### 🚧 Future Enhancements
- 💳 Stripe / PayPal Integration
- ❤️ Wishlist & Reviews
- 📬 Email Notifications for Orders
- ☁️ Cloud Image Storage (Cloudinary)
- 🤖 AI Product Recommendation Bot
- 📱 React Native Mobile Version
