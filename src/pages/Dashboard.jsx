import SummaryCards from '../components/Dashboard/SummaryCards';
import BalanceTrend from '../components/Dashboard/BalanceTrend';
import SpendingBreakdown from '../components/Dashboard/SpendingBreakdown';
import RecentTransactions from '../components/Dashboard/RecentTransactions';

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <SummaryCards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2"><BalanceTrend /></div>
        <div><SpendingBreakdown /></div>
      </div>
      <RecentTransactions />
    </div>
  );
}