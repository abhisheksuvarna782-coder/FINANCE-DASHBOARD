import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState('admin'); // 'admin' | 'viewer'
  const [activePage, setActivePage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date',
    sortDir: 'desc',
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

  const addTransaction = useCallback((tx) => {
    setTransactions(prev => [{ ...tx, id: Math.random().toString(36).substr(2, 9) }, ...prev]);
  }, []);

  const editTransaction = useCallback((id, updated) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const filteredTransactions = transactions.filter(t => {
    const matchSearch = !filters.search || 
      t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.category.toLowerCase().includes(filters.search.toLowerCase());
    const matchType = filters.type === 'all' || t.type === filters.type;
    const matchCategory = filters.category === 'all' || t.category === filters.category;
    return matchSearch && matchType && matchCategory;
  }).sort((a, b) => {
    if (filters.sortBy === 'date') {
      return filters.sortDir === 'desc' 
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    }
    if (filters.sortBy === 'amount') {
      return filters.sortDir === 'desc' ? b.amount - a.amount : a.amount - b.amount;
    }
    return 0;
  });

  return (
    <AppContext.Provider value={{
      transactions,
      filteredTransactions,
      role, setRole,
      activePage, setActivePage,
      darkMode, toggleDarkMode,
      filters, setFilters,
      addTransaction,
      editTransaction,
      deleteTransaction,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
