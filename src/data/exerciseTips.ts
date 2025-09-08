import { ExerciseFormTip } from '@/types/exercise';

export const exerciseTips: { [exerciseName: string]: ExerciseFormTip[] } = {
  'Push-ups': [
    {
      id: 'pushup-1',
      title: 'Jaga Core Kencang',
      description: 'Pertahankan garis lurus dari kepala ke tumit dengan mengaktifkan core sepanjang gerakan.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'pushup-2',
      title: 'Rentang Gerak Penuh',
      description: 'Turunkan dada hingga hampir menyentuh lantai, lalu dorong naik hingga lengan fully ekstensi.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'pushup-3',
      title: 'Hindari Pinggul Melorot',
      description: 'Jangan biarkan pinggul melorot atau terangkat. Ini mengurangi efektivitas dan dapat menegang punggung bawah.',
      type: 'common-mistake',
      priority: 'medium'
    }
  ],
  'Squats': [
    {
      id: 'squat-1',
      title: 'Lutut Sejajar Jari Kaki',
      description: 'Jaga lutut sejajar dengan jari kaki sepanjang gerakan untuk mencegah cedera.',
      type: 'safety',
      priority: 'high'
    },
    {
      id: 'squat-2',
      title: 'Hip Hinge Terlebih Dahulu',
      description: 'Mulai gerakan dengan mendorong pinggul ke belakang, bukan menekuk lutut terlebih dahulu.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'squat-3',
      title: 'Dada Tegak, Core Aktif',
      description: 'Jaga dada tegak dan core kencang untuk menjaga alignment tulang belakang yang tepat.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'Deadlifts': [
    {
      id: 'deadlift-1',
      title: 'Jaga Bar Dekat',
      description: 'Bar harus tetap dekat dengan tubuh sepanjang seluruh gerakan.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'deadlift-2',
      title: 'Tulang Belakang Netral',
      description: 'Pertahankan posisi tulang belakang netral - hindari membungkukkan punggung.',
      type: 'safety',
      priority: 'high'
    },
    {
      id: 'deadlift-3',
      title: 'Dorong Melalui Tumit',
      description: 'Dorong melalui tumit dan aktifkan glutes untuk mengangkat beban.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'Pull-ups': [
    {
      id: 'pullup-1',
      title: 'Posisi Gantung Penuh',
      description: 'Mulai dari gantung penuh dengan lengan ekstensi dan bahu aktif.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'pullup-2',
      title: 'Tarik dengan Punggung',
      description: 'Fokus menarik dengan otot punggung, bukan hanya lengan.',
      type: 'cue',
      priority: 'medium'
    },
    {
      id: 'pullup-3',
      title: 'Turun Terkontrol',
      description: 'Turunkan diri perlahan dan terkontrol - jangan sekadar jatuh.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'Burpees': [
    {
      id: 'burpee-1',
      title: 'Mendarat Lembut',
      description: 'Mendarat lembut pada ujung kaki saat melompat naik turun.',
      type: 'safety',
      priority: 'high'
    },
    {
      id: 'burpee-2',
      title: 'Opsi Melangkah Mundur',
      description: 'Jika pemula, melangkah mundur alih-alih melompat ke posisi plank.',
      type: 'progression',
      priority: 'medium'
    },
    {
      id: 'burpee-3',
      title: 'Jaga Ritme',
      description: 'Temukan ritme yang berkelanjutan daripada terburu-buru melakukan gerakan.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'Planks': [
    {
      id: 'plank-1',
      title: 'Garis Lurus',
      description: 'Pertahankan garis lurus dari kepala hingga tumit.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'plank-2',
      title: 'Bernapas Normal',
      description: 'Jangan tahan napas - pertahankan pernapasan stabil sepanjang gerakan.',
      type: 'cue',
      priority: 'medium'
    },
    {
      id: 'plank-3',
      title: 'Mulai Kecil',
      description: 'Mulai dengan hold 15-30 detik dan tingkatkan waktu secara bertahap.',
      type: 'progression',
      priority: 'low'
    }
  ],
  'Mountain Climbers': [
    {
      id: 'mountain-1',
      title: 'Posisi Plank Kuat',
      description: 'Pertahankan posisi plank kuat dengan tangan tepat di bawah bahu.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'mountain-2',
      title: 'Lutut ke Dada',
      description: 'Dorong lutut menuju dada, bukan hanya naik turun.',
      type: 'cue',
      priority: 'medium'
    },
    {
      id: 'mountain-3',
      title: 'Kontrol Kecepatan',
      description: 'Fokus pada kontrol dan bentuk yang tepat daripada kecepatan.',
      type: 'common-mistake',
      priority: 'medium'
    }
  ],
  'Lunges': [
    {
      id: 'lunge-1',
      title: 'Melangkah Lebar',
      description: 'Ambil langkah cukup besar untuk membuat sudut 90 derajat di kedua lutut.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'lunge-2',
      title: 'Kontrol Penurunan',
      description: 'Turun perlahan dan kontrol gerakan - jangan jatuh keras.',
      type: 'safety',
      priority: 'medium'
    }
  ],
  'Jumping Jacks': [
    {
      id: 'jj-1',
      title: 'Mendarat di Ujung Kaki',
      description: 'Mendarat lembut di ujung kaki untuk mengurangi impact.',
      type: 'safety',
      priority: 'high'
    },
    {
      id: 'jj-2',
      title: 'Rentang Gerak Penuh',
      description: 'Angkat lengan sepenuhnya ke atas dan kaki lebar untuk manfaat maksimal.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'High Knees': [
    {
      id: 'hk-1',
      title: 'Lutut Setinggi Pinggul',
      description: 'Dorong lutut naik minimal setinggi pinggul untuk bentuk yang tepat.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'hk-2',
      title: 'Tetap di Ujung Kaki',
      description: 'Tetap ringan di kaki dan hindari mendarat dengan kaki datar.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'Sit-ups': [
    {
      id: 'situp-1',
      title: 'Hindari Ketegangan Leher',
      description: 'Jangan tarik leher. Jaga dagu sedikit menunduk.',
      type: 'safety',
      priority: 'high'
    },
    {
      id: 'situp-2',
      title: 'Kontrol Gerakan',
      description: 'Bergerak perlahan dan terkontrol, jangan gunakan momentum.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'Bicycle Crunches': [
    {
      id: 'bicycle-1',
      title: 'Jangan Terburu-buru',
      description: 'Bergerak perlahan untuk mempertahankan bentuk tepat dan aktivasi core.',
      type: 'common-mistake',
      priority: 'high'
    },
    {
      id: 'bicycle-2',
      title: 'Siku Berlawanan ke Lutut',
      description: 'Fokus membawa siku berlawanan menuju lutut berlawanan.',
      type: 'cue',
      priority: 'medium'
    }
  ]
};

export function getExerciseTips(exerciseName: string): ExerciseFormTip[] {
  return exerciseTips[exerciseName] || [];
}

export function getTipsByType(exerciseName: string, type: ExerciseFormTip['type']): ExerciseFormTip[] {
  const tips = getExerciseTips(exerciseName);
  return tips.filter(tip => tip.type === type);
}

export function getHighPriorityTips(exerciseName: string): ExerciseFormTip[] {
  const tips = getExerciseTips(exerciseName);
  return tips.filter(tip => tip.priority === 'high');
}