# Panduan Kebugaran Lengkap

Aplikasi kebugaran komprehensif yang mencakup latihan, program, pola gerakan, dan prinsip latihan untuk CrossFit, Hyrox, pelatihan militer, dan lainnya.

## **Fitur Utama**

### **Perpustakaan Latihan**
- **25+ Latihan Komprehensif** - Instruksi detail, tips, dan variasi
- **Berbagai Kategori** - CrossFit, Hyrox, Militer, Olympic lifting, Gymnastics
- **Sistem Progres Bertingkat** - Progres bertahap dari pemula hingga mahir
- **Target Kelompok Otot** - Filter berdasarkan otot primer dan sekunder
- **Filter Berdasarkan Peralatan** - Temukan latihan sesuai peralatan yang tersedia

### **Program Latihan**
- **Program Siap Pakai** - CrossFit WODs (Murph, Fran, Cindy), latihan Hyrox, persiapan Navy SEAL PST
- **Pembuat Latihan Kustom** - Buat latihan personal dengan pemilihan gerakan
- **Timer Latihan & Pelacakan Progres** - Timer terintegrasi dengan fungsi mulai/jeda/reset
- **Pencatatan Progres** - Lacak repetisi, beban, dan status penyelesaian

### **Analisis & Riwayat**
- **Riwayat Latihan** - Pelacakan lengkap latihan masa lalu dengan statistik detail
- **Analisis Performa** - Tingkat penyelesaian, total jam latihan, jumlah workout
- **Visualisasi Progres** - Lacak peningkatan dari waktu ke waktu
- **Kemampuan Ekspor** - Cetak kartu latihan untuk penggunaan offline

### **Ilmu Latihan**
- **Pola Gerakan** - Enam pola fundamental (Squat, Hinge, Push, Pull, Carry, Rotation)
- **Prinsip Latihan** - Progressive overload, periodisasi, pemulihan, spesifisitas
- **Petunjuk Teknik & Kesalahan Umum** - Konten edukatif untuk teknik yang benar

### **Pengalaman Pengguna**
- **Pencarian Lanjutan** - Shortcut keyboard (⌘K, ⌘/, ESC, 1-4) untuk navigasi cepat
- **Sistem Favorit** - Simpan latihan dan program yang disukai
- **Mode Gelap** - Beralih antara tema terang dan gelap
- **Responsif Mobile** - Dioptimalkan untuk semua ukuran perangkat dengan target sentuh yang tepat
- **Dukungan PWA** - Install sebagai aplikasi mandiri dengan kemampuan offline
- **Ikon Profesional** - Pustaka ikon Lucide React untuk UI yang bersih dan konsisten

## **Memulai**

### Persyaratan
- Node.js 18+ 
- npm atau yarn

### Instalasi

1. **Clone repository**
```bash
git clone https://github.com/farkhanmaul/fitness.git
cd fitness
```

2. **Install dependensi**
```bash
npm install
```

3. **Jalankan server development**
```bash
npm run dev
```

