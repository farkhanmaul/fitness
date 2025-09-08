import React from 'react';
import { Icon } from '@/components/ui/Icon';

interface ToolbarButton {
  id: string;
  icon: string;
  title: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

interface ToolbarProps {
  buttons: ToolbarButton[];
  className?: string;
}

export function Toolbar({ buttons, className = '' }: ToolbarProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {buttons.map(button => (
        <button
          key={button.id}
          onClick={button.onClick}
          disabled={button.disabled}
          className={`p-2 rounded-md transition-colors mobile-touch-target ${
            button.active 
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          } ${
            button.disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title={button.title}
        >
          <Icon name={button.icon as any} size={20} />
        </button>
      ))}
    </div>
  );
}