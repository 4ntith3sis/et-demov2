/**
 * Konten lengkap artikel untuk halaman /tulisan-pajak/[slug].
 *
 * Enam artikel pertama di-port dari `demoData` easytax-demo (v1) beserta
 * blok isinya; enam artikel berikutnya ditulis untuk melengkapi seluruh
 * slug di `artikelBeranda`. Ringkasan/meta tetap diambil dari
 * `artikelBeranda`, file ini hanya menambah penulis, tag, dan blok isi.
 */

import type { BlokIsi } from "@/lib/artikel/toc";

export interface ArtikelDetail {
  slug: string;
  penulis: string;
  tags: string[];
  blok: BlokIsi[];
}

export const artikelDetail: ArtikelDetail[] = [
  {
    slug: "rekonsiliasi-fiskal-positif-negatif",
    penulis: "Tim Konsultan EasyTax",
    tags: ["SPT Tahunan", "Laporan Keuangan", "Pajak Badan"],
    blok: [
    {
      "kind": "paragraph",
      "text": "Rekonsiliasi fiskal adalah penyesuaian antara laba komersial menurut akuntansi dengan penghasilan neto fiskal menurut ketentuan perpajakan. Hasilnya menentukan PPh terutang yang benar dan dapat dipertahankan saat pemeriksaan."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Koreksi Positif"
    },
    {
      "kind": "paragraph",
      "text": "Koreksi positif menambah penghasilan kena pajak karena terdapat beban komersial yang tidak diakui fiskal atau penghasilan yang belum diakui. Contohnya jamuan tanpa daftar nominatif, sumbangan yang tidak memenuhi syarat, dan denda administrasi pajak."
    },
    {
      "kind": "list",
      "ordered": false,
      "items": [
        "Beban entertainment tanpa bukti pendukung lengkap",
        "Sumbangan di luar kriteria peraturan",
        "Pajak penghasilan yang menjadi beban perusahaan",
        "Denda dan sanksi administrasi"
      ]
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Koreksi Negatif"
    },
    {
      "kind": "paragraph",
      "text": "Koreksi negatif mengurangi penghasilan kena pajak, misalnya penghasilan yang telah dikenakan PPh final, dividen dari penyertaan tertentu yang memenuhi syarat, dan selisih penilaian kembali yang bukan objek pajak."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Penghasilan Kena Pajak Final"
    },
    {
      "kind": "paragraph",
      "text": "Bunga deposito, sewa tanah dan bangunan, serta penghasilan usaha dengan omzet tertentu yang sudah final tidak digabungkan lagi ke penghasilan neto fiskal."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Penyusunan Kertas Kerja"
    },
    {
      "kind": "paragraph",
      "text": "Susun kertas kerja yang memetakan setiap akun laba rugi ke perlakuan fiskalnya, lengkap dengan referensi aturan dan dokumen pendukung. Kertas kerja yang rapi mempercepat penyusunan SPT sekaligus memperkuat posisi saat SP2DK atau pemeriksaan."
    },
    {
      "kind": "heading",
      "level": 4,
      "text": "Dokumentasi Pendukung"
    },
    {
      "kind": "paragraph",
      "text": "Lampirkan daftar nominatif entertainment, bukti potong, kontrak, dan rekonsiliasi bank yang relevan dengan pos-pos koreksi material."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Contoh Angka Sederhana"
    },
    {
      "kind": "paragraph",
      "text": "Sebuah perusahaan mencatat laba komersial Rp500 juta. Koreksi positif atas entertainment dan denda sebesar Rp60 juta, koreksi negatif atas penghasilan final Rp40 juta, menghasilkan penghasilan neto fiskal Rp520 juta. Selisih Rp20 juta inilah yang sering luput tanpa kertas kerja yang sistematis."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Kesalahan Umum Rekonsiliasi"
    },
    {
      "kind": "paragraph",
      "text": "Kesalahan klasik meliputi lupa mengoreksi denda pajak, menggabungkan penghasilan final ke penghasilan neto, serta tidak menyimpan daftar nominatif sehingga seluruh beban entertainment dikoreksi pemeriksa."
    },
    {
      "kind": "list",
      "ordered": false,
      "items": [
        "Denda dan sanksi tidak dikoreksi positif",
        "Penghasilan final ikut dihitung dalam penghasilan neto",
        "Entertainment tanpa daftar nominatif lengkap",
        "Kertas kerja tidak mencantumkan referensi aturan"
      ]
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Kesimpulan"
    },
    {
      "kind": "paragraph",
      "text": "Kuasai logika koreksi positif dan negatif, dokumentasikan setiap penyesuaian, dan SPT Tahunan Badan Anda akan berdiri di atas fondasi yang kokoh."
    }
  ],
  },
  {
    slug: "batas-omzet-umkm-pajak-final",
    penulis: "Tim Konsultan EasyTax",
    tags: ["UMKM", "Pajak Pribadi"],
    blok: [
    {
      "kind": "paragraph",
      "text": "Pelaku UMKM dengan peredaran bruto tertentu dapat memanfaatkan skema PPh final dengan tarif 0,5 persen dari omzet sesuai PP 55 Tahun 2022. Skema ini menyederhanakan kewajiban karena pajak dihitung langsung dari peredaran usaha tanpa pembukuan rumit."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Siapa yang Bisa Memanfaatkan?"
    },
    {
      "kind": "paragraph",
      "text": "Wajib Pajak orang pribadi dan badan tertentu dengan peredaran bruto tidak melebihi Rp500 juta dalam setahun untuk orang pribadi, serta batas waktu pemanfaatan tertentu bagi Wajib Pajak badan dan bentuk usaha tetap."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Batasan Omzet"
    },
    {
      "kind": "paragraph",
      "text": "Pantau akumulasi omzet setiap bulan. Begitu mendekati ambang batas, siapkan transisi ke skema pembukuan normal agar tidak kaget saat fasilitas berakhir."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Cara Menghitung dan Menyetor"
    },
    {
      "kind": "paragraph",
      "text": "Kalikan omzet sebulan dengan 0,5 persen, lalu setorkan menggunakan surat setoran elektronik sebelum batas waktu. Simpan seluruh bukti setoran sebagai arsip tahunan."
    },
    {
      "kind": "list",
      "ordered": false,
      "items": [
        "Jumlahkan seluruh penerimaan bruto bulan berjalan",
        "Kalikan dengan tarif 0,5 persen",
        "Buat kode billing dan lakukan penyetoran",
        "Arsipkan bukti bayar bersama rekap omzet"
      ]
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Contoh Perhitungan"
    },
    {
      "kind": "paragraph",
      "text": "Warung makan dengan omzet Rp60 juta sebulan terutang PPh final Rp300.000,00. Sederhana, tanpa perlu menghitung laba bersih terlebih dahulu."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Kapan Beralih ke Skema Normal?"
    },
    {
      "kind": "paragraph",
      "text": "Ketika omzet melewati ambang atau masa pemanfaatan berakhir, pelaku usaha wajib menyelenggarakan pembukuan dan menghitung PPh dengan tarif umum. Persiapkan pencatatan sejak dini agar transisi mulus."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Kewajiban Setelah Masa Fasilitas"
    },
    {
      "kind": "paragraph",
      "text": "Berakhirnya fasilitas bukan berarti bebas kewajiban. Pelaku usaha beralih ke pembukuan, menghitung penghasilan neto secara riil, dan melaporkan SPT Tahunan dengan tarif progresif. Arsip omzet masa fasilitas tetap wajib disimpan untuk keperluan pemeriksaan."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Tips Pencatatan Sejak Dini"
    },
    {
      "kind": "paragraph",
      "text": "Biasakan mencatat omzet harian walaupun masih memakai skema final. Kebiasaan ini membuat transisi ke pembukuan normal hampir tanpa gesekan."
    },
    {
      "kind": "list",
      "ordered": false,
      "items": [
        "Pisahkan rekening usaha dari rekening pribadi",
        "Simpan seluruh bukti setoran PPh final per bulan",
        "Rekap omzet bulanan dalam satu file sederhana",
        "Konsultasikan ambang batas setiap awal tahun"
      ]
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Kesimpulan"
    },
    {
      "kind": "paragraph",
      "text": "Skema 0,5 persen adalah jembatan kepatuhan bagi UMKM. Manfaatkan selama memenuhi syarat, catat omzet dengan tertib, dan siapkan diri naik kelas."
    }
  ],
  },
  {
    slug: "kredit-faktur-pajak-masukan",
    penulis: "Tim Konsultan EasyTax",
    tags: ["PKP", "Pajak Badan", "Pembukuan"],
    blok: [
    {
      "kind": "paragraph",
      "text": "Faktur pajak masukan adalah bukti pungutan PPN atas perolehan Barang Kena Pajak atau Jasa Kena Pajak yang dapat dikreditkan dengan pajak keluaran. Pengkreditan yang ceroboh berisiko menimbulkan kurang bayar beserta sanksi."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Syarat Faktur Dapat Dikreditkan"
    },
    {
      "kind": "paragraph",
      "text": "Faktur harus memenuhi syarat formal dan material: diterbitkan oleh PKP, memuat keterangan sesuai ketentuan, dilaporkan dalam masa yang benar, dan atas perolehan yang berkaitan langsung dengan kegiatan usaha."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Pemeriksaan Faktur"
    },
    {
      "kind": "paragraph",
      "text": "Sebelum dikreditkan, periksa keaslian nomor seri faktur, kesesuaian identitas lawan transaksi, kebenaran nilai, serta masa pajak penerbitannya."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Pemeriksaan Faktur"
    },
    {
      "kind": "paragraph",
      "text": "Pemeriksaan ulang sebaiknya juga mencakup pengecekan status PKP lawan transaksi dan konsistensi antara faktur dengan bukti penerimaan barang atau berita acara penyelesaian jasa."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Mekanisme Pengkreditan"
    },
    {
      "kind": "paragraph",
      "text": "Pajak masukan dikurangkan dari pajak keluaran dalam masa yang sama. Kelebihan pajak masukan dapat dikompensasikan ke masa berikutnya atau direstitusikan sesuai ketentuan."
    },
    {
      "kind": "list",
      "ordered": false,
      "items": [
        "Kumpulkan seluruh faktur masukan per masa pajak",
        "Verifikasi dan input ke aplikasi e-Faktur",
        "Hitung selisih dengan pajak keluaran",
        "Tentukan kompensasi atau restitusi atas lebih bayar"
      ]
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Risiko Kurang Bayar"
    },
    {
      "kind": "paragraph",
      "text": "Faktur fiktif, faktur kedaluwarsa, atau faktur dari pemasok bermasalah dapat dikoreksi pemeriksa sehingga menimbulkan kurang bayar plus sanksi bunga. Disiplin verifikasi adalah perlindungan termurah."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Faktur yang Tidak Dapat Dikreditkan"
    },
    {
      "kind": "paragraph",
      "text": "Tidak semua pajak masukan boleh dikreditkan. Pengeluaran untuk keperluan pribadi, kendaraan penumpang tertentu, serta perolehan sebelum dikukuhkan sebagai PKP termasuk yang dikecualikan ketentuan."
    },
    {
      "kind": "list",
      "ordered": false,
      "items": [
        "Pengeluaran untuk kepentingan pribadi pemilik atau karyawan",
        "Perolehan sebelum tanggal pengukuhan PKP",
        "Faktur yang cacat formal dan tidak diperbaiki tepat waktu"
      ]
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Studi Kasus"
    },
    {
      "kind": "paragraph",
      "text": "Sebuah perusahaan dagang menerima 40 faktur masukan senilai total PPN Rp120 juta dalam sebulan. Setelah verifikasi, 2 faktur senilai Rp8 juta ternyata kedaluwarsa masa pengkreditannya. Perusahaan mengkreditkan Rp112 juta dan mencatat sisanya sebagai beban, sehingga terhindar dari koreksi pemeriksaan."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Kesimpulan"
    },
    {
      "kind": "paragraph",
      "text": "Kreditkan hanya faktur yang valid, tercatat, dan berkaitan dengan usaha. Administrasi yang rapi membuat SPT Masa PPN Anda aman dari koreksi."
    }
  ],
  },
  {
    slug: "neraca-laba-rugi-spt-badan",
    penulis: "Tim Konsultan EasyTax",
    tags: ["SPT Tahunan", "Pajak Badan", "Laporan Keuangan"],
    blok: [
    {
      "kind": "paragraph",
      "text": "Setiap Wajib Pajak badan yang menyampaikan SPT Tahunan PPh wajib melampirkan laporan keuangan berupa neraca dan laporan laba rugi. Kedua laporan ini menjadi dasar Direktorat Jenderal Pajak menilai kewajaran penghasilan yang dilaporkan."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Fungsi Neraca dalam SPT Badan"
    },
    {
      "kind": "paragraph",
      "text": "Neraca menggambarkan posisi keuangan pada akhir tahun pajak: aset, liabilitas, dan ekuitas. Fiskus menggunakannya untuk menelusuri mutasi harta, utang pemegang saham, dan konsistensi modal disetor."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Pos-Pos yang Sering Disorot"
    },
    {
      "kind": "paragraph",
      "text": "Kas dan setara kas yang tidak wajar, piutang afiliasi yang menumpuk, serta utang tanpa bunga dari pemegang saham kerap memicu permintaan klarifikasi."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Fungsi Laporan Laba Rugi"
    },
    {
      "kind": "paragraph",
      "text": "Laporan laba rugi menunjukkan kinerja setahun: peredaran usaha, harga pokok, beban operasional, hingga laba bersih. Angka inilah titik awal rekonsiliasi fiskal menuju penghasilan neto fiskal."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Rekonsiliasi Elemen Laba Rugi"
    },
    {
      "kind": "paragraph",
      "text": "Tidak semua beban komersial diakui fiskal. Beban entertainment tanpa nominatif, sumbangan non-keagamaan tertentu, dan denda pajak harus dikoreksi positif."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "e-Filing SPT Badan"
    },
    {
      "kind": "paragraph",
      "text": "Pelaporan dilakukan melalui e-filing DJP Online dengan mengunggah formulir 1771 beserta lampiran laporan keuangan dalam format yang ditentukan. Pastikan file terbaca jelas dan angka antar-lampiran konsisten."
    },
    {
      "kind": "list",
      "ordered": false,
      "items": [
        "Laporan keuangan komersial lengkap dengan catatan atas laporan keuangan",
        "Rekonsiliasi fiskal dan perhitungan kompensasi kerugian bila ada",
        "Daftar penyusutan fiskal dan amortisasi",
        "Surat setoran pajak dan bukti potong sebagai kredit pajak"
      ]
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Studi Kasus Singkat"
    },
    {
      "kind": "paragraph",
      "text": "PT Maju Bersama mencatat laba komersial Rp800 juta. Setelah koreksi positif Rp120 juta atas entertainment dan denda, serta koreksi negatif Rp50 juta atas penghasilan final, penghasilan neto fiskalnya menjadi Rp870 juta. Dari angka inilah PPh terutang dihitung, bukan dari laba komersial."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Checklist Sebelum Melapor"
    },
    {
      "kind": "paragraph",
      "text": "Sebelum menekan tombol submit, pastikan seluruh item berikut sudah terpenuhi agar SPT tidak perlu dibetulkan kemudian hari."
    },
    {
      "kind": "list",
      "ordered": false,
      "items": [
        "Angka induk dan seluruh lampiran saling cocok",
        "Seluruh bukti potong sudah dikreditkan",
        "Status bayar sudah lunas atau sudah dibuatkan kode billing",
        "File lampiran terbaca dan tidak melebihi batas ukuran"
      ]
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Kesimpulan"
    },
    {
      "kind": "paragraph",
      "text": "Neraca dan laba rugi bukan sekadar lampiran formalitas, melainkan fondasi kepercayaan fiskus terhadap SPT Anda. Susun dengan teliti, rekonsiliasi dengan benar, dan laporkan tepat waktu."
    }
  ],
  },
  {
    slug: "penerapan-ter-pph-21",
    penulis: "Tim Konsultan EasyTax",
    tags: ["PPh 21", "Pajak Pribadi", "SPT Tahunan"],
    blok: [
    {
      "kind": "paragraph",
      "text": "Tarif Efektif Rata-rata (TER) adalah metode pemotongan PPh 21 masa selain masa pajak terakhir yang dihitung berdasarkan tarif efektif dikalikan penghasilan bruto. Kebijakan ini menyederhanakan perhitungan bulanan bagi pemberi kerja sejak masa pajak Januari 2024."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Apa Itu TER PPh 21?"
    },
    {
      "kind": "paragraph",
      "text": "TER menggantikan perhitungan progresif bulanan dengan tarif tunggal berdasarkan kategori dan status PTKP penerima penghasilan. Tujuannya adalah kemudahan administrasi tanpa mengubah total beban pajak setahun, karena penyesuaian dilakukan pada masa Desember."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Kategori Tarif Efektif"
    },
    {
      "kind": "paragraph",
      "text": "Terdapat tiga kategori tarif: kategori A untuk status PTKP TK/0, TK/1, dan K/0; kategori B untuk status menengah; dan kategori C untuk status dengan tanggungan lebih banyak. Setiap kategori memiliki tabel tarif berlapis sesuai rentang penghasilan bruto."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Siapa yang Dikenakan PPh 21?"
    },
    {
      "kind": "paragraph",
      "text": "PPh 21 dikenakan atas penghasilan sehubungan dengan pekerjaan, jasa, dan kegiatan yang diterima Wajib Pajak orang pribadi dalam negeri. Klasifikasi penerima menentukan perlakuan pemotongannya."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Karyawan Tetap"
    },
    {
      "kind": "paragraph",
      "text": "Karyawan tetap dipotong setiap masa penggajian menggunakan TER, kemudian pada masa Desember dilakukan perhitungan ulang dengan tarif progresif Pasal 17 untuk menentukan kurang atau lebih potong."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Karyawan Tidak Tetap"
    },
    {
      "kind": "paragraph",
      "text": "Pekerja harian, mingguan, atau kontrak jangka pendek dipotong berdasarkan ketentuan tersendiri, termasuk batas penghasilan harian yang tidak dipotong apabila di bawah ambang tertentu."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Penerima Penghasilan Lainnya"
    },
    {
      "kind": "paragraph",
      "text": "Tenaga ahli, anggota dewan komisaris, mantan pegawai yang menerima jasa produksi, serta peserta kegiatan dikenakan pemotongan dengan dasar dan tarif sesuai ketentuan masing-masing."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Komponen Penghasilan dalam Perhitungan"
    },
    {
      "kind": "paragraph",
      "text": "Dasar pemotongan adalah penghasilan bruto yang diterima, dikurangi unsur-unsur yang secara ketentuan bukan objek atau mendapat perlakuan khusus."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Penghasilan Bruto"
    },
    {
      "kind": "paragraph",
      "text": "Meliputi gaji pokok, tunjangan tetap dan tidak tetap, bonus, premi, serta imbalan dalam bentuk natura tertentu yang menjadi objek PPh 21."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Pengurang Penghasilan"
    },
    {
      "kind": "paragraph",
      "text": "Untuk perhitungan tahunan, penghasilan neto diperoleh setelah dikurangi biaya jabatan, iuran pensiun, dan Penghasilan Tidak Kena Pajak sesuai status kawin dan tanggungan."
    },
    {
      "kind": "heading",
      "level": 4,
      "text": "Biaya Jabatan"
    },
    {
      "kind": "paragraph",
      "text": "Biaya jabatan ditetapkan sebesar 5 persen dari penghasilan bruto setahun dengan batas maksimum Rp500.000,00 per bulan atau Rp6.000.000,00 per tahun."
    },
    {
      "kind": "heading",
      "level": 4,
      "text": "Iuran yang Diperbolehkan"
    },
    {
      "kind": "paragraph",
      "text": "Iuran terkait pensiun yang dibayar pegawai, termasuk iuran jaminan hari tua, dapat menjadi pengurang sepanjang memenuhi ketentuan yang berlaku."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Cara Menghitung PPh 21"
    },
    {
      "kind": "paragraph",
      "text": "Pada masa Januari hingga November, kalikan penghasilan bruto dengan tarif TER sesuai kategori. Pada masa Desember, hitung ulang setahun penuh dengan tarif progresif, lalu selisihkan dengan total yang sudah dipotong."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Contoh Perhitungan"
    },
    {
      "kind": "paragraph",
      "text": "Karyawan dengan gaji bruto Rp10 juta per bulan dan status TK/0 menggunakan tarif kategori A. Pemotongan bulanan bersifat final sementara hingga rekonsiliasi akhir tahun."
    },
    {
      "kind": "heading",
      "level": 4,
      "text": "Tahap Pertama"
    },
    {
      "kind": "paragraph",
      "text": "Hitung total penghasilan bruto setahun dan kurangkan dengan biaya jabatan, iuran, serta PTKP untuk memperoleh Penghasilan Kena Pajak."
    },
    {
      "kind": "heading",
      "level": 4,
      "text": "Tahap Kedua"
    },
    {
      "kind": "paragraph",
      "text": "Terapkan tarif progresif Pasal 17 atas Penghasilan Kena Pajak, lalu bandingkan dengan akumulasi potongan Januari–November untuk menentukan kurang atau lebih bayar."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Kesalahan yang Sering Terjadi"
    },
    {
      "kind": "paragraph",
      "text": "Kesalahan umum meliputi salah memilih kategori TER, tidak memperbarui status PTKP karyawan yang menikah atau memiliki anak, serta lupa melakukan perhitungan ulang pada masa Desember."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Perbedaan TER dan Tarif Progresif"
    },
    {
      "kind": "paragraph",
      "text": "TER hanya berlaku untuk masa Januari hingga November sebagai metode penyederhanaan. Perhitungan final setahun penuh selalu menggunakan tarif progresif Pasal 17, sehingga total pajak setahun tidak berubah akibat penerapan TER."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Kapan Tarif Progresif Langsung Dipakai?"
    },
    {
      "kind": "paragraph",
      "text": "Tarif progresif dipakai pada masa Desember untuk rekonsiliasi, serta untuk penghasilan yang bukan objek TER seperti pesangon, bonus yang dibayarkan terpisah dengan skema tertentu, dan imbalan yang ketentuannya mengatur tersendiri."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Administrasi Bukti Potong"
    },
    {
      "kind": "paragraph",
      "text": "Setiap pemotongan harus didokumentasikan dengan bukti potong yang diserahkan kepada penerima penghasilan dan dilaporkan dalam SPT Masa. Arsip digital bukti potong memudahkan rekonsiliasi akhir tahun dan pemeriksaan."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Cara Pelaporan"
    },
    {
      "kind": "paragraph",
      "text": "Bukti potong 1721-A1 diterbitkan untuk karyawan tetap dan dilaporkan melalui SPT Masa PPh 21 setiap bulan serta pembetulan bila diperlukan. Simpan seluruh bukti potong sebagai kredit pajak SPT Tahunan."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Kesimpulan"
    },
    {
      "kind": "paragraph",
      "text": "TER menyederhanakan pemotongan bulanan, tetapi ketepatan kategori, pembaruan data karyawan, dan rekonsiliasi Desember tetap menentukan kepatuhan PPh 21 perusahaan Anda."
    }
  ],
  },
  {
    slug: "syarat-pengukuhan-pkp-terbaru",
    penulis: "Tim Konsultan EasyTax",
    tags: ["PKP", "Pajak Badan"],
    blok: [
    {
      "kind": "paragraph",
      "text": "Pengukuhan Pengusaha Kena Pajak (PKP) adalah penetapan status oleh Direktur Jenderal Pajak bagi pengusaha yang melakukan penyerahan Barang Kena Pajak atau Jasa Kena Pajak di atas batas tertentu. Status PKP mewajibkan pemungutan PPN, penerbitan faktur pajak, dan pelaporan SPT Masa PPN."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Syarat Umum Pengukuhan PKP"
    },
    {
      "kind": "paragraph",
      "text": "Pengusaha wajib melaporkan usahanya untuk dikukuhkan sebagai PKP apabila total peredaran bruto dalam satu tahun buku melebihi Rp4,8 miliar. Di bawah ambang tersebut, pengukuhan bersifat sukarela namun tetap dimungkinkan."
    },
    {
      "kind": "list",
      "ordered": false,
      "items": [
        "Memiliki NPWP yang aktif dan valid",
        "Peredaran usaha melebihi ambang atau mengajukan secara sukarela",
        "Memiliki tempat usaha yang jelas dan dapat diverifikasi",
        "Melengkapi dokumen legalitas seperti NIB dan akta pendirian bagi badan"
      ]
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Dokumen yang Perlu Disiapkan"
    },
    {
      "kind": "paragraph",
      "text": "Siapkan fotokopi KTP pengurus, NPWP perusahaan dan pengurus, NIB, akta pendirian beserta pengesahannya, bukti kepemilikan atau sewa tempat usaha, serta foto lokasi usaha tampak depan dan dalam."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Tahapan dan Survey Lapangan"
    },
    {
      "kind": "paragraph",
      "text": "Setelah permohonan diajukan, petugas pajak akan melakukan verifikasi dan survey lapangan untuk memastikan keberadaan dan kegiatan usaha. Petugas memeriksa kesesuaian alamat, aktivitas operasional, dan kelengkapan dokumen."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Tips Lolos Survey KPP"
    },
    {
      "kind": "paragraph",
      "text": "Pastikan papan nama usaha terpasang, kegiatan operasional terlihat berjalan, penanggung jawab hadir saat kunjungan, dan seluruh dokumen asli tersedia untuk ditunjukkan. Ketidaksesuaian kecil sebaiknya dijelaskan secara terbuka dan dilengkapi segera."
    },
    {
      "kind": "heading",
      "level": 4,
      "text": "Aktivasi Akun dan e-Faktur"
    },
    {
      "kind": "paragraph",
      "text": "Setelah dikukuhkan, segera aktivasi akun PKP dan aplikasi e-Faktur, daftarkan sertifikat elektronik, dan pastikan penanggung jawab memahami cara membuat faktur pajak keluaran serta mengkreditkan faktur masukan."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Kewajiban Setelah Menjadi PKP"
    },
    {
      "kind": "paragraph",
      "text": "PKP wajib memungut PPN atas setiap penyerahan, menerbitkan faktur pajak tepat waktu, melaporkan SPT Masa PPN setiap bulan, dan menyetorkan PPN kurang bayar sebelum batas waktu. Kelalaian berakibat sanksi administrasi dan bunga."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "PKP Sukarela versus PKP Wajib"
    },
    {
      "kind": "paragraph",
      "text": "Pengusaha dengan omzet di bawah ambang dapat mengajukan pengukuhan sukarela, misalnya untuk dapat menerbitkan faktur pajak kepada pelanggan korporat yang mensyaratkannya. Konsekuensinya sama: seluruh kewajiban PPN berlaku penuh sejak dikukuhkan."
    },
    {
      "kind": "heading",
      "level": 3,
      "text": "Pertimbangan Sebelum Mengajukan Sukarela"
    },
    {
      "kind": "paragraph",
      "text": "Timbang manfaat faktur pajak bagi pelanggan melawan beban administrasi bulanan. Jika pelanggan Anda kebanyakan konsumen akhir, pengukuhan dini justru menambah biaya kepatuhan tanpa manfaat."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Pencabutan Status PKP"
    },
    {
      "kind": "paragraph",
      "text": "Status PKP dapat dicabut apabila pengusaha tidak lagi memenuhi syarat, misalnya menghentikan kegiatan usaha kena pajak atau omzet turun permanen. Pencabutan diajukan secara tertulis dengan melampirkan bukti pendukung dan penyelesaian seluruh kewajiban PPN."
    },
    {
      "kind": "heading",
      "level": 2,
      "text": "Kesimpulan"
    },
    {
      "kind": "paragraph",
      "text": "Kunci sukses pengukuhan PKP adalah dokumen lengkap, lokasi usaha yang jelas, dan kesiapan menghadapi survey. Setelah dikukuhkan, jalankan kewajiban PPN dengan disiplin agar terhindar dari sanksi."
    }
  ],
  },
  {
    slug: "tata-cara-pembukuan-umkm",
    penulis: "Tim Konsultan EasyTax",
    tags: ["Pembukuan", "UMKM", "Laporan Keuangan"],
    blok: [
      { kind: "paragraph", text: "Pembukuan yang rapi adalah fondasi UMKM untuk tumbuh. Dengan catatan kas, piutang, dan utang yang selalu diperbarui, pemilik usaha dapat memantau untung rugi, menyiapkan laporan pajak, dan mengambil keputusan bisnis tanpa menebak-nebak angka." },
      { kind: "heading", level: 2, text: "Pencatatan atau Pembukuan?" },
      { kind: "paragraph", text: "Wajib pajak dengan peredaran bruto tahunan sampai Rp 500 juta dapat menggunakan pencatatan sederhana, sedangkan yang di atasnya wajib melakukan pembukuan. Meski begian, banyak UMKM memilih membukukan transaksi sejak awal karena lebih mudah saat mengajukan pinjaman atau mengurus PKP." },
      { kind: "heading", level: 2, text: "Langkah Membuat Pembukuan Rutin" },
      { kind: "list", ordered: true, items: ["Pisahkan rekening usaha dan pribadi sejak hari pertama.", "Catat setiap transaksi masuk dan keluar pada buku atau aplikasi yang sama.", "Simpan bukti transaksi: nota, kuitansi, faktur, dan mutasi rekening.", "Rekap mingguan agar selisih kas cepat terdeteksi.", "Tutup buku bulanan dan simpan laporan untuk keperluan SPT." ] },
      { kind: "heading", level: 3, text: "Pos Kas, Piutang, dan Utang" },
      { kind: "paragraph", text: "Kas dicatat dari saldo riil di rekening dan laci. Piutang dicatat saat barang atau jasa sudah diserahkan tetapi belum dibayar, lalu dilunasi dicatat sebagai penerimaan. Utang dicatat saat barang diterima sebelum bayar, dan dicatat lunas ketika dibayarkan. Ketiganya wajib direkonsiliasi setiap akhir bulan agar tidak ada selisih yang menumpuk." },
      { kind: "heading", level: 2, text: "Dokumen yang Wajib Disimpan" },
      { kind: "list", ordered: false, items: ["Buku kas umum dan buku penjualan-pembelian.", "Faktur atau kuitansi dari setiap transaksi.", "Buku inventaris barang dan aset usaha.", "Rekap gaji dan potongan pajak karyawan, jika ada.", "Laporan pajak bulanan seperti SPT Masa PPN dan PPh." ] },
      { kind: "heading", level: 2, text: "Kesalahan yang Sering Terjadi" },
      { kind: "paragraph", text: "Kesalahan paling umum adalah mencampur uang usaha dengan uang pribadi, mencatat transaksi tanpa bukti, dan menunda pencatatan sampai akhir tahun. Praktik ini membuat laporan keuangan sulit diaudit dan berisiko mendapat koreksi saat pemeriksaan pajak." },
      { kind: "paragraph", text: "Bila dirasa merepotkan, UMKM dapat memakai jasa pembukuan bulanan agar catatan selalu siap saat jadwal pelaporan pajak tiba." },
    ],
  },
  {
    slug: "pendapatan-tunjangan-pajak",
    penulis: "Tim Konsultan EasyTax",
    tags: ["PPh Pribadi", "Tunjangan", "THR"],
    blok: [
      { kind: "paragraph", text: "Banyak karyawan bingung mengapa sebagian tunjangan dipotong pajak dan sebagian lagi tidak. Pemahaman ini penting karena berpengaruh besar pada perhitungan PPh 21 bulanan dan pelaporan SPT Tahunan orang pribadi." },
      { kind: "heading", level: 2, text: "Tunjangan yang Bukan Objek Pajak" },
      { kind: "paragraph", text: "Uang saku perjalanan dinas dengan pertanggungan jawab, tunjangan keluarga untuk istri dan anak sampai batas tertentu, biaya pendidikan anak, serta tunjangan perawatan kesehatan yang menyertai program perusahaan termasuk penghasilan yang tidak dikenai PPh 21." },
      { kind: "list", ordered: false, items: ["Uang saku perjalanan dinas berdasarkan pertanggungan jawab.", "Tunjangan keluarga bagi karyawan berkeluarga sesuai batas aturan.", "Biaya pendidikan anak dari TK sampai SMA.", "Tunjangan perawatan kesehatan yang menjadi bagian program perusahaan." ] },
      { kind: "heading", level: 2, text: "Tunjangan yang Menjadi Objek Pajak" },
      { kind: "paragraph", text: "Tunjangan tetap seperti tunjangan transportasi dan komunikasi yang dibayar setiap bulan merupakan bagian dari penghasilan bruto dan wajib digabung dalam perhitungan PPh 21. Begitu pula bonus, honorarium, dan komisi yang dibayar kepada karyawan." },
      { kind: "heading", level: 3, text: "THR dan Hadiah" },
      { kind: "paragraph", text: "Tunjangan hari raya yang dibayar sesuai peraturan perundang-undangan merupakan penghasilan kena pajak pada bulan pembayaran, sehingga PPh 21 atas THR dihitung pada bulan tersebut. Hadiah undian atau penghargaan dari pihak lain juga menjadi penghasilan yang harus dilaporkan." },
      { kind: "heading", level: 2, text: "Cara Mencatat di SPT Tahunan" },
      { kind: "list", ordered: true, items: ["Pisahkan bagian tunjangan yang dipotong PPh 21 dan yang tidak.", "Minta bukti potong PPh 21 bulanan dari pemberi kerja.", "Masukkan penghasilan bruto setelah tunjangan yang dikenai pajak pada form 1770." ] },
      { kind: "paragraph", text: "Simpan slip gaji setiap bulan sebagai pembanding. Jika ada selisih antara bukti potong dengan catatan pribadi, segera konfirmasi ke bagian payroll sebelum masa pelaporan SPT Tahunan ditutup." },
    ],
  },
  {
    slug: "e-faktur-4-0",
    penulis: "Tim Konsultan EasyTax",
    tags: ["e-Faktur", "PPN", "PKP"],
    blok: [
      { kind: "paragraph", text: "e-Faktur 4.0 adalah pembaruan aplikasi faktur pajak elektronik DJP yang menghadirkan mekanisme baru dalam penerbitan dan pelaporan faktur pajak. Perusahaan PKP perlu memahami perubahannya agar proses penagihan dan pelaporan PPN tidak terganggu." },
      { kind: "heading", level: 2, text: "Perubahan Utama e-Faktur 4.0" },
      { kind: "list", ordered: false, items: ["Terbitnya salinan Faktur Pajak Elektronik (CPF) dari sistem DJP.", "Faktur pajak keluaran wajib dilaporkan melalui pelaporan SPT Masa PPN.", "Penyesuaian skema pendaftaran dan aktivasi aplikasi di portal DJP.", "Format berkas faktur mengikuti spesifikasi terbaru DJP." ] },
      { kind: "heading", level: 2, text: "Dampak pada Sistem Penagihan" },
      { kind: "paragraph", text: "Pelaku usaha harus memastikan sistem billing dan accounting internal menghasilkan data faktur yang sesuai format baru. Nomor seri faktur tetap urut, tetapi proses konfirmasi dan penyimpanan salinan faktur kini bergantung pada tanggapan sistem DJP." },
      { kind: "heading", level: 3, text: "Risiko Bila Tidak Disiapkan" },
      { kind: "paragraph", text: "Faktur yang tidak sesuai spesifikasi berisiko ditolak, sehingga pembeli tidak dapat mengkreditkan PPN masukannya. Akibatnya, arus kas perusahaan tertahan karena faktur pajak yang seharusnya menjadi kredit macet." },
      { kind: "heading", level: 2, text: "Langkah Persiapan" },
      { kind: "list", ordered: true, items: ["Perbarui aplikasi e-Faktur dan akun DJP paling lambat sebelum tanggal transisi.", "Uji terbit faktur keluaran pada lingkungan uji sebelum produksi.", "Sinkronkan master pelanggan dan barang dengan format baru.", "Latih tim tagihan dan pajak atas alur kerja baru.", "Simpan salinan faktur elektronik secara berkala sebagai cadangan." ] },
      { kind: "paragraph", text: "Dengan persiapan yang terencana, transisi e-Faktur 4.0 berjalan mulus tanpa menunda pelaporan PPN bulanan perusahaan." },
    ],
  },
  {
    slug: "struktur-modal-dan-beban",
    penulis: "Tim Konsultan EasyTax",
    tags: ["Pajak Badan", "Laporan Keuangan", "Efisiensi Pajak"],
    blok: [
      { kind: "paragraph", text: "Struktur modal dan beban menentukan berapa banyak laba yang dapat dihemat melalui pajak. Dengan memetakan sumber dana dan pos beban secara disiplin, perusahaan dapat mengoptimalkan pengurangan pajak secara sah tanpa meninggalkan celah pemeriksaan." },
      { kind: "heading", level: 2, text: "Memetakan Sumber Pendanaan" },
      { kind: "paragraph", text: "Modal sendiri tidak menghasilkan bunga yang dapat dikurangkan, sedangkan pinjaman dari pihak ketiga membawa beban bunga yang sering kali dapat dibebankan. Rasio yang sehat menjaga perusahaan tetap produktif sekaligus memaksimalkan kredit pajak dari bunga." },
      { kind: "list", ordered: false, items: ["Modal saham dan laba ditahan: tidak menimbulkan beban bunga.", "Hutang bank dan obligasi: bunga umumnya dapat dikurangkan.", "Hutang afiliasi: tunduk pada aturan rasio utang terhadap ekuitas 4:1." ] },
      { kind: "heading", level: 2, text: "Pos Beban yang Dapat Dikurangkan" },
      { kind: "paragraph", text: "Beban usaha yang langsung berhubungan dengan kegiatan produksi dan penjualan dapat dikurangkan seluruhnya. Beban campuran seperti sewa kantor dan utilitas dianggarkan secara wajar, sementara penyusutan aset dikurangkan per periode sesuai umur manfaatnya." },
      { kind: "heading", level: 3, text: "Beban yang Perlu Diawasi" },
      { kind: "paragraph", text: "Biaya hiburan tanpa daftar nominatif, sumbangan di luar kriteria, dan denda administrasi merupakan pos yang sering dikoreksi fiskal. Pastikan setiap beban sensitif memiliki bukti pendukung yang lengkap sebelum dibukukan." },
      { kind: "heading", level: 2, text: "Langkah Efisiensi yang Aman" },
      { kind: "list", ordered: true, items: ["Susun anggaran beban per divisi pada awal tahun.", "Dokumentasikan dasar setiap pengeluaran besar.", "Periksa ulang rasio utang sebelum mengambil pinjaman baru.", "Rekonsiliasi beban fiskal setiap kuartal bersama konsultan." ] },
      { kind: "paragraph", text: "Efisiensi pajak yang baik lahir dari pencatatan yang rapi, bukan dari penghapusan beban. Pendekatan ini membuat laporan keuangan sehat sekaligus aman saat pemeriksaan." },
    ],
  },
  {
    slug: "transfer-pricing-dokumentasi",
    penulis: "Tim Konsultan EasyTax",
    tags: ["Transfer Pricing", "Pajak Badan", "Pihak Afiliasi"],
    blok: [
      { kind: "paragraph", text: "Transaksi dengan pihak afiliasi harus mengikuti prinsip harga wajar (arms length). Dokumentasi transfer pricing menjadi bukti utama bahwa harga yang dipakai setara dengan transaksi antarpihak yang tidak berhubungan, sehingga perusahaan terhindar dari koreksi dan sanksi." },
      { kind: "heading", level: 2, text: "Tiga Pilar Dokumentasi" },
      { kind: "list", ordered: false, items: ["Master File: gambaran umum kelompok usaha, kebijakan transfer pricing, dan aktivitas penting.", "Local File: analisis transaksi afiliasi perusahaan Indonesia dengan pembanding dan metode penentuan harga.", "Country-by-Country Report: distribusi pendapatan, pajak, dan kegiatan usaha di setiap yurisdiksi." ] },
      { kind: "heading", level: 3, text: "Siapa yang Wajib Menyusun CbCR?" },
      { kind: "paragraph", text: "CbCR wajib disusun oleh perusahaan induk kelompok dengan konsolidasi pendapatan di atas Rp 11 triliun, kecuali induk telah menyerahkannya kepada DJP melalui induk di negara lain. Ambang batas ini perlu dicek setiap tahun karena struktur kelompok bisa berubah." },
      { kind: "heading", level: 2, text: "Langkah Menyusun Dokumen" },
      { kind: "list", ordered: true, items: ["Identifikasi seluruh transaksi afiliasi dan nilainya.", "Tentukan metode penentuan harga yang paling tepat (CUP, cost plus, net margin, resale price).", "Lakukan studi pembanding internal atau eksternal.", "Susun narasi kebijakan transfer pricing yang konsisten dengan laporan keuangan.", "Siapkan dokumen sebelum batas waktu penyampaian SPT Tahunan badan." ] },
      { kind: "heading", level: 2, text: "Tips Aman Saat Pemeriksaan" },
      { kind: "paragraph", text: "Pastikan angka pada local file sama persis dengan neraca dan SPT 1771. Simpan selah data pembanding dalam format yang dapat direproduksi, dan tandai perubahan struktural seperti transaksi baru atau penambahan afiliasi sebagai bahan pembaruan dokumen tahun berikutnya." },
    ],
  },
  {
    slug: "menjawab-sp2dk",
    penulis: "Tim Konsultan EasyTax",
    tags: ["SP2DK", "Pemeriksaan Pajak", "Kepatuhan"],
    blok: [
      { kind: "paragraph", text: "SP2DK (Surat Pemberitahuan Pemberitahuan dan Permintaan Data atau Keterangan) adalah surat dari KPP yang meminta wajib pajak menjelaskan data tertentu. Surat ini bukan surat teguran, melainkan permintaan klarifikasi yang dijawab dengan data yang akurat dan terdokumentasi." },
      { kind: "heading", level: 2, text: "Tujuan KPP Mengirim SP2DK" },
      { kind: "paragraph", text: "KPP biasanya mengirim SP2DK ketika ada ketidaksesuaian antara data SPT, faktur, dan mutasi rekening. Tujuannya memastikan penghasilan yang dilaporkan sudah lengkap dan beban yang diklaim didukung bukti, sebelum kasus dinaikkan ke pemeriksaan." },
      { kind: "heading", level: 2, text: "Data yang Perlu Disiapkan" },
      { kind: "list", ordered: true, items: ["SPT Tahunan dan SPT Masa yang disoalkan.", "Laporan keuangan beserta catatan atas akun yang diperiksa.", "Faktur pajak masukan dan keluaran yang terkait transaksi.", "Bukti potong PPh pihak lain yang dilaporkan.", "Mutasi rekening koran untuk menjelaskan transaksi besar." ] },
      { kind: "heading", level: 3, text: "Untuk Pertanyaan tentang Rekening" },
      { kind: "paragraph", text: "Klasifikasi setiap mutasi: mana yang merupakan setoran modal, pinjaman, pengembalian supplier, atau transaksi usaha. Sertakan rujukan kontrak atau surat perjanjian bila dana berasal dari pihak ketiga agar penjelasan meyakinkan." },
      { kind: "heading", level: 2, text: "Strategi Menyusun Jawaban" },
      { kind: "list", ordered: false, items: ["Jawab setiap poin dalam surat secara berurutan, tanpa ada yang terlewat.", "Sertakan tabel ringkas sebagai lampiran utama.", "Lampirkan bukti pendukung bernomor sesuai poin jawaban.", "Hindari penjelasan opini; gunakan angka dan dokumen." ] },
      { kind: "heading", level: 2, text: "Tenggat dan Konsekuensi" },
      { kind: "paragraph", text: "SP2DK umumnya memberi waktu 30 hari sejak surat diterima. Jawaban yang lengkap dan tepat waktu dapat menutup kasus tanpa pemeriksaan. Sebaliknya, jawaban yang tidak memuaskan dapat berujung pada Surat Perintah Pemeriksaan, di mana beban pembuktian jadi lebih berat." },
    ],
  },
];

export function cariArtikelDetail(slug: string): ArtikelDetail | undefined {
  return artikelDetail.find((a) => a.slug === slug);
}
