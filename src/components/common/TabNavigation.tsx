import React from 'react';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  shortLabel?: string;
  disabled?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}: TabNavigationProps) {
  return (
    <div className={`flex space-x-0.5 sm:space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg overflow-x-auto ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && onTabChange(tab.id)}
          disabled={tab.disabled}
          className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-w-0 flex-1 lg:flex-none ${
            activeTab === tab.id
              ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
              : tab.disabled
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {tab.icon && (
            <span className="text-sm sm:text-base">{tab.icon}</span>
          )}
          <span className="hidden xs:inline lg:hidden text-xs">
            {tab.shortLabel || tab.label}
          </span>
          <span className="hidden lg:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}