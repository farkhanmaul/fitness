'use client';

import { useState } from 'react';
import { exercises, Exercise } from '@/data/exercises';
import { workoutPrograms, WorkoutProgram } from '@/data/programs';
import { CategoryNavigation } from '@/components/CategoryNavigation';
import { ExerciseMedia } from '@/components/ExerciseMedia';
import {
  DumbbellIcon,
  SearchIcon,
  MenuIcon,
  XIcon,
  SunIcon,
  MoonIcon,
  ActivityIcon,
  BookOpenIcon,
  TargetIcon,
  TrendingUpIcon,
  AppleIcon,
  ClockIcon,
  ZapIcon
} from '@/components/icons/Icons';

type TabType = 'exercises' | 'programs' | 'movements' | 'principles' | 'nutrition';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('exercises');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || exercise.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const filteredPrograms = workoutPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || program.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const tabConfig = [
    { id: 'exercises', label: 'Exercises', icon: DumbbellIcon },
    { id: 'programs', label: 'Programs', icon: TargetIcon },
    { id: 'movements', label: 'Movement Patterns', icon: ActivityIcon },
    { id: 'principles', label: 'Training Principles', icon: BookOpenIcon },
    { id: 'nutrition', label: 'Nutrition', icon: AppleIcon },
  ];

  const TabButton = ({ label, icon: Icon, isActive, onClick }: {
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg group ${
        isActive
          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      <Icon size={18} className="mr-3 transition-transform group-hover:scale-110" />
      <span className="truncate">{label}</span>
    </button>
  );

  const SearchBar = () => (
    <div className="relative">
      <SearchIcon size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        placeholder="Search exercises, programs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 focus:border-transparent transition-all duration-200"
      />
    </div>
  );

  const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
    const styles = {
      'Pemula': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
      'Menengah': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800',
      'Lanjutan': 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium border rounded-full ${styles[difficulty as keyof typeof styles] || styles['Pemula']}`}>
        {difficulty}
      </span>
    );
  };

  const ExerciseCard = ({ exercise }: { exercise: Exercise }) => (
    <div
      onClick={() => setSelectedExercise(exercise)}
      className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-slate-100/5 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
            {exercise.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {exercise.description}
          </p>
        </div>
        <DifficultyBadge difficulty={exercise.difficulty} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-500">
          <span className="bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full font-medium">
            {exercise.category}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {exercise.primaryMuscles.slice(0, 3).map((muscle, idx) => (
            <span key={idx} className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">
              {muscle}
            </span>
          ))}
          {exercise.primaryMuscles.length > 3 && (
            <span className="text-xs text-slate-500 dark:text-slate-500 px-2 py-1">
              +{exercise.primaryMuscles.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const ProgramCard = ({ program }: { program: WorkoutProgram }) => (
    <div className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-slate-100/5 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
            {program.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {program.description}
          </p>
        </div>
        <DifficultyBadge difficulty={program.difficulty} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full font-medium text-slate-700 dark:text-slate-300">
            {program.category}
          </span>
          <div className="flex items-center text-slate-500 dark:text-slate-500">
            <ClockIcon size={14} className="mr-1" />
            <span>{program.duration}</span>
            <span className="mx-2">•</span>
            <span>{program.workouts?.length || 0} sessions</span>
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.ComponentType<{ size?: number; className?: string }> }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
        <Icon size={24} className="text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm">{description}</p>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-slate-900 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors lg:hidden"
                >
                  <MenuIcon size={20} />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 rounded-xl flex items-center justify-center shadow-sm">
                    <DumbbellIcon size={20} className="text-white dark:text-slate-900" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                      FitnessPro
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                      Premium Training Experience
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <SearchIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search exercises, programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 w-64 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-300 dark:focus:border-slate-600 transition-all duration-200 backdrop-blur-sm"
                  />
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 backdrop-blur-sm"
                  title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {darkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Category Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-800">
          <CategoryNavigation
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:relative lg:translate-x-0 z-40 w-80 h-[calc(100vh-120px)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-out`}>
            
            <div className="h-full flex flex-col">
              {/* Search */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                    <div className="flex items-center space-x-2">
                      <TrendingUpIcon size={16} className="text-slate-600 dark:text-slate-400" />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Exercises</span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">{filteredExercises.length}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                    <div className="flex items-center space-x-2">
                      <TargetIcon size={16} className="text-slate-600 dark:text-slate-400" />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Programs</span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">{filteredPrograms.length}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {tabConfig.map((tab) => (
                      <TabButton
                        key={tab.id}
                        label={tab.label}
                        icon={tab.icon}
                        isActive={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                      />
                    ))}
                  </div>
                </div>

                {/* Exercise Details */}
                {selectedExercise && (
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        Exercise Details
                      </h3>
                      <button
                        onClick={() => setSelectedExercise(null)}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <XIcon size={16} className="text-slate-400" />
                      </button>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          {selectedExercise.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {selectedExercise.description}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                          Primary Muscles
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {selectedExercise.primaryMuscles.map((muscle, idx) => (
                            <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md">
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                          Key Tips
                        </h5>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          {selectedExercise.tips.slice(0, 2).map((tip, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </nav>
            </div>
          </aside>

          {/* Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 min-h-0">
            <div className="h-[calc(100vh-120px)] overflow-y-auto">
              <div className="p-8 max-w-5xl">
                {activeTab === 'exercises' && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          Exercises
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                          {filteredExercises.length} exercises available
                        </p>
                      </div>
                    </div>
                    
                    {filteredExercises.length > 0 ? (
                      <div className="grid gap-6">
                        {filteredExercises.map(exercise => (
                          <ExerciseCard key={exercise.id} exercise={exercise} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon={SearchIcon}
                        title="No exercises found"
                        description="Try adjusting your search or category filters to find what you're looking for."
                      />
                    )}
                  </div>
                )}

                {activeTab === 'programs' && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          Training Programs
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                          {filteredPrograms.length} programs available
                        </p>
                      </div>
                    </div>
                    
                    {filteredPrograms.length > 0 ? (
                      <div className="grid gap-6">
                        {filteredPrograms.map(program => (
                          <ProgramCard key={program.id} program={program} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon={TargetIcon}
                        title="No programs found"
                        description="Try adjusting your search or category filters to find what you're looking for."
                      />
                    )}
                  </div>
                )}

                {activeTab === 'nutrition' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Nutrition Guide
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400">
                        Evidence-based nutrition principles for optimal performance
                      </p>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                          Fundamental Principles
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-6">
                            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                              <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mr-3">
                                  <TrendingUpIcon size={16} className="text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">Muscle Building</h4>
                              </div>
                              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-start">
                                  <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  Caloric surplus: 300-500 kcal/day
                                </li>
                                <li className="flex items-start">
                                  <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  Protein: 1.8-2.2g per kg body weight
                                </li>
                                <li className="flex items-start">
                                  <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  Carbohydrates: 4-6g per kg body weight
                                </li>
                              </ul>
                            </div>

                            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                              <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center mr-3">
                                  <ZapIcon size={16} className="text-rose-600 dark:text-rose-400" />
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">Fat Loss</h4>
                              </div>
                              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-start">
                                  <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  Caloric deficit: 300-500 kcal/day
                                </li>
                                <li className="flex items-start">
                                  <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  Protein: 2.0-2.5g per kg body weight
                                </li>
                                <li className="flex items-start">
                                  <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  Carbohydrates: 2-4g per kg body weight
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                              <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                                  <ClockIcon size={16} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">Pre-Workout</h4>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Moderate carbohydrates with minimal protein 30-60 minutes before training. 
                                Focus on easily digestible sources like bananas or oatmeal.
                              </p>
                            </div>

                            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                              <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mr-3">
                                  <ZapIcon size={16} className="text-amber-600 dark:text-amber-400" />
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">Post-Workout</h4>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                High-quality protein with fast-acting carbohydrates within 30 minutes. 
                                Consider whey protein with a banana or chocolate milk.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Exercise Modal */}
        {selectedExercise && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {selectedExercise.name}
                    </h3>
                    <DifficultyBadge difficulty={selectedExercise.difficulty} />
                  </div>
                  <button
                    onClick={() => setSelectedExercise(null)}
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <XIcon size={20} className="text-slate-400" />
                  </button>
                </div>
                
                <div className="space-y-8">
                  <ExerciseMedia
                    exerciseId={selectedExercise.id}
                    exerciseName={selectedExercise.name}
                    hasVideo={true}
                    hasImages={true}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">
                          Instructions
                        </h4>
                        <ol className="space-y-2">
                          {selectedExercise.instructions.map((instruction, idx) => (
                            <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                              <span className="w-5 h-5 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-xs font-medium text-slate-500 dark:text-slate-400 mr-3 mt-0.5 flex-shrink-0">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">
                          Key Tips
                        </h4>
                        <ul className="space-y-2">
                          {selectedExercise.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                              <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="leading-relaxed">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">
                          Primary Muscles
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedExercise.primaryMuscles.map((muscle, idx) => (
                            <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedExercise.variations && selectedExercise.variations.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">
                            Variations
                          </h4>
                          <ul className="space-y-1">
                            {selectedExercise.variations.map((variation, idx) => (
                              <li key={idx} className="text-sm text-slate-600 dark:text-slate-400">
                                {variation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}