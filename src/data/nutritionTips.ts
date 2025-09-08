export interface NutritionTip {
  id: string;
  title: string;
  description: string;
  category: 'pre-workout' | 'post-workout' | 'general' | 'hydration' | 'supplements';
  priority: 'high' | 'medium' | 'low';
  timing?: string;
}

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  type: 'bulking' | 'cutting' | 'maintenance' | 'performance';
  duration: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  meals: {
    name: string;
    time: string;
    foods: string[];
    calories: number;
  }[];
}

export const nutritionTips: NutritionTip[] = [
  {
    id: 'pre-1',
    title: 'Isi Energi 30-60 Menit Sebelumnya',
    description: 'Makan makanan ringan dengan karbohidrat dan protein sedang 30-60 menit sebelum workout untuk energi optimal.',
    category: 'pre-workout',
    priority: 'high',
    timing: '30-60 menit sebelum workout'
  },
  {
    id: 'pre-2',
    title: 'Hindari Lemak Berat Sebelum Latihan',
    description: 'Lewati makanan berlemak tinggi sebelum workout karena butuh waktu lama dicerna dan dapat menyebabkan ketidaknyamanan.',
    category: 'pre-workout',
    priority: 'medium',
    timing: '2-3 jam sebelum workout'
  },
  {
    id: 'pre-3',
    title: 'Sumber Energi Cepat',
    description: 'Camilan pre-workout yang baik: pisang dengan madu, oatmeal, atau energy bar kecil.',
    category: 'pre-workout',
    priority: 'medium',
    timing: '15-30 menit sebelum workout'
  },
  {
    id: 'post-1',
    title: 'Protein dalam 30 Menit',
    description: 'Konsumsi 20-40g protein dalam 30 menit setelah latihan untuk memaksimalkan sintesis protein otot.',
    category: 'post-workout',
    priority: 'high',
    timing: 'Dalam 30 menit setelah workout'
  },
  {
    id: 'post-2',
    title: 'Pengisian Karbohidrat',
    description: 'Sertakan karbohidrat setelah workout untuk mengisi kembali cadangan glikogen, terutama setelah latihan intensif.',
    category: 'post-workout',
    priority: 'high',
    timing: 'Dalam 2 jam setelah workout'
  },
  {
    id: 'post-3',
    title: 'Ide Makanan Pemulihan',
    description: 'Makanan post-workout yang bagus: protein shake dengan buah, ayam dengan nasi, atau Greek yogurt dengan berry.',
    category: 'post-workout',
    priority: 'medium',
    timing: 'Dalam 1-2 jam setelah workout'
  },
  {
    id: 'hydration-1',
    title: 'Minum Air Sepanjang Hari',
    description: 'Targetkan minimal 8-10 gelas air harian, lebih banyak jika latihan intensif atau cuaca panas.',
    category: 'hydration',
    priority: 'high'
  },
  {
    id: 'hydration-2',
    title: 'Hidrasi Awal',
    description: 'Minum 500-600ml air 2-3 jam sebelum olahraga dan 250ml 15-20 menit sebelumnya.',
    category: 'hydration',
    priority: 'high',
    timing: '2-3 jam sebelum workout'
  },
  {
    id: 'hydration-3',
    title: 'Keseimbangan Elektrolit',
    description: 'Untuk workout lebih dari 60 menit atau berkeringat intensif, pertimbangkan penggantian elektrolit.',
    category: 'hydration',
    priority: 'medium'
  },
  {
    id: 'general-1',
    title: 'Makan Beraneka Warna',
    description: 'Sertakan berbagai buah dan sayuran berwarna untuk memastikan asupan mikronutrien yang cukup.',
    category: 'general',
    priority: 'high'
  },
  {
    id: 'general-2',
    title: 'Prioritaskan Makanan Utuh',
    description: 'Basarkan diet pada makanan utuh dan minim proses untuk kepadatan nutrisi dan rasa kenyang yang lebih baik.',
    category: 'general',
    priority: 'high'
  },
  {
    id: 'general-3',
    title: 'Konsistensi Waktu Makan',
    description: 'Usahakan makan pada waktu yang konsisten setiap hari untuk mengatur metabolisme dan tingkat energi.',
    category: 'general',
    priority: 'medium'
  },
  {
    id: 'general-4',
    title: 'Jangan Lewatkan Sarapan',
    description: 'Mulai hari dengan sarapan seimbang termasuk protein untuk memulai metabolisme.',
    category: 'general',
    priority: 'medium'
  },
  {
    id: 'supplements-1',
    title: 'Kreatin untuk Daya',
    description: '3-5g kreatin monohidrat harian dapat meningkatkan kekuatan dan output daya pada latihan intensitas tinggi.',
    category: 'supplements',
    priority: 'medium'
  },
  {
    id: 'supplements-2',
    title: 'Vitamin D untuk Pemulihan',
    description: 'Banyak atlet kekurangan Vitamin D, yang penting untuk kesehatan tulang dan fungsi imun.',
    category: 'supplements',
    priority: 'medium'
  },
  {
    id: 'supplements-3',
    title: 'Pendekatan Makanan Pertama',
    description: 'Usahakan mendapatkan nutrisi dari makanan utuh terlebih dahulu sebelum mempertimbangkan suplementasi.',
    category: 'supplements',
    priority: 'high'
  }
];

