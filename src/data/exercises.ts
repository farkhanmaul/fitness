export interface Exercise {
  id: string;
  name: string;
  category: string;
  description: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string[];
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  instructions: string[];
  tips: string[];
  variations: string[];
  progressions?: {
    name: string;
    description: string;
    difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
    instructions: string[];
  }[];
}

export const exercises: Exercise[] = [
  // Upper Body - Push
  {
    id: 'push-up',
    name: 'Push-up',
    category: 'Tubuh Bagian Atas - Dorong',
    description: 'Latihan dasar dengan berat badan yang memperkuat dada, bahu, dan trisep.',
    primaryMuscles: ['Dada', 'Trisep', 'Deltoid Depan'],
    secondaryMuscles: ['Inti', 'Deltoid Belakang'],
    equipment: ['Berat Badan'],
    difficulty: 'Pemula',
    instructions: [
      'Mulai dalam posisi plank dengan tangan selebar bahu',
      'Jaga tubuh dalam garis lurus dari kepala hingga tumit',
      'Turunkan dada hingga tepat di atas lantai',
      'Dorong kembali ke posisi awal',
      'Jaga inti tetap kencang sepanjang gerakan'
    ],
    tips: [
      'Jaga siku pada sudut 45 derajat terhadap tubuh',
      'Tarik napas saat turun, hembuskan saat naik',
      'Aktifkan gluteus untuk menjaga bentuk yang benar'
    ],
    variations: ['Incline Push-up', 'Decline Push-up', 'Diamond Push-up', 'Wide-grip Push-up'],
    progressions: [
      {
        name: 'Wall Push-up',
        description: 'Push-up berdiri menghadap dinding untuk pemula',
        difficulty: 'Pemula',
        instructions: [
          'Berdiri sejauh satu lengan dari dinding',
          'Letakkan telapak tangan rata di dinding setinggi bahu',
          'Condongkan tubuh ke depan dan dorong kembali dengan kontrol'
        ]
      },
      {
        name: 'Incline Push-up',
        description: 'Push-up dengan tangan di permukaan yang lebih tinggi',
        difficulty: 'Pemula',
        instructions: [
          'Letakkan tangan pada permukaan yang lebih tinggi',
          'Ambil posisi plank',
          'Lakukan push-up dengan beban yang berkurang'
        ]
      },
      {
        name: 'Standard Push-up',
        description: 'Push-up penuh dari ujung kaki',
        difficulty: 'Menengah',
        instructions: [
          'Posisi plank penuh pada ujung kaki',
          'Turunkan dada ke lantai',
          'Dorong kembali ke posisi awal'
        ]
      },
      {
        name: 'Archer Push-up',
        description: 'Variasi push-up dengan fokus satu lengan',
        difficulty: 'Lanjutan',
        instructions: [
          'Mulai dalam posisi push-up lebar',
          'Pindahkan berat ke satu sisi saat turun',
          'Dorong kembali terutama menggunakan satu lengan'
        ]
      }
    ]
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press (Military Press)',
    category: 'Tubuh Bagian Atas - Dorong',
    description: 'Gerakan gabungan yang membangun kekuatan dan stabilitas bahu sambil melibatkan seluruh otot inti.',
    primaryMuscles: ['Bahu', 'Trisep'],
    secondaryMuscles: ['Dada Atas', 'Inti', 'Punggung Atas'],
    equipment: ['Barbel', 'Dumbel', 'Kettlebell'],
    difficulty: 'Menengah',
    instructions: [
      'Berdiri dengan kaki selebar bahu',
      'Pegang barbel di tingkat bahu dengan tangan sedikit lebih lebar dari bahu',
      'Kencangkan inti dan tekan beban langsung ke atas kepala',
      'Luruskan lengan di bagian atas',
      'Turunkan dengan kontrol ke posisi awal'
    ],
    tips: [
      'Jaga inti tetap kencang untuk mencegah ekstensi punggung',
      'Tekan barbel dalam garis lurus',
      'Kerutkan gluteus di bagian atas untuk stabilitas'
    ],
    variations: ['Dumbbell Press', 'Single-arm Press', 'Push Press', 'Seated Press']
  },

  // Upper Body - Pull
  {
    id: 'pull-up',
    name: 'Pull-up',
    category: 'Tubuh Bagian Atas - Tarik',
    description: 'Raja latihan tarik tubuh bagian atas, menargetkan latissimus, rhomboid, dan bisep.',
    primaryMuscles: ['Latissimus', 'Rhomboid', 'Trapezius Tengah'],
    secondaryMuscles: ['Bisep', 'Deltoid Belakang', 'Trapezius Bawah'],
    equipment: ['Palang Pull-up'],
    difficulty: 'Menengah',
    instructions: [
      'Bergantung dari palang pull-up dengan cengkeraman overhand',
      'Mulai dari posisi gantung mati dengan lengan terbentang penuh',
      'Tarik diri hingga dagu melewati palang',
      'Turunkan diri perlahan ke posisi awal',
      'Jaga sedikit condong ke depan'
    ],
    tips: [
      'Fokus menarik dengan punggung, bukan hanya dengan lengan',
      'Aktifkan inti untuk mencegah ayunan',
      'Rentang gerak penuh adalah kunci'
    ],
    variations: ['Chin-up', 'Wide-grip Pull-up', 'Neutral-grip Pull-up', 'Weighted Pull-up']
  },
  {
    id: 'row',
    name: 'Bent-over Row',
    category: 'Tubuh Bagian Atas - Tarik',
    description: 'Latihan tarik esensial untuk membangun punggung yang kuat dan tebal serta memperbaiki postur.',
    primaryMuscles: ['Latissimus', 'Rhomboid', 'Trapezius Tengah'],
    secondaryMuscles: ['Deltoid Belakang', 'Bisep', 'Trapezius Bawah'],
    equipment: ['Barbel', 'Dumbel', 'Kabel'],
    difficulty: 'Menengah',
    instructions: [
      'Berdiri dengan kaki selebar bahu, pegang barbel',
      'Tekuk pinggul dan condong ke depan sekitar 45 derajat',
      'Jaga punggung lurus dan inti terlibat',
      'Tarik barbel ke dada bawah/perut atas',
      'Remas tulang belikat bersama-sama di bagian atas'
    ],
    tips: [
      'Jaga beban tetap dekat dengan tubuh',
      'Jangan biarkan punggung bawah melengkung',
      'Fokus pada meremas tulang belikat'
    ],
    variations: ['T-Bar Row', 'Single-arm Dumbbell Row', 'Cable Row', 'Inverted Row']
  },

  // Lower Body - Squat Pattern
  {
    id: 'squat',
    name: 'Back Squat',
    category: 'Tubuh Bagian Bawah - Squat',
    description: 'Latihan fundamental tubuh bagian bawah yang membangun kekuatan di kuadrisep, gluteus, dan inti.',
    primaryMuscles: ['Kuadrisep', 'Gluteus'],
    secondaryMuscles: ['Hamstring', 'Betis', 'Inti', 'Punggung Atas'],
    equipment: ['Barbel', 'Rak Squat'],
    difficulty: 'Menengah',
    instructions: [
      'Posisikan barbel di punggung atas (high bar) atau trapezius bawah (low bar)',
      'Berdiri dengan kaki sedikit lebih lebar dari bahu',
      'Turun dengan mendorong pinggul ke belakang dan menekuk lutut',
      'Turun hingga paha sejajar dengan lantai',
      'Dorong melalui tumit untuk kembali ke posisi awal'
    ],
    tips: [
      'Jaga lutut sejajar dengan jari kaki',
      'Jaga tulang belakang netral sepanjang gerakan',
      'Tarik napas di atas, tahan selama turun dan naik'
    ],
    variations: ['Front Squat', 'Goblet Squat', 'Bulgarian Split Squat', 'Overhead Squat']
  },
  {
    id: 'air-squat',
    name: 'Air Squat (Bodyweight Squat)',
    category: 'Tubuh Bagian Bawah - Squat',
    description: 'Gerakan berat badan yang sempurna untuk membangun kekuatan dan mobilitas tubuh bagian bawah.',
    primaryMuscles: ['Kuadrisep', 'Gluteus'],
    secondaryMuscles: ['Hamstring', 'Betis', 'Inti'],
    equipment: ['Berat Badan'],
    difficulty: 'Pemula',
    instructions: [
      'Berdiri dengan kaki selebar bahu',
      'Lengan dapat direntangkan ke depan untuk keseimbangan',
      'Turun dengan mendorong pinggul ke belakang dan menekuk lutut',
      'Turun hingga paha sejajar dengan lantai',
      'Berdiri kembali dengan mendorong melalui tumit'
    ],
    tips: [
      'Jaga dada tegak dan inti terlibat',
      'Berat badan harus di tumit, bukan ujung kaki',
      'Latih pola gerakan sebelum menambah beban'
    ],
    variations: ['Jump Squat', 'Pistol Squat', 'Cossack Squat', 'Sumo Squat']
  },

  // Lower Body - Hinge Pattern
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'Tubuh Bagian Bawah - Engsel',
    description: 'Latihan rantai posterior utama, membangun kekuatan di hamstring, gluteus, dan punggung.',
    primaryMuscles: ['Hamstring', 'Gluteus', 'Punggung Bawah'],
    secondaryMuscles: ['Latissimus', 'Trapezius', 'Rhomboid', 'Inti', 'Lengan Bawah'],
    equipment: ['Barbel', 'Piringan Beban'],
    difficulty: 'Menengah',
    instructions: [
      'Berdiri dengan kaki selebar pinggul, barbel di atas pertengahan kaki',
      'Tekuk pinggul dan lutut untuk memegang barbel dengan tangan di luar kaki',
      'Jaga punggung lurus, dada tegak, bahu di atas barbel',
      'Dorong melalui tumit dan ekstensi pinggul untuk mengangkat barbel',
      'Berdiri tegak dengan bahu ke belakang, kemudian balikkan gerakan'
    ],
    tips: [
      'Jaga barbel tetap dekat dengan tubuh sepanjang gerakan',
      'Pimpin dengan pinggul, bukan lutut',
      'Aktifkan latissimus untuk menjaga barbel tetap dekat'
    ],
    variations: ['Romanian Deadlift', 'Sumo Deadlift', 'Trap Bar Deadlift', 'Single-leg Deadlift']
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift (RDL)',
    category: 'Tubuh Bagian Bawah - Engsel',
    description: 'Gerakan engsel pinggul yang menargetkan hamstring dan gluteus sambil meningkatkan fleksibilitas rantai posterior.',
    primaryMuscles: ['Hamstring', 'Gluteus'],
    secondaryMuscles: ['Punggung Bawah', 'Inti'],
    equipment: ['Barbel', 'Dumbel', 'Kettlebell'],
    difficulty: 'Menengah',
    instructions: [
      'Mulai berdiri dengan barbel di tingkat pinggul',
      'Jaga lutut sedikit ditekuk sepanjang gerakan',
      'Tekuk di pinggul dengan mendorong pinggul ke belakang',
      'Turunkan barbel sambil menjaganya tetap dekat dengan kaki',
      'Rasakan regangan di hamstring, kemudian kembali berdiri'
    ],
    tips: [
      'Ini adalah gerakan pinggul, bukan gerakan lutut',
      'Jaga bahu ke belakang dan dada bangga',
      'Turun hanya sejauh fleksibilitas hamstring memungkinkan'
    ],
    variations: ['Single-leg RDL', 'Dumbbell RDL', 'Kettlebell RDL', 'Stiff-leg Deadlift']
  },

  // Core
  {
    id: 'plank',
    name: 'Plank',
    category: 'Inti',
    description: 'Latihan inti isometrik yang membangun stabilitas dan daya tahan di seluruh muskulatur inti.',
    primaryMuscles: ['Inti', 'Transverse Abdominis'],
    secondaryMuscles: ['Bahu', 'Gluteus', 'Kuadrisep'],
    equipment: ['Berat Badan'],
    difficulty: 'Pemula',
    instructions: [
      'Mulai dalam posisi push-up pada lengan bawah',
      'Jaga tubuh dalam garis lurus dari kepala hingga tumit',
      'Aktifkan inti dan kerutkan gluteus',
      'Tahan posisi sambil bernapas normal',
      'Jaga tulang belakang netral sepanjang gerakan'
    ],
    tips: [
      'Jangan biarkan pinggul turun atau terangkat',
      'Fokus pada kualitas daripada durasi',
      'Aktifkan gluteus untuk melindungi punggung bawah'
    ],
    variations: ['Side Plank', 'Plank Up-Down', 'Plank with Leg Lift', 'Bear Crawl']
  },

  // CrossFit/MetCon Movements
  {
    id: 'burpee',
    name: 'Burpee',
    category: 'MetCon/CrossFit',
    description: 'Latihan kondisioning seluruh tubuh yang menggabungkan squat, plank, push-up, dan lompatan.',
    primaryMuscles: ['Seluruh Tubuh'],
    secondaryMuscles: ['Sistem Kardiovaskular'],
    equipment: ['Berat Badan'],
    difficulty: 'Menengah',
    instructions: [
      'Mulai berdiri, kemudian squat dan letakkan tangan di lantai',
      'Lompat atau langkah kaki ke belakang ke posisi plank',
      'Lakukan push-up (opsional)',
      'Lompat atau langkah kaki kembali ke posisi squat',
      'Lompat ke atas dengan lengan di atas kepala'
    ],
    tips: [
      'Jaga bentuk yang baik meski lelah',
      'Langkah saja jika perlu, tidak harus lompat',
      'Fokus pada gerakan yang halus dan efisien'
    ],
    variations: ['Half Burpee', 'Burpee Box Jump', '6-count Burpee', 'Devil Press']
  },
  {
    id: 'thruster',
    name: 'Thruster',
    category: 'MetCon/CrossFit',
    description: 'Menggabungkan front squat dan overhead press menjadi satu gerakan eksplosif.',
    primaryMuscles: ['Kuadrisep', 'Gluteus', 'Bahu'],
    secondaryMuscles: ['Inti', 'Trisep', 'Punggung Atas'],
    equipment: ['Barbel', 'Dumbel', 'Kettlebell'],
    difficulty: 'Lanjutan',
    instructions: [
      'Mulai dengan barbel dalam posisi front rack',
      'Lakukan front squat penuh',
      'Saat berdiri, gunakan momentum untuk menekan barbel ke atas kepala',
      'Turunkan barbel kembali ke posisi front rack',
      'Ulangi dalam gerakan yang mengalir'
    ],
    tips: [
      'Gunakan dorongan kaki untuk membantu penekanan',
      'Jaga inti tetap kencang sepanjang gerakan',
      'Latih front squat dan overhead press secara terpisah terlebih dahulu'
    ],
    variations: ['Dumbbell Thruster', 'Single-arm Thruster', 'Kettlebell Thruster']
  },

  // Hyrox Specific
  {
    id: 'wall-ball',
    name: 'Wall Ball',
    category: 'Hyrox/Fungsional',
    description: 'Gerakan fungsional yang menggabungkan squat dan lemparan overhead, umum dalam kompetisi Hyrox.',
    primaryMuscles: ['Kuadrisep', 'Gluteus', 'Bahu'],
    secondaryMuscles: ['Inti', 'Betis'],
    equipment: ['Bola Medis', 'Dinding'],
    difficulty: 'Menengah',
    instructions: [
      'Pegang bola medis di tingkat dada',
      'Lakukan squat dengan bola di dada',
      'Berdiri eksplosif dan lempar bola ke target di dinding',
      'Tangkap bola saat turun',
      'Langsung masuk ke squat berikutnya'
    ],
    tips: [
      'Gunakan kaki untuk menghasilkan tenaga, bukan hanya lengan',
      'Tangkap bola dengan tangan yang lembut',
      'Jaga ritme yang konsisten'
    ],
    variations: ['Single-arm Wall Ball', 'Wall Ball Sit-up', 'Overhead Wall Ball']
  },
  {
    id: 'sled-push',
    name: 'Sled Push',
    category: 'Hyrox/Fungsional',
    description: 'Latihan daya dan kondisioning tubuh bagian bawah yang umum dalam kebugaran fungsional dan Hyrox.',
    primaryMuscles: ['Kuadrisep', 'Gluteus', 'Betis'],
    secondaryMuscles: ['Inti', 'Bahu', 'Trisep'],
    equipment: ['Sled Prowler', 'Piringan Beban'],
    difficulty: 'Menengah',
    instructions: [
      'Posisikan tangan pada pegangan sled',
      'Condong ke depan pada sudut 45 derajat',
      'Dorong dengan kaki, jaga lengan tetap lurus',
      'Ambil langkah pendek dan cepat',
      'Dorong melalui seluruh kaki'
    ],
    tips: [
      'Tetap rendah dan dorong dengan kaki',
      'Jaga inti tetap terlibat',
      'Jangan biarkan sled berhenti bergerak'
    ],
    variations: ['High Handle Push', 'Low Handle Push', 'Single-arm Push']
  },

  // Military/Tactical
  {
    id: 'farmer-carry',
    name: 'Farmer\'s Carry',
    category: 'Militer/Taktis',
    description: 'Latihan kekuatan fungsional yang membangun cengkeraman, inti, dan stabilitas seluruh tubuh.',
    primaryMuscles: ['Lengan Bawah', 'Trapezius', 'Inti'],
    secondaryMuscles: ['Bahu', 'Kaki', 'Gluteus'],
    equipment: ['Dumbel', 'Kettlebell', 'Pegangan Farmer Walk'],
    difficulty: 'Pemula',
    instructions: [
      'Angkat beban berat di setiap tangan',
      'Berdiri tegak dengan bahu ke belakang',
      'Berjalan maju dengan langkah terkontrol',
      'Jaga inti terlibat dan hindari bersandar',
      'Pertahankan cengkeraman sepanjang jarak'
    ],
    tips: [
      'Mulai dengan jarak yang lebih pendek',
      'Fokus pada postur daripada kecepatan',
      'Gunakan kapur untuk cengkeraman yang lebih baik jika diperlukan'
    ],
    variations: ['Single-arm Carry', 'Front-loaded Carry', 'Mixed Carry', 'Overhead Carry']
  },
  {
    id: 'bear-crawl',
    name: 'Bear Crawl',
    category: 'Militer/Taktis',
    description: 'Pola gerakan seluruh tubuh yang membangun kekuatan, koordinasi, dan kondisioning.',
    primaryMuscles: ['Inti', 'Bahu', 'Kuadrisep'],
    secondaryMuscles: ['Trisep', 'Gluteus', 'Fleksor Pinggul'],
    equipment: ['Berat Badan'],
    difficulty: 'Menengah',
    instructions: [
      'Mulai dengan tangan dan kaki dengan lutut sedikit terangkat dari lantai',
      'Jaga pinggul rata dan inti kencang',
      'Gerakkan tangan dan kaki yang berlawanan ke depan',
      'Ambil langkah kecil, jaga bentuk',
      'Jaga lutut tetap dekat dengan lantai sepanjang gerakan'
    ],
    tips: [
      'Kualitas lebih penting dari kecepatan',
      'Jaga pinggul tidak bergoyang ke samping',
      'Bernapas secara teratur'
    ],
    variations: ['Lateral Bear Crawl', 'Reverse Bear Crawl', 'Bear Crawl Hold']
  },

  // Olympic Lifting
  {
    id: 'clean-and-jerk',
    name: 'Clean and Jerk',
    category: 'Angkat Besi Olimpiade',
    description: 'Angkatan Olimpiade teknis yang menggabungkan tarikan eksplosif dengan daya tekan overhead.',
    primaryMuscles: ['Seluruh Tubuh'],
    secondaryMuscles: ['Daya', 'Koordinasi'],
    equipment: ['Barbel', 'Piringan Beban', 'Platform'],
    difficulty: 'Lanjutan',
    instructions: [
      'Mulai dengan barbel di atas pertengahan kaki, mirip setup deadlift',
      'Tarikan pertama: angkat barbel ke tingkat lutut',
      'Tarikan kedua: ekstensi eksplosif pinggul dan lutut',
      'Tangkap barbel dalam posisi front rack dalam squat',
      'Berdiri, kemudian jerk barbel ke atas kepala'
    ],
    tips: [
      'Ini adalah angkatan yang sangat teknis - dapatkan pelatihan',
      'Mulai dengan barbel kosong saja',
      'Latih setiap komponen secara terpisah'
    ],
    variations: ['Power Clean', 'Hang Clean', 'Split Jerk', 'Push Jerk']
  },
  {
    id: 'snatch',
    name: 'Snatch',
    category: 'Angkat Besi Olimpiade',
    description: 'Angkatan Olimpiade paling teknis, mengangkat barbel dari lantai ke overhead dalam satu gerakan.',
    primaryMuscles: ['Seluruh Tubuh'],
    secondaryMuscles: ['Daya', 'Mobilitas', 'Koordinasi'],
    equipment: ['Barbel', 'Piringan Beban', 'Platform'],
    difficulty: 'Lanjutan',
    instructions: [
      'Cengkeraman lebar pada barbel (snatch grip)',
      'Tarik barbel secara eksplosif dari lantai',
      'Tarik diri ke bawah barbel',
      'Tangkap barbel di atas kepala dalam posisi squat',
      'Berdiri dengan barbel di atas kepala'
    ],
    tips: [
      'Sangat teknis - memerlukan pelatihan',
      'Kerjakan mobilitas terlebih dahulu',
      'Kuasai overhead squat sebelum mencoba'
    ],
    variations: ['Power Snatch', 'Hang Snatch', 'Muscle Snatch']
  },

  // Gymnastics/Bodyweight
  {
    id: 'muscle-up',
    name: 'Muscle-up',
    category: 'Senam',
    description: 'Gerakan berat badan tingkat lanjut yang menggabungkan pull-up dan dip dalam satu gerakan yang mengalir.',
    primaryMuscles: ['Latissimus', 'Trisep', 'Dada'],
    secondaryMuscles: ['Inti', 'Bahu', 'Lengan Bawah'],
    equipment: ['Palang Pull-up', 'Ring Senam'],
    difficulty: 'Lanjutan',
    instructions: [
      'Mulai bergantung dari palang atau ring',
      'Lakukan pull-up eksplosif',
      'Transisi dengan condong ke depan dan mendorong',
      'Tekan ke posisi support',
      'Turun dengan kontrol'
    ],
    tips: [
      'Kuasai pull-up dan dip terlebih dahulu',
      'Latih transisi secara terpisah',
      'Gunakan false grip pada ring'
    ],
    variations: ['Ring Muscle-up', 'Bar Muscle-up', 'Strict Muscle-up', 'Kipping Muscle-up']
  },
  {
    id: 'handstand-push-up',
    name: 'Handstand Push-up',
    category: 'Senam',
    description: 'Gerakan tekan terbalik tingkat lanjut yang memerlukan kekuatan bahu dan keseimbangan yang signifikan.',
    primaryMuscles: ['Bahu', 'Trisep'],
    secondaryMuscles: ['Inti', 'Trapezius Atas'],
    equipment: ['Dinding', 'Berat Badan'],
    difficulty: 'Lanjutan',
    instructions: [
      'Mulai dalam posisi handstand menghadap dinding',
      'Turunkan kepala menuju lantai',
      'Tekan kembali ke posisi awal',
      'Jaga garis tubuh tetap lurus',
      'Kontrol gerakan'
    ],
    tips: [
      'Kuasai handstand dengan support dinding terlebih dahulu',
      'Bangun kekuatan bahu dengan pike push-up',
      'Latih hollow body hold'
    ],
    variations: ['Pike Push-up', 'Wall Handstand Push-up', 'Freestanding Handstand Push-up']
  }
];

export const categories = [
  'Tubuh Bagian Atas - Dorong',
  'Tubuh Bagian Atas - Tarik', 
  'Tubuh Bagian Bawah - Squat',
  'Tubuh Bagian Bawah - Engsel',
  'Inti',
  'MetCon/CrossFit',
  'Hyrox/Fungsional',
  'Militer/Taktis',
  'Angkat Besi Olimpiade',
  'Senam'
];

export const muscleGroups = [
  'Dada',
  'Bahu', 
  'Trisep',
  'Bisep',
  'Latissimus',
  'Rhomboid',
  'Trapezius',
  'Inti',
  'Kuadrisep',
  'Hamstring',
  'Gluteus',
  'Betis',
  'Lengan Bawah'
];

export const equipment = [
  'Berat Badan',
  'Barbel',
  'Dumbel',
  'Kettlebell',
  'Palang Pull-up',
  'Kabel',
  'Bola Medis',
  'Ring Senam',
  'Sled',
  'Dinding'
];