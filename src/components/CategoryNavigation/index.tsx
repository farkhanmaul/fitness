'use client';

import { useState } from 'react';
import { exerciseCategories, ExerciseCategory } from '@/data/categories';

interface CategoryNavigationProps {
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  className?: string;
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  activeCategory,
  onCategoryChange,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-sm border-b ${className}`}>
      {/* Mobile Toggle */}
      <div className="lg:hidden px-4 py-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <span>
            {activeCategory 
              ? exerciseCategories.find(cat => cat.id === activeCategory)?.name || 'Semua Kategori'
              : 'Semua Kategori'
            }
          </span>
          <svg
            className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation Items */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="px-4 py-2 overflow-x-auto">
          <div className="flex lg:flex-wrap lg:justify-center space-x-2 lg:space-x-3 lg:space-y-0">
            {/* All Categories Button */}
            <button
              onClick={() => {
                onCategoryChange(null);
                setIsExpanded(false);
              }}
              className={`
                flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                ${!activeCategory
                  ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              Semua Kategori
            </button>

            {/* Category Buttons */}
            {exerciseCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsExpanded(false);
                }}
                className={`
                  flex-shrink-0 flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                  ${activeCategory === category.id
                    ? `${category.color} text-white shadow-md`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
                title={category.description}
              >
                <span className="text-base">{category.icon}</span>
                <span className="whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Description */}
        {activeCategory && (
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t">
            {(() => {
              const category = exerciseCategories.find(cat => cat.id === activeCategory);
              return category ? (
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {category.subcategories.map((subcategory) => (
                      <span
                        key={subcategory}
                        className="inline-block px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                      >
                        {subcategory}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};