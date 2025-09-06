'use client';

import { useState, useEffect } from 'react';
import { exercises, categories, Exercise, muscleGroups, equipment } from '@/data/exercises';
import { workoutPrograms, programCategories, WorkoutProgram } from '@/data/programs';
import { movementPatterns, MovementPattern } from '@/data/movement-patterns';
import { trainingPrinciples, principleCategories, TrainingPrinciple } from '@/data/training-principles';

type TabType = 'exercises' | 'programs' | 'movements' | 'principles';
type DifficultyFilter = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('exercises');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('All');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null);
  const [selectedMovement, setSelectedMovement] = useState<MovementPattern | null>(null);
  const [selectedPrinciple, setSelectedPrinciple] = useState<TrainingPrinciple | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [workoutTimer, setWorkoutTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [workoutProgress, setWorkoutProgress] = useState<{[key: string]: {completed: boolean, reps?: number, weight?: number, time?: number}}>({}); 
  const [currentWorkout, setCurrentWorkout] = useState<string | null>(null);

  // Load favorites and theme from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('fitness-favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
    
    const savedTheme = localStorage.getItem('fitness-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('fitness-favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  // Toggle theme
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fitness-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fitness-theme', 'light');
    }
  };

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setWorkoutTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startTimer = () => setIsTimerRunning(true);
  const pauseTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setWorkoutTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Progress tracking
  const updateProgress = (itemId: string, data: {completed?: boolean, reps?: number, weight?: number, time?: number}) => {
    setWorkoutProgress(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], ...data }
    }));
  };

  const startWorkout = (workoutId: string) => {
    setCurrentWorkout(workoutId);
    resetTimer();
    startTimer();
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredExercises = exercises.filter(exercise => {
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || exercise.difficulty === selectedDifficulty;
    const matchesEquipment = selectedEquipment === 'All' || exercise.equipment.includes(selectedEquipment);
    const matchesMuscle = selectedMuscle === 'All' || 
                         exercise.primaryMuscles.includes(selectedMuscle) || 
                         exercise.secondaryMuscles?.includes(selectedMuscle);
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.primaryMuscles.some(muscle => 
                           muscle.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesFavorites = !showFavoritesOnly || favorites.has(exercise.id);
    
    return matchesCategory && matchesDifficulty && matchesEquipment && matchesMuscle && matchesSearch && matchesFavorites;
  });

  const filteredPrograms = workoutPrograms.filter(program => {
    const matchesCategory = selectedCategory === 'All' || program.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || program.difficulty === selectedDifficulty;
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorites = !showFavoritesOnly || favorites.has(program.id);
    
    return matchesCategory && matchesDifficulty && matchesSearch && matchesFavorites;
  });

  const filteredMovements = movementPatterns.filter(movement => {
    const matchesSearch = movement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorites = !showFavoritesOnly || favorites.has(movement.id);
    
    return matchesSearch && matchesFavorites;
  });

  const filteredPrinciples = trainingPrinciples.filter(principle => {
    const matchesCategory = selectedCategory === 'All' || principle.category === selectedCategory;
    const matchesSearch = principle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         principle.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorites = !showFavoritesOnly || favorites.has(principle.id);
    
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  const resetSelections = () => {
    setSelectedExercise(null);
    setSelectedProgram(null);
    setSelectedMovement(null);
    setSelectedPrinciple(null);
    setSearchTerm('');
    setShowSidebar(false);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedEquipment('All');
    setSelectedMuscle('All');
    setSearchTerm('');
    setShowFavoritesOnly(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 print-hide">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-6">
          <div className="flex items-center justify-between lg:justify-start">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                💪 Complete Fitness Guide
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
                Exercises, Programs, Movement Patterns & Training Principles
              </p>
            </div>
            
            {/* Workout Timer and controls */}
            <div className="flex items-center space-x-2">
              {currentWorkout && (
                <div className="hidden sm:flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-lg">
                  <span className="text-sm font-mono text-blue-800 dark:text-blue-200">
                    {formatTime(workoutTimer)}
                  </span>
                  <button
                    onClick={isTimerRunning ? pauseTimer : startTimer}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    title={isTimerRunning ? "Pause timer" : "Start timer"}
                  >
                    {isTimerRunning ? '⏸️' : '▶️'}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                    title="Reset timer"
                  >
                    🔄
                  </button>
                </div>
              )}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="Toggle dark mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-0.5 sm:space-x-1 mt-3 sm:mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg overflow-x-auto">
            {[
              { id: 'exercises' as TabType, label: 'Exercises', icon: '🏋️', shortLabel: 'Exercises' },
              { id: 'programs' as TabType, label: 'Programs', icon: '📋', shortLabel: 'Programs' },
              { id: 'movements' as TabType, label: 'Movement Patterns', icon: '🤸', shortLabel: 'Movements' },
              { id: 'principles' as TabType, label: 'Training Principles', icon: '🧠', shortLabel: 'Principles' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  resetSelections();
                  clearAllFilters();
                }}
                className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-w-0 flex-1 lg:flex-none ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="text-sm sm:text-base">{tab.icon}</span>
                <span className="hidden xs:inline lg:hidden text-xs">{tab.shortLabel}</span>
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Mobile Sidebar Overlay */}
          {showSidebar && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setShowSidebar(false)}
            />
          )}

          {/* Sidebar */}
          <div className={`lg:col-span-1 print-hide ${
            showSidebar 
              ? 'fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-800 shadow-xl z-50 lg:relative lg:inset-auto lg:w-auto lg:shadow-none transform translate-x-0'
              : 'hidden lg:block'
          }`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 h-full overflow-y-auto">
              {/* Mobile close button */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Filters
                </h3>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Search */}
              <div className="mb-4 sm:mb-6">
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Favorites Toggle */}
              <div className="mb-4 sm:mb-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFavoritesOnly}
                    onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    ❤️ Show favorites only ({favorites.size})
                  </span>
                </label>
              </div>

              {/* Clear Filters */}
              <div className="mb-4 sm:mb-6">
                <button
                  onClick={clearAllFilters}
                  className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
                >
                  Clear All Filters
                </button>
              </div>

              {/* Categories - Dynamic based on active tab */}
              {(activeTab === 'exercises' || activeTab === 'programs' || activeTab === 'principles') && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                    Categories
                  </h3>
                  <div className="space-y-1 sm:space-y-2">
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setShowSidebar(false);
                      }}
                      className={`w-full text-left px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors ${
                        selectedCategory === 'All'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      All {activeTab === 'exercises' ? `(${exercises.length})` : 
                           activeTab === 'programs' ? `(${workoutPrograms.length})` :
                           `(${trainingPrinciples.length})`}
                    </button>
                    {(activeTab === 'exercises' ? categories :
                      activeTab === 'programs' ? programCategories :
                      principleCategories).map(category => {
                      const count = activeTab === 'exercises' ? exercises.filter(ex => ex.category === category).length :
                                   activeTab === 'programs' ? workoutPrograms.filter(p => p.category === category).length :
                                   trainingPrinciples.filter(p => p.category === category).length;
                      return (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowSidebar(false);
                          }}
                          className={`w-full text-left px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors ${
                            selectedCategory === category
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {category} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Difficulty Filter */}
              {(activeTab === 'exercises' || activeTab === 'programs') && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                    Difficulty
                  </h3>
                  <div className="space-y-1 sm:space-y-2">
                    {(['All', 'Beginner', 'Intermediate', 'Advanced'] as DifficultyFilter[]).map(difficulty => (
                      <button
                        key={difficulty}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className={`w-full text-left px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors ${
                          selectedDifficulty === difficulty
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {difficulty === 'All' ? 'All Levels' : difficulty}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Equipment Filter (Exercises only) */}
              {activeTab === 'exercises' && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                    Equipment
                  </h3>
                  <div className="space-y-1 sm:space-y-2">
                    <button
                      onClick={() => setSelectedEquipment('All')}
                      className={`w-full text-left px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors ${
                        selectedEquipment === 'All'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      All Equipment
                    </button>
                    {equipment.map(item => (
                      <button
                        key={item}
                        onClick={() => setSelectedEquipment(item)}
                        className={`w-full text-left px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors ${
                          selectedEquipment === item
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Muscle Group Filter (Exercises only) */}
              {activeTab === 'exercises' && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                    Muscle Groups
                  </h3>
                  <div className="space-y-1 sm:space-y-2">
                    <button
                      onClick={() => setSelectedMuscle('All')}
                      className={`w-full text-left px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors ${
                        selectedMuscle === 'All'
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      All Muscles
                    </button>
                    {muscleGroups.map(muscle => (
                      <button
                        key={muscle}
                        onClick={() => setSelectedMuscle(muscle)}
                        className={`w-full text-left px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors ${
                          selectedMuscle === muscle
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {muscle}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedExercise || selectedProgram || selectedMovement || selectedPrinciple ? (
              /* Detail Views - Add favorite button */
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white pr-4 leading-tight flex-1">
                    {selectedExercise?.name || selectedProgram?.name || selectedMovement?.name || selectedPrinciple?.name}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.print()}
                      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Print workout card"
                    >
                      🖨️
                    </button>
                    <button
                      onClick={() => {
                        const id = selectedExercise?.id || selectedProgram?.id || selectedMovement?.id || selectedPrinciple?.id;
                        if (id) toggleFavorite(id);
                      }}
                      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Add to favorites"
                    >
                      {favorites.has((selectedExercise?.id || selectedProgram?.id || selectedMovement?.id || selectedPrinciple?.id) || '') 
                        ? '❤️' : '🤍'}
                    </button>
                    <button
                      onClick={resetSelections}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm sm:text-base whitespace-nowrap flex-shrink-0 print-hide"
                    >
                      ← Back
                    </button>
                  </div>
                </div>

                {/* Exercise Detail */}
                {selectedExercise && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          selectedExercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          selectedExercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {selectedExercise.difficulty}
                        </span>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-3">
                          {selectedExercise.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Primary Muscles</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                          {selectedExercise.primaryMuscles.map(muscle => (
                            <span key={muscle} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs sm:text-sm">
                              {muscle}
                            </span>
                          ))}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Equipment</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {selectedExercise.equipment.map(item => (
                            <span key={item} className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded text-xs sm:text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white">Instructions</h4>
                          <div className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-lg text-xs font-medium">
                            <span className="text-blue-800 dark:text-blue-200">📹 Video Demo Available</span>
                          </div>
                        </div>
                        <div className="mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                          <div className="w-full h-48 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-4xl mb-2">🎬</div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Exercise demonstration video
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                Proper form and technique
                              </p>
                            </div>
                          </div>
                        </div>
                        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                          {selectedExercise.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ol>
                      </div>

                      {selectedExercise.tips.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tips</h4>
                          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                            {selectedExercise.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedExercise.variations.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Variations</h4>
                          <div className="grid gap-2 sm:gap-3">
                            {selectedExercise.variations.map((variation, index) => (
                              <div key={index} className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-lg">🎯</span>
                                  <p className="text-purple-800 dark:text-purple-200 text-sm sm:text-base font-medium">{variation}</p>
                                </div>
                                <div className="ml-6 bg-gray-100 dark:bg-gray-700 rounded p-2 text-center">
                                  <div className="text-xs text-gray-600 dark:text-gray-400">
                                    📐 Form animation guide
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Program Detail */}
                {selectedProgram && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          selectedProgram.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          selectedProgram.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {selectedProgram.difficulty} • {selectedProgram.duration}
                        </span>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-3">
                          {selectedProgram.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Objectives</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {selectedProgram.objectives.map((obj, index) => (
                            <li key={index}>{obj}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Sample Workouts</h4>
                        <div className="space-y-3 sm:space-y-4">
                          {selectedProgram.workouts.slice(0, 3).map((workout, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-3">
                                <h5 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                                  Day {workout.day}: {workout.name}
                                </h5>
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded text-xs sm:text-sm mt-1 sm:mt-0 self-start">
                                  {workout.type}
                                </span>
                              </div>
                              <div className="space-y-1 sm:space-y-2">
                                {workout.exercises.map((exercise, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">
                                    <div className="flex items-center space-x-2 flex-1">
                                      <input
                                        type="checkbox"
                                        checked={workoutProgress[`${selectedProgram.id}-${index}-${idx}`]?.completed || false}
                                        onChange={(e) => updateProgress(`${selectedProgram.id}-${index}-${idx}`, {completed: e.target.checked})}
                                        className="rounded"
                                      />
                                      <span className="text-gray-700 dark:text-gray-300 font-medium">{exercise.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-gray-500 dark:text-gray-400">
                                        {exercise.reps || exercise.distance || exercise.duration || ''}
                                        {exercise.weight && ` @ ${exercise.weight}`}
                                      </span>
                                      <div className="flex space-x-1">
                                        {exercise.reps && (
                                          <input
                                            type="number"
                                            placeholder="Reps"
                                            value={workoutProgress[`${selectedProgram.id}-${index}-${idx}`]?.reps || ''}
                                            onChange={(e) => updateProgress(`${selectedProgram.id}-${index}-${idx}`, {reps: parseInt(e.target.value) || 0})}
                                            className="w-12 px-1 py-0.5 text-xs rounded border dark:bg-gray-700 dark:border-gray-600"
                                          />
                                        )}
                                        {exercise.weight && (
                                          <input
                                            type="number"
                                            placeholder="lbs"
                                            value={workoutProgress[`${selectedProgram.id}-${index}-${idx}`]?.weight || ''}
                                            onChange={(e) => updateProgress(`${selectedProgram.id}-${index}-${idx}`, {weight: parseInt(e.target.value) || 0})}
                                            className="w-12 px-1 py-0.5 text-xs rounded border dark:bg-gray-700 dark:border-gray-600"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              {workout.notes && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                  Note: {workout.notes}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedProgram.notes && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Program Notes</h4>
                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{selectedProgram.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Movement Pattern Detail */}
                {selectedMovement && (
                  <div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                      {selectedMovement.description}
                    </p>

                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Principles</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                          {selectedMovement.keyPrinciples.map((principle, index) => (
                            <li key={index}>{principle}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Form Cues</h4>
                        <div className="grid grid-cols-1 gap-2 sm:gap-3">
                          {selectedMovement.formCues.map((cue, index) => (
                            <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                              <p className="text-blue-800 dark:text-blue-200 font-medium text-sm">{cue}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Common Mistakes</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {selectedMovement.commonMistakes.map((mistake, index) => (
                            <div key={index} className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                              <p className="text-red-800 dark:text-red-200 text-sm">❌ {mistake}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Progressions</h4>
                        <div className="space-y-3 sm:space-y-4">
                          {selectedMovement.progressions.map((progression, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  progression.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                  progression.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}>
                                  {progression.level}
                                </span>
                              </div>
                              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3">{progression.description}</p>
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                {progression.exercises.map(exercise => (
                                  <span key={exercise} className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded text-xs sm:text-sm">
                                    {exercise}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Training Principle Detail */}
                {selectedPrinciple && (
                  <div>
                    <div className="mb-4 sm:mb-6">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                        {selectedPrinciple.category}
                      </span>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-3">
                        {selectedPrinciple.description}
                      </p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Points</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                          {selectedPrinciple.keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Application</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                          {selectedPrinciple.application.map((app, index) => (
                            <li key={index}>{app}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Examples</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {selectedPrinciple.examples.map((example, index) => (
                            <div key={index} className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                              <p className="text-green-800 dark:text-green-200 text-xs sm:text-sm font-mono break-words">{example}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Common Mistakes</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-red-700 dark:text-red-300">
                          {selectedPrinciple.commonMistakes.map((mistake, index) => (
                            <li key={index}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* List Views - Add favorite buttons to cards */
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {showFavoritesOnly ? `Favorite ${activeTab}` : 
                       selectedCategory === 'All' ? `All ${activeTab}` : selectedCategory}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activeTab === 'exercises' ? filteredExercises.length :
                       activeTab === 'programs' ? filteredPrograms.length :
                       activeTab === 'movements' ? filteredMovements.length :
                       filteredPrinciples.length} {activeTab.slice(0, -1)}{(
                        activeTab === 'exercises' ? filteredExercises.length :
                        activeTab === 'programs' ? filteredPrograms.length :
                        activeTab === 'movements' ? filteredMovements.length :
                        filteredPrinciples.length) !== 1 ? 's' : ''} found
                    </p>
                  </div>
                  
                  {/* Mobile filter button */}
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="lg:hidden px-3 py-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md text-sm font-medium"
                  >
                    Filter
                  </button>
                </div>

                <div className="grid gap-3 sm:gap-4">
                  {/* Exercises List with favorite buttons */}
                  {activeTab === 'exercises' && filteredExercises.map(exercise => (
                    <div
                      key={exercise.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 
                          className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white pr-2 flex-1"
                          onClick={() => setSelectedExercise(exercise)}
                        >
                          {exercise.name}
                        </h3>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(exercise.id);
                            }}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            title="Add to favorites"
                          >
                            {favorites.has(exercise.id) ? '❤️' : '🤍'}
                          </button>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {exercise.difficulty}
                          </span>
                        </div>
                      </div>
                      <div onClick={() => setSelectedExercise(exercise)}>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {exercise.description}
                        </p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {exercise.primaryMuscles.slice(0, 3).map(muscle => (
                            <span key={muscle} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs">
                              {muscle}
                            </span>
                          ))}
                          {exercise.primaryMuscles.length > 3 && (
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded text-xs">
                              +{exercise.primaryMuscles.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Similar structure for programs, movements, and principles with favorite buttons */}
                  {/* Programs List */}
                  {activeTab === 'programs' && filteredPrograms.map(program => (
                    <div
                      key={program.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 
                          className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white pr-4 flex-1"
                          onClick={() => setSelectedProgram(program)}
                        >
                          {program.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => startWorkout(program.id)}
                            className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md text-xs font-medium hover:bg-green-200 dark:hover:bg-green-800"
                            title="Start workout"
                          >
                            ▶️ Start
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(program.id);
                            }}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            {favorites.has(program.id) ? '❤️' : '🤍'}
                          </button>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded text-xs font-medium">
                              {program.category}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              program.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              program.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {program.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div onClick={() => setSelectedProgram(program)}>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {program.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-0">
                          <span>Duration: {program.duration}</span>
                          <span>{program.workouts.length} workout{program.workouts.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Movement Patterns List */}
                  {activeTab === 'movements' && filteredMovements.map(movement => (
                    <div
                      key={movement.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 
                          className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex-1"
                          onClick={() => setSelectedMovement(movement)}
                        >
                          {movement.name}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(movement.id);
                          }}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          {favorites.has(movement.id) ? '❤️' : '🤍'}
                        </button>
                      </div>
                      <div onClick={() => setSelectedMovement(movement)}>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {movement.description}
                        </p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {movement.primaryMuscles.slice(0, 4).map(muscle => (
                            <span key={muscle} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded text-xs">
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Training Principles List */}
                  {activeTab === 'principles' && filteredPrinciples.map(principle => (
                    <div
                      key={principle.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 
                          className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white pr-4 flex-1"
                          onClick={() => setSelectedPrinciple(principle)}
                        >
                          {principle.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(principle.id);
                            }}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            {favorites.has(principle.id) ? '❤️' : '🤍'}
                          </button>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs font-medium">
                            {principle.category}
                          </span>
                        </div>
                      </div>
                      <div onClick={() => setSelectedPrinciple(principle)}>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-2">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No Results */}
                {((activeTab === 'exercises' && filteredExercises.length === 0) ||
                  (activeTab === 'programs' && filteredPrograms.length === 0) ||
                  (activeTab === 'movements' && filteredMovements.length === 0) ||
                  (activeTab === 'principles' && filteredPrinciples.length === 0)) && (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-2 sm:mb-4">
                      No {activeTab} found
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}