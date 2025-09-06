import { useEffect } from 'react';

export type KeyboardShortcut = {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  callback: () => void;
  description: string;
};

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach(shortcut => {
        const {
          key,
          ctrlKey = false,
          metaKey = false,
          altKey = false,
          callback
        } = shortcut;

        const matches = 
          event.key === key &&
          event.ctrlKey === ctrlKey &&
          event.metaKey === metaKey &&
          event.altKey === altKey;

        if (matches) {
          event.preventDefault();
          callback();
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  return shortcuts;
}