'use client';

import { useState } from 'react';
import { exercises, Exercise } from '@/data/exercises';
import { workoutPrograms, WorkoutProgram } from '@/data/programs';
import { CategoryNavigation } from '@/components/CategoryNavigation';
import { ExerciseMedia } from '@/components/ExerciseMedia';

// Tab type - simplified to focus on knowledge only
type TabType = 'exercises' | 'programs' | 'movements' | 'principles' | 'nutrition';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('exercises');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  const TabButton = ({ label, isActive, onClick }: {
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
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
        className="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
      />
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );

  const ExerciseCard = ({ exercise }: { exercise: Exercise }) => (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
      onClick={() => setSelectedExercise(exercise)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exercise.name}</h3>
        <div className={`px-2 py-1 text-xs rounded-full ${
          exercise.difficulty === 'Pemula' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : exercise.difficulty === 'Menengah'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {exercise.difficulty}
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{exercise.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
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
        {exercise.primaryMuscles.length > 3 && (
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded">
            +{exercise.primaryMuscles.length - 3} lainnya
          </span>
        )}
      </div>
    </div>
  );

  const ProgramCard = ({ program }: { program: WorkoutProgram }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{program.name}</h3>
        <div className={`px-2 py-1 text-xs rounded-full ${
          program.difficulty === 'Pemula'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : program.difficulty === 'Menengah'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {program.difficulty}
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{program.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
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
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors lg:hidden"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    🏋️ Panduan Fitness Lengkap
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 hidden sm:block">
                    Materi dan pengetahuan fitness komprehensif
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
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

        <div className="flex">
          {/* Sidebar */}
          <aside className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:relative lg:translate-x-0 z-40 w-80 h-[calc(100vh-140px)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out overflow-y-auto`}>
            
            <div className="p-6">
              {/* Search Bar */}
              <div className="mb-6">
                <SearchBar />
              </div>

              {/* Tab Navigation */}
              <nav className="space-y-2 mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Kategori
                </h3>
                <div className="space-y-1">
                  <TabButton
                    label="Latihan"
                    isActive={activeTab === 'exercises'}
                    onClick={() => setActiveTab('exercises')}
                  />
                  <TabButton
                    label="Program"
                    isActive={activeTab === 'programs'}
                    onClick={() => setActiveTab('programs')}
                  />
                  <TabButton
                    label="Pola Gerakan"
                    isActive={activeTab === 'movements'}
                    onClick={() => setActiveTab('movements')}
                  />
                  <TabButton
                    label="Prinsip Latihan"
                    isActive={activeTab === 'principles'}
                    onClick={() => setActiveTab('principles')}
                  />
                  <TabButton
                    label="Nutrisi"
                    isActive={activeTab === 'nutrition'}
                    onClick={() => setActiveTab('nutrition')}
                  />
                </div>
              </nav>

              {/* Selected Exercise Details */}
              {selectedExercise && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Detail Latihan
                    </h3>
                    <button
                      onClick={() => setSelectedExercise(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {selectedExercise.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {selectedExercise.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Otot Primer:</h5>
                        <div className="flex flex-wrap gap-1">
                          {selectedExercise.primaryMuscles.map((muscle, idx) => (
                            <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Tips:</h5>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          {selectedExercise.tips.slice(0, 2).map((tip, idx) => (
                            <li key={idx}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-4xl">
              {activeTab === 'exercises' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Latihan ({filteredExercises.length})
                    </h2>
                  </div>
                  <div className="grid gap-4">
                    {filteredExercises.map(exercise => (
                      <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                    {filteredExercises.length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Tidak ada latihan yang ditemukan
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Coba ubah kategori atau kata kunci pencarian
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'programs' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Program Latihan ({filteredPrograms.length})
                    </h2>
                  </div>
                  <div className="grid gap-4">
                    {filteredPrograms.map(program => (
                      <ProgramCard key={program.id} program={program} />
                    ))}
                    {filteredPrograms.length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Tidak ada program yang ditemukan
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Coba ubah kategori atau kata kunci pencarian
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Panduan Nutrisi
                  </h2>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                          Prinsip Dasar Nutrisi Fitness
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💪 Untuk Muscle Building</h4>
                            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                              <li>• Surplus kalori 300-500 kal/hari</li>
                              <li>• Protein 1.8-2.2g per kg berat badan</li>
                              <li>• Karbohidrat 4-6g per kg berat badan</li>
                            </ul>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🔥 Untuk Fat Loss</h4>
                            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                              <li>• Defisit kalori 300-500 kal/hari</li>
                              <li>• Protein 2.0-2.5g per kg berat badan</li>
                              <li>• Karbohidrat 2-4g per kg berat badan</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                          Timing Nutrisi
                        </h3>
                        <div className="space-y-4">
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">⏰ Pre-Workout (30-60 menit)</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Karbohidrat sedang + sedikit protein. Contoh: pisang + selai kacang, oatmeal + whey protein
                            </p>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🥤 Post-Workout (dalam 30 menit)</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Protein + karbohidrat cepat. Contoh: whey protein + pisang, susu coklat
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Exercise Media Modal */}
            {selectedExercise && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedExercise.name}
                      </h3>
                      <button
                        onClick={() => setSelectedExercise(null)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                      >
                        ×
                      </button>
                    </div>
                    
                    <ExerciseMedia
                      exerciseId={selectedExercise.id}
                      exerciseName={selectedExercise.name}
                      hasVideo={true}
                      hasImages={true}
                    />
                    
                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Instruksi:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                          {selectedExercise.instructions.map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                          ))}
                        </ol>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Tips:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                          {selectedExercise.tips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}