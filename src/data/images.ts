import type { ImageSlot } from "./types";

/**
 * Daftar semua slot foto di website. Saat ini terisi foto berlisensi terbuka
 * (Wikimedia Commons dan Openverse/Flickr) untuk keperluan demo. Ganti file di
 * `public/` dengan foto milik hotel memakai nama yang sama, lalu perbarui
 * alt, keterangan, dan kredit di sini. Daftar lengkapnya ada di GAMBAR.md.
 */
function slot(
  src: string,
  alt: string,
  caption: string,
  spec: string,
  credit?: ImageSlot["credit"],
  illustrative = false,
): ImageSlot {
  const source = credit ? `${credit.author}, ${credit.license}` : undefined;
  return { src, alt, caption, spec, source, credit, illustrative };
}

export const images = {
  beranda: {
    jelajahi: slot(
      "/images/beranda/jelajahi.jpg",
      "Foto arsip tamu Eropa duduk di veranda Bali Hotel, Denpasar",
      "Tamu di veranda Bali Hotel, foto arsip",
      "4:3, min. 1600 x 1200 px",
      {
        title: "KITLV A1032 - Europeanen zittend op de veranda van het Bali Hotel te Denpasar, KITLV 116297.tiff",
        author: "Tidak diketahui (koleksi KITLV, Leiden)",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:KITLV_A1032_-_Europeanen_zittend_op_de_veranda_van_het_Bali_Hotel_te_Denpasar,_KITLV_116297.tiff",
      },
    ),
    menginap: slot(
      "/images/beranda/menginap.jpg",
      "Ruang duduk kamar suite hotel dengan sofa dan meja",
      "Foto ilustrasi ruang suite",
      "4:3, min. 1600 x 1200 px",
      {
        title: "Hotel Suite - Living Room 1",
        author: "Quant",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/w/index.php?curid=19592443",
      },
      true,
    ),
    belanja: slot(
      "/images/beranda/belanja.jpg",
      "Secangkir kopi Bali disajikan di atas meja",
      "Foto ilustrasi kopi Bali",
      "4:3, min. 1600 x 1200 px",
      {
        title: "Penyajian kopi di Bali.jpg",
        author: "David Bacon",
        license: "CC BY 2.0",
        url: "https://commons.wikimedia.org/wiki/File:Penyajian_kopi_di_Bali.jpg",
      },
      true,
    ),
    suite77: slot(
      "/images/beranda/suite-77.jpg",
      "Potret resmi Presiden Soekarno",
      "Presiden Soekarno, potret resmi",
      "3:4 (potret), min. 1200 x 1600 px",
      {
        title: "Presiden Sukarno.jpg",
        author: "Tidak diketahui",
        license: "Public domain",
        url: "https://commons.wikimedia.org/wiki/File:Presiden_Sukarno.jpg",
      },
    ),
  },
  paket: {
    jejakCover: slot(
      "/images/paket/jejak-bung-karno-1.jpg",
      "Meja kayu dengan mesin ketik dan kamera antik",
      "Foto ilustrasi meja kerja bergaya lawas",
      "3:2, min. 1800 x 1200 px",
      {
        title:
          "A classic camera rests on a polished wooden table, surrounded by an antique typewriter and a vintage rotary phone.jpg",
        author: "Shixart1985",
        license: "CC BY 2.0",
        url: "https://commons.wikimedia.org/wiki/File:A_classic_camera_rests_on_a_polished_wooden_table,_surrounded_by_an_antique_typewriter_and_a_vintage_rotary_phone.jpg",
      },
      true,
    ),
    jejak2: slot(
      "/images/paket/jejak-bung-karno-2.jpg",
      "Secangkir kopi Bali di atas meja",
      "Foto ilustrasi kopi di teras",
      "3:2, min. 1800 x 1200 px",
      {
        title: "kopi bali",
        author: "skinnydiver",
        license: "CC BY-SA 2.0",
        url: "https://www.flickr.com/photos/53197929@N00/4682729390",
      },
      true,
    ),
    jejak3: slot(
      "/images/paket/jejak-bung-karno-3.jpg",
      "Mesin ketik antik di rak kayu",
      "Foto ilustrasi koleksi mesin ketik",
      "3:2, min. 1800 x 1200 px",
      {
        title: "Antique typewriter on shelf.jpg",
        author: "Kjoonlee",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Antique_typewriter_on_shelf.jpg",
      },
      true,
    ),
    walkCover: slot(
      "/images/paket/denpasar-heritage-walk-1.jpg",
      "Monumen Puputan di Lapangan Puputan Badung, Denpasar",
      "Lapangan Puputan Badung",
      "3:2, min. 1800 x 1200 px",
      {
        title: "Taman Puputan 1906-Denpasar Bali.JPG",
        author: "Eric Bajart",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:Taman_Puputan_1906-Denpasar_Bali.JPG",
      },
    ),
    walk2: slot(
      "/images/paket/denpasar-heritage-walk-2.jpg",
      "Bangunan dan halaman Museum Bali di Denpasar",
      "Museum Bali",
      "3:2, min. 1800 x 1200 px",
      {
        title: "Bali Museum 03.jpg",
        author: "Christophe95",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Bali_Museum_03.jpg",
      },
    ),
    walk3: slot(
      "/images/paket/denpasar-heritage-walk-3.jpg",
      "Kue bikang tradisional di atas piring",
      "Foto ilustrasi jajan tradisional",
      "3:2, min. 1800 x 1200 px",
      {
        title: "Bikang Side View.jpg",
        author: "Joseagush",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Bikang_Side_View.jpg",
      },
      true,
    ),
    weekendCover: slot(
      "/images/paket/weekend-passage-1928-1.jpg",
      "Penari legong Bali dengan kostum emas",
      "Foto ilustrasi tari legong",
      "3:2, min. 1800 x 1200 px",
      {
        title: "Legong Dance Bali Indonesia.jpg",
        author: "Philip Nalangan",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Legong_Dance_Bali_Indonesia.jpg",
      },
      true,
    ),
    weekend2: slot(
      "/images/paket/weekend-passage-1928-2.jpg",
      "Hidangan rijsttafel dalam banyak mangkuk kecil",
      "Foto ilustrasi rijsttafel",
      "3:2, min. 1800 x 1200 px",
      {
        title: "Rijsttafel-OKT2020-1.jpg",
        author: "Milliped",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Rijsttafel-OKT2020-1.jpg",
      },
      true,
    ),
    weekend3: slot(
      "/images/paket/weekend-passage-1928-3.jpg",
      "Foto arsip kapal Koninklijke Paketvaart Maatschappij (KPM)",
      "Kapal KPM, foto arsip",
      "3:2, min. 1800 x 1200 px",
      {
        title:
          "KITLV A1407 - Schip, vermoedelijk de Van Neck van de Koninklijke Paketvaart Maatschappij, in een haven in Nederlands-Indië, KITLV 78561.tiff",
        author: "Tidak diketahui (koleksi KITLV, Leiden)",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:KITLV_A1407_-_Schip,_vermoedelijk_de_Van_Neck_van_de_Koninklijke_Paketvaart_Maatschappij,_in_een_haven_in_Nederlands-Indi%C3%AB,_KITLV_78561.tiff",
      },
    ),
    dayCover: slot(
      "/images/paket/heritage-day-pass-1.jpg",
      "Koleksi di dalam Museum Bali",
      "Foto ilustrasi kunjungan museum",
      "3:2, min. 1800 x 1200 px",
      {
        title: "Bali Museum 05.jpg",
        author: "Christophe95",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Bali_Museum_05.jpg",
      },
      true,
    ),
    day2: slot(
      "/images/paket/heritage-day-pass-2.jpg",
      "Halaman paspor penuh stempel perjalanan",
      "Foto ilustrasi stempel passport",
      "3:2, min. 1800 x 1200 px",
      {
        title: "My collection of passport stamps",
        author: "hjl",
        license: "CC BY 2.0",
        url: "https://www.flickr.com/photos/92605333@N00/101443399",
      },
      true,
    ),
    day3: slot(
      "/images/paket/heritage-day-pass-3.jpg",
      "Kue tradisional di atas piring",
      "Foto ilustrasi snack",
      "3:2, min. 1800 x 1200 px",
      {
        title: "Bugis Ketan Top View.jpg",
        author: "Joseagush",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Bugis_Ketan_Top_View.jpg",
      },
      true,
    ),
  },
  kamar: {
    standard: slot(
      "/images/kamar/standard-garden-view.jpg",
      "Kamar tidur bernuansa Bali dengan tempat tidur besar",
      "Foto ilustrasi kamar",
      "3:2, min. 1600 x 1067 px",
      {
        title: "JedaVillaBedroom",
        author: "Jeda Villa Bali",
        license: "CC BY 2.0",
        url: "https://www.flickr.com/photos/53779476@N08/4976760814",
      },
      true,
    ),
    deluxeGarden: slot(
      "/images/kamar/deluxe-garden-view.jpg",
      "Kamar deluxe dengan tempat tidur ganda",
      "Foto ilustrasi kamar deluxe",
      "3:2, min. 1600 x 1067 px",
      {
        title: "Deluxe Double",
        author: "Tara Angkor Hotel",
        license: "CC BY 2.0",
        url: "https://www.flickr.com/photos/47808661@N07/5917802337",
      },
      true,
    ),
    deluxePool: slot(
      "/images/kamar/deluxe-pool-view.jpg",
      "Kolam renang hotel",
      "Foto ilustrasi kolam renang",
      "3:2, min. 1600 x 1067 px",
      {
        title: "Main swimming pool at Paradisus by Meliá Bali.jpg",
        author: "Paradisus Bali",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Main_swimming_pool_at_Paradisus_by_Meli%C3%A1_Bali.jpg",
      },
      true,
    ),
    suite: slot(
      "/images/kamar/suite.jpg",
      "Kamar suite dengan ruang duduk",
      "Foto ilustrasi suite",
      "3:2, min. 1600 x 1067 px",
      {
        title: "Premium Suite.jpg",
        author: "Cedar Inn",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Premium_Suite.jpg",
      },
      true,
    ),
  },
  box: {
    cover: slot(
      "/images/heritage-box/heritage-box.jpg",
      "Besek, kotak anyaman bambu",
      "Foto ilustrasi kemasan anyaman",
      "1:1, min. 1600 x 1600 px",
      {
        title: "Besek Atau Tumbu Dari Bahan Bambu Di Kebumen Jateng NKRI.jpg",
        author: "SATELIT BM",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Besek_Atau_Tumbu_Dari_Bahan_Bambu_Di_Kebumen_Jateng_NKRI.jpg",
      },
      true,
    ),
    kopi: slot(
      "/images/heritage-box/kopi-kintamani.jpg",
      "Biji kopi disangrai secara tradisional di kebun kopi Bali",
      "Foto ilustrasi kopi Bali",
      "1:1, min. 800 x 800 px",
      {
        title: "Sangrai Biji Kopi secara traditional di Coffee Plantation Bali.jpg",
        author: "Rennytan",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Sangrai_Biji_Kopi_secara_traditional_di_Coffee_Plantation_Bali.jpg",
      },
      true,
    ),
    jajan: slot(
      "/images/heritage-box/jajan-bali.jpg",
      "Kue tradisional bendu di atas piring",
      "Foto ilustrasi jajan",
      "1:1, min. 800 x 800 px",
      {
        title: "Bendu Top View.jpg",
        author: "Joseagush",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Bendu_Top_View.jpg",
      },
      true,
    ),
    kartupos: slot(
      "/images/heritage-box/kartu-pos.jpg",
      "Foto arsip bangunan Bali-Hotel di Denpasar",
      "Foto arsip untuk kartu pos",
      "1:1, min. 800 x 800 px",
      {
        title: "Bali-Hotel te Denpasar, KITLV 180845.tiff",
        author: "Tidak diketahui (koleksi KITLV, Leiden)",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Bali-Hotel_te_Denpasar,_KITLV_180845.tiff",
      },
    ),
    pouch: slot(
      "/images/heritage-box/pouch-endek.jpg",
      "Kain endek bermotif wajik",
      "Foto ilustrasi kain endek",
      "1:1, min. 800 x 800 px",
      {
        title: "Kain endek motif Wajik.jpg",
        author: "EvaKhorniawati2025",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Kain_endek_motif_Wajik.jpg",
      },
      true,
    ),
    kemasan: slot(
      "/images/heritage-box/kemasan.jpg",
      "Kain endek tua bermotif dari Buleleng",
      "Foto ilustrasi motif endek",
      "1:1, min. 800 x 800 px",
      {
        title: "'Kain endek' (ceremonial ikat hanging) from Buleleng, Bali, Indonesia.jpg",
        author: "Tidak diketahui",
        license: "Public domain",
        url: "https://commons.wikimedia.org/wiki/File:%27Kain_endek%27_(ceremonial_ikat_hanging)_from_Buleleng,_Bali,_Indonesia.jpg",
      },
      true,
    ),
  },
  arsip: {
    suiteBungKarno: slot(
      "/archive/suite-77-foto-bung-karno.jpg",
      "Foto arsip Soekarno berpidato di Yogyakarta, 1949",
      "Soekarno berpidato di Yogyakarta, 1949. Foto Bung Karno di Bali Hotel menyusul dari arsip hotel",
      "4:3 atau sesuai arsip, min. 1200 px sisi panjang",
      {
        title: "Sukarno delivering speech in Yogyakarta, 1949, Daerah Istimewa Jogjakarta (1953), p103.jpg",
        author: "Tidak diketahui",
        license: "Public domain",
        url: "https://commons.wikimedia.org/wiki/File:Sukarno_delivering_speech_in_Yogyakarta,_1949,_Daerah_Istimewa_Jogjakarta_(1953),_p103.jpg",
      },
    ),
    nehru: slot(
      "/archive/suite-nehru-kunjungan.jpg",
      "Foto arsip kunjungan Jawaharlal Nehru ke Indonesia, 1950",
      "Kunjungan Jawaharlal Nehru ke Indonesia, 1950",
      "4:3 atau sesuai arsip, min. 1200 px sisi panjang",
      {
        title: "Indonesia visit of Jawaharlal Nehru,1950 (01).jpg",
        author: "Tidak diketahui",
        license: "Public domain",
        url: "https://commons.wikimedia.org/wiki/File:Indonesia_visit_of_Jawaharlal_Nehru,1950_(01).jpg",
      },
    ),
    album: slot(
      "/archive/mini-museum-album.jpg",
      "Foto arsip Bali Hotel, penginapan peserta Konferensi Denpasar",
      "Bali Hotel, penginapan peserta Konferensi Denpasar",
      "4:3 atau sesuai arsip, min. 1200 px sisi panjang",
      {
        title: "Bali Hotel te Denpasar waar de deelnemers van de Conferentie logeren, KITLV 157665.tiff",
        author: "Netherlands Indies Government Information Service (koleksi KITLV, Leiden)",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Bali_Hotel_te_Denpasar_waar_de_deelnemers_van_de_Conferentie_logeren,_KITLV_157665.tiff",
      },
    ),
    tariJumat: slot(
      "/archive/pendopo-tari-jumat.jpg",
      "Foto arsip penari legong dengan gamelan di Bali Hotel",
      "Penari legong dan gamelan di Bali Hotel, foto arsip",
      "4:3 atau sesuai arsip, min. 1200 px sisi panjang",
      {
        title:
          "COLLECTIE TROPENMUSEUM Legong danseres met op de achtergrond een gamelanorkest in het Bali Hotel TMnr 20000316.jpg",
        author: "Boy Lawson (koleksi Tropenmuseum)",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:COLLECTIE_TROPENMUSEUM_Legong_danseres_met_op_de_achtergrond_een_gamelanorkest_in_het_Bali_Hotel_TMnr_20000316.jpg",
      },
    ),
    puputan: slot(
      "/archive/puputan-badung-monumen.jpg",
      "Monumen Puputan Badung 1906 di Denpasar",
      "Monumen Puputan Badung",
      "4:3, min. 1200 px sisi panjang",
      {
        title: "1906 Monument to Puputan Bali.JPG",
        author: "GregRustFan",
        license: "Public domain",
        url: "https://commons.wikimedia.org/wiki/File:1906_Monument_to_Puputan_Bali.JPG",
      },
    ),
  },
  compare: {
    suiteDulu: slot(
      "/archive/compare/suite-77-dulu.jpg",
      "Foto arsip bangunan Bali Hotel di Denpasar",
      "Bali Hotel, foto arsip",
      "16:9, min. 1600 x 900 px, sudut sama dengan foto sekarang",
      {
        title: "Bali Hotel te Denpasar, KITLV 180798.tiff",
        author: "Sagami (koleksi KITLV, Leiden)",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Bali_Hotel_te_Denpasar,_KITLV_180798.tiff",
      },
    ),
    suiteKini: slot(
      "/archive/compare/suite-77-sekarang.jpg",
      "Bagian depan hotel dengan logo Bali Hotel, 2023",
      "Bagian depan hotel, 2023",
      "16:9, min. 1600 x 900 px, sudut sama dengan foto arsip",
      {
        title: "Bali Hotel voorkant met logo.jpg",
        author: "Hanno Lans",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Bali_Hotel_voorkant_met_logo.jpg",
      },
    ),
    pendopoDulu: slot(
      "/archive/compare/pendopo-dulu.jpg",
      "Foto arsip pertunjukan gamelan gong gede di Bali Hotel",
      "Gamelan gong gede di Bali Hotel, foto arsip",
      "16:9, min. 1600 x 900 px",
      {
        title:
          "COLLECTIE TROPENMUSEUM Gamelanorkest geeft een Gamelan Gong Gede voorstelling voor het Bali Hotel in Denpasar TMnr 60030927.jpg",
        author: "Tidak diketahui (koleksi Tropenmuseum)",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:COLLECTIE_TROPENMUSEUM_Gamelanorkest_geeft_een_Gamelan_Gong_Gede_voorstelling_voor_het_Bali_Hotel_in_Denpasar_TMnr_60030927.jpg",
      },
    ),
    pendopoKini: slot(
      "/archive/compare/pendopo-sekarang.jpg",
      "Balai beratap genteng merah di halaman hotel saat ini",
      "Balai pertemuan hotel, sekarang",
      "16:9, min. 1600 x 900 px",
      {
        title: "BaliHotelMeetingHall.jpg",
        author: "Davidelit",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:BaliHotelMeetingHall.jpg",
      },
    ),
  },
  gallery: {
    g1: slot(
      "/images/gallery/1928-fasad.jpg",
      "Foto arsip Bali-Hotel di Denpasar",
      "Bali-Hotel di Denpasar",
      "4:3 atau sesuai arsip",
      {
        title: "Bali-Hotel te Denpasar, KITLV 180861.tiff",
        author: "Tidak diketahui (koleksi KITLV, Leiden)",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Bali-Hotel_te_Denpasar,_KITLV_180861.tiff",
      },
    ),
    g2: slot(
      "/images/gallery/1930-tari-jumat.jpg",
      "Foto arsip tamu Eropa dan mobil di samping Bali Hotel",
      "Tamu dan mobil di samping Bali Hotel",
      "4:3 atau sesuai arsip",
      {
        title: "KITLV A1032 - Europeanen en een auto naast het Bali Hotel te Denpasar, KITLV 116298.tiff",
        author: "Tidak diketahui (koleksi KITLV, Leiden)",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:KITLV_A1032_-_Europeanen_en_een_auto_naast_het_Bali_Hotel_te_Denpasar,_KITLV_116298.tiff",
      },
    ),
    g3: slot(
      "/images/gallery/1930-tamu-kpm.jpg",
      "Label bagasi lama Bali Hotel Den Pasar bertuliskan The Leading House in Bali",
      "Label bagasi Bali Hotel: The Leading House in Bali",
      "4:3 atau sesuai arsip",
      {
        title: "The Leading House in Bali, Bali Hotel-Denpasar",
        author: "Thomas Fisher Rare Book Library, UofT",
        license: "CC BY 2.0",
        url: "https://www.flickr.com/photos/34861056@N05/48522899791",
      },
    ),
    g4: slot(
      "/images/gallery/1930-iklan-kpm.jpg",
      "Foto arsip Bali Hotel sekitar tahun 1940",
      "Bali Hotel, sekitar 1940",
      "3:4 atau sesuai arsip",
      {
        title: "Balihotel, Bali, KITLV 26025.tiff",
        author: "Tidak diketahui (koleksi KITLV, Leiden)",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Balihotel,_Bali,_KITLV_26025.tiff",
      },
    ),
    g5: slot(
      "/images/gallery/1950-natour.jpg",
      "Foto Bali Hotel dari buku panduan wisata sekitar 1957",
      "Bali Hotel dalam buku panduan wisata, sekitar 1957",
      "4:3 atau sesuai arsip",
      {
        title: "Bali Hotel, Denpasar, Bali The Isle of the Gods, pp12-13.jpg",
        author: "Tidak diketahui",
        license: "Public domain",
        url: "https://commons.wikimedia.org/wiki/File:Bali_Hotel,_Denpasar,_Bali_The_Isle_of_the_Gods,_pp12-13.jpg",
      },
    ),
    g6: slot(
      "/images/gallery/1960-tamu-negara.jpg",
      "Paviliun di Bali Hotel sekitar 1958",
      "Paviliun Bali Hotel, sekitar 1958",
      "4:3 atau sesuai arsip",
      {
        title: "Pavilion at Bali Hotel, Bali Where, What, When, How, p16.jpg",
        author: "Tidak diketahui",
        license: "Public domain",
        url: "https://commons.wikimedia.org/wiki/File:Pavilion_at_Bali_Hotel,_Bali_Where,_What,_When,_How,_p16.jpg",
      },
    ),
    g7: slot(
      "/images/gallery/1980-kolam.jpg",
      "Foto arsip penari baris dengan gamelan di Bali Hotel",
      "Penari baris dan gamelan di Bali Hotel",
      "4:3 atau sesuai arsip",
      {
        title:
          "COLLECTIE TROPENMUSEUM Baris danser met op de achtergrond een gamelanorkest in het Bali Hotel TMnr 20000313.jpg",
        author: "Boy Lawson (koleksi Tropenmuseum)",
        license: "CC BY-SA 3.0",
        url: "https://commons.wikimedia.org/wiki/File:COLLECTIE_TROPENMUSEUM_Baris_danser_met_op_de_achtergrond_een_gamelanorkest_in_het_Bali_Hotel_TMnr_20000313.jpg",
      },
    ),
    g8: slot(
      "/images/gallery/2014-renovasi.jpg",
      "Bagian depan hotel dengan logo Bali Hotel, 2023",
      "Bagian depan hotel, 2023",
      "4:3",
      {
        title: "Bali Hotel voorkant met logo.jpg",
        author: "Hanno Lans",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Bali_Hotel_voorkant_met_logo.jpg",
      },
    ),
    g9: slot(
      "/images/gallery/2017-inna.jpg",
      "Balai beratap genteng merah di halaman hotel",
      "Balai pertemuan hotel",
      "4:3",
      {
        title: "BaliHotelMeetingHall.jpg",
        author: "Davidelit",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:BaliHotelMeetingHall.jpg",
      },
    ),
    g10: slot(
      "/images/gallery/2019-cagar-budaya.jpg",
      "Monumen Puputan Badung di lapangan dekat hotel",
      "Monumen Puputan Badung, tetangga hotel",
      "4:3",
      {
        title: "Monumen Puputan Badung 1.jpg",
        author: "Fitri Penyalai",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Monumen_Puputan_Badung_1.jpg",
      },
    ),
    g11: slot(
      "/images/gallery/sekarang-fasad.jpg",
      "Pura Jagatnatha di Denpasar",
      "Pura Jagatnatha, rute heritage walk",
      "4:3",
      {
        title: "Pura Jagatnatha in Denpasar 1.jpg",
        author: "Christophe95",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Pura_Jagatnatha_in_Denpasar_1.jpg",
      },
    ),
    g12: slot(
      "/images/gallery/sekarang-pendopo.jpg",
      "Gerbang Museum Bali di Denpasar",
      "Museum Bali, rute heritage walk",
      "4:3",
      {
        title: "Bali Museum 01.jpg",
        author: "Christophe95",
        license: "CC BY-SA 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Bali_Museum_01.jpg",
      },
    ),
    c1: slot(
      "/images/gallery/cerita-bulan-madu.jpg",
      "Foto arsip peserta Konferensi Denpasar berfoto di depan Bali Hotel",
      "Peserta Konferensi Denpasar di depan Bali Hotel",
      "4:3",
      {
        title: "Deelnemers van de Conferentie te Denpasar voor het Bali Hotel, KITLV 157670.tiff",
        author: "Netherlands Indies Government Information Service (koleksi KITLV, Leiden)",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:Deelnemers_van_de_Conferentie_te_Denpasar_voor_het_Bali_Hotel,_KITLV_157670.tiff",
      },
    ),
    c2: slot(
      "/images/gallery/cerita-karyawan.jpg",
      "Foto arsip pengibaran bendera Belanda dan Inggris di Bali Hotel",
      "Pengibaran bendera di Bali Hotel, foto arsip",
      "4:3",
      {
        title:
          "De Nederlandse en de Engelse vlag worden gehesen op het Balihotel te Denpasar tijdens een ceremonie na de herbezetting van Bali door de geallieerde strijdkrachten, KITLV 25393.tiff",
        author: "Netherlands Indies Government Information Service (Melbourne) (koleksi KITLV, Leiden)",
        license: "CC BY 4.0",
        url: "https://commons.wikimedia.org/wiki/File:De_Nederlandse_en_de_Engelse_vlag_worden_gehesen_op_het_Balihotel_te_Denpasar_tijdens_een_ceremonie_na_de_herbezetting_van_Bali_door_de_geallieerde_strijdkrachten,_KITLV_25393.tiff",
      },
    ),
    c3: slot("/images/gallery/cerita-sekolah.jpg", "Logo lama Bali Hotel", "Logo Bali Hotel, sebelum 1931", "4:3", {
      title: "Logo Bali Hotel.jpg",
      author: "Tidak diketahui",
      license: "Public domain",
      url: "https://commons.wikimedia.org/wiki/File:Logo_Bali_Hotel.jpg",
    }),
  },
} as const;

/** Semua slot foto dalam satu daftar (untuk halaman kredit). */
export const allImages: ImageSlot[] = Object.values(images).flatMap((group) => Object.values(group));
