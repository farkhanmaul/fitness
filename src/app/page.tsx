'use client';

import { useState } from 'react';
import { exercises, categories, Exercise } from '@/data/exercises';
import { workoutPrograms, programCategories, WorkoutProgram } from '@/data/programs';
import { movementPatterns, MovementPattern } from '@/data/movement-patterns';
import { trainingPrinciples, principleCategories, TrainingPrinciple } from '@/data/training-principles';

type TabType = 'exercises' | 'programs' | 'movements' | 'principles';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('exercises');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null);
  const [selectedMovement, setSelectedMovement] = useState<MovementPattern | null>(null);
  const [selectedPrinciple, setSelectedPrinciple] = useState<TrainingPrinciple | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExercises = exercises.filter(exercise => {
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.primaryMuscles.some(muscle => 
                           muscle.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    return matchesCategory && matchesSearch;
  });

  const filteredPrograms = workoutPrograms.filter(program => {
    const matchesCategory = selectedCategory === 'All' || program.category === selectedCategory;
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredMovements = movementPatterns.filter(movement => {
    const matchesSearch = movement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredPrinciples = trainingPrinciples.filter(principle => {
    const matchesCategory = selectedCategory === 'All' || principle.category === selectedCategory;
    const matchesSearch = principle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         principle.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const resetSelections = () => {
    setSelectedExercise(null);
    setSelectedProgram(null);
    setSelectedMovement(null);
    setSelectedPrinciple(null);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            💪 Complete Fitness Guide
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Exercises, Programs, Movement Patterns & Training Principles
          </p>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {[
              { id: 'exercises' as TabType, label: 'Exercises', icon: '🏋️' },
              { id: 'programs' as TabType, label: 'Programs', icon: '📋' },
              { id: 'movements' as TabType, label: 'Movement Patterns', icon: '🤸' },
              { id: 'principles' as TabType, label: 'Training Principles', icon: '🧠' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  resetSelections();
                  setSelectedCategory('All');
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              {/* Search */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Categories - Dynamic based on active tab */}
              {(activeTab === 'exercises' || activeTab === 'programs' || activeTab === 'principles') && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
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
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
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
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedExercise || selectedProgram || selectedMovement || selectedPrinciple ? (
              /* Detail Views */
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedExercise?.name || selectedProgram?.name || selectedMovement?.name || selectedPrinciple?.name}
                  </h2>
                  <button
                    onClick={resetSelections}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ← Back to List
                  </button>
                </div>

                {/* Exercise Detail */}
                {selectedExercise && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          selectedExercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          selectedExercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {selectedExercise.difficulty}
                        </span>
                        <p className="text-gray-600 dark:text-gray-400 mt-3">
                          {selectedExercise.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Primary Muscles</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedExercise.primaryMuscles.map(muscle => (
                            <span key={muscle} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm">
                              {muscle}
                            </span>
                          ))}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Equipment</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedExercise.equipment.map(item => (
                            <span key={item} className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Instructions</h4>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                          {selectedExercise.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ol>
                      </div>

                      {selectedExercise.tips.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tips</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            {selectedExercise.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedExercise.variations.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Variations</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedExercise.variations.map(variation => (
                              <span key={variation} className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded text-sm">
                                {variation}
                              </span>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          selectedProgram.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          selectedProgram.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {selectedProgram.difficulty} • {selectedProgram.duration}
                        </span>
                        <p className="text-gray-600 dark:text-gray-400 mt-3">
                          {selectedProgram.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Objectives</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                          {selectedProgram.objectives.map((obj, index) => (
                            <li key={index}>{obj}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Sample Workouts</h4>
                        <div className="space-y-4">
                          {selectedProgram.workouts.slice(0, 3).map((workout, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                              <div className="flex justify-between items-center mb-3">
                                <h5 className="font-medium text-gray-900 dark:text-white">
                                  Day {workout.day}: {workout.name}
                                </h5>
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded text-sm">
                                  {workout.type}
                                </span>
                              </div>
                              <div className="space-y-2">
                                {workout.exercises.map((exercise, idx) => (
                                  <div key={idx} className="flex justify-between text-sm">
                                    <span className="text-gray-700 dark:text-gray-300">{exercise.name}</span>
                                    <span className="text-gray-500 dark:text-gray-400">
                                      {exercise.reps || exercise.distance || exercise.duration || ''}
                                      {exercise.weight && ` @ ${exercise.weight}`}
                                    </span>
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
                          <p className="text-gray-600 dark:text-gray-300">{selectedProgram.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Movement Pattern Detail */}
                {selectedMovement && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {selectedMovement.description}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Principles</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                          {selectedMovement.keyPrinciples.map((principle, index) => (
                            <li key={index}>{principle}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Form Cues</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                        <div className="space-y-4">
                          {selectedMovement.progressions.map((progression, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  progression.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                  progression.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}>
                                  {progression.level}
                                </span>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 mb-3">{progression.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {progression.exercises.map(exercise => (
                                  <span key={exercise} className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded text-sm">
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
                    <div className="mb-6">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                        {selectedPrinciple.category}
                      </span>
                      <p className="text-gray-600 dark:text-gray-400 mt-3">
                        {selectedPrinciple.description}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Points</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                          {selectedPrinciple.keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Application</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
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
                              <p className="text-green-800 dark:text-green-200 text-sm font-mono">{example}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Common Mistakes</h4>
                        <ul className="list-disc list-inside space-y-2 text-red-700 dark:text-red-300">
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
              /* List Views */
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {selectedCategory === 'All' ? `All ${activeTab}` : selectedCategory}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
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

                <div className="grid gap-4">
                  {/* Exercises List */}
                  {activeTab === 'exercises' && filteredExercises.map(exercise => (
                    <div
                      key={exercise.id}
                      onClick={() => setSelectedExercise(exercise)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {exercise.name}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {exercise.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exercise.primaryMuscles.slice(0, 3).map(muscle => (
                          <span key={muscle} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs">
                            {muscle}
                          </span>
                        ))}
                        {exercise.primaryMuscles.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded text-xs">
                            +{exercise.primaryMuscles.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Programs List */}
                  {activeTab === 'programs' && filteredPrograms.map(program => (
                    <div
                      key={program.id}
                      onClick={() => setSelectedProgram(program)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {program.name}
                        </h3>
                        <div className="flex space-x-2">
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
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {program.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Duration: {program.duration}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {program.workouts.length} workout{program.workouts.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Movement Patterns List */}
                  {activeTab === 'movements' && filteredMovements.map(movement => (
                    <div
                      key={movement.id}
                      onClick={() => setSelectedMovement(movement)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {movement.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {movement.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {movement.primaryMuscles.slice(0, 4).map(muscle => (
                          <span key={muscle} className="px-2 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded text-xs">
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Training Principles List */}
                  {activeTab === 'principles' && filteredPrinciples.map(principle => (
                    <div
                      key={principle.id}
                      onClick={() => setSelectedPrinciple(principle)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {principle.name}
                        </h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs font-medium">
                          {principle.category}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {principle.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* No Results */}
                {((activeTab === 'exercises' && filteredExercises.length === 0) ||
                  (activeTab === 'programs' && filteredPrograms.length === 0) ||
                  (activeTab === 'movements' && filteredMovements.length === 0) ||
                  (activeTab === 'principles' && filteredPrinciples.length === 0)) && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                      No {activeTab} found
                    </p>
                    <p className="text-gray-400 dark:text-gray-500">
                      Try adjusting your search {activeTab !== 'movements' ? 'or category filter' : ''}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}