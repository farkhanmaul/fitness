import { useState, useCallback } from 'react';
import { Exercise } from '@/data/exercises';
import { WorkoutProgram } from '@/data/programs';
import { MovementPattern } from '@/data/movement-patterns';
import { TrainingPrinciple } from '@/data/training-principles';

export interface SelectionState {
  selectedExercise: Exercise | null;
  selectedProgram: WorkoutProgram | null;
  selectedMovement: MovementPattern | null;
  selectedPrinciple: TrainingPrinciple | null;
  selectedExerciseForLog: Exercise | null;
}

export function useSelections() {
  const [selections, setSelections] = useState<SelectionState>({
    selectedExercise: null,
    selectedProgram: null,
    selectedMovement: null,
    selectedPrinciple: null,
    selectedExerciseForLog: null,
  });

  const setSelection = useCallback(<K extends keyof SelectionState>(
    key: K,
    value: SelectionState[K]
  ) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSelections = useCallback(() => {
    setSelections({
      selectedExercise: null,
      selectedProgram: null,
      selectedMovement: null,
      selectedPrinciple: null,
      selectedExerciseForLog: null,
    });
  }, []);

  const resetExerciseSelections = useCallback(() => {
    setSelections(prev => ({
      ...prev,
      selectedExercise: null,
      selectedExerciseForLog: null,
    }));
  }, []);

  return {
    selections,
    setSelection,
    resetSelections,
    resetExerciseSelections,
  };
}