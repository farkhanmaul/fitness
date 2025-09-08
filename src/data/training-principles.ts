export interface TrainingPrinciple {
  id: string;
  name: string;
  category: 'Beban Progresif' | 'Periodisasi' | 'Pemulihan' | 'Adaptasi' | 'Pemrograman' | 'Nutrisi';
  description: string;
  keyPoints: string[];
  application: string[];
  examples: string[];
  commonMistakes: string[];
  relatedPrinciples: string[];
}

export const trainingPrinciples: TrainingPrinciple[] = [
  {
    id: 'progressive-overload',
    name: 'Beban Progresif',
    category: 'Beban Progresif',
    description: 'Prinsip dasar bahwa untuk terus mengalami peningkatan, Anda harus secara bertahap meningkatkan tuntutan yang diberikan pada tubuh dari waktu ke waktu.',
    keyPoints: [
      'Peningkatan stimulus latihan secara bertahap',
      'Dapat dicapai melalui berbagai variabel',
      'Harus konsisten dan sistematis',
      'Membentuk fondasi dari semua adaptasi latihan',
      'Mencegah plateau dan meningkatkan kemajuan berkelanjutan'
    ],
    application: [
      'Tingkatkan beban 1-2 kg per minggu untuk pemula',
      'Tambahkan 1-2 repetisi per set bila memungkinkan',
      'Kurangi waktu istirahat antar set',
      'Tingkatkan volume latihan (set x repetisi)',
      'Perbaiki rentang gerak atau waktu di bawah tekanan',
      'Tingkatkan frekuensi latihan'
    ],
    examples: [
      'Minggu 1: Bench Press 3x8 @ 60kg',
      'Minggu 2: Bench Press 3x8 @ 62,5kg',
      'Minggu 3: Bench Press 3x9 @ 62,5kg',
      'Minggu 4: Bench Press 3x8 @ 65kg',
      'Bodyweight: Minggu 1: 10 push-up, Minggu 2: 12 push-up',
      'Lari: Minggu 1: 3 km, Minggu 2: 3,5 km'
    ],
    commonMistakes: [
      'Meningkatkan beban terlalu cepat (lebih dari 10% per minggu)',
      'Hanya fokus pada beban, mengabaikan variabel lain',
      'Tidak melacak kemajuan dengan benar',
      'Melewatkan minggu deload',
      'Menambah volume dan intensitas bersamaan',
      'Mengabaikan penurunan teknik demi beban lebih berat'
    ],
    relatedPrinciples: ['Spesifisitas', 'Pemulihan', 'Variasi Individual']
  },
  {
    id: 'specificity',
    name: 'Spesifisitas (Prinsip SAID)',
    category: 'Adaptasi',
    description: 'Adaptasi Spesifik terhadap Tuntutan yang Diberikan - tubuh Anda beradaptasi secara khusus terhadap jenis stres yang Anda berikan padanya.',
    keyPoints: [
      'Adaptasi spesifik terhadap stimulus latihan',
      'Spesifisitas sistem energi sangat penting',
      'Spesifisitas pola gerakan sangat berpengaruh',
      'Spesifisitas kecepatan dan beban berlaku',
      'Latihan harus sesuai dengan tujuan Anda'
    ],
    application: [
      'Latih pola gerakan yang ingin Anda tingkatkan',
      'Gunakan sistem energi yang mirip dengan olahraga/tujuan Anda',
      'Berlatih pada kecepatan yang relevan dengan aktivitas Anda',
      'Sertakan keterampilan khusus olahraga dalam latihan',
      'Sesuaikan beban latihan dengan tuntutan performa'
    ],
    examples: [
      'Pelari maraton fokus pada pembangunan dasar aerobik',
      'Powerlifter berlatih squat, bench press, deadlift secara khusus',
      'Perenang menghabiskan sebagian besar waktu di kolam',
      'Pemain basket berlatih lompat dan perubahan arah cepat',
      'Atlet CrossFit berlatih gerakan bervariasi intensitas tinggi'
    ],
    commonMistakes: [
      'Berlatih kebugaran umum padahal ada tujuan spesifik',
      'Hanya berlatih dalam satu rentang repetisi untuk tujuan kekuatan',
      'Mengabaikan kualitas gerakan untuk keterampilan kompleks',
      'Tidak berlatih dalam kondisi kompetisi',
      'Fokus pada kelemahan sambil mengabaikan kekuatan'
    ],
    relatedPrinciples: ['Beban Progresif', 'Variasi Individual']
  },
  {
    id: 'recovery',
    name: 'Pemulihan dan Superkompensasi',
    category: 'Pemulihan',
    description: 'Adaptasi terjadi selama periode istirahat. Pemulihan yang tepat memungkinkan tubuh membangun kembali lebih kuat dari sebelumnya.',
    keyPoints: [
      'Pertumbuhan terjadi saat istirahat, bukan saat latihan',
      'Superkompensasi memerlukan waktu pemulihan yang cukup',
      'Tidur adalah alat pemulihan paling penting',
      'Waktu nutrisi mempengaruhi pemulihan',
      'Pemulihan aktif dapat meningkatkan adaptasi'
    ],
    application: [
      'Tidur berkualitas 7-9 jam setiap malam',
      'Rencanakan hari istirahat di antara sesi intensif',
      'Gunakan pemulihan aktif (jalan kaki, gerakan ringan)',
      'Kelola stres hidup untuk meningkatkan pemulihan latihan',
      'Atur nutrisi pasca latihan dalam 2 jam',
      'Dengarkan sinyal kelelahan tubuh Anda'
    ],
    examples: [
      'Tidur 8+ jam untuk produksi hormon optimal',
      'Beri jeda 48-72 jam antara latihan kelompok otot yang sama',
      'Yoga ringan atau jalan kaki pada hari libur',
      'Makanan pasca latihan dengan protein dan karbohidrat',
      'Kurangi volume latihan saat stres hidup tinggi'
    ],
    commonMistakes: [
      'Berlatih meski lelah tanpa istirahat yang cukup',
      'Tidur kurang dari 6 jam secara teratur',
      'Melakukan latihan intensitas tinggi setiap hari',
      'Mengabaikan stres dari kehidupan di luar gym',
      'Tidak makan cukup untuk mendukung pemulihan',
      'Mengira nyeri otot sama dengan latihan yang efektif'
    ],
    relatedPrinciples: ['Beban Progresif', 'Variasi Individual']
  },
  {
    id: 'periodization',
    name: 'Periodisasi',
    category: 'Periodisasi',
    description: 'Perencanaan latihan sistematis yang memvariasikan intensitas, volume, dan spesifisitas dari waktu ke waktu untuk mengoptimalkan performa dan mencegah overtraining.',
    keyPoints: [
      'Memvariasikan stimulus latihan dari waktu ke waktu',
      'Mencegah kejenuhan dan plateau',
      'Memuncakkan performa untuk waktu tertentu',
      'Mengelola akumulasi kelelahan',
      'Menyeimbangkan siklus stres dan pemulihan'
    ],
    application: [
      'Rencanakan latihan dalam mesosiklus (4-6 minggu)',
      'Variasikan intensitas dan volume secara terbalik',
      'Sertakan minggu deload setiap 4-6 minggu',
      'Puncak untuk kompetisi atau tes',
      'Gunakan fase latihan berbeda (hipertrofi, kekuatan, power)',
      'Sesuaikan latihan berdasarkan keadaan hidup'
    ],
    examples: [
      'Blok 1: Volume tinggi, intensitas sedang (hipertrofi)',
      'Blok 2: Volume sedang, intensitas tinggi (kekuatan)',
      'Blok 3: Volume rendah, intensitas sangat tinggi (puncak)',
      'Minggu 1-3: Membangun, Minggu 4: Deload (kurangi volume 40-60%)',
      'Off-season: Kebugaran umum, In-season: Spesifik olahraga'
    ],
    commonMistakes: [
      'Berlatih dengan intensitas tinggi sepanjang tahun',
      'Tidak pernah mengambil minggu deload',
      'Tidak merencanakan puncak untuk acara penting',
      'Mengubah program secara acak tanpa tujuan',
      'Mengabaikan hubungan volume-intensitas'
    ],
    relatedPrinciples: ['Beban Progresif', 'Pemulihan', 'Variasi Individual']
  },
  {
    id: 'individual-variation',
    name: 'Variasi Individual',
    category: 'Pemrograman',
    description: 'Setiap orang merespon latihan secara berbeda berdasarkan genetik, pengalaman, gaya hidup, dan kapasitas pemulihan.',
    keyPoints: [
      'Tidak ada satu program yang cocok untuk semua orang',
      'Kebutuhan pemulihan sangat bervariasi',
      'Usia latihan mempengaruhi tingkat adaptasi',
      'Genetik mempengaruhi respon terhadap stimulus berbeda',
      'Faktor gaya hidup mempengaruhi kapasitas latihan'
    ],
    application: [
      'Mulai konservatif dan sesuaikan berdasarkan respon',
      'Lacak metrik individual (tidur, stres, performa)',
      'Modifikasi program berdasarkan keadaan hidup',
      'Pertimbangkan riwayat latihan saat programming',
      'Perhitungkan kekuatan dan kelemahan individual',
      'Sesuaikan kebutuhan pemulihan berdasarkan usia dan pengalaman'
    ],
    examples: [
      'Pemula: Kemajuan dengan 3x/minggu, Lanjutan: Butuh 5-6x/minggu',
      'Beberapa merespon lebih baik pada volume tinggi, lainnya pada intensitas tinggi',
      'Stres dari pekerjaan mungkin memerlukan pengurangan beban latihan',
      'Atlet yang lebih tua membutuhkan lebih banyak waktu pemulihan',
      'Tipe tubuh berbeda unggul dalam latihan berbeda'
    ],
    commonMistakes: [
      'Mengikuti program tanpa modifikasi',
      'Membandingkan kemajuan Anda dengan orang lain',
      'Tidak menyesuaikan dengan stres hidup atau usia',
      'Mengabaikan kekuatan dan kelemahan individual',
      'Menggunakan program yang sama tanpa mempertimbangkan tingkat pengalaman'
    ],
    relatedPrinciples: ['Pemulihan', 'Beban Progresif', 'Periodisasi']
  },
  {
    id: 'reversibility',
    name: 'Reversibilitas (Gunakan atau Hilang)',
    category: 'Adaptasi',
    description: 'Adaptasi latihan bersifat reversibel. Ketika Anda berhenti berlatih, Anda akan kehilangan adaptasi yang telah diperoleh.',
    keyPoints: [
      'Adaptasi memudar tanpa stimulus berkelanjutan',
      'Kualitas berbeda memudar pada tingkat berbeda',
      'Penghentian total menyebabkan penurunan lebih cepat',
      'Pemeliharaan memerlukan volume lebih sedikit daripada membangun',
      'Beberapa adaptasi lebih tahan terhadap kehilangan'
    ],
    application: [
      'Rencanakan fase pemeliharaan selama istirahat',
      'Gunakan dosis efektif minimum selama periode sibuk',
      'Prioritaskan kualitas gerakan selama fase volume rendah',
      'Rencanakan sesi latihan singkat daripada istirahat total',
      'Fokus pada mempertahankan kekuatan dan pola gerakan'
    ],
    examples: [
      'Kekuatan menurun 10-15% setelah 2 minggu tidak latihan',
      'Kebugaran kardio menurun lebih cepat daripada kekuatan',
      'Adaptasi berbasis keterampilan memudar cepat tanpa latihan',
      '1-2 sesi/minggu dapat mempertahankan sebagian besar adaptasi',
      'Kualitas gerakan memburuk tanpa latihan teratur'
    ],
    commonMistakes: [
      'Mengambil istirahat panjang tanpa latihan pemeliharaan',
      'Mengasumsikan dapat kembali ke level sebelumnya dengan cepat',
      'Tidak merencanakan keadaan hidup yang mengganggu latihan',
      'Mentalitas semua atau tidak sama sekali (latihan keras atau tidak sama sekali)',
      'Mengabaikan pentingnya pemeliharaan gerakan'
    ],
    relatedPrinciples: ['Beban Progresif', 'Spesifisitas']
  },
  {
    id: 'minimum-effective-dose',
    name: 'Dosis Efektif Minimum',
    category: 'Pemrograman',
    description: 'Jumlah latihan terkecil yang menghasilkan adaptasi yang diinginkan. Lebih banyak tidak selalu lebih baik.',
    keyPoints: [
      'Kualitas lebih penting daripada kuantitas dalam latihan',
      'Volume berlebihan dapat mengganggu pemulihan',
      'Efisiensi memungkinkan prioritas hidup lainnya',
      'Dosis minimum individual bervariasi',
      'Fokus pada aktivitas berdampak tertinggi'
    ],
    application: [
      'Mulai dengan gerakan compound dasar',
      'Gunakan aturan 80/20 - fokus pada latihan berdampak terbesar',
      'Prioritaskan konsistensi daripada kesempurnaan',
      'Mulai dengan 2-3 hari latihan per minggu',
      'Fokus pada beban progresif daripada volume latihan',
      'Beri pemulihan yang cukup antar sesi'
    ],
    examples: [
      '2-3 sesi full-body/minggu untuk pemula',
      '3-5 gerakan compound per sesi',
      '45-60 menit termasuk pemanasan dan pendinginan',
      'Kekuatan: 3x5 lift utama, 2-3x/minggu',
      'Kardio: 20-30 menit, 2-3x/minggu'
    ],
    commonMistakes: [
      'Berpikir lebih banyak latihan selalu lebih baik',
      'Menambah volume sebelum menguasai dasar-dasar',
      'Berlatih meski lelah secara konsisten',
      'Menyalin program atlet lanjutan sebagai pemula',
      'Tidak memberi waktu untuk adaptasi terjadi'
    ],
    relatedPrinciples: ['Pemulihan', 'Variasi Individual']
  },
  {
    id: 'nutrition-timing',
    name: 'Nutrisi untuk Latihan',
    category: 'Nutrisi',
    description: 'Waktu dan komposisi nutrisi yang tepat mendukung adaptasi latihan, performa, dan pemulihan.',
    keyPoints: [
      'Bahan bakar performa dan pemulihan melalui makanan',
      'Waktu penting untuk optimisasi',
      'Asupan protein mendukung perkembangan otot',
      'Karbohidrat menjadi bahan bakar latihan intensitas tinggi',
      'Hidrasi mempengaruhi performa secara signifikan'
    ],
    application: [
      'Makan protein sepanjang hari (20-30g per makanan)',
      'Konsumsi karbohidrat di sekitar sesi latihan',
      'Makanan pasca latihan dalam 2 jam setelah latihan',
      'Tetap terhidrasi sebelum, selama, dan setelah olahraga',
      'Sesuaikan kalori dengan tuntutan latihan dan tujuan'
    ],
    examples: [
      'Pra-latihan: Pisang dan kopi 30-60 menit sebelumnya',
      'Pasca-latihan: Protein shake dan karbohidrat dalam 30 menit',
      'Harian: 2,2g protein per kg berat badan',
      'Hari latihan: Lebih banyak karbohidrat, hari pemulihan: lebih banyak lemak',
      'Hidrasi: Urin jernih sebagai indikator hidrasi'
    ],
    commonMistakes: [
      'Berlatih dalam keadaan puasa saat performa penting',
      'Tidak makan cukup untuk mendukung tuntutan latihan',
      'Mengabaikan jendela nutrisi pasca latihan',
      'Asupan protein tidak cukup untuk pembentukan otot',
      'Dehidrasi mempengaruhi performa dan pemulihan'
    ],
    relatedPrinciples: ['Pemulihan', 'Variasi Individual']
  }
];

export const principleCategories = [
  'Beban Progresif',
  'Periodisasi', 
  'Pemulihan',
  'Adaptasi',
  'Pemrograman',
  'Nutrisi'
];

export const trainingTips = [
  'Mulai dengan gerakan bodyweight sebelum menambah beban eksternal',
  'Kuasai teknik sebelum meningkatkan intensitas',
  'Lacak latihan Anda untuk memastikan beban progresif',
  'Dengarkan tubuh Anda dan sesuaikan latihan sesuai kebutuhan',
  'Konsistensi mengalahkan kesempurnaan setiap saat',
  'Fokus pada gerakan compound untuk manfaat maksimal',
  'Rencanakan minggu deload untuk mencegah overtraining',
  'Prioritaskan tidur dan nutrisi untuk hasil optimal'
];