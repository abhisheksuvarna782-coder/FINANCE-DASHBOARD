export const categoryColors = {
  'Food & Dining': '#F97316',
  'Transport':     '#2563EB',
  'Shopping':      '#7C3AED',
  'Entertainment': '#DB2777',
  'Healthcare':    '#059669',
  'Utilities':     '#4F46E5',
  'Salary':        '#D97706',
  'Freelance':     '#0D9488',
  'Investment':    '#16A34A',
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const initialTransactions = [
  // January
  { id: generateId(), date: '2025-01-05', description: 'Monthly Salary',     amount: 5500,   category: 'Salary',        type: 'income'  },
  { id: generateId(), date: '2025-01-06', description: 'Grocery Store',      amount: 142.50, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2025-01-08', description: 'Netflix Subscription',amount: 15.99, category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: '2025-01-10', description: 'Uber Ride',          amount: 24.00,  category: 'Transport',     type: 'expense' },
  { id: generateId(), date: '2025-01-12', description: 'Freelance Project',  amount: 800,    category: 'Freelance',     type: 'income'  },
  { id: generateId(), date: '2025-01-15', description: 'Amazon Shopping',    amount: 189.99, category: 'Shopping',      type: 'expense' },
  { id: generateId(), date: '2025-01-18', description: 'Electricity Bill',   amount: 78.00,  category: 'Utilities',     type: 'expense' },
  { id: generateId(), date: '2025-01-20', description: 'Restaurant Dinner',  amount: 65.00,  category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2025-01-22', description: 'Gym Membership',     amount: 49.00,  category: 'Healthcare',    type: 'expense' },
  { id: generateId(), date: '2025-01-25', description: 'Fuel',               amount: 55.00,  category: 'Transport',     type: 'expense' },
  { id: generateId(), date: '2025-01-28', description: 'Stock Dividend',     amount: 220,    category: 'Investment',    type: 'income'  },
  // February
  { id: generateId(), date: '2025-02-05', description: 'Monthly Salary',     amount: 5500,   category: 'Salary',        type: 'income'  },
  { id: generateId(), date: '2025-02-07', description: 'Grocery Store',      amount: 156.20, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2025-02-10', description: 'Spotify Premium',    amount: 9.99,   category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: '2025-02-12', description: 'Bus Pass',           amount: 45.00,  category: 'Transport',     type: 'expense' },
  { id: generateId(), date: '2025-02-14', description: 'Valentine Dinner',   amount: 110.00, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2025-02-15', description: 'Freelance Design',   amount: 1200,   category: 'Freelance',     type: 'income'  },
  { id: generateId(), date: '2025-02-18', description: 'Clothing Store',     amount: 245.00, category: 'Shopping',      type: 'expense' },
  { id: generateId(), date: '2025-02-20', description: 'Internet Bill',      amount: 59.99,  category: 'Utilities',     type: 'expense' },
  { id: generateId(), date: '2025-02-22', description: 'Doctor Visit',       amount: 90.00,  category: 'Healthcare',    type: 'expense' },
  { id: generateId(), date: '2025-02-26', description: 'Investment Return',  amount: 350,    category: 'Investment',    type: 'income'  },
  // March
  { id: generateId(), date: '2025-03-05', description: 'Monthly Salary',     amount: 5500,   category: 'Salary',        type: 'income'  },
  { id: generateId(), date: '2025-03-07', description: 'Grocery Store',      amount: 133.40, category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2025-03-09', description: 'Cinema Tickets',     amount: 32.00,  category: 'Entertainment', type: 'expense' },
  { id: generateId(), date: '2025-03-12', description: 'Taxi',               amount: 38.00,  category: 'Transport',     type: 'expense' },
  { id: generateId(), date: '2025-03-15', description: 'Freelance Project',  amount: 950,    category: 'Freelance',     type: 'income'  },
  { id: generateId(), date: '2025-03-17', description: 'Electronics',        amount: 399.00, category: 'Shopping',      type: 'expense' },
  { id: generateId(), date: '2025-03-19', description: 'Water Bill',         amount: 35.00,  category: 'Utilities',     type: 'expense' },
  { id: generateId(), date: '2025-03-21', description: 'Pharmacy',           amount: 45.00,  category: 'Healthcare',    type: 'expense' },
  { id: generateId(), date: '2025-03-24', description: 'Cafe & Coffee',      amount: 78.00,  category: 'Food & Dining', type: 'expense' },
  { id: generateId(), date: '2025-03-28', description: 'Fuel',               amount: 60.00,  category: 'Transport',     type: 'expense' },
  { id: generateId(), date: '2025-03-30', description: 'Stock Dividend',     amount: 180,    category: 'Investment',    type: 'income'  },
];

export const getMonthlyData = (transactions) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const monthMap = { Jan:'2025-01', Feb:'2025-02', Mar:'2025-03', Apr:'2025-04', May:'2025-05', Jun:'2025-06' };
  return months.map(month => {
    const prefix = monthMap[month];
    const mx = transactions.filter(t => t.date.startsWith(prefix));
    const income   = mx.filter(t => t.type === 'income').reduce((s,t) => s + t.amount, 0);
    const expenses = mx.filter(t => t.type === 'expense').reduce((s,t) => s + t.amount, 0);
    return { month, income, expenses, balance: income - expenses };
  });
};

export const getCategoryBreakdown = (transactions) => {
  const map = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100, color: categoryColors[name] || '#98A2B3' }))
    .sort((a, b) => b.value - a.value);
};

export const getSummary = (transactions) => {
  const totalIncome   = transactions.filter(t => t.type === 'income').reduce((s,t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s,t) => s + t.amount, 0);
  return {
    balance:  totalIncome - totalExpenses,
    income:   totalIncome,
    expenses: totalExpenses,
    savings:  totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0,
  };
};