export const mealPlans: MealPlan[] = [
  {
    id: 'performance-1',
    name: 'Rencana Performa Atletik',
    description: 'Rencana makan berenergi tinggi dirancang untuk latihan intensif dan performa optimal',
    type: 'performance',
    duration: '1 week',
    calories: 2800,
    macros: {
      protein: 35,
      carbs: 45,
      fats: 20
    },
    meals: [
      {
        name: 'Sarapan',
        time: '7:00 AM',
        foods: ['Oatmeal dengan pisang dan berry', 'Greek yogurt', 'Madu', 'Almond'],
        calories: 520
      },
      {
        name: 'Camilan Pre-Workout',
        time: '9:30 AM',
        foods: ['Pisang', 'Kopi kecil'],
        calories: 120
      },
      {
        name: 'Post-Workout',
        time: '11:30 AM',
        foods: ['Protein shake', 'Apel'],
        calories: 280
      },
      {
        name: 'Makan Siang',
        time: '1:00 PM',
        foods: ['Dada ayam panggang', 'Nasi merah', 'Sayuran campuran', 'Minyak zaitun'],
        calories: 650
      },
      {
        name: 'Camilan Sore',
        time: '4:00 PM',
        foods: ['Greek yogurt dengan kacang'],
        calories: 200
      },
      {
        name: 'Makan Malam',
        time: '7:00 PM',
        foods: ['Fillet salmon', 'Ubi jalar', 'Brokoli', 'Alpukat'],
        calories: 720
      },
      {
        name: 'Camilan Malam',
        time: '9:00 PM',
        foods: ['Casein protein shake', 'Berry'],
        calories: 310
      }
    ]
  },
  {
    id: 'cutting-1',
    name: 'Rencana Penurunan Lemak',
    description: 'Rencana terkontrol kalori untuk penurunan lemak sambil mempertahankan massa otot',
    type: 'cutting',
    duration: '4 weeks',
    calories: 2000,
    macros: {
      protein: 40,
      carbs: 30,
      fats: 30
    },
    meals: [
      {
        name: 'Sarapan',
        time: '7:00 AM',
        foods: ['Putih telur dengan sayuran', 'Roti gandum utuh', 'Irisan alpukat'],
        calories: 350
      },
      {
        name: 'Pagi Tengah',
        time: '10:00 AM',
        foods: ['Protein shake', 'Segenggam berry'],
        calories: 200
      },
      {
        name: 'Makan Siang',
        time: '1:00 PM',
        foods: ['Salad ayam panggang', 'Dressing minyak zaitun', 'Quinoa'],
        calories: 450
      },
      {
        name: 'Pre-Workout',
        time: '4:00 PM',
        foods: ['Apel dengan selai almond'],
        calories: 180
      },
      {
        name: 'Post-Workout',
        time: '6:30 PM',
        foods: ['Protein shake'],
        calories: 150
      },
      {
        name: 'Makan Malam',
        time: '8:00 PM',
        foods: ['Ikan tanpa lemak', 'Sayuran kukus', 'Ubi jalar kecil'],
        calories: 480
      },
      {
        name: 'Malam',
        time: '10:00 PM',
        foods: ['Greek yogurt dengan kayu manis'],
        calories: 190
      }
    ]
  },
  {
    id: 'bulking-1',
    name: 'Rencana Pembentukan Otot',
    description: 'Rencana kalori tinggi fokus pada pertumbuhan otot dan peningkatan kekuatan',
    type: 'bulking',
    duration: '8 weeks',
    calories: 3200,
    macros: {
      protein: 30,
      carbs: 50,
      fats: 20
    },
    meals: [
      {
        name: 'Sarapan',
        time: '7:00 AM',
        foods: ['Mangkuk besar oatmeal', 'Susu murni', 'Pisang', 'Selai kacang', 'Protein powder'],
        calories: 680
      },
      {
        name: 'Pagi Tengah',
        time: '10:00 AM',
        foods: ['Campuran kacang', 'Protein bar'],
        calories: 400
      },
      {
        name: 'Makan Siang',
        time: '1:00 PM',
        foods: ['Dada ayam besar', 'Nasi merah', 'Kacang hitam', 'Keju', 'Sayuran'],
        calories: 750
      },
      {
        name: 'Pre-Workout',
        time: '4:00 PM',
        foods: ['Pisang', 'Kurma', 'Kopi'],
        calories: 200
      },
      {
        name: 'Post-Workout',
        time: '6:30 PM',
        foods: ['Protein shake dengan susu', 'Buah'],
        calories: 350
      },
      {
        name: 'Makan Malam',
        time: '8:00 PM',
        foods: ['Daging sapi tanpa lemak', 'Pasta', 'Saus marinara', 'Roti bawang putih', 'Salad'],
        calories: 820
      }
    ]
  }
];

export function getTipsByCategory(category: NutritionTip['category']): NutritionTip[] {
  return nutritionTips.filter(tip => tip.category === category);
}

export function getHighPriorityTips(): NutritionTip[] {
  return nutritionTips.filter(tip => tip.priority === 'high');
}

export function getMealPlansByType(type: MealPlan['type']): MealPlan[] {
  return mealPlans.filter(plan => plan.type === type);
}