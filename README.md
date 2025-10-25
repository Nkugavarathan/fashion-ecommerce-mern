# 👗 Vara Fashion — Full Stack E-Commerce Website (MERN)

**Your Fashion, Your Style — Anytime, Anywhere.**

Vara Fashion is a fully functional **MERN Stack** e-commerce platform built in **20 days** featuring secure authentication, admin management, animated UI, order receipts (PDF), and analytics dashboard.  
It demonstrates strong **end-to-end full-stack skills** — from backend architecture and JWT auth to frontend animations with Tailwind, GSAP, and Framer Motion.

---

## 🚀 Live Demo & Media

- 🌐 **Live Demo:** [Add deployed link here]  
- 🎥 **Demo Video:** [Add demo video link here]  
- 🖼️ **Screenshots:**
  ![Home Page](./screenshots/home.png)
  ![Dashboard](./screenshots/dashboard.png)

---

## 🧩 Tech Stack

### Frontend (Client)
- ⚛️ React.js (Functional Components + Hooks)
- 🧠 Redux Toolkit (State Management)
- 💨 Tailwind CSS + 💅 Styled Components
- 🎞️ Framer Motion & GSAP (Animations)
- 📄 jsPDF (Downloadable PDF Receipts)
- 🌐 Axios (API Integration with `publicRequest` & `userRequest` Interceptors)
- 📊 Recharts (Admin Analytics)

### Backend (Server)
- 🌐 Node.js + Express.js
- 🗄️ MongoDB + Mongoose ODM
- 🔒 JWT Authentication & Role-based Authorization
- 🖼️ Multer (Product Image Uploads)
- 🧰 Bcrypt, Path, and Morgan (Security + Logging)
- 📁 Express Static for `/uploads`

### Admin Dashboard
- 🔧 Protected Admin Panel
- 📦 CRUD for Products, Users & Orders
- 📈 Analytics via Recharts
- 🧾 PDF Export with jsPDF

---

## ⚙️ Project Structure

vara-fashion/
│
├── client/ # React Frontend (User UI)
├── admin/ # Admin Dashboard (Protected)
├── server/ # Express Backend (API & DB)


---

## 🔐 Authentication Flow

- **JWT Authentication** for both users and admin.  
- Tokens are stored securely and auto-attached to protected requests via Axios interceptors.  
- Role-based middleware ensures admin-only access for sensitive routes.

---

## 🧭 API Endpoints

### 🔸 Auth Routes — `/api/auth`
```js
POST /register    → registerUser
POST /login       → loginUser


🔸 User Routes — /api/users
GET /             → getAllUser
GET /find/:id     → getUserById
GET /stats        → getUserStats
PUT /:id          → updateUser (with profile image)
DELETE /:id       → deleteUser (admin only)

🔸 Product Routes — /api/products
POST /            → createProduct (upload.single("image"))
PUT /:id          → updateProduct (upload.single("image"))
GET /find/:id     → getProductById
GET /             → getAllProducts
DELETE /:id       → deleteProduct (admin)
GET /search       → searchProducts

🔸 Cart Routes — /api/carts
POST /            → createCart (protected)
PUT /:id          → updateCart (protected)
GET /find/:userId → getCartById (protected)
DELETE /:id       → deleteCart (protected)

🔸 Order Routes — /api/orders
POST /            → createOrder (user)
GET /find/:userId → getUserOrders (user)
GET /             → getAllOrders (admin)
GET /:id          → getOrderById (admin)
PUT /:id          → updateOrder (admin)
DELETE /:id       → deleteOrder (admin)


🧱 Backend Setup

server/server.js

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

// ✅ API Routes
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)
app.use("/api/orders", orderRoutes)

// ✅ Fallback route
app.get("/", (req, res) => {
  res.send("🚀 E-commerce API is running successfully!")
})

🔌 Axios Setup (Client Side)

client/src/requestMethod.js

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

userRequest.interceptors.request.use((config) => {
  try {
    const rootState = JSON.parse(localStorage.getItem("persist:root"))
    const userState = rootState ? JSON.parse(rootState.user) : null
    const token = userState?.token
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch (err) {
    console.error("Error setting auth header:", err)
  }
  return config
})

🧠 Features Overview
👤 User

Register / Login via JWT

Browse, search & filter products

Add to Cart, Checkout, and View Orders

Download Order Receipt (PDF)

Fully Responsive Animated UI

Simple Chatbot for Help

🛠️ Admin

Secure Login (Protected Routes)

Add / Edit / Delete Products (Multer Image Upload)

Manage Orders & Users

Sales Analytics (Recharts)

Export Orders as PDF

🧾 Key Highlights

Built complete MERN stack app from scratch (frontend + backend)

Implemented JWT auth & protected routes

Used Multer for image upload and management

Added PDF export using jsPDF for order receipts

Animated UI with Framer Motion and GSAP

Created interactive analytics using Recharts

Designed modular, scalable backend architecture

🧠 Learning Outcomes

Mastered secure auth flows (JWT + middleware).

Integrated frontend Redux with backend APIs.

Learned production-style folder structuring.

Enhanced UX using motion libraries.

Practiced CRUD + data visualization for admin control.

💻 Run Locally
1️⃣ Clone & Install
git clone <your-repo-url>
cd vara-fashion
cd server && npm install
cd ../client && npm install
cd ../admin && npm install

2️⃣ Environment Variables

Create .env in /server:

PORT=4000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

3️⃣ Run in Development
# Run backend
cd server && npm run dev

# Run client
cd ../client && npm start

# Run admin panel
cd ../admin && npm start

☁️ Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway

Database: MongoDB Atlas

🚧 Future Enhancements

💳 Stripe / PayPal Integration

❤️ Wishlist & Reviews

📬 Email Notifications for Orders

☁️ Cloud Image Storage (Cloudinary)

🤖 AI Product Recommendation Bot

📱 React Native Mobile Version