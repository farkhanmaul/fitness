import React from 'react';
import { Icon } from '@/components/ui/Icon';

interface CardAction {
  icon: string;
  label: string;
  onClick: () => void;
  className?: string;
}

interface CardItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger';
  };
  tags?: string[];
  isFavorite?: boolean;
  onClick?: () => void;
  actions?: CardAction[];
}

interface CardListProps {
  items: CardItem[];
  onFavoriteToggle?: (id: string) => void;
  emptyMessage?: string;
  emptyIcon?: string;
  className?: string;
}

export function CardList({
  items,
  onFavoriteToggle,
  emptyMessage = 'No items found',
  emptyIcon = 'search',
  className = ''
}: CardListProps) {
  const getBadgeColor = (variant: string = 'default') => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'danger':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <Icon name={emptyIcon as any} size={48} className="mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-2 sm:mb-4">
          {emptyMessage}
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 sm:gap-6 ${className}`}>
      {items.map(item => (
        <div
          key={item.id}
          className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group cursor-pointer"
          onClick={item.onClick}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                {item.badge && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(item.badge.variant)}`}>
                    {item.badge.text}
                  </span>
                )}
              </div>
              {item.subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {item.subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {item.actions?.map((action, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                  className={`p-1 rounded-full transition-colors ${action.className || 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
                  title={action.label}
                >
                  <Icon name={action.icon as any} size={16} />
                </button>
              ))}
              
              {onFavoriteToggle && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavoriteToggle(item.id);
                  }}
                  className={`p-1 rounded-full transition-colors ${
                    item.isFavorite
                      ? 'text-yellow-500 hover:text-yellow-600'
                      : 'text-gray-400 hover:text-yellow-500'
                  }`}
                  title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Icon name="star" size={16} />
                </button>
              )}
            </div>
          </div>

          {item.description && (
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {item.description}
            </p>
          )}

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}