# Midnight Kitty Birthday Deluxe — v1.3 FINAL STORY MODE

Versi revisi dengan karakter kucing **100% elemen SVG/DOM**, bukan gambar raster.

## Final polish v1.2

- Area **MEOW NEWS** sekarang benar-benar menempel di bagian atas hero; blank/margin pink yang tidak perlu sudah dihapus.
- Semua slot foto customer **tidak berisi atau ditempeli karakter kucing**. Kucing hanya menjadi elemen tema SVG terpisah di luar foto.
- Hasil akhir setelah meniup lilin memakai `display:none` sebelum tombol ditekan, sehingga tidak lagi menyisakan area hitam/kosong sebelum footer.
- Kue ulang tahun diubah menjadi **single-tier pink cake** yang lebih sederhana dan natural, dengan frosting lembut dan drip.
- Lima lilin ditempatkan **di belakang badan/frosting kue**, jadi bagian bawah lilin tidak menembus ke depan kue.
- Frosting memiliki sprinkles warna-warni.
- Sekeliling kue memiliki bintang kecil, titik cahaya, dan love yang berkilau dengan animasi.
- Tetap responsive untuk desktop, laptop, tablet, HP, dan HP kecil.


## Perubahan utama v1.1

- Breaking News / Meow News sekarang punya `ticker-viewport` khusus dengan `overflow:hidden`, jadi teks tidak menembus keluar area ticker.
- Semua karakter kucing hitam-pink dibuat langsung dari SVG di `script.js`.
- Tidak ada `kitty_reference.png` yang dipakai di halaman.
- Bentuk visual kucing mempertahankan ciri referensi: badan hitam, telinga runcing + inner ear abu gelap, mata putih setengah menyipit, hidung/mulut pink, kumis gelap, dan satu fang putih.
- Ada beberapa pose: sitting-heart, waving, loaf, peek, peek-up, sleeping, party, peek-side, hug, curious.
- Kucing bereaksi ke pointer/touch:
  - hover: membesar halus;
  - pupil mengikuti posisi pointer;
  - ekor/paw bergerak;
  - tap/click: animasi "boop" membesar–mengecil + sound effect.
- Skala layout diperkecil supaya tidak terasa terlalu besar.
- Responsiveness diperketat untuk desktop, tablet, HP, dan HP kecil.

## Struktur

```text
deluxe_midnight_kitty/
├─ index.html
├─ style.css
├─ script.js
├─ template.schema.json
├─ README.md
└─ assets/
   ├─ images/
   │  ├─ cover.jpg
   │  └─ photo_1.jpg ... photo_14.jpg
   ├─ theme/
   │  └─ VECTOR_CATS.txt
   └─ audio/
      └─ PUT_YOUR_MUSIC_HERE.txt
```

## Edit data hadiah

Semua data customer tetap terpusat di object `DELUXE_CONFIG` paling atas `script.js`.

Yang bisa langsung diganti:
- `girlfriendName`
- `nickname`
- `boyfriendName`
- `birthdayDate`
- `heroSubtitle`
- `ticker`
- `loveLetter`
- `castDialogues`
- `memories`
- `music.src`

## Foto

Template menyediakan total 15 slot:
- `assets/images/cover.jpg`
- `assets/images/photo_1.jpg` sampai `photo_14.jpg`

File yang disertakan sekarang hanya placeholder visual pink supaya karakter kucing tidak lagi bergantung pada gambar referensi. Tinggal replace dengan foto customer tanpa mengganti nama file.

## Kucing SVG

Sistem karakter ada di:
- `catFace()` → wajah dasar
- `catSVG(pose)` → badan dan pose
- `renderCatElements()` → render SVG ke elemen `.cat-art`
- `initCatInteractions()` → hover/touch/pupil-follow/boop

Untuk memasang kucing baru di HTML:

```html
<div class="cat-art interactive-cat" data-cat-pose="waving"></div>
```

Pose tersedia:
`peek`, `sitting-heart`, `waving`, `loaf`, `peek-up`, `sleeping`, `peek-side`, `party`, `hug`, `curious`, `sitting`.

## Musik

Taruh file MP3, misalnya:

```text
assets/audio/birthday-song.mp3
```

Lalu ubah:

```js
music: {
  src: "assets/audio/birthday-song.mp3",
  volume: 0.30
}
```

Audio dimulai setelah user menekan tombol entrance karena aturan autoplay browser.

## Menjalankan

Bisa buka `index.html` langsung atau memakai static server:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.


## Final Story Mode v1.3

- Garis hitam/U kecil pada drip frosting kue sudah dihilangkan. Drip sekarang borderless dan menyatu dengan frosting.
- Desktop memakai **chapter-by-chapter scrolling**: satu gesture wheel berpindah ke section berikutnya/sebelumnya.
- Tablet/HP tetap memakai native swipe, tetapi dibantu scroll snap supaya perpindahan section terasa seperti halaman.
- Ada progress pager 01–06 dan tombol `next` pada tiap chapter.
- Tiap section menjalankan animasi masuk ulang saat section menjadi aktif.
- Galeri desktop berubah menjadi film-strip horizontal agar chapter Memories tetap ringkas dan tidak membuat halaman terlalu panjang.
- Footer dan final card tetap bisa dicapai walaupun desktop memakai mandatory scroll snap.