4. **Buka browser**
Navigasi ke [http://localhost:3000](http://localhost:3000)

### Build Produksi
```bash
npm run build
npm run start
```

## **Arsitektur**

### Prinsip Clean Code
- **DRY** (Don't Repeat Yourself) - Komponen dan utilitas yang dapat digunakan kembali
- **KISS** (Keep It Simple, Stupid) - Komponen sederhana dan fokus
- **SOLID** - Arsitektur kode yang terstruktur dan mudah dipelihara

### Struktur Proyek
```
src/
├── components/          # Komponen UI yang dapat digunakan kembali
│   ├── icons/          # Sistem ikon dengan Lucide React
│   └── ui/             # Komponen UI dasar
├── data/               # Data latihan, program, dan pelatihan
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useTimer.ts
│   └── useKeyboardShortcuts.ts
├── types/              # Definisi tipe TypeScript
├── utils/              # Fungsi helper dan utilitas
└── app/                # Halaman Next.js app router
```

## **Stack Teknologi**

- **Framework**: Next.js 15 dengan TypeScript
- **Styling**: Tailwind CSS v3
- **Ikon**: Lucide React
- **Manajemen State**: React hooks + localStorage
- **Build**: Next.js static export untuk GitHub Pages
- **PWA**: Service worker dengan caching offline
- **Deployment**: GitHub Actions → GitHub Pages

## **Detail Fitur**

### Shortcut Keyboard
- `⌘K` atau `Ctrl+K` - Fokus pencarian
- `⌘/` atau `Ctrl+/` - Tampilkan bantuan shortcut
- `ESC` - Hapus pencarian / kembali
- `1-4` - Beralih antar tab

### Optimasi Mobile
- Target sentuh minimum 44px
- Skala tipografi responsif
- Elemen antarmuka yang ramah sentuh
- Pendekatan CSS mobile-first

### Aksesibilitas
- Dukungan navigasi keyboard
- Label dan deskripsi ARIA
- Kepatuhan kontras warna
- Kompatibilitas screen reader

## **Deployment**

Aplikasi secara otomatis dideploy ke GitHub Pages melalui GitHub Actions:

**Demo Live**: [https://farkhanmaul.github.io/fitness/](https://farkhanmaul.github.io/fitness/)

### Deployment Manual
```bash
npm run build
npm run export
```

## **Kontribusi**

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/FiturBaru`)
3. Commit perubahan (`git commit -m 'Tambah fitur baru'`)
4. Push ke branch (`git push origin feature/FiturBaru`)
5. Buka Pull Request

## **Lisensi**

Proyek ini dilisensikan di bawah MIT License - lihat file LICENSE untuk detailnya.

## **Penghargaan**

- **CrossFit** - Untuk metodologi latihan dan variasi gerakan
- **Hyrox** - Untuk prinsip latihan functional fitness  
- **Pelatihan Militer** - Untuk disiplin dan pendekatan terstruktur
- **Lucide** - Untuk ikon yang indah dan konsisten
- **Tailwind CSS** - Untuk pengembangan UI yang cepat
- **Next.js** - Untuk kemampuan framework React yang powerful

---

**Dibuat dengan cinta untuk komunitas fitness**

*Enhanced with Claude Code - asisten pengembangan bertenaga AI*
<!-- Updated: 2025-05-03 -->

<!-- Updated: 2025-05-05 -->



<!-- Updated: 2025-05-14 -->



<!-- Updated: 2025-05-19 -->


<!-- Updated: 2025-05-25 -->
<!-- Updated: 2025-05-27 -->
<!-- Updated: 2025-05-29 -->

<!-- Updated: 2025-05-31 -->
<!-- Updated: 2025-06-02 -->

<!-- Updated: 2025-06-04 -->

<!-- Updated: 2025-06-07 -->
<!-- Updated: 2025-06-09 -->

<!-- Updated: 2025-06-11 -->
<!-- Updated: 2025-06-13 -->

<!-- Updated: 2025-06-15 -->
<!-- Updated: 2025-06-16 -->

<!-- Updated: 2025-06-21 -->

<!-- Updated: 2025-06-26 -->
<!-- Updated: 2025-06-27 -->
<!-- Updated: 2025-06-28 -->
<!-- Updated: 2025-06-30 -->




<!-- Updated: 2025-07-09 -->
<!-- Updated: 2025-07-10 -->
<!-- Updated: 2025-07-12 -->


<!-- Updated: 2025-07-17 -->


<!-- Updated: 2025-07-21 -->
<!-- Updated: 2025-07-22 -->


<!-- Updated: 2025-07-29 -->
<!-- Updated: 2025-07-31 -->
<!-- Updated: 2025-08-02 -->
<!-- Updated: 2025-08-04 -->






<!-- Updated: 2025-08-15 -->

<!-- Updated: 2025-08-18 -->
<!-- Updated: 2025-08-20 -->

<!-- Updated: 2025-08-23 -->

<!-- Updated: 2025-08-27 -->
<!-- Updated: 2025-08-28 -->



<!-- Updated: 2025-09-04 -->
<!-- Updated: 2025-09-04 -->

<!-- Updated: 2025-09-06 -->



<!-- Updated: 2025-09-12 -->

<!-- Updated: 2025-09-17 -->
<!-- Updated: 2025-09-18 -->
<!-- Updated: 2025-05-02 -->

<!-- Updated: 2025-05-04 -->
<!-- Updated: 2025-05-10 -->

<!-- Updated: 2025-05-13 -->

<!-- Updated: 2025-05-19 -->

<!-- Updated: 2025-05-22 -->
<!-- Updated: 2025-05-24 -->

<!-- Updated: 2025-05-29 -->




<!-- Updated: 2025-06-16 -->


<!-- Updated: 2025-07-01 -->


<!-- Updated: 2025-07-21 -->

<!-- Updated: 2025-07-27 -->

<!-- Updated: 2025-07-29 -->
<!-- Updated: 2025-07-30 -->

<!-- Updated: 2025-08-06 -->



<!-- Updated: 2025-08-15 -->

<!-- Updated: 2025-08-18 -->
<!-- Updated: 2025-08-24 -->



<!-- Updated: 2025-09-03 -->

