import { Bell, ChevronDown, Shield, CalendarDays, Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PAGE_META = {
  dashboard:    { title: 'Dashboard',    crumb: 'Overview' },
  transactions: { title: 'Transactions', crumb: 'Finance' },
  insights:     { title: 'Insights',     crumb: 'Analytics' },
};

export default function Header() {
  const { activePage, role, setRole, darkMode, toggleDarkMode } = useApp();
  const meta = PAGE_META[activePage] || PAGE_META.dashboard;

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10 flex-shrink-0 transition-colors duration-200">

      {/* Left: breadcrumb + title */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-400 dark:text-gray-500 font-medium">{meta.crumb}</span>
        <ChevronDown size={13} className="text-gray-300 dark:text-gray-600 -rotate-90" />
        <span className="font-display font-bold text-gray-900 dark:text-white text-base">{meta.title}</span>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-2">

        {/* Date range chip */}
        <div className="hidden lg:flex items-center gap-2 h-9 px-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300">
          <CalendarDays size={13} className="text-gray-400 dark:text-gray-500" />
          <span>Jan – Mar 2025</span>
        </div>

        {/* Role switcher */}
        <div className="relative flex items-center gap-1.5 h-9 px-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
          <Shield
            size={13}
            className={role === 'admin' ? 'text-warning-600' : 'text-blue-500'}
          />
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="bg-transparent text-xs font-semibold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer pr-4 appearance-none"
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
          <ChevronDown size={11} className="text-gray-400 absolute right-2 pointer-events-none" />
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode
            ? <Sun size={14} className="text-yellow-400" />
            : <Moon size={14} className="text-gray-500" />
          }
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Bell size={14} className="text-gray-500 dark:text-gray-400" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
        </button>
      </div>
    </header>
  );
}