# Inna Bali Heritage Lens

Prototipe antarmuka website imersif INNA Bali Heritage Hotel (dulu Bali Hotel, 1928) untuk INNA Heritage Business Idea Challenge 2026. Hanya frontend: semua data statis di `src/data/`, keranjang dan pesanan disimpan di React state + `localStorage`, tanpa pembayaran sungguhan.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # cek sebelum demo
npm run start    # server produksi
npm run lint
npm run format
```

## Alur demo

1. Beranda, geser lensa, Jelajahi 3D/360°, Suite 77, buka 3 titik cerita, teaser "Lihat paket", Jejak Bung Karno, pilih tanggal, tambah ke keranjang, checkout (QRIS), e-voucher, `/pesanan`.
2. `/kamar`, isi tanggal, Deluxe Garden View dengan sarapan, Lewati add-on, checkout.
3. `/heritage-box`, Kirim sebagai hadiah, isi penerima, keranjang.
4. `/heritage-gift`, Rp500.000, isi penerima, pratinjau, keranjang, checkout. Kode demo `LENS-7K2Q-1928` memotong Rp250.000.
5. Gek Inna (kanan bawah, semua halaman): "Sejarah Suite 77", lalu ketik "berapa harga kamar".
6. `/jelajahi/suite-77`: Mode VR (layar terbelah) dan "Lihat di ruanganmu (AR)".
7. `/passport`: tekan "Saya di lokasi ini" di 10 titik untuk sertifikat.

Untuk mengulang demo dari awal, hapus data situs (localStorage berawalan `ibhl:`) di browser.

## Gambar

Semua 50 slot foto terisi foto berlisensi terbuka (Wikimedia Commons dan Openverse/Flickr): 30 foto asli atau arsip Bali Hotel dan lokasi sekitarnya, serta 20 foto ilustrasi yang diberi label "Foto ilustrasi" dan perlu diganti dengan foto resmi hotel. Daftar, status, dan cara menggantinya ada di [GAMBAR.md](GAMBAR.md). Atribusi lengkap ada di halaman `/kredit`.

## Struktur

Lihat `CLAUDE.md` untuk spesifikasi lengkap, sistem desain, dan struktur folder.
