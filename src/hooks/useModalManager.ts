import { useState, useCallback } from 'react';

export interface ModalState {
  showSidebar: boolean;
  showRestTimer: boolean;
  showWorkoutCalendar: boolean;
  showExerciseForm: boolean;
  showNutritionGuide: boolean;
  showAchievements: boolean;
  showProgression: boolean;
  showAnalytics: boolean;
  showWorkoutBuilder: boolean;
  showSearchShortcuts: boolean;
  showWorkoutHistory: boolean;
}

export function useModalManager() {
  const [modals, setModals] = useState<ModalState>({
    showSidebar: false,
    showRestTimer: false,
    showWorkoutCalendar: false,
    showExerciseForm: false,
    showNutritionGuide: false,
    showAchievements: false,
    showProgression: false,
    showAnalytics: false,
    showWorkoutBuilder: false,
    showSearchShortcuts: false,
    showWorkoutHistory: false,
  });

  const openModal = useCallback((modalName: keyof ModalState) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  }, []);

  const closeModal = useCallback((modalName: keyof ModalState) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  }, []);

  const toggleModal = useCallback((modalName: keyof ModalState) => {
    setModals(prev => ({ ...prev, [modalName]: !prev[modalName] }));
  }, []);

  const closeAllModals = useCallback(() => {
    setModals({
      showSidebar: false,
      showRestTimer: false,
      showWorkoutCalendar: false,
      showExerciseForm: false,
      showNutritionGuide: false,
      showAchievements: false,
      showProgression: false,
      showAnalytics: false,
      showWorkoutBuilder: false,
      showSearchShortcuts: false,
      showWorkoutHistory: false,
    });
  }, []);

  return {
    modals,
    openModal,
    closeModal,
    toggleModal,
    closeAllModals,
  };
}