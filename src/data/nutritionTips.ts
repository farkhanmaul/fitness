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
    title: 'Fuel Up 30-60 Minutes Before',
    description: 'Eat a light meal with carbs and moderate protein 30-60 minutes before your workout for optimal energy.',
    category: 'pre-workout',
    priority: 'high',
    timing: '30-60 minutes before workout'
  },
  {
    id: 'pre-2',
    title: 'Avoid Heavy Fats Before Training',
    description: 'Skip high-fat foods before workouts as they take longer to digest and may cause discomfort.',
    category: 'pre-workout',
    priority: 'medium',
    timing: '2-3 hours before workout'
  },
  {
    id: 'pre-3',
    title: 'Quick Energy Sources',
    description: 'Good pre-workout snacks: banana with honey, oatmeal, or a small energy bar.',
    category: 'pre-workout',
    priority: 'medium',
    timing: '15-30 minutes before workout'
  },
  {
    id: 'post-1',
    title: 'Protein Within 30 Minutes',
    description: 'Consume 20-40g of protein within 30 minutes after training to maximize muscle protein synthesis.',
    category: 'post-workout',
    priority: 'high',
    timing: 'Within 30 minutes post-workout'
  },
  {
    id: 'post-2',
    title: 'Carb Replenishment',
    description: 'Include carbohydrates post-workout to replenish glycogen stores, especially after intense training.',
    category: 'post-workout',
    priority: 'high',
    timing: 'Within 2 hours post-workout'
  },
  {
    id: 'post-3',
    title: 'Recovery Meal Ideas',
    description: 'Great post-workout meals: protein shake with fruit, chicken with rice, or Greek yogurt with berries.',
    category: 'post-workout',
    priority: 'medium',
    timing: 'Within 1-2 hours post-workout'
  },
  {
    id: 'hydration-1',
    title: 'Drink Water Throughout the Day',
    description: 'Aim for at least 8-10 glasses of water daily, more if you\'re training intensely or in hot weather.',
    category: 'hydration',
    priority: 'high'
  },
  {
    id: 'hydration-2',
    title: 'Pre-Hydrate',
    description: 'Drink 16-20oz of water 2-3 hours before exercise and 8oz 15-20 minutes before.',
    category: 'hydration',
    priority: 'high',
    timing: '2-3 hours before workout'
  },
  {
    id: 'hydration-3',
    title: 'Electrolyte Balance',
    description: 'For workouts longer than 60 minutes or intense sweating, consider electrolyte replacement.',
    category: 'hydration',
    priority: 'medium'
  },
  {
    id: 'general-1',
    title: 'Eat the Rainbow',
    description: 'Include a variety of colorful fruits and vegetables to ensure adequate micronutrient intake.',
    category: 'general',
    priority: 'high'
  },
  {
    id: 'general-2',
    title: 'Prioritize Whole Foods',
    description: 'Base your diet on whole, minimally processed foods for better nutrient density and satiety.',
    category: 'general',
    priority: 'high'
  },
  {
    id: 'general-3',
    title: 'Meal Timing Consistency',
    description: 'Try to eat at consistent times daily to regulate metabolism and energy levels.',
    category: 'general',
    priority: 'medium'
  },
  {
    id: 'general-4',
    title: 'Don\'t Skip Breakfast',
    description: 'Start your day with a balanced breakfast including protein to kickstart your metabolism.',
    category: 'general',
    priority: 'medium'
  },
  {
    id: 'supplements-1',
    title: 'Creatine for Power',
    description: '3-5g of creatine monohydrate daily can improve strength and power output in high-intensity training.',
    category: 'supplements',
    priority: 'medium'
  },
  {
    id: 'supplements-2',
    title: 'Vitamin D for Recovery',
    description: 'Many athletes are deficient in Vitamin D, which is crucial for bone health and immune function.',
    category: 'supplements',
    priority: 'medium'
  },
  {
    id: 'supplements-3',
    title: 'Food First Approach',
    description: 'Try to get nutrients from whole foods first before considering supplementation.',
    category: 'supplements',
    priority: 'high'
  }
];

