# 🧾 Nutech REST API Challenge - THT Project

Project ini merupakan implementasi REST API untuk sistem layanan digital seperti **Pulsa**, **Voucher Game**, dan lainnya. Dibuat menggunakan **Node.js + Express** berdasarkan **kontrak API dari Swagger**.

> ⏳ **Deadline:** 3 hari sejak diterimanya dokumen | 🔗 [Swagger Docs](https://api-doc-tht.nutech-integrasi.com)

---

## 📦 Fitur Utama

- 🔐 **User Registration & Login** (JWT Authentication)
- 💰 **Cek Saldo**
- ⬆️ **Top Up Saldo**
- 💳 **Transaksi Layanan** (Pulsa, Voucher Game, dll)
- 🛠️ **Error Handling** & Validasi Input
- ✅ Raw SQL dengan **Prepared Statement**

---

## 🛠️ Teknologi & Tools

- **Node.js** + **Express.js**
- **PostgreSQL**
- **JWT** untuk Autentikasi
- **multer** (untuk upload profile picture)
- **dotenv** (konfigurasi environment)
- **Railway.app** (deploy gratis)
- **Postman** untuk melakukan Test API

## ✅ Validasi & Keamanan

- Semua input **divalidasi secara manual** (tanpa menggunakan `joi`, `express-validator`, atau library eksternal lainnya)
- Validasi dilakukan di dalam controller/service sebelum query dijalankan
- Setiap endpoint memeriksa:
  - Format dan tipe data (misalnya `email`, `number`, `string`, dll)
  - Field wajib (`required`)
  - Panjang minimal/maksimal jika diperlukan
- Semua API (kecuali `register` dan `login`) dilindungi dengan **JWT**
- Upload file dibatasi hanya untuk `.jpeg` & `.png` dengan maksimal ukuran **2MB**
- Semua query menggunakan **Prepared Statement** untuk menghindari SQL Injection

> ⚠️ Validasi dilakukan **tanpa library eksternal** sesuai instruksi dan agar seluruh logika tetap transparan dan mudah ditelusuri.

📁 DDL (Database Design) dapat ditemukan pada folder `Database/` di dalam repository.



---

