export interface WorkoutProgram {
  id: string;
  name: string;
  category: 'CrossFit' | 'Hyrox' | 'Navy SEAL' | 'Militer' | 'Kekuatan' | 'Daya Tahan';
  duration: string;
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  description: string;
  objectives: string[];
  workouts: Workout[];
  equipment: string[];
  notes?: string;
}

export interface Workout {
  day: number;
  name: string;
  type: 'AMRAP' | 'Untuk Waktu' | 'EMOM' | 'Tabata' | 'Kekuatan' | 'Daya Tahan' | 'Sirkuit';
  duration?: string;
  rounds?: number;
  exercises: WorkoutExercise[];
  restBetweenRounds?: string;
  notes?: string;
}

export interface WorkoutExercise {
  name: string;
  reps?: string;
  weight?: string;
  distance?: string;
  duration?: string;
  notes?: string;
}

export const workoutPrograms: WorkoutProgram[] = [
  // CrossFit WODs
  {
    id: 'murph',
    name: 'Murph',
    category: 'CrossFit',
    duration: 'Latihan Tunggal',
    difficulty: 'Lanjutan',
    description: 'WOD Pahlawan klasik untuk menghormati Letnan Angkatan Laut Michael Murphy. Salah satu benchmark CrossFit paling menantang.',
    objectives: ['Membangun ketahanan mental', 'Meningkatkan daya tahan otot', 'Menghormati pahlawan yang gugur'],
    equipment: ['Pull-up Bar', 'Rompi Berbeban (opsional)'],
    workouts: [
      {
        day: 1,
        name: 'Murph',
        type: 'Untuk Waktu',
        exercises: [
          { name: 'Lari', distance: '1 mil' },
          { name: 'Pull-ups', reps: '100' },
          { name: 'Push-ups', reps: '200' },
          { name: 'Air Squats', reps: '300' },
          { name: 'Lari', distance: '1 mil' }
        ],
        notes: 'Bagi pull-ups, push-ups, dan squats sesuai kebutuhan. Rompi 20lb untuk pria, 14lb untuk wanita (opsional).'
      }
    ],
    notes: 'Sesuaikan dengan mengurangi repetisi atau melepas rompi berbeban. Pembagian umum: 20 ronde 5 pull-ups, 10 push-ups, 15 squats.'
  },
  {
    id: 'fran',
    name: 'Fran',
    category: 'CrossFit',
    duration: 'Latihan Tunggal',
    difficulty: 'Menengah',
    description: 'WOD benchmark cepat dan intens yang menggabungkan thrusters dan pull-ups. Ujian sebenarnya untuk kekuatan dan teknik dalam kondisi lelah.',
    objectives: ['Mengembangkan daya tahan kekuatan', 'Menguasai teknik thruster', 'Membangun toleransi laktat'],
    equipment: ['Barbell', 'Pelat Beban', 'Pull-up Bar'],
    workouts: [
      {
        day: 1,
        name: 'Fran',
        type: 'Untuk Waktu',
        exercises: [
          { name: 'Thrusters', reps: '21-15-9', weight: '95lb/65lb' },
          { name: 'Pull-ups', reps: '21-15-9' }
        ],
        notes: 'Selesaikan 21 thrusters kemudian 21 pull-ups, lalu 15 dari masing-masing, kemudian 9 dari masing-masing. Target waktu: di bawah 5 menit untuk atlet elit.'
      }
    ],
    notes: 'Sesuaikan beban dan ganti pull-ups dengan jumping pull-ups atau ring rows jika diperlukan.'
  },
  {
    id: 'cindy',
    name: 'Cindy',
    category: 'CrossFit',
    duration: 'Latihan Tunggal',
    difficulty: 'Pemula',
    description: 'AMRAP (Sebanyak Mungkin Repetisi) bodyweight klasik yang membangun daya tahan dan mengajarkan pacing. Pengenalan sempurna untuk metodologi CrossFit.',
    objectives: ['Membangun kapasitas aerobik', 'Menguasai gerakan bodyweight', 'Mempelajari strategi pacing'],
    equipment: ['Pull-up Bar'],
    workouts: [
      {
        day: 1,
        name: 'Cindy',
        type: 'AMRAP',
        duration: '20 minutes',
        exercises: [
          { name: 'Pull-ups', reps: '5' },
          { name: 'Push-ups', reps: '10' },
          { name: 'Air Squats', reps: '15' }
        ],
        notes: 'Selesaikan sebanyak mungkin ronde dalam 20 menit. Skor bagus: 15+ ronde.'
      }
    ],
    notes: 'Sesuaikan pull-ups menjadi jumping pull-ups atau ring rows. Push-ups dapat dilakukan dari lutut.'
  },

  // Hyrox Training
  {
    id: 'hyrox-prep-8week',
    name: 'Persiapan Hyrox 8 Minggu',
    category: 'Hyrox',
    duration: '8 Minggu',
    difficulty: 'Menengah',
    description: 'Program komprehensif 8 minggu yang dirancang untuk mempersiapkan kompetisi Hyrox. Fokus pada gerakan spesifik dan sistem energi.',
    objectives: ['Menguasai gerakan Hyrox', 'Membangun kebugaran hybrid', 'Meningkatkan strategi pacing'],
    equipment: ['Ski Erg', 'Sled', 'Burpees', 'Rowing Machine', 'Farmers Carry', 'Sandbag', 'Wall Balls', 'Kettlebells'],
    workouts: [
      {
        day: 1,
        name: 'Simulasi Hyrox (Minggu 1)',
        type: 'Sirkuit',
        exercises: [
          { name: 'Ski Erg', distance: '500m' },
          { name: 'Sled Push', distance: '25m', weight: 'Ringan' },
          { name: 'Burpee Broad Jumps', reps: '20' },
          { name: 'Rowing', distance: '500m' },
          { name: 'Farmers Carry', distance: '100m', weight: 'Ringan' },
          { name: 'Sandbag Lunges', distance: '50m' },
          { name: 'Wall Balls', reps: '50', weight: '20lb/14lb' },
          { name: 'Lari', distance: '200m' }
        ],
        notes: 'Selesaikan sirkuit dengan istirahat 2-3 menit antar stasiun. Fokus pada teknik daripada kecepatan.'
      },
      {
        day: 2,
        name: 'Interval Lari',
        type: 'Daya Tahan',
        exercises: [
          { name: 'Lari Pemanasan', distance: '1km' },
          { name: 'Lari Interval', distance: '400m x 6', notes: 'Istirahat 90 detik antar interval' },
          { name: 'Lari Pendinginan', distance: '1km' }
        ]
      },
      {
        day: 3,
        name: 'Fokus Kekuatan',
        type: 'Kekuatan',
        exercises: [
          { name: 'Deadlift', reps: '5x5', weight: '80%' },
          { name: 'Front Squat', reps: '4x8' },
          { name: 'Pull-ups', reps: '4x max' },
          { name: 'Overhead Press', reps: '4x6' }
        ]
      }
    ],
    notes: 'Progres mingguan dengan meningkatkan intensitas dan mengurangi periode istirahat. Minggu 8 harus berupa simulasi Hyrox penuh.'
  },

  // Navy SEAL Training
  {
    id: 'seal-pst-prep',
    name: 'Persiapan PST Navy SEAL',
    category: 'Navy SEAL',
    duration: '12 Minggu',
    difficulty: 'Lanjutan',
    description: 'Program persiapan Physical Screening Test yang fokus pada renang, lari, dan kalistenik. Membangun fondasi untuk pelatihan SEAL.',
    objectives: ['Lulus standar PST', 'Membangun daya tahan renang', 'Menguasai kalistenik', 'Mengembangkan ketahanan mental'],
    equipment: ['Kolam Renang', 'Pull-up Bar'],
    workouts: [
      {
        day: 1,
        name: 'Latihan PST (Minggu 1)',
        type: 'Untuk Waktu',
        exercises: [
          { name: 'Renang (Sidestroke/Breaststroke)', distance: '500 yards', notes: 'Target: di bawah 12:30' },
          { name: 'Istirahat', duration: '10 menit' },
          { name: 'Push-ups', reps: 'maksimal dalam 2 menit', notes: 'Target: 50+' },
          { name: 'Istirahat', duration: '2 menit' },
          { name: 'Sit-ups', reps: 'maksimal dalam 2 menit', notes: 'Target: 50+' },
          { name: 'Istirahat', duration: '2 menit' },
          { name: 'Pull-ups', reps: 'maksimal (tanpa batas waktu)', notes: 'Target: 10+' },
          { name: 'Istirahat', duration: '10 menit' },
          { name: 'Lari', distance: '1.5 mil', notes: 'Target: di bawah 10:30' }
        ]
      },
      {
        day: 2,
        name: 'Sirkuit Kalistenik',
        type: 'Sirkuit',
        rounds: 4,
        exercises: [
          { name: 'Push-ups', reps: '20' },
          { name: 'Sit-ups', reps: '30' },
          { name: 'Pull-ups', reps: '10' },
          { name: 'Flutter Kicks', reps: '40' },
          { name: 'Mountain Climbers', reps: '30' }
        ],
        restBetweenRounds: '2 menit'
      },
      {
        day: 3,
        name: 'Renang Jarak Jauh',
        type: 'Daya Tahan',
        exercises: [
          { name: 'Renang Pemanasan', distance: '200 yards' },
          { name: 'Set Utama', distance: '1000 yards', notes: 'Pace stabil, fokus pada teknik' },
          { name: 'Renang Pendinginan', distance: '200 yards' }
        ]
      }
    ],
    notes: 'Standar minimum PST: renang 500yd 12:30, Push-ups 50, Sit-ups 50, Pull-ups 10, lari 1.5mil 10:30. Standar kompetitif jauh lebih tinggi.'
  },

  // Military Training
  {
    id: 'army-apft-prep',
    name: 'Persiapan APFT Angkatan Darat',
    category: 'Militer',
    duration: '8 Minggu',
    difficulty: 'Menengah',
    description: 'Persiapan Army Physical Fitness Test yang fokus pada push-ups, sit-ups, dan performa lari 2 mil.',
    objectives: ['Meraih skor 300 pada APFT', 'Membangun daya tahan otot', 'Meningkatkan performa lari'],
    equipment: ['Lintasan Lari'],
    workouts: [
      {
        day: 1,
        name: 'Latihan APFT',
        type: 'Untuk Waktu',
        exercises: [
          { name: 'Push-ups', reps: 'maksimal dalam 2 menit' },
          { name: 'Istirahat', duration: '5 menit' },
          { name: 'Sit-ups', reps: 'maksimal dalam 2 menit' },
          { name: 'Istirahat', duration: '5 menit' },
          { name: 'Lari', distance: '2 mil' }
        ],
        notes: 'Skor sempurna: Push-ups 77+, Sit-ups 82+, lari 2 mil di bawah 13:00 (bervariasi berdasarkan usia/jenis kelamin)'
      },
      {
        day: 2,
        name: 'Piramida Push-up',
        type: 'Kekuatan',
        exercises: [
          { name: 'Piramida Push-up', reps: '1-2-3-4-5-6-7-8-9-10-9-8-7-6-5-4-3-2-1', notes: 'Istirahat 10 detik antar set' }
        ]
      },
      {
        day: 3,
        name: 'Interval Lari',
        type: 'Daya Tahan',
        exercises: [
          { name: 'Lari Pemanasan', distance: '0.5 mil' },
          { name: 'Interval 400m', reps: '8', notes: 'Istirahat 90 detik di antara' },
          { name: 'Lari Pendinginan', distance: '0.5 mil' }
        ]
      }
    ]
  },

  // Strength Programs
  {
    id: '5x5-strength',
    name: 'StrongLifts 5x5',
    category: 'Kekuatan',
    duration: '12 Minggu',
    difficulty: 'Pemula',
    description: 'Program kekuatan sederhana namun efektif yang fokus pada gerakan compound. Membangun kekuatan mentah dengan progressive overload.',
    objectives: ['Meningkatkan kekuatan maksimal', 'Menguasai gerakan compound', 'Membangun massa otot'],
    equipment: ['Barbell', 'Squat Rack', 'Bench'],
    workouts: [
      {
        day: 1,
        name: 'Latihan A',
        type: 'Kekuatan',
        exercises: [
          { name: 'Squat', reps: '5x5' },
          { name: 'Bench Press', reps: '5x5' },
          { name: 'Barbell Row', reps: '5x5' }
        ],
        notes: 'Tambahkan 5lbs untuk setiap lift setiap sesi. Istirahat 3-5 menit antar set.'
      },
      {
        day: 2,
        name: 'Latihan B',
        type: 'Kekuatan',
        exercises: [
          { name: 'Squat', reps: '5x5' },
          { name: 'Overhead Press', reps: '5x5' },
          { name: 'Deadlift', reps: '1x5' }
        ],
        notes: 'Bergantian latihan A dan B. Latihan 3x per minggu dengan hari istirahat di antara.'
      }
    ],
    notes: 'Mulai dengan barbell kosong atau beban ringan. Fokus pada bentuk sempurna. Kurangi beban 10% jika gagal 3 sesi berturut-turut.'
  },

  // Endurance Programs
  {
    id: 'couch-to-5k',
    name: 'Couch to 5K',
    category: 'Daya Tahan',
    duration: '9 Minggu',
    difficulty: 'Pemula',
    description: 'Program lari progresif yang membawa Anda dari sofa hingga menyelesaikan lari 5K. Sempurna untuk pemula lari.',
    objectives: ['Lari 5K berkelanjutan', 'Membangun dasar aerobik', 'Membentuk kebiasaan lari'],
    equipment: ['Sepatu Lari'],
    workouts: [
      {
        day: 1,
        name: 'Minggu 1 - Hari 1',
        type: 'Daya Tahan',
        exercises: [
          { name: 'Jalan Pemanasan', duration: '5 menit' },
          { name: 'Interval Lari/Jalan', duration: '20 menit', notes: 'Bergantian 60 detik lari, 90 detik jalan x 8' },
          { name: 'Jalan Pendinginan', duration: '5 menit' }
        ]
      },
      {
        day: 2,
        name: 'Minggu 5 - Hari 1',
        type: 'Daya Tahan',
        exercises: [
          { name: 'Jalan Pemanasan', duration: '5 menit' },
          { name: 'Lari', duration: '5 menit' },
          { name: 'Jalan', duration: '3 menit' },
          { name: 'Lari', duration: '5 menit' },
          { name: 'Jalan', duration: '3 menit' },
          { name: 'Lari', duration: '5 menit' },
          { name: 'Jalan Pendinginan', duration: '5 menit' }
        ]
      },
      {
        day: 3,
        name: 'Minggu 9 - Hari 3',
        type: 'Daya Tahan',
        exercises: [
          { name: 'Jalan Pemanasan', duration: '5 menit' },
          { name: 'Lari', duration: '30 menit', notes: 'Lari berkelanjutan - Anda berhasil!' },
          { name: 'Jalan Pendinginan', duration: '5 menit' }
        ]
      }
    ],
    notes: 'Lari 3x per minggu dengan hari istirahat. Fokus pada waktu, bukan kecepatan. Ulangi minggu jika diperlukan.'
  }
];

export const programCategories = [
  'CrossFit',
  'Hyrox', 
  'Navy SEAL',
  'Militer',
  'Kekuatan',
  'Daya Tahan'
];