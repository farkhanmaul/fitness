import React from 'react';
import { Icon } from '@/components/ui/Icon';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: Array<{
    id: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }>;
  onClearFilters: () => void;
  className?: string;
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  filters,
  onClearFilters,
  className = ''
}: FilterBarProps) {
  const hasActiveFilters = filters.some(filter => filter.value !== 'All') || searchTerm.length > 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="search" size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search exercises, programs, movements..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {filters.map(filter => (
          <select
            key={filter.id}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            {filter.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center space-x-1"
          >
            <Icon name="x" size={14} />
            <span>Clear all filters</span>
          </button>
        </div>
      )}
    </div>
  );
}