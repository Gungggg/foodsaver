# 🌿 FoodSaver

**Selamatkan Makanan, Hemat Uang, Jaga Bumi.**

FoodSaver adalah platform marketplace B2C yang menghubungkan restoran, bakery, cafe, dan hotel yang memiliki surplus makanan dengan pelanggan yang mencari makanan berkualitas dengan harga terjangkau. Merchant menjual paket makanan surplus dalam bentuk **Surprise Bag** dengan diskon hingga **60%** sebelum makanan tersebut terbuang sia-sia.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Raw_Query-4479A1?logo=mysql&logoColor=white)
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

### Backend (`foodsaver-backend`)
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Node.js + Express** | 5.2 | REST API server |
| **MySQL2** | 3.22 | Raw SQL queries (tanpa ORM) |
| **JWT (jsonwebtoken)** | 9.0 | Autentikasi token-based |
| **bcryptjs** | 3.0 | Password hashing |
| **Multer** | 2.1 | File upload handling |
| **Helmet** | 8.1 | HTTP security headers |
| **Morgan** | 1.10 | HTTP request logger |
| **QRCode** | 1.5 | QR code generator untuk receipt |
| **UUID** | 14.0 | Unique ID generator |

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
│              BACKEND (foodsaver-backend)              │
│              Node.js + Express 5 (Port 5000)         │
│                                                      │
│   7 Modules  ·  Modular Architecture                 │
│   Auth Middleware  ·  RBAC  ·  Multer Upload         │
└──────────────────────┬───────────────────────────────┘
                       │  Raw MySQL Queries
                       ▼
┌─────────────────────────────────────────────────────┐
│                    DATABASE                          │
│                  MySQL (foodsaver)                    │
│                                                      │
│   Tables: users, merchant_profiles, surprise_bags,   │
│   orders, invoices, payments, impact_logs             │
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
foodsaver-backend/               # Express REST API (separate repo)
├── src/
│   ├── server.js                # Entry point (port 5000)
│   ├── app.js                   # Express app + route registration
│   ├── config/
│   │   └── db.js                # MySQL connection (raw mysql2)
│   ├── modules/                 # Modular architecture
│   │   ├── auth/                # Login, register, profile
│   │   ├── products/            # CRUD surprise_bags
│   │   ├── orders/              # Create, list, redeem orders
│   │   ├── payments/            # Create, callback, get payment
│   │   ├── merchant/            # Create & get merchant profile
│   │   ├── admin/               # Merchants list, verify, dashboard
│   │   └── impact/              # User impact stats
│   ├── middleware/
│   │   ├── authenticate.js      # JWT verification
│   │   └── authorizeRole.js     # Role-based access control
│   └── utils/
│       └── upload.js            # Multer file upload config
├── uploads/                     # Uploaded files
├── .env                         # Environment variables
└── package.json

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

### 3. Setup Backend

Backend terletak di repository/folder terpisah: `foodsaver-backend`

```bash
# Masuk ke direktori backend
cd foodsaver-backend

# Install dependencies
npm install

# Pastikan file .env sudah ada dengan konfigurasi:
# PORT=5000
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=
# DB_NAME=foodsaver
# JWT_SECRET=foodsaversecret

# Buat database MySQL
mysql -u root -e "CREATE DATABASE foodsaver;"

# Jalankan server
npm run dev
```

Backend berjalan di **http://localhost:5000**

### 4. Hubungkan Frontend ke Backend

Edit file `frontend/src/services/authService.js` dan service lainnya:

```js
// Ubah dari:
const USE_MOCK = true;

// Menjadi:
const USE_MOCK = false;
```

> **📌 Catatan:** `api.js` sudah dikonfigurasi ke `http://localhost:5000/api`

---

## ⚙️ Konfigurasi Environment

File `foodsaver-backend/.env`:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=foodsaver

JWT_SECRET=foodsaversecret
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

Base URL: `http://localhost:5000/api`

### Authentication
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `POST` | `/api/auth/register` | Register user baru | ❌ |
| `POST` | `/api/auth/login` | Login → return `{ token }` | ❌ |
| `GET` | `/api/auth/profile` | Get current user (dari JWT) | ✅ |

### Products (Surprise Bags)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/products` | List produk (search, filter, pagination) | ❌ |
| `GET` | `/api/products/:id` | Detail produk + merchant info | ❌ |
| `POST` | `/api/products` | Buat produk baru (multipart) | ✅ Merchant |
| `PATCH` | `/api/products/:id/stock` | Update stok produk | ✅ Merchant |
| `DELETE` | `/api/products/:id` | Hapus produk | ✅ Merchant |

### Orders
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `POST` | `/api/orders` | Buat pesanan (bag_id, quantity) | ✅ Customer |
| `GET` | `/api/orders/my-orders` | List pesanan customer | ✅ Customer |
| `GET` | `/api/orders/:id` | Detail pesanan | ✅ Customer |
| `POST` | `/api/orders/:id/redeem` | Verifikasi pickup (pickup_code) | ✅ Merchant |

### Payments
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `POST` | `/api/payments` | Buat payment (invoice_id, method) | ✅ Customer |
| `POST` | `/api/payments/callback` | Payment callback webhook | ❌ |
| `GET` | `/api/payments/:id` | Detail payment | ✅ Customer |

### Merchant
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/merchant/profile` | Get profil merchant | ✅ Merchant |
| `POST` | `/api/merchant/profile` | Buat profil merchant baru | ✅ Merchant |

### Admin
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/admin/dashboard` | Dashboard analytics (users, orders, revenue, CO₂) | ✅ Admin |
| `GET` | `/api/admin/merchants` | List semua merchant + email | ✅ Admin |
| `PATCH` | `/api/admin/merchants/:id/verify` | Verifikasi merchant | ✅ Admin |

### Impact
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| `GET` | `/api/impact/stats` | Impact stats user (orders, CO₂, money saved) | ✅ Customer |

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
| SQL Injection | Parameterized queries (mysql2 placeholders) |
| XSS | React auto-escaping |
| HTTP Headers | Helmet.js security headers |
| CORS | Whitelist origin configuration |
| Request Logging | Morgan HTTP logger |

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
