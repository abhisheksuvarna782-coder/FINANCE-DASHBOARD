import TransactionList from '../components/Transactions/TransactionList';
import { useApp } from '../context/AppContext';
import { getSummary } from '../data/mockData';
import { ArrowUpRight, ArrowDownRight, ArrowLeftRight } from 'lucide-react';
import clsx from 'clsx';

const usd = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function TransactionsPage() {
  const { transactions } = useApp();
  const s = getSummary(transactions);
  const STATS = [
    { label: 'Total Inflow',  value: usd(s.income),   icon: ArrowUpRight,   textColor: 'text-success-600 dark:text-success-400', iconBg: 'bg-success-50 dark:bg-success-700/20' },
    { label: 'Total Outflow', value: usd(s.expenses),  icon: ArrowDownRight, textColor: 'text-error-600 dark:text-error-400',     iconBg: 'bg-error-50 dark:bg-error-700/20'     },
    { label: 'Net Position',  value: usd(s.balance),   icon: ArrowLeftRight, textColor: 'text-blue-600 dark:text-blue-400',       iconBg: 'bg-blue-50 dark:bg-blue-950'          },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {STATS.map(({ label, value, icon: Icon, textColor, iconBg }) => (
          <div key={label} className="card p-4 flex items-center gap-4">
            <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
              <Icon size={17} className={textColor} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{label}</p>
              <p className={clsx('num text-lg font-bold', textColor)}>{value}</p>
            </div>
          </div>
        ))}
      </div>
      <TransactionList />
    </div>
  );
}
