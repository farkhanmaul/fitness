import { useState, useEffect } from 'react';
import { Icon } from '../ui/Icon';
import { ExerciseFormData, ExerciseFormErrors, ExerciseFormTip } from '@/types/exercise';
import { validateExerciseForm, getFieldValidationMessage } from '@/utils/exerciseValidation';
import { getExerciseTips, getHighPriorityTips } from '@/data/exerciseTips';
import { useProgression } from '@/hooks/useProgression';

interface ExerciseFormProps {
  exerciseName: string;
  exerciseId?: string;
  initialData?: Partial<ExerciseFormData>;
  onSubmit: (data: ExerciseFormData) => void;
  onCancel: () => void;
}

export function ExerciseForm({ exerciseName, exerciseId, initialData, onSubmit, onCancel }: ExerciseFormProps) {
  const [formData, setFormData] = useState<ExerciseFormData>({
    sets: initialData?.sets || 3,
    reps: initialData?.reps || 10,
    weight: initialData?.weight || undefined,
    duration: initialData?.duration || undefined,
    distance: initialData?.distance || undefined,
    restTime: initialData?.restTime || 60,
    notes: initialData?.notes || ''
  });

  const [errors, setErrors] = useState<ExerciseFormErrors>({});
  const [showTips, setShowTips] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [rpe, setRpe] = useState<number>(7); // Rate of Perceived Exertion

  const tips = getExerciseTips(exerciseName);
  const highPriorityTips = getHighPriorityTips(exerciseName);
  const { getRecommendedStats, recordWorkout } = useProgression();

  // Get progression recommendations if we have an exercise ID
  const recommendedStats = exerciseId ? getRecommendedStats(exerciseId, {
    sets: formData.sets,
    reps: formData.reps,
    weight: formData.weight,
    duration: formData.duration
  }) : null;

  useEffect(() => {
    const fieldErrors = validateExerciseForm(formData);
    const filteredErrors: ExerciseFormErrors = {};
    
    Object.entries(fieldErrors).forEach(([field, error]) => {
      if (touchedFields.has(field)) {
        filteredErrors[field] = error;
      }
    });
    
    setErrors(filteredErrors);
  }, [formData, touchedFields]);

  const handleInputChange = (field: keyof ExerciseFormData, value: string | number | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlur = (field: string) => {
    setTouchedFields(prev => new Set([...prev, field]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const allErrors = validateExerciseForm(formData);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setTouchedFields(new Set(Object.keys(formData)));
      return;
    }

    // Record workout for progression tracking
    if (exerciseId) {
      recordWorkout(exerciseId, {
        weight: formData.weight,
        reps: formData.reps,
        sets: formData.sets,
        duration: formData.duration,
        rpe: rpe,
        success: true, // Assume success when completing the form
        notes: formData.notes
      });
    }

    onSubmit({ ...formData, rpe } as ExerciseFormData & { rpe: number });
  };

  const getTipIcon = (type: ExerciseFormTip['type']) => {
    switch (type) {
      case 'cue': return 'lightbulb';
      case 'common-mistake': return 'alertTriangle';
      case 'safety': return 'shield';
      case 'progression': return 'trendingUp';
      default: return 'info';
    }
  };

  const getTipColor = (type: ExerciseFormTip['type']) => {
    switch (type) {
      case 'cue': return 'text-blue-600 dark:text-blue-400';
      case 'common-mistake': return 'text-red-600 dark:text-red-400';
      case 'safety': return 'text-orange-600 dark:text-orange-400';
      case 'progression': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Log {exerciseName}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mobile-touch-target"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* Progression Recommendations */}
          {recommendedStats && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="trendingUp" size={16} className="text-green-600 dark:text-green-400" />
                <span className="font-medium text-green-800 dark:text-green-200">Recommended for Your Level</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-green-800 dark:text-green-200">{recommendedStats.sets}</div>
                  <div className="text-green-600 dark:text-green-400">Sets</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-800 dark:text-green-200">{recommendedStats.reps}</div>
                  <div className="text-green-600 dark:text-green-400">Reps</div>
                </div>
                {recommendedStats.weight && (
                  <div className="text-center">
                    <div className="font-semibold text-green-800 dark:text-green-200">{recommendedStats.weight}kg</div>
                    <div className="text-green-600 dark:text-green-400">Weight</div>
                  </div>
                )}
                {recommendedStats.duration && (
                  <div className="text-center">
                    <div className="font-semibold text-green-800 dark:text-green-200">{Math.round(recommendedStats.duration)}s</div>
                    <div className="text-green-600 dark:text-green-400">Duration</div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    sets: recommendedStats.sets || prev.sets,
                    reps: recommendedStats.reps || prev.reps,
                    weight: recommendedStats.weight || prev.weight,
                    duration: recommendedStats.duration || prev.duration
                  }));
                }}
                className="mt-2 text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                Apply Recommendations
              </button>
            </div>
          )}

          {/* High Priority Tips */}
          {highPriorityTips.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="info" size={16} className="text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-blue-800 dark:text-blue-200">Quick Tips</span>
              </div>
              <ul className="space-y-1">
                {highPriorityTips.map(tip => (
                  <li key={tip.id} className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
                    <Icon name={getTipIcon(tip.type)} size={12} className="mt-0.5 flex-shrink-0" />
                    <span><strong>{tip.title}:</strong> {tip.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sets *
                </label>
                <input
                  type="number"
                  value={formData.sets}
                  onChange={(e) => handleInputChange('sets', parseInt(e.target.value) || 0)}
                  onBlur={() => handleBlur('sets')}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.sets 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  min="1"
                  max="20"
                />
                {errors.sets && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.sets}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reps *
                </label>
                <input
                  type="number"
                  value={formData.reps}
                  onChange={(e) => handleInputChange('reps', parseInt(e.target.value) || 0)}
                  onBlur={() => handleBlur('reps')}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.reps 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  min="1"
                  max="200"
                />
                {errors.reps && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.reps}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) => handleInputChange('weight', e.target.value ? parseFloat(e.target.value) : undefined)}
                  onBlur={() => handleBlur('weight')}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.weight 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  min="0"
                  max="1000"
                  step="0.5"
                  placeholder="Optional"
                />
                {errors.weight && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.weight}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rest Time (seconds)
                </label>
                <input
                  type="number"
                  value={formData.restTime || ''}
                  onChange={(e) => handleInputChange('restTime', e.target.value ? parseInt(e.target.value) : undefined)}
                  onBlur={() => handleBlur('restTime')}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.restTime 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  min="10"
                  max="600"
                  placeholder="60"
                />
                {errors.restTime && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.restTime}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  value={formData.duration || ''}
                  onChange={(e) => handleInputChange('duration', e.target.value ? parseInt(e.target.value) : undefined)}
                  onBlur={() => handleBlur('duration')}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.duration 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  min="1"
                  max="7200"
                  placeholder="Optional"
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.duration}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Distance (km)
                </label>
                <input
                  type="number"
                  value={formData.distance || ''}
                  onChange={(e) => handleInputChange('distance', e.target.value ? parseFloat(e.target.value) : undefined)}
                  onBlur={() => handleBlur('distance')}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.distance 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  min="0.1"
                  max="200"
                  step="0.1"
                  placeholder="Optional"
                />
                {errors.distance && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.distance}</p>
                )}
              </div>
            </div>

            {/* RPE (Rate of Perceived Exertion) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                RPE (Rate of Perceived Exertion)
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">1 = Very Easy, 10 = Maximum Effort</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={rpe}
                  onChange={(e) => setRpe(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className={`min-w-[3rem] text-center px-3 py-2 rounded-md font-medium ${
                  rpe <= 3 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  rpe <= 6 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  rpe <= 8 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {rpe}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {rpe <= 3 && 'Very Easy - Could do many more reps'}
                {rpe >= 4 && rpe <= 6 && 'Moderate - Could do a few more reps'}
                {rpe >= 7 && rpe <= 8 && 'Hard - Could do 1-3 more reps'}
                {rpe >= 9 && 'Very Hard - Could do 0-1 more reps'}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Any additional notes about this exercise..."
              />
            </div>

            {/* Tips Toggle */}
            {tips.length > 0 && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowTips(!showTips)}
                  className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mobile-touch-target"
                >
                  <Icon name={showTips ? 'chevronDown' : 'chevronRight'} size={16} />
                  <span>Form Tips & Safety ({tips.length})</span>
                </button>

                {showTips && (
                  <div className="mt-3 space-y-3">
                    {tips.map(tip => (
                      <div key={tip.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Icon 
                            name={getTipIcon(tip.type)} 
                            size={16} 
                            className={`mt-0.5 flex-shrink-0 ${getTipColor(tip.type)}`} 
                          />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white mb-1">
                              {tip.title}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {tip.description}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`text-xs px-2 py-1 rounded ${
                                tip.priority === 'high' 
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                  : tip.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                              }`}>
                                {tip.priority} priority
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                {tip.type.replace('-', ' ')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mobile-button-lg"
              >
                Log Exercise
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mobile-button-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}