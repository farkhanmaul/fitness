'use client';

import { useState } from 'react';
import { exercises, Exercise } from '@/data/exercises';
import { workoutPrograms, WorkoutProgram } from '@/data/programs';
import { movementPatterns, MovementPattern } from '@/data/movement-patterns';
import { trainingPrinciples, TrainingPrinciple } from '@/data/training-principles';
import { CategoryNavigation } from '@/components/CategoryNavigation';
import { ExerciseMedia } from '@/components/ExerciseMedia';

// Tab type - simplified to focus on knowledge only
type TabType = 'exercises' | 'programs' | 'movements' | 'principles' | 'nutrition';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('exercises');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null);
  const [selectedMovement, setSelectedMovement] = useState<MovementPattern | null>(null);
  const [selectedPrinciple, setSelectedPrinciple] = useState<TrainingPrinciple | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Filter exercises based on search and category
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || exercise.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Filter programs based on search and category  
  const filteredPrograms = workoutPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || program.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const filteredMovements = movementPatterns.filter(movement => {
    const matchesSearch = movement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredPrinciples = trainingPrinciples.filter(principle => {
    const matchesSearch = principle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         principle.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const TabButton = ({ tab, label, isActive, onClick }: {
    tab: TabType;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );

  const SearchBar = () => (
    <div className="relative">
      <input
        type="text"
        placeholder="Cari latihan, program, atau materi..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );

  const ExerciseCard = ({ exercise }: { exercise: Exercise }) => (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => setSelectedExercise(exercise)}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{exercise.name}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{exercise.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 text-xs rounded-full ${
          exercise.difficulty === 'Pemula' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : exercise.difficulty === 'Menengah'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {exercise.difficulty}
        </span>
        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
          {exercise.category}
        </span>
      </div>
      <div className="flex flex-wrap gap-1">
        {exercise.primaryMuscles.slice(0, 3).map((muscle, idx) => (
          <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded">
            {muscle}
          </span>
        ))}
      </div>
    </div>
  );

  const ProgramCard = ({ program }: { program: WorkoutProgram }) => (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => setSelectedProgram(program)}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{program.name}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{program.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 text-xs rounded-full ${
          program.difficulty === 'Pemula'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : program.difficulty === 'Menengah'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {program.difficulty}
        </span>
        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
          {program.category}
        </span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Durasi: {program.duration} • {program.workouts?.length || 0} sesi latihan
      </p>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                🏋️ Panduan Fitness Lengkap
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Materi dan pengetahuan fitness komprehensif
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <CategoryNavigation
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          <TabButton
            tab="exercises"
            label="Latihan"
            isActive={activeTab === 'exercises'}
            onClick={() => setActiveTab('exercises')}
          />
          <TabButton
            tab="programs"
            label="Program"
            isActive={activeTab === 'programs'}
            onClick={() => setActiveTab('programs')}
          />
          <TabButton
            tab="movements"
            label="Pola Gerakan"
            isActive={activeTab === 'movements'}
            onClick={() => setActiveTab('movements')}
          />
          <TabButton
            tab="principles"
            label="Prinsip Latihan"
            isActive={activeTab === 'principles'}
            onClick={() => setActiveTab('principles')}
          />
          <TabButton
            tab="nutrition"
            label="Nutrisi"
            isActive={activeTab === 'nutrition'}
            onClick={() => setActiveTab('nutrition')}
          />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar />
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'exercises' && (
              <div className="grid gap-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Latihan ({filteredExercises.length})
                </h2>
                <div className="grid gap-4">
                  {filteredExercises.map(exercise => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'programs' && (
              <div className="grid gap-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Program Latihan ({filteredPrograms.length})
                </h2>
                <div className="grid gap-4">
                  {filteredPrograms.map(program => (
                    <ProgramCard key={program.id} program={program} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Panduan Nutrisi
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      Prinsip Dasar Nutrisi Fitness
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Defisit kalori untuk penurunan berat badan</li>
                      <li>Surplus kalori untuk penambahan massa otot</li>
                      <li>Konsumsi protein 1.6-2.2g per kg berat badan</li>
                      <li>Karbohidrat sebelum latihan untuk energi</li>
                      <li>Protein setelah latihan untuk pemulihan</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      Timing Nutrisi
                    </h3>
                    <div className="grid gap-3">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white">Sebelum Latihan (30-60 menit)</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Karbohidrat sedang + sedikit protein. Contoh: pisang + selai kacang
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white">Setelah Latihan (30 menit)</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Protein + karbohidrat. Contoh: protein shake + buah
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {selectedExercise && (
              <ExerciseMedia
                exerciseId={selectedExercise.id}
                exerciseName={selectedExercise.name}
                hasVideo={true}
                hasImages={true}
              />
            )}
            {selectedExercise && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedExercise.name}
                  </h3>
                  <button
                    onClick={() => setSelectedExercise(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedExercise.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Instruksi:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {selectedExercise.instructions.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tips:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {selectedExercise.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Otot Primer:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedExercise.primaryMuscles.map((muscle, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedExercise.variations && selectedExercise.variations.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Variasi:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        {selectedExercise.variations.map((variation, idx) => (
                          <li key={idx}>{variation}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 Panduan Fitness Lengkap. Semua hak dilindungi.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a
                href="https://github.com/farkhanmaul/fitness"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
              >
                📂 Repository
              </a>
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
              >
                🤖 Claude AI
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}