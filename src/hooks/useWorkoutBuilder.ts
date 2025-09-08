import { useState, useEffect, useCallback } from 'react';
import { WorkoutTemplate, WorkoutExercise, ExerciseLibraryItem, WorkoutBuilderState } from '@/types/workoutBuilder';
import { exerciseLibrary } from '@/data/exerciseLibrary';

export function useWorkoutBuilder() {
  const [state, setState] = useState<WorkoutBuilderState>({
    currentTemplate: null,
    exerciseLibrary: exerciseLibrary,
    isLoading: false,
    draggedItem: null,
    selectedExercises: [],
    filters: {
      category: 'All',
      muscleGroup: 'All',
      equipment: 'All',
      difficulty: 'All'
    }
  });

  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    const savedTemplates = localStorage.getItem('fitness-workout-templates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  };

  const saveTemplates = (updatedTemplates: WorkoutTemplate[]) => {
    setTemplates(updatedTemplates);
    localStorage.setItem('fitness-workout-templates', JSON.stringify(updatedTemplates));
  };

  const createNewTemplate = (): WorkoutTemplate => {
    return {
      id: `template-${Date.now()}`,
      name: 'New Workout',
      description: '',
      estimatedDuration: 60,
      difficulty: 'intermediate',
      targetMuscleGroups: [],
      exercises: [],
      restPeriods: [],
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      tags: []
    };
  };

  const setCurrentTemplate = (template: WorkoutTemplate | null) => {
    setState(prev => ({
      ...prev,
      currentTemplate: template,
      selectedExercises: template?.exercises || []
    }));
  };

  const addExercise = (exerciseItem: ExerciseLibraryItem, index?: number) => {
    const newExercise: WorkoutExercise = {
      id: `${exerciseItem.id}-${Date.now()}`,
      exerciseId: exerciseItem.id,
      exerciseName: exerciseItem.name,
      order: index !== undefined ? index : state.selectedExercises.length,
      sets: 3,
      reps: 10,
      weight: undefined,
      restTime: 60,
      notes: '',
      superset: false,
      dropset: false
    };

    setState(prev => {
      const updatedExercises = [...prev.selectedExercises];
      if (index !== undefined) {
        updatedExercises.splice(index, 0, newExercise);
        // Update order for subsequent exercises
        for (let i = index + 1; i < updatedExercises.length; i++) {
          updatedExercises[i].order = i;
        }
      } else {
        updatedExercises.push(newExercise);
      }

      const updatedTemplate = prev.currentTemplate ? {
        ...prev.currentTemplate,
        exercises: updatedExercises,
        lastModified: new Date().toISOString()
      } : null;

      return {
        ...prev,
        selectedExercises: updatedExercises,
        currentTemplate: updatedTemplate
      };
    });
  };

  const removeExercise = (exerciseId: string) => {
    setState(prev => {
      const updatedExercises = prev.selectedExercises
        .filter(ex => ex.id !== exerciseId)
        .map((ex, index) => ({ ...ex, order: index }));

      const updatedTemplate = prev.currentTemplate ? {
        ...prev.currentTemplate,
        exercises: updatedExercises,
        lastModified: new Date().toISOString()
      } : null;

      return {
        ...prev,
        selectedExercises: updatedExercises,
        currentTemplate: updatedTemplate
      };
    });
  };

  const reorderExercises = (startIndex: number, endIndex: number) => {
    setState(prev => {
      const updatedExercises = [...prev.selectedExercises];
      const [movedExercise] = updatedExercises.splice(startIndex, 1);
      updatedExercises.splice(endIndex, 0, movedExercise);
      
      // Update order property
      updatedExercises.forEach((ex, index) => {
        ex.order = index;
      });

      const updatedTemplate = prev.currentTemplate ? {
        ...prev.currentTemplate,
        exercises: updatedExercises,
        lastModified: new Date().toISOString()
      } : null;

      return {
        ...prev,
        selectedExercises: updatedExercises,
        currentTemplate: updatedTemplate
      };
    });
  };

  const updateExercise = (exerciseId: string, updates: Partial<WorkoutExercise>) => {
    setState(prev => {
      const updatedExercises = prev.selectedExercises.map(ex =>
        ex.id === exerciseId ? { ...ex, ...updates } : ex
      );

      const updatedTemplate = prev.currentTemplate ? {
        ...prev.currentTemplate,
        exercises: updatedExercises,
        lastModified: new Date().toISOString()
      } : null;

      return {
        ...prev,
        selectedExercises: updatedExercises,
        currentTemplate: updatedTemplate
      };
    });
  };

  const updateTemplate = (updates: Partial<WorkoutTemplate>) => {
    setState(prev => {
      if (!prev.currentTemplate) return prev;

      const updatedTemplate = {
        ...prev.currentTemplate,
        ...updates,
        lastModified: new Date().toISOString()
      };

      return {
        ...prev,
        currentTemplate: updatedTemplate
      };
    });
  };

  const saveTemplate = () => {
    if (!state.currentTemplate) return;

    const updatedTemplates = [...templates];
    const existingIndex = updatedTemplates.findIndex(t => t.id === state.currentTemplate!.id);
    
    if (existingIndex >= 0) {
      updatedTemplates[existingIndex] = state.currentTemplate;
    } else {
      updatedTemplates.push(state.currentTemplate);
    }

    saveTemplates(updatedTemplates);
  };

  const deleteTemplate = (templateId: string) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    saveTemplates(updatedTemplates);
  };

  const duplicateTemplate = (template: WorkoutTemplate) => {
    const duplicated: WorkoutTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Copy)`,
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    const updatedTemplates = [...templates, duplicated];
    saveTemplates(updatedTemplates);
    return duplicated;
  };

  const setFilters = (filters: Partial<typeof state.filters>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters }
    }));
  };

  const getFilteredExercises = useCallback(() => {
    return exerciseLibrary.filter(exercise => {
      if (state.filters.category !== 'All' && exercise.category !== state.filters.category) {
        return false;
      }
      if (state.filters.muscleGroup !== 'All' && !exercise.muscleGroups.includes(state.filters.muscleGroup)) {
        return false;
      }
      if (state.filters.equipment !== 'All') {
        if (state.filters.equipment === 'None' && exercise.equipment.length > 0) {
          return false;
        } else if (state.filters.equipment !== 'None' && !exercise.equipment.includes(state.filters.equipment)) {
          return false;
        }
      }
      if (state.filters.difficulty !== 'All' && exercise.difficulty !== state.filters.difficulty) {
        return false;
      }
      return true;
    });
  }, [state.filters]);

  const calculateEstimatedDuration = () => {
    if (!state.selectedExercises.length) return 0;
    
    // Estimate: (sets * reps * 3 seconds per rep) + (sets * rest time) + setup time per exercise
    const totalTime = state.selectedExercises.reduce((total, exercise) => {
      const workTime = exercise.sets * exercise.reps * 3; // 3 seconds per rep
      const restTime = exercise.sets * exercise.restTime;
      const setupTime = 60; // 1 minute setup per exercise
      return total + workTime + restTime + setupTime;
    }, 0);

    return Math.round(totalTime / 60); // Convert to minutes
  };

  const getWorkoutStats = () => {
    const exercises = state.selectedExercises;
    const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);
    const totalReps = exercises.reduce((sum, ex) => sum + (ex.sets * ex.reps), 0);
    const muscleGroups = [...new Set(
      exercises.flatMap(ex => {
        const libraryItem = exerciseLibrary.find(item => item.id === ex.exerciseId);
        return libraryItem?.muscleGroups || [];
      })
    )];

    return {
      totalExercises: exercises.length,
      totalSets,
      totalReps,
      estimatedDuration: calculateEstimatedDuration(),
      muscleGroups
    };
  };

  return {
    state,
    templates,
    createNewTemplate,
    setCurrentTemplate,
    addExercise,
    removeExercise,
    reorderExercises,
    updateExercise,
    updateTemplate,
    saveTemplate,
    deleteTemplate,
    duplicateTemplate,
    setFilters,
    getFilteredExercises,
    getWorkoutStats,
    loadTemplates
  };
}