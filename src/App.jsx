import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import DashboardPage from './pages/Dashboard';
import TransactionsPage from './pages/Transactions';
import InsightsPage from './pages/Insights';

function AppShell() {
  const { activePage } = useApp();
  const pages = {
    dashboard:    <DashboardPage />,
    transactions: <TransactionsPage />,
    insights:     <InsightsPage />,
  };
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950 transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6 max-w-[1400px]">
          <div key={activePage} className="animate-fade-up">
            {pages[activePage] || pages.dashboard}
          </div>
        </main>
        <footer className="px-6 py-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between transition-colors duration-200">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">FinVault · Finance Dashboard · 2025</span>
          <span className="text-xs text-gray-300 dark:text-gray-600">v2.0.0</span>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
