'use client';

import { useState } from 'react';
import { exerciseCategories } from '@/data/categories';
import { ZapIcon, ShieldIcon, TrophyIcon, DumbbellIcon, ActivityIcon, HeartIcon, TargetIcon } from '@/components/icons/Icons';

interface CategoryNavigationProps {
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  className?: string;
}

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'hybrid': ZapIcon,
  'navy': ShieldIcon,
  'martial-arts': TrophyIcon,
  'strength': DumbbellIcon,
  'endurance': ActivityIcon,
  'flexibility': HeartIcon,
  'sports-specific': TargetIcon,
  'rehabilitation': HeartIcon,
};

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  activeCategory,
  onCategoryChange,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 ${className}`}>
      {/* Mobile Toggle */}
      <div className="lg:hidden px-6 py-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
        >
          <span className="flex items-center">
            {activeCategory ? (
              <>
                {(() => {
                  const category = exerciseCategories.find(cat => cat.id === activeCategory);
                  const Icon = category ? categoryIcons[category.id] || ZapIcon : ZapIcon;
                  return (
                    <>
                      <Icon size={16} className="mr-2" />
                      {category?.name || 'All Categories'}
                    </>
                  );
                })()}
              </>
            ) : (
              <>
                <DumbbellIcon size={16} className="mr-2" />
                All Categories
              </>
            )}
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
        <div className="px-6 py-4 overflow-x-auto">
          <div className="flex lg:flex-wrap lg:justify-center space-x-3 lg:space-x-2 lg:space-y-0">
            {/* All Categories Button */}
            <button
              onClick={() => {
                onCategoryChange(null);
                setIsExpanded(false);
              }}
              className={`
                flex-shrink-0 flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200
                ${!activeCategory
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }
              `}
            >
              <DumbbellIcon size={16} className="mr-2" />
              <span className="whitespace-nowrap">All Categories</span>
            </button>

            {/* Category Buttons */}
            {exerciseCategories.map((category) => {
              const Icon = categoryIcons[category.id] || ZapIcon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id);
                    setIsExpanded(false);
                  }}
                  className={`
                    flex-shrink-0 flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200
                    ${activeCategory === category.id
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }
                  `}
                  title={category.description}
                >
                  <Icon size={16} className="mr-2" />
                  <span className="whitespace-nowrap">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Description */}
        {activeCategory && (
          <div className="px-6 pb-4 border-t border-slate-100 dark:border-slate-800 pt-4 bg-slate-50/50 dark:bg-slate-800/50">
            {(() => {
              const category = exerciseCategories.find(cat => cat.id === activeCategory);
              return category ? (
                <div className="max-w-4xl mx-auto">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((subcategory) => (
                      <span
                        key={subcategory}
                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-600"
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