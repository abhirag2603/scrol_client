// utils/storage.js

export const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Could not save to localStorage', error);
    }
  };
  
  export const loadFromLocalStorage = (key) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Could not load from localStorage', error);
      return null;
    }
  };
  