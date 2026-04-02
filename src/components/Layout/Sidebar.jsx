import {
  LayoutDashboard, ArrowLeftRight, BarChart3,
  TrendingUp, Settings, Shield, ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

const NAV = [
  {
    section: 'Overview',
    items: [
      { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard, badge: null },
      { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight,  badge: null },
      { id: 'insights',     label: 'Insights',     icon: BarChart3,       badge: null },
    ],
  },
  {
    section: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings, badge: null, disabled: true },
    ],
  },
];

export default function Sidebar() {
  const { activePage, setActivePage, role } = useApp();

  return (
    <aside className="w-[240px] min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed left-0 top-0 z-20 transition-colors duration-200">

      {/* Logo */}
      <div className="h-16 px-5 flex items-center border-b border-gray-100 dark:border-gray-800 gap-3 flex-shrink-0">
        <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm">
          <TrendingUp size={15} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="font-display font-bold text-gray-900 dark:text-white text-[15px] leading-none">FinVault</p>
          <p className="text-2xs text-gray-400 dark:text-gray-500 mt-0.5 font-medium">Finance Dashboard</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
        {NAV.map(group => (
          <div key={group.section}>
            <p className="px-3 mb-1.5 text-2xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
              {group.section}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ id, label, icon: Icon, badge, disabled }) => {
                const isActive = activePage === id;
                return (
                  <button
                    key={id}
                    onClick={() => !disabled && setActivePage(id)}
                    disabled={disabled}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 w-full text-left',
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 font-semibold'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                      disabled && 'opacity-40 cursor-not-allowed pointer-events-none'
                    )}
                  >
                    <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className="flex-shrink-0" />
                    <span className="flex-1">{label}</span>
                    {badge && (
                      <span className="ml-auto text-2xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-md">
                        {badge}
                      </span>
                    )}
                    {isActive && !badge && (
                      <ChevronRight size={13} className="ml-auto opacity-50" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className="px-3 py-3 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white text-xs font-bold">JD</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success-500 border-2 border-white dark:border-gray-900 rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-none truncate">John Doe</p>
            <p className="text-2xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">john@finvault.io</p>
          </div>
          <div className={clsx(
            'flex-shrink-0 text-2xs font-bold px-1.5 py-0.5 rounded-md',
            role === 'admin' ? 'bg-warning-50 text-warning-700' : 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400'
          )}>
            {role === 'admin' ? 'ADMIN' : 'VIEW'}
          </div>
        </div>
      </div>
    </aside>
  );
}
