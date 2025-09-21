# Finance Dashboard - Aplikasi Manajemen Finansial Pribadi

## Ringkasan Alur Aplikasi

Aplikasi ini membantu Anda mengelola keuangan pribadi dengan fitur lengkap untuk mencatat pengeluaran, pemasukan, aset, dan investasi. Alur aplikasi terdiri dari:

1. **Autentikasi Pengguna** - Login/register untuk mengamankan data finansial
2. **Dashboard Overview** - Tampilan ringkasan kondisi keuangan
3. **Pencatatan Transaksi** - Input pemasukan dan pengeluaran harian
4. **Manajemen Aset & Investasi** - Pelacakan nilai aset dan portofolio investasi
5. **Pelaporan & Analisis** - Analisis pola keuangan dan laporan periodik

## Fitur-Fitur Utama

### 1. Dashboard Utama
- Ringkasan saldo saat ini
- Grafik pemasukan vs pengeluaran bulanan
- Notifikasi pengeluaran yang tidak biasa
- Preview transaksi terakhir

### 2. Manajemen Transaksi
- Pencatatan pemasukan dan pengeluaran
- Kategorisasi transaksi (makanan, transport, utilitas, dll)
- Upload bukti transaksi (foto/gambar)
- Filter dan pencarian transaksi berdasarkan periode

### 3. Manajemen Aset
- Daftar aset pribadi (properti, kendaraan, dll)
- Pelacakan nilai aset over time
- Kategorisasi aset (likuid, tidak likuid)

### 4. Manajemen Investasi
- Portofolio investasi (saham, reksadana, crypto, dll)
- Pelacakan kinerja investasi
- Alert untuk target jual/beli

### 5. Pelaporan & Analitik
- Laporan keuangan bulanan/tahunan
- Analisis pengeluaran berdasarkan kategori
- Ekspor data ke format CSV/PDF
- Visualisasi pola keuangan dengan chart

### 6. Fitur Tambahan
- Budgeting dengan notifikasi saat mendekati limit
- Target tabungan dengan progress tracking
- Multi-currency support
- Scheduled transactions (pembayaran rutin)

## Struktur Teknis

```
/src
  /app              # Next.js app router pages
    /(auth)         # Authentication pages
    /(dashboard)    # Dashboard and financial pages
    /api            # API routes
  /components       # Reusable UI components
  /lib              # Utilities and configurations
  /server           # Server-side code
    /Actions        # Server actions
    /db             # Database schemas and connection
  /styles           # Global styles
```

## Schema Database (Drizzle)

```ts
// Tabel Users (dari auth schema)
users (id, email, name, emailVerified, image, createdAt, updatedAt, role, banned, banReason, banExpires)

// Tabel Sessions (dari auth schema)
sessions (id, expiresAt, token, createdAt, updatedAt, ipAddress, userAgent, userId, impersonatedBy)

// Tabel Transactions (dari finance schema)
transactions (id, user_id, amount, type, category, date, description, created_at)

// Tabel Assets (dari finance schema)
assets (id, user_id, name, type, current_value, acquisition_date, description, created_at)

// Tabel Investments (dari finance schema)
investments (id, user_id, name, type, amount, purchase_date, current_value, created_at)

// Tabel Budgets (dari finance schema)
budgets (id, user_id, category, limit_amount, period, created_at)
```

## API Endpoints

- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions` - Retrieve user transactions
- `PUT /api/transactions?id={id}` - Update a transaction
- `DELETE /api/transactions?id={id}` - Delete a transaction

Similar endpoints exist for assets, investments, and budgets.

## Docker Setup

Aplikasi menggunakan container Docker yang terdiri dari:
1. Next.js application container
2. PostgreSQL database container
3. (Opsional) pgAdmin container untuk management database
