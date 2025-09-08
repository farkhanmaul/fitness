import { useState } from 'react';
import { Icon } from '../ui/Icon';
import { nutritionTips, mealPlans, getTipsByCategory, getHighPriorityTips, getMealPlansByType, NutritionTip, MealPlan } from '@/data/nutritionTips';

interface NutritionGuideProps {
  isVisible: boolean;
  onClose: () => void;
}

type ViewType = 'tips' | 'meals';
type TipCategory = 'all' | 'pre-workout' | 'post-workout' | 'general' | 'hydration' | 'supplements';
type MealType = 'all' | 'performance' | 'cutting' | 'bulking' | 'maintenance';

export function NutritionGuide({ isVisible, onClose }: NutritionGuideProps) {
  const [activeView, setActiveView] = useState<ViewType>('tips');
  const [selectedTipCategory, setSelectedTipCategory] = useState<TipCategory>('all');
  const [selectedMealType, setSelectedMealType] = useState<MealType>('all');
  const [selectedMealPlan, setSelectedMealPlan] = useState<MealPlan | null>(null);

  if (!isVisible) return null;

  const filteredTips = selectedTipCategory === 'all' 
    ? nutritionTips 
    : getTipsByCategory(selectedTipCategory as NutritionTip['category']);

  const filteredMealPlans = selectedMealType === 'all' 
    ? mealPlans 
    : getMealPlansByType(selectedMealType as MealPlan['type']);

  const highPriorityTips = getHighPriorityTips();

  const getCategoryIcon = (category: NutritionTip['category']) => {
    switch (category) {
      case 'pre-workout': return 'play';
      case 'post-workout': return 'refreshCw';
      case 'general': return 'heart';
      case 'hydration': return 'droplets';
      case 'supplements': return 'pill';
      default: return 'info';
    }
  };

  const getCategoryColor = (category: NutritionTip['category']) => {
    switch (category) {
      case 'pre-workout': return 'text-blue-600 dark:text-blue-400';
      case 'post-workout': return 'text-green-600 dark:text-green-400';
      case 'general': return 'text-purple-600 dark:text-purple-400';
      case 'hydration': return 'text-cyan-600 dark:text-cyan-400';
      case 'supplements': return 'text-orange-600 dark:text-orange-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getPlanTypeColor = (type: MealPlan['type']) => {
    switch (type) {
      case 'performance': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'cutting': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'bulking': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'maintenance': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Icon name="apple" size={24} />
              Panduan Nutrisi
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mobile-touch-target"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* Quick Tips Section */}
          {activeView === 'tips' && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="star" size={16} className="text-green-600 dark:text-green-400" />
                <span className="font-medium text-green-800 dark:text-green-200">Tips Penting</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {highPriorityTips.slice(0, 4).map(tip => (
                  <div key={tip.id} className="flex items-start gap-2 text-sm">
                    <Icon name={getCategoryIcon(tip.category)} size={14} className={`mt-0.5 flex-shrink-0 ${getCategoryColor(tip.category)}`} />
                    <div>
                      <span className="font-medium text-green-800 dark:text-green-200">{tip.title}:</span>
                      <span className="text-green-700 dark:text-green-300 ml-1">{tip.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* View Toggle */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setActiveView('tips')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors mobile-button-lg ${
                activeView === 'tips'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon name="lightbulb" size={16} className="mr-2" />
              Tips Nutrisi
            </button>
            <button
              onClick={() => setActiveView('meals')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors mobile-button-lg ${
                activeView === 'meals'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon name="utensils" size={16} className="mr-2" />
              Rencana Makan
            </button>
          </div>

          {/* Tips View */}
          {activeView === 'tips' && (
            <>
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(['all', 'pre-workout', 'post-workout', 'general', 'hydration', 'supplements'] as TipCategory[]).map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedTipCategory(category)}
                    className={`px-3 py-1.5 rounded-md text-sm capitalize transition-colors mobile-button-lg ${
                      selectedTipCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.replace('-', ' ')}
                  </button>
                ))}
              </div>

              {/* Tips Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTips.map(tip => (
                  <div key={tip.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <Icon 
                        name={getCategoryIcon(tip.category)} 
                        size={20} 
                        className={`flex-shrink-0 ${getCategoryColor(tip.category)}`} 
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {tip.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {tip.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded capitalize ${
                            tip.priority === 'high' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : tip.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                          }`}>
                            {tip.priority} priority
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {tip.category.replace('-', ' ')}
                          </span>
                          {tip.timing && (
                            <span className="text-xs text-blue-600 dark:text-blue-400">
                              {tip.timing}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Meal Plans View */}
          {activeView === 'meals' && !selectedMealPlan && (
            <>
              {/* Meal Type Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(['all', 'performance', 'cutting', 'bulking', 'maintenance'] as MealType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedMealType(type)}
                    className={`px-3 py-1.5 rounded-md text-sm capitalize transition-colors mobile-button-lg ${
                      selectedMealType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Meal Plans Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredMealPlans.map(plan => (
                  <div key={plan.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {plan.name}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPlanTypeColor(plan.type)}`}>
                        {plan.type}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {plan.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Kalori</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{plan.calories}</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Durasi</div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">{plan.duration}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Makro</div>
                      <div className="flex gap-3">
                        <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                          Protein: {plan.macros.protein}%
                        </span>
                        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                          Karbohidrat: {plan.macros.carbs}%
                        </span>
                        <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded">
                          Lemak: {plan.macros.fats}%
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedMealPlan(plan)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mobile-button-lg"
                    >
                      Lihat Rencana Lengkap
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Selected Meal Plan Detail */}
          {activeView === 'meals' && selectedMealPlan && (
            <div>
              <button
                onClick={() => setSelectedMealPlan(null)}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 mobile-touch-target"
              >
                <Icon name="arrowLeft" size={16} />
                Kembali ke Rencana Makan
              </button>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedMealPlan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedMealPlan.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-md text-sm font-medium capitalize ${getPlanTypeColor(selectedMealPlan.type)}`}>
                    {selectedMealPlan.type}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedMealPlan.calories}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Kalori Harian</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{selectedMealPlan.macros.protein}%</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Protein</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{selectedMealPlan.duration}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Durasi</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Jadwal Makan Harian</h4>
                  {selectedMealPlan.meals.map((meal, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Icon name="clock" size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="font-medium text-gray-900 dark:text-white">{meal.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{meal.time}</span>
                        </div>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{meal.calories} cal</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {meal.foods.map((food, foodIndex) => (
                          <span key={foodIndex} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}