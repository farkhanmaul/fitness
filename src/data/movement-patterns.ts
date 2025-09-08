export interface MovementPattern {
  id: string;
  name: string;
  description: string;
  primaryMuscles: string[];
  keyPrinciples: string[];
  commonMistakes: string[];
  formCues: string[];
  progressions: Progression[];
  exercises: string[];
  benefits: string[];
}

export interface Progression {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  exercises: string[];
  focus: string[];
}

export const movementPatterns: MovementPattern[] = [
  {
    id: 'squat-pattern',
    name: 'Pola Squat',
    description: 'Gerakan dasar manusia yang melibatkan fleksi pinggul dan lutut. Fondasi performa atletik dan aktivitas sehari-hari seperti duduk dan berdiri.',
    primaryMuscles: ['Quadriceps', 'Glutes', 'Core', 'Betis'],
    keyPrinciples: [
      'Pinggul bergerak mundur dan ke bawah secara bersamaan',
      'Lutut sejajar dengan jari kaki',
      'Dada tetap tegak dan bangga',
      'Berat badan terdistribusi di seluruh kaki',
      'Tulang belakang menjaga lengkungan netral'
    ],
    formCues: [
      '"Duduk mundur ke kursi"',
      '"Dorong lantai menjauh dengan kaki"',
      '"Dada besar, postur bangga"',
      '"Dorong melalui tumit"',
      '"Lutut ke luar, bukan ke dalam"'
    ],
    commonMistakes: [
      'Lutut runtuh ke dalam (valgus collapse)',
      'Condong ke depan dengan dada turun',
      'Naik ke jari kaki/tumit terangkat',
      'Tidak mencapai kedalaman yang cukup',
      'Membungkuk punggung bawah',
      'Berat badan bergeser ke jari kaki'
    ],
    progressions: [
      {
        level: 'Beginner',
        description: 'Kuasai gerakan berat badan dengan kedalaman dan kontrol yang tepat',
        exercises: ['Box Squat', 'Goblet Squat', 'Wall Squat', 'Supported Squat'],
        focus: ['Mobilitas', 'Pola dasar', 'Pencapaian kedalaman', 'Keseimbangan']
      },
      {
        level: 'Intermediate',
        description: 'Tambahkan beban eksternal sambil mempertahankan bentuk sempurna',
        exercises: ['Front Squat', 'Back Squat', 'Overhead Squat', 'Bulgarian Split Squat'],
        focus: ['Progres beban', 'Kekuatan unilateral', 'Stabilitas core', 'Pengembangan daya']
      },
      {
        level: 'Advanced',
        description: 'Variasi kompleks dan pengembangan kekuatan maksimal',
        exercises: ['Pistol Squat', 'Jump Squat', 'Single-leg Box Squat', 'Pause Squats'],
        focus: ['Penguasaan unilateral', 'Daya ledak', 'Stabilitas lanjutan', 'Aplikasi spesifik olahraga']
      }
    ],
    exercises: [
      'Air Squat',
      'Goblet Squat', 
      'Front Squat',
      'Back Squat',
      'Overhead Squat',
      'Bulgarian Split Squat',
      'Jump Squat',
      'Pistol Squat'
    ],
    benefits: [
      'Membangun kekuatan dan daya tubuh bagian bawah',
      'Meningkatkan mobilitas pinggul dan pergelangan kaki',
      'Memperkuat stabilitas core',
      'Menunjang performa atletik',
      'Penting untuk aktivitas sehari-hari',
      'Mengembangkan rantai posterior'
    ]
  },
  {
    id: 'hinge-pattern',
    name: 'Pola Hip Hinge',
    description: 'Gerakan yang ditandai dengan fleksi pinggul dengan tekukan lutut minimal. Penting untuk mengangkat objek dari lantai dan mengembangkan kekuatan rantai posterior.',
    primaryMuscles: ['Hamstring', 'Glutes', 'Punggung Bawah', 'Core'],
    keyPrinciples: [
      'Pinggul bergerak mundur terlebih dahulu dan memimpin gerakan',
      'Tekukan lutut minimal sepanjang gerakan',
      'Menjaga lengkungan tulang belakang netral',
      'Bebankan pada rantai posterior',
      'Jaga berat di tumit'
    ],
    formCues: [
      '"Dorong pinggul ke dinding di belakang"',
      '"Membungkuk di pinggul, bukan di pinggang"',
      '"Rasakan peregangan di hamstring"',
      '"Dada tegak, bahu ke belakang"',
      '"Dorong pinggul ke depan untuk berdiri"'
    ],
    commonMistakes: [
      'Membungkukkan punggung alih-alih hinge di pinggul',
      'Terlalu banyak menekuk lutut (berubah menjadi squat)',
      'Berat badan bergeser ke jari kaki',
      'Tidak mencapai ekstensi pinggul penuh di atas',
      'Hiperekstensi punggung di posisi atas',
      'Memimpin dengan lutut alih-alih pinggul'
    ],
    progressions: [
      {
        level: 'Beginner',
        description: 'Pelajari mekanik hip hinge yang tepat tanpa beban',
        exercises: ['Hip Hinge to Wall', 'Glute Bridge', 'Bird Dog', 'Good Morning (unweighted)'],
        focus: ['Mobilitas pinggul', 'Aktivasi rantai posterior', 'Pola gerakan', 'Stabilitas core']
      },
      {
        level: 'Intermediate', 
        description: 'Tambahkan beban sambil mempertahankan pola hinge sempurna',
        exercises: ['Romanian Deadlift', 'Kettlebell Swing', 'Deadlift', 'Single-leg RDL'],
        focus: ['Progres beban', 'Stabilitas unilateral', 'Pengembangan daya', 'Kekuatan hamstring']
      },
      {
        level: 'Advanced',
        description: 'Variasi kompleks dan pengembangan kekuatan maksimal',
        exercises: ['Sumo Deadlift', 'Deficit Deadlift', 'Single-leg Deadlift', 'Snatch-grip Deadlift'],
        focus: ['Kekuatan maksimal', 'Variasi lanjutan', 'Kecepatan dan daya', 'Aplikasi spesifik olahraga']
      }
    ],
    exercises: [
      'Deadlift',
      'Romanian Deadlift',
      'Good Morning',
      'Kettlebell Swing',
      'Hip Thrust',
      'Single-leg Deadlift',
      'Glute Bridge'
    ],
    benefits: [
      'Mengembangkan kekuatan rantai posterior',
      'Meningkatkan mobilitas dan fleksibilitas pinggul',
      'Mencegah cedera punggung bawah',
      'Penting untuk performa atletik',
      'Membangun kekuatan fungsional',
      'Memperbaiki postur'
    ]
  },
  {
    id: 'push-pattern',
    name: 'Pola Push',
    description: 'Gerakan yang melibatkan mendorong objek menjauh dari tubuh. Fundamental untuk kekuatan tubuh bagian atas dan daya tekan pada bidang horizontal dan vertikal.',
    primaryMuscles: ['Dada', 'Bahu', 'Triceps', 'Core'],
    keyPrinciples: [
      'Menjaga dasar penyangga yang stabil',
      'Core tetap aktif sepanjang gerakan',
      'Rentang gerak penuh',
      'Kontrol fase eksentrik dan konsentrik',
      'Gerakan skapula yang tepat'
    ],
    formCues: [
      '"Dorong lantai menjauh dari tubuh"',
      '"Jaga tubuh dalam garis lurus"',
      '"Dorong melalui telapak tangan"',
      '"Kencangkan glutes"',
      '"Tekan dalam garis lurus"'
    ],
    commonMistakes: [
      'Siku terlalu terbuka (90 derajat)',
      'Pinggul melorot atau terangkat',
      'Rentang gerak tidak penuh',
      'Menekan dalam jalur melengkung',
      'Core tidak aktif dengan benar',
      'Posisi kepala salah (menengadah/menunduk)'
    ],
    progressions: [
      {
        level: 'Beginner',
        description: 'Membangun kekuatan dorong dasar dan pola gerakan',
        exercises: ['Wall Push-up', 'Incline Push-up', 'Knee Push-up', 'Assisted Dip'],
        focus: ['Pola gerakan', 'Kekuatan dasar', 'Stabilitas core', 'Rentang gerak']
      },
      {
        level: 'Intermediate',
        description: 'Maju ke berat badan penuh dan tambahkan beban eksternal',
        exercises: ['Push-up', 'Dip', 'Overhead Press', 'Bench Press'],
        focus: ['Penguasaan berat badan penuh', 'Progres beban', 'Tantangan stabilitas', 'Pengembangan daya']
      },
      {
        level: 'Advanced',
        description: 'Variasi kompleks dan pengembangan kekuatan maksimal',
        exercises: ['Handstand Push-up', 'One-arm Push-up', 'Weighted Dips', 'Explosive Push-ups'],
        focus: ['Kekuatan unilateral', 'Daya ledak', 'Stabilitas lanjutan', 'Kekuatan maksimal']
      }
    ],
    exercises: [
      'Push-up',
      'Overhead Press',
      'Bench Press',
      'Dip',
      'Handstand Push-up',
      'Incline Press',
      'Pike Push-up'
    ],
    benefits: [
      'Membangun kekuatan dorong tubuh bagian atas',
      'Mengembangkan stabilitas bahu',
      'Meningkatkan kekuatan core',
      'Memperkuat daya tekan fungsional',
      'Menunjang aktivitas sehari-hari',
      'Membangun otot dada dan lengan'
    ]
  },
  {
    id: 'pull-pattern',
    name: 'Pola Pull',
    description: 'Gerakan yang melibatkan menarik objek menuju tubuh. Krusial untuk pengembangan tubuh bagian atas yang seimbang dan kesehatan postural.',
    primaryMuscles: ['Lats', 'Rhomboid', 'Middle Traps', 'Rear Delts', 'Biceps'],
    keyPrinciples: [
      'Mulai tarikan dengan otot punggung, bukan lengan',
      'Rapatkan tulang belikat',
      'Rentang gerak penuh (peregangan penuh ke kontraksi penuh)',
      'Kontrol bagian negatif',
      'Menjaga tulang belakang netral'
    ],
    formCues: [
      '"Tarik dengan punggung, bukan lengan"',
      '"Rapatkan tulang belikat"',
      '"Pimpin dengan siku"',
      '"Bayangkan menarik siku ke kantong belakang"',
      '"Rasakan regangan di bawah"'
    ],
    commonMistakes: [
      'Menggunakan lengan alih-alih otot punggung',
      'Tidak mencapai rentang gerak penuh',
      'Mengayun atau menggunakan momentum',
      'Tidak merapatkan tulang belikat',
      'Postur kepala ke depan',
      'Mengangkat bahu ke telinga'
    ],
    progressions: [
      {
        level: 'Beginner',
        description: 'Mengembangkan kekuatan tarik dasar dan aktivasi otot punggung',
        exercises: ['Bent-over Row (light)', 'Band Pull-aparts', 'Inverted Row', 'Lat Pulldown'],
        focus: ['Aktivasi otot punggung', 'Pola gerakan', 'Kekuatan postural', 'Mobilitas skapula']
      },
      {
        level: 'Intermediate',
        description: 'Maju ke tarikan berat badan dan beban lebih berat',
        exercises: ['Pull-up', 'Chin-up', 'Barbell Row', 'T-Bar Row'],
        focus: ['Penguasaan berat badan', 'Progres beban', 'Tarikan vertikal', 'Pengembangan kekuatan']
      },
      {
        level: 'Advanced',
        description: 'Variasi kompleks dan pengembangan kekuatan maksimal',
        exercises: ['Weighted Pull-ups', 'One-arm Row', 'Muscle-up', 'Wide-grip Pull-ups'],
        focus: ['Progres berbeban', 'Kekuatan unilateral', 'Gerakan lanjutan', 'Pengembangan daya']
      }
    ],
    exercises: [
      'Pull-up',
      'Chin-up',
      'Bent-over Row',
      'Lat Pulldown',
      'Face Pull',
      'Inverted Row',
      'Single-arm Row'
    ],
    benefits: [
      'Membangun kekuatan punggung dan tarikan',
      'Memperbaiki postur dan kesehatan bahu',
      'Menyeimbangkan gerakan dorong',
      'Mengembangkan kekuatan cengkeraman',
      'Mengurangi risiko cedera',
      'Meningkatkan performa atletik'
    ]
  },
  {
    id: 'carry-pattern',
    name: 'Pola Carry', 
    description: 'Gerakan membawa beban yang menantang cengkeraman, stabilitas core, dan kekuatan seluruh tubuh. Penting untuk kekuatan fungsional dan aplikasi dunia nyata.',
    primaryMuscles: ['Core', 'Traps', 'Lengan Bawah', 'Glutes', 'Bahu'],
    keyPrinciples: [
      'Menjaga postur tegak sepanjang gerakan',
      'Aktifkan core untuk mencegah fleksi lateral',
      'Jaga bahu ke belakang dan bawah',
      'Daya tahan kekuatan cengkeraman',
      'Pernapasan terkontrol di bawah beban'
    ],
    formCues: [
      '"Berdiri tegak seperti tentara"',
      '"Jangan biarkan beban menarik ke samping"',
      '"Kencangkan pegangan dengan erat"',
      '"Langkah besar, jangan menyeret"',
      '"Bernapas dengan stabil"'
    ],
    commonMistakes: [
      'Condong ke satu sisi saat carry unilateral',
      'Mengangkat bahu ke telinga',
      'Mengambil langkah kecil menyeret',
      'Menahan napas saat carry',
      'Postur kepala ke depan',
      'Membiarkan tulang belakang fleksi atau ekstensi berlebihan'
    ],
    progressions: [
      {
        level: 'Beginner',
        description: 'Membangun kapasitas carry dasar dan kekuatan postural',
        exercises: ['Farmers Walk (light)', 'Suitcase Carry (light)', 'Front-loaded Carry', 'Briefcase Carry'],
        focus: ['Daya tahan postural', 'Kekuatan cengkeraman dasar', 'Stabilitas core', 'Kualitas gerakan']
      },
      {
        level: 'Intermediate',
        description: 'Tingkatkan beban dan variasikan posisi carry',
        exercises: ['Heavy Farmers Walk', 'Single-arm Carry', 'Overhead Carry', 'Mixed Carries'],
        focus: ['Progres beban', 'Tantangan unilateral', 'Tuntutan stabilitas', 'Kapasitas kerja']
      },
      {
        level: 'Advanced',
        description: 'Carry kompleks dan beban maksimal',
        exercises: ['Yoke Walk', 'Sandbag Carry', 'Keg Carry', 'Atlas Stone Carry'],
        focus: ['Beban maksimal', 'Objek tidak beraturan', 'Persiapan kompetisi', 'Aplikasi khusus']
      }
    ],
    exercises: [
      'Farmers Walk',
      'Suitcase Carry',
      'Front-loaded Carry',
      'Overhead Carry',
      'Mixed Carry',
      'Sandbag Carry',
      'Keg Carry'
    ],
    benefits: [
      'Mengembangkan kekuatan fungsional',
      'Meningkatkan kekuatan cengkeraman dan lengan bawah',
      'Membangun stabilitas dan daya tahan core',
      'Memperkuat kekuatan postural',
      'Transfer kekuatan dunia nyata',
      'Meningkatkan kapasitas kerja'
    ]
  },
  {
    id: 'rotation-pattern',
    name: 'Pola Rotasi',
    description: 'Gerakan yang melibatkan rotasi di sekitar sumbu tubuh. Penting untuk performa atletik, kekuatan core, dan gerakan fungsional sehari-hari.',
    primaryMuscles: ['Core', 'Oblique', 'Glutes', 'Bahu'],
    keyPrinciples: [
      'Rotasi dari core, bukan hanya lengan',
      'Menjaga dasar penyangga yang stabil',
      'Kontrol kedua arah rotasi',
      'Jaga tulang belakang netral saat rotasi',
      'Hasilkan daya dari pinggul dan core'
    ],
    formCues: [
      '"Rotasi dari pusar"',
      '"Jaga pinggul tetap persegi"',
      '"Putar seluruh torso, bukan hanya lengan"',
      '"Rasakan core bekerja"',
      '"Kontrol kembali ke tengah"'
    ],
    commonMistakes: [
      'Rotasi hanya di bahu, bukan core',
      'Fleksi tulang belakang berlebihan saat rotasi',
      'Tidak mengontrol fase eksentrik',
      'Menggunakan momentum alih-alih kekuatan',
      'Menahan napas saat gerakan',
      'Rotasi terlalu jauh melampaui rentang alami'
    ],
    progressions: [
      {
        level: 'Beginner',
        description: 'Pelajari mekanik rotasi yang tepat dan aktivasi core',
        exercises: ['Seated Russian Twist', 'Standing Wood Chop', 'Bird Dog Rotations', 'Dead Bug Variations'],
        focus: ['Pola gerakan', 'Aktivasi core', 'Stabilitas', 'Rentang gerak']
      },
      {
        level: 'Intermediate',
        description: 'Tambahkan resistensi dan gerakan dinamis',
        exercises: ['Cable Wood Chop', 'Medicine Ball Slams', 'Landmine Rotations', 'Russian Twists with Weight'],
        focus: ['Progres beban', 'Pengembangan daya', 'Stabilitas dinamis', 'Koordinasi']
      },
      {
        level: 'Advanced',
        description: 'Pola rotasi kompleks dan gerakan spesifik olahraga',
        exercises: ['Turkish Get-up', 'Rotational Throws', 'Single-arm Overhead Press', 'Windmills'],
        focus: ['Pola kompleks', 'Daya spesifik olahraga', 'Stabilitas lanjutan', 'Integrasi']
      }
    ],
    exercises: [
      'Russian Twist',
      'Wood Chop',
      'Turkish Get-up',
      'Landmine Rotation',
      'Medicine Ball Slam',
      'Windmill',
      'Half-kneeling Chop'
    ],
    benefits: [
      'Mengembangkan kekuatan core rotasional',
      'Meningkatkan performa atletik',
      'Memperkuat mobilitas tulang belakang',
      'Membangun pola gerakan fungsional',
      'Mengurangi risiko cedera',
      'Meningkatkan koordinasi'
    ]
  }
];

export const movementBenefits = [
  'Membangun pola gerakan fungsional',
  'Mengurangi risiko cedera melalui mekanik yang tepat',
  'Meningkatkan performa aktivitas sehari-hari',
  'Menciptakan pengembangan otot yang seimbang',
  'Meningkatkan performa atletik',
  'Mengembangkan koordinasi neuromuskular'
];