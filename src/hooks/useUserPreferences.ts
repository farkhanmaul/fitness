import { useState, useEffect, useCallback } from 'react';

export function useUserPreferences() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [darkMode, setDarkMode] = useState(false);

  // Load preferences from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('fitness-favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
    
    const savedTheme = localStorage.getItem('fitness-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('fitness-favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('fitness-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('fitness-theme', 'light');
      }
      return newMode;
    });
  }, []);

  return {
    favorites,
    darkMode,
    toggleFavorite,
    toggleDarkMode,
  };
}