export const mealPlans: MealPlan[] = [
  {
    id: 'performance-1',
    name: 'Athletic Performance Plan',
    description: 'High-energy meal plan designed for intense training and optimal performance',
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
        name: 'Breakfast',
        time: '7:00 AM',
        foods: ['Oatmeal with banana and berries', 'Greek yogurt', 'Honey', 'Almonds'],
        calories: 520
      },
      {
        name: 'Pre-Workout Snack',
        time: '9:30 AM',
        foods: ['Banana', 'Small coffee'],
        calories: 120
      },
      {
        name: 'Post-Workout',
        time: '11:30 AM',
        foods: ['Protein shake', 'Apple'],
        calories: 280
      },
      {
        name: 'Lunch',
        time: '1:00 PM',
        foods: ['Grilled chicken breast', 'Brown rice', 'Mixed vegetables', 'Olive oil'],
        calories: 650
      },
      {
        name: 'Afternoon Snack',
        time: '4:00 PM',
        foods: ['Greek yogurt with nuts'],
        calories: 200
      },
      {
        name: 'Dinner',
        time: '7:00 PM',
        foods: ['Salmon fillet', 'Sweet potato', 'Broccoli', 'Avocado'],
        calories: 720
      },
      {
        name: 'Evening Snack',
        time: '9:00 PM',
        foods: ['Casein protein shake', 'Berries'],
        calories: 310
      }
    ]
  },
  {
    id: 'cutting-1',
    name: 'Fat Loss Plan',
    description: 'Calorie-controlled plan for fat loss while maintaining muscle mass',
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
        name: 'Breakfast',
        time: '7:00 AM',
        foods: ['Egg whites with vegetables', 'Whole grain toast', 'Avocado slice'],
        calories: 350
      },
      {
        name: 'Mid-Morning',
        time: '10:00 AM',
        foods: ['Protein shake', 'Handful of berries'],
        calories: 200
      },
      {
        name: 'Lunch',
        time: '1:00 PM',
        foods: ['Grilled chicken salad', 'Olive oil dressing', 'Quinoa'],
        calories: 450
      },
      {
        name: 'Pre-Workout',
        time: '4:00 PM',
        foods: ['Apple with almond butter'],
        calories: 180
      },
      {
        name: 'Post-Workout',
        time: '6:30 PM',
        foods: ['Protein shake'],
        calories: 150
      },
      {
        name: 'Dinner',
        time: '8:00 PM',
        foods: ['Lean fish', 'Steamed vegetables', 'Small sweet potato'],
        calories: 480
      },
      {
        name: 'Evening',
        time: '10:00 PM',
        foods: ['Greek yogurt with cinnamon'],
        calories: 190
      }
    ]
  },
  {
    id: 'bulking-1',
    name: 'Muscle Building Plan',
    description: 'High-calorie plan focused on muscle growth and strength gains',
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
        name: 'Breakfast',
        time: '7:00 AM',
        foods: ['Large bowl of oatmeal', 'Whole milk', 'Banana', 'Peanut butter', 'Protein powder'],
        calories: 680
      },
      {
        name: 'Mid-Morning',
        time: '10:00 AM',
        foods: ['Trail mix', 'Protein bar'],
        calories: 400
      },
      {
        name: 'Lunch',
        time: '1:00 PM',
        foods: ['Large chicken breast', 'Brown rice', 'Black beans', 'Cheese', 'Vegetables'],
        calories: 750
      },
      {
        name: 'Pre-Workout',
        time: '4:00 PM',
        foods: ['Banana', 'Dates', 'Coffee'],
        calories: 200
      },
      {
        name: 'Post-Workout',
        time: '6:30 PM',
        foods: ['Protein shake with milk', 'Fruit'],
        calories: 350
      },
      {
        name: 'Dinner',
        time: '8:00 PM',
        foods: ['Lean beef', 'Pasta', 'Marinara sauce', 'Garlic bread', 'Salad'],
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