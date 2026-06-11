# 🌿 FoodSaver

**Selamatkan Makanan, Hemat Uang, Jaga Bumi.**

FoodSaver adalah platform marketplace B2C yang menghubungkan restoran, bakery, cafe, dan hotel yang memiliki surplus makanan dengan pelanggan yang mencari makanan berkualitas dengan harga terjangkau. Merchant menjual paket makanan surplus dalam bentuk **Surprise Bag** dengan diskon hingga **60%** sebelum makanan tersebut terbuang sia-sia.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Sequelize-4479A1?logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Struktur Proyek](#-struktur-proyek)
- [Prasyarat](#-prasyarat)
- [Instalasi & Menjalankan](#-instalasi--menjalankan)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Demo Account](#-demo-account)
- [API Endpoints](#-api-endpoints)
- [Halaman Aplikasi](#-halaman-aplikasi)
- [Design System](#-design-system)
- [Screenshot](#-screenshot)
- [Kontributor](#-kontributor)
- [Lisensi](#-lisensi)

---

## ✨ Fitur Utama

### 👤 Customer
- Menjelajahi dan mencari Surprise Bag di marketplace
- Filter berdasarkan kategori, harga, dan merchant
- Reservasi dan checkout dengan berbagai metode pembayaran
- Melihat riwayat pesanan dan status real-time
- **Impact Dashboard** — tracking kontribusi lingkungan (CO₂ saved, food rescued)
- Manajemen profil

### 🏪 Merchant
- Dashboard analytics penjualan
- CRUD manajemen produk Surprise Bag (nama, harga, stok, jam pickup)
- Manajemen pesanan masuk (konfirmasi, siapkan, selesaikan)
- **Pickup Verification** — verifikasi pengambilan via kode/QR scan
- Manajemen profil bisnis

### ⚙️ Admin
- Dashboard overview seluruh platform
- Verifikasi merchant baru (approve/reject)
- Manajemen merchant (aktifkan/suspend/hapus)
- Penanganan keluhan (complaint management)
- **Analytics Dashboard** — grafik revenue, pesanan, dan pertumbuhan user

### 🔐 Sistem
- Autentikasi JWT (login, register, session management)
- Role-Based Access Control (RBAC)
- Protected routes per role
- Responsive design (mobile-first)
- Mock data mode untuk development tanpa backend

---

## 🛠 Tech Stack

### Frontend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **React** | 18.3 | UI component library |
| **Vite** | 5.3 | Build tool & dev server |
| **Tailwind CSS** | 3.4 | Utility-first CSS framework |
| **React Router DOM** | 6.25 | Client-side routing |
| **Axios** | 1.7 | HTTP client untuk API calls |
| **Chart.js + react-chartjs-2** | 4.4 | Grafik dan visualisasi data |
| **React Icons** | 5.2 | Icon library |
| **html5-qrcode** | 2.3 | QR code scanner untuk pickup verification |

### Backend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Node.js + Express** | 4.21 | REST API server |
| **Sequelize** | 6.37 | ORM (Object-Relational Mapping) |
| **MySQL2** | 3.11 | Database driver |
| **JWT (jsonwebtoken)** | 9.0 | Autentikasi token-based |
| **bcryptjs** | 2.4 | Password hashing |
| **Multer** | 1.4 | File upload handling |
| **Helmet** | 7.1 | HTTP security headers |
| **QRCode** | 1.5 | QR code generator untuk receipt |
| **express-rate-limit** | 7.4 | Rate limiting API |

---

## 🏗 Arsitektur Sistem

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│              React 18 + Vite + Tailwind              │
│                                                      │
│   20 Pages  ·  9 Components  ·  8 Services           │
│   Auth Context  ·  Role-Based Routing                │
└──────────────────────┬───────────────────────────────┘
                       │  REST API (JSON)
                       │  JWT Bearer Token
                       ▼
┌─────────────────────────────────────────────────────┐
│                    BACKEND                           │
│              Node.js + Express.js                    │
│                                                      │
│   7 Controllers  ·  7 Services  ·  7 Route Modules   │
│   Auth Middleware  ·  RBAC  ·  Validation            │
└──────────────────────┬───────────────────────────────┘
                       │  Sequelize ORM
                       ▼
┌─────────────────────────────────────────────────────┐
│                    DATABASE                          │
│                     MySQL                            │
│                                                      │
│   9 Tables: Users, Merchants, Products, Orders,      │
│   Payments, Receipts, Documents, Complaints,         │
│   ImpactLogs                                         │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Struktur Proyek

```
foodsaver-api/
├── frontend/                    # React SPA
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # 9 komponen reusable
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── StatCard.jsx
│   │   │   │   ├── Skeleton.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   └── EmptyState.jsx
│   │   │   └── layout/          # Layout components
│   │   │       ├── Navbar.jsx
│   │   │       ├── Sidebar.jsx
│   │   │       ├── Footer.jsx
│   │   │       ├── DashboardLayout.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx  # Global auth state (Context API)
│   │   ├── pages/
│   │   │   ├── public/          # 6 halaman publik
│   │   │   ├── customer/        # 4 halaman customer
│   │   │   ├── merchant/        # 5 halaman merchant
│   │   │   └── admin/           # 5 halaman admin
│   │   ├── services/            # 8 API service modules
│   │   ├── utils/
│   │   │   └── mockData.js      # Mock data untuk development
│   │   ├── App.jsx              # Router & route definitions
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Tailwind + custom design system
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/                     # Express REST API
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js      # MySQL connection config
│   │   │   └── jwt.js           # JWT config
│   │   ├── models/              # 9 Sequelize models
│   │   │   ├── User.js
│   │   │   ├── Merchant.js
│   │   │   ├── Product.js
│   │   │   ├── Order.js
│   │   │   ├── Payment.js
│   │   │   ├── Receipt.js
│   │   │   ├── Document.js
│   │   │   ├── Complaint.js
│   │   │   ├── ImpactLog.js
│   │   │   └── index.js         # Model associations
│   │   ├── controllers/         # 7 request handlers
│   │   ├── services/            # 7 business logic modules
│   │   ├── routes/              # 7 route modules + index
│   │   ├── middleware/
│   │   │   ├── auth.js          # JWT verification
│   │   │   ├── rbac.js          # Role-based access control
│   │   │   ├── upload.js        # Multer file upload
│   │   │   └── validation.js    # Request validation
│   │   ├── utils/
│   │   │   ├── response.js      # Standardized API response
│   │   │   ├── qrcode.js        # QR code generator
│   │   │   └── impactCalc.js    # CO₂ impact calculator
│   │   └── app.js               # Express app setup
│   ├── migrations/              # Database migrations
│   ├── seeders/                 # Sample data seeders
│   ├── uploads/                 # Uploaded files directory
│   ├── server.js                # Server entry point
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 📦 Prasyarat

Pastikan sudah terinstall:

| Software | Versi Minimum | Cek Versi |
|----------|--------------|-----------|
| **Node.js** | v18+ | `node -v` |
| **npm** | v9+ | `npm -v` |
| **MySQL** | v8+ | `mysql --version` |
| **Git** | v2+ | `git --version` |

> **💡 Tip:** Gunakan [Laragon](https://laragon.org/) (Windows) atau [XAMPP](https://www.apachefriends.org/) untuk instalasi MySQL yang mudah.

---

## 🚀 Instalasi & Menjalankan

### 1. Clone Repository

```bash
git clone https://github.com/Gungggg/foodsaver.git
cd foodsaver-api
```

### 2. Setup Frontend

```bash
# Masuk ke direktori frontend
cd frontend

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Frontend berjalan di **http://localhost:5173**

> **📌 Mode Mock Data:** Frontend sudah bisa langsung digunakan tanpa backend karena menggunakan mock data. Semua fitur demo bisa diakses.

### 3. Setup Backend (Opsional)

Jika ingin menggunakan backend API yang sesungguhnya:

```bash
# Masuk ke direktori backend
cd backend

# Install dependencies
npm install

# Salin file environment
cp .env.example .env
# Edit .env sesuai konfigurasi database lokal Anda

# Buat database MySQL
mysql -u root -e "CREATE DATABASE foodsaver_db;"

# Jalankan migrasi database
npm run migrate

# Jalankan seeder (data contoh)
npm run seed

# Jalankan server
npm run dev
```

Backend berjalan di **http://localhost:3000**

### 4. Hubungkan Frontend ke Backend

Edit file `frontend/src/services/authService.js` dan service lainnya:

```js
// Ubah dari:
const USE_MOCK = true;

// Menjadi:
const USE_MOCK = false;
```

---

## ⚙️ Konfigurasi Environment

Buat file `backend/.env` berdasarkan `.env.example`:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=foodsaver_db
DB_USER=root
DB_PASS=

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d

# Midtrans (Payment Gateway)
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxx
MIDTRANS_IS_PRODUCTION=false

# File Uploads
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880

# App URLs
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

---

## 🔑 Demo Account

Gunakan **Quick Login** di halaman login untuk akses cepat:

| Role | Email | Redirect |
|------|-------|----------|
| 👤 **Customer** | `sarah@example.com` | `/customer/dashboard` |
| 🏪 **Merchant** | `budi@greenplate.id` | `/merchant/dashboard` |
| ⚙️ **Admin** | `admin@foodsaver.id` | `/admin/dashboard` |

> Password: **apapun** (mock mode menerima password apapun)

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `POST` | `/api/v1/auth/register` | Register user baru | ❌ |
| `POST` | `/api/v1/auth/login` | Login user | ❌ |
| `GET` | `/api/v1/auth/me` | Get current user | ✅ |
| `PUT` | `/api/v1/auth/profile` | Update profil | ✅ |
| `PUT` | `/api/v1/auth/password` | Ganti password | ✅ |

### Products
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/v1/products` | List semua produk (+ search, filter, pagination) | ❌ |
| `GET` | `/api/v1/products/:id` | Detail produk | ❌ |
| `POST` | `/api/v1/products` | Buat produk baru | ✅ Merchant |
| `PUT` | `/api/v1/products/:id` | Update produk | ✅ Merchant |
| `DELETE` | `/api/v1/products/:id` | Hapus produk | ✅ Merchant |

### Orders
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `POST` | `/api/v1/orders` | Buat pesanan (reserve) | ✅ Customer |
| `GET` | `/api/v1/orders` | List pesanan user | ✅ |
| `GET` | `/api/v1/orders/:id` | Detail pesanan | ✅ |
| `PUT` | `/api/v1/orders/:id/status` | Update status pesanan | ✅ Merchant |
| `POST` | `/api/v1/orders/:id/cancel` | Batalkan pesanan | ✅ |
| `POST` | `/api/v1/orders/verify-pickup` | Verifikasi pickup | ✅ Merchant |

### Payments
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `POST` | `/api/v1/payments/create` | Buat transaksi Midtrans | ✅ Customer |
| `POST` | `/api/v1/payments/callback` | Webhook callback Midtrans | ❌ |

### Merchant
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/v1/merchant/profile` | Get profil merchant | ✅ Merchant |
| `PUT` | `/api/v1/merchant/profile` | Update profil merchant | ✅ Merchant |
| `GET` | `/api/v1/merchant/analytics` | Analytics penjualan | ✅ Merchant |

### Admin
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/v1/admin/dashboard` | Dashboard stats | ✅ Admin |
| `GET` | `/api/v1/admin/merchants` | List semua merchant | ✅ Admin |
| `PUT` | `/api/v1/admin/merchants/:id/verify` | Verifikasi merchant | ✅ Admin |
| `PUT` | `/api/v1/admin/merchants/:id/status` | Update status merchant | ✅ Admin |
| `GET` | `/api/v1/admin/complaints` | List keluhan | ✅ Admin |
| `PUT` | `/api/v1/admin/complaints/:id` | Update keluhan | ✅ Admin |
| `GET` | `/api/v1/admin/analytics` | Platform analytics | ✅ Admin |

### Impact
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/v1/impact/me` | Impact user sendiri | ✅ |
| `GET` | `/api/v1/impact/platform` | Impact keseluruhan platform | ❌ |

---

## 📄 Halaman Aplikasi

### Publik (6 halaman)
| Halaman | Path | Deskripsi |
|---------|------|-----------|
| Landing Page | `/` | Hero section, how it works, impact counter, featured bags, testimonials |
| Login | `/login` | Form login + quick demo login buttons |
| Register | `/register` | Form registrasi (customer / merchant) |
| Marketplace | `/marketplace` | Browse semua produk + search & filter |
| Product Detail | `/marketplace/:id` | Detail produk, harga, pickup info, reserve |
| Checkout | `/checkout/:orderId` | Payment summary, pilih metode bayar |

### Customer (4 halaman)
| Halaman | Path | Deskripsi |
|---------|------|-----------|
| Dashboard | `/customer/dashboard` | Overview pesanan & quick actions |
| Order History | `/customer/orders` | Riwayat pesanan dengan status badge |
| Impact Dashboard | `/customer/impact` | Tracking dampak lingkungan personal |
| Profile | `/customer/profile` | Edit profil & ganti password |

### Merchant (5 halaman)
| Halaman | Path | Deskripsi |
|---------|------|-----------|
| Dashboard | `/merchant/dashboard` | Analytics penjualan & overview |
| Product Management | `/merchant/products` | CRUD Surprise Bag |
| Order Management | `/merchant/orders` | Kelola pesanan masuk |
| Pickup Verification | `/merchant/pickup` | Verifikasi pengambilan (kode/QR) |
| Merchant Profile | `/merchant/profile` | Edit profil bisnis |

### Admin (5 halaman)
| Halaman | Path | Deskripsi |
|---------|------|-----------|
| Dashboard | `/admin/dashboard` | Overview platform & statistik |
| Merchant Verification | `/admin/verification` | Approve/reject merchant baru |
| Merchant Management | `/admin/merchants` | Kelola semua merchant |
| Complaint Management | `/admin/complaints` | Tangani keluhan customer |
| Analytics Dashboard | `/admin/analytics` | Grafik & data analytics platform |

---

## 🎨 Design System

### Color Palette

| Warna | Hex | Penggunaan |
|-------|-----|------------|
| 🟢 Primary (Forest Green) | `#1B4332` | Brand, header, navigation |
| 🟢 Primary Light | `#2D6A4F` | Hover states, gradients |
| 🌿 Secondary (Fresh Green) | `#74C365` | Success states, badges, icons |
| 🟡 Accent (Amber) | `#F59E0B` | Harga diskon, CTA, highlights |
| ⚪ Neutral 50 | `#F8FAFC` | Background utama |
| ⚫ Neutral 900 | `#0F172A` | Teks heading |

### Typography
- **Heading:** [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) — Modern, clean
- **Body:** [Inter](https://fonts.google.com/specimen/Inter) — Readable, professional

### UI Components
- **Glassmorphism** — Login/register cards
- **Micro-animations** — Hover effects, floating shapes, animated counters
- **Skeleton loading** — Placeholder saat data loading
- **Toast notifications** — Feedback untuk aksi user
- **Status badges** — Warna berbeda per status pesanan

---

## 🔒 Keamanan

| Aspek | Implementasi |
|-------|-------------|
| Authentication | JWT Token dengan expiry time |
| Authorization | RBAC Middleware per endpoint |
| Password | bcrypt hashing (one-way) |
| SQL Injection | Sequelize ORM (parameterized queries) |
| XSS | React auto-escaping |
| HTTP Headers | Helmet.js security headers |
| CORS | Whitelist origin configuration |
| Rate Limiting | express-rate-limit |
| Input Validation | Middleware validation layer |

---

## 📸 Screenshot

### Landing Page
> Hero section dengan gradient hijau, animated counter, dan featured products.

### Marketplace
> Browse produk dengan search, filter kategori, dan range slider harga.

### Customer Dashboard
> Overview pesanan, impact tracking, dan navigasi sidebar.

### Merchant Dashboard
> Analytics penjualan, product management, dan pickup verification.

### Admin Dashboard
> Platform overview, merchant verification, dan analytics grafik.

---

## 👥 Kontributor

| Nama | Role |
|------|------|
| FoodSaver Team | Full Stack Development |

---

## 📝 Lisensi

Project ini dilisensikan di bawah [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [React](https://react.dev/) — UI Library
- [Vite](https://vitejs.dev/) — Build Tool
- [Tailwind CSS](https://tailwindcss.com/) — CSS Framework
- [Express.js](https://expressjs.com/) — Backend Framework
- [Sequelize](https://sequelize.org/) — ORM
- [Chart.js](https://www.chartjs.org/) — Charts & Graphs
- [React Icons](https://react-icons.github.io/react-icons/) — Icon Library
- [Midtrans](https://midtrans.com/) — Payment Gateway

---

<p align="center">
  Made with 💚 for the planet · FoodSaver © 2024
</p>
