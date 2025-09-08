import { useState, useCallback } from 'react';

export type DifficultyFilter = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';
export type TabType = 'exercises' | 'programs' | 'movements' | 'principles';

export interface FilterState {
  selectedCategory: string;
  selectedDifficulty: DifficultyFilter;
  selectedEquipment: string;
  selectedMuscle: string;
  selectedBodyPart: string;
  selectedMuscleFocus: string;
  selectedWorkoutGoal: string;
  searchTerm: string;
  showFavoritesOnly: boolean;
}

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({
    selectedCategory: 'All',
    selectedDifficulty: 'All',
    selectedEquipment: 'All',
    selectedMuscle: 'All',
    selectedBodyPart: 'All',
    selectedMuscleFocus: 'All',
    selectedWorkoutGoal: 'All',
    searchTerm: '',
    showFavoritesOnly: false,
  });

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      selectedCategory: 'All',
      selectedDifficulty: 'All',
      selectedEquipment: 'All',
      selectedMuscle: 'All',
      selectedBodyPart: 'All',
      selectedMuscleFocus: 'All',
      selectedWorkoutGoal: 'All',
      searchTerm: '',
      showFavoritesOnly: false,
    });
  }, []);

  const clearSearch = useCallback(() => {
    updateFilter('searchTerm', '');
  }, [updateFilter]);

  return {
    filters,
    updateFilter,
    clearAllFilters,
    clearSearch,
  };
}