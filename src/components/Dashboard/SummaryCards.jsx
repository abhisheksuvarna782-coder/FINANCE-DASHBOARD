import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getSummary } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

const usd = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const CARDS = [
  {
    key: 'balance', label: 'Net Balance', sub: 'Total assets − liabilities',
    icon: Wallet, iconBg: 'bg-blue-50 dark:bg-blue-950', iconColor: 'text-blue-600 dark:text-blue-400',
    change: '+12.4%', positive: true,
  },
  {
    key: 'income', label: 'Total Income', sub: 'All revenue streams',
    icon: TrendingUp, iconBg: 'bg-success-50 dark:bg-success-700/20', iconColor: 'text-success-600 dark:text-success-400',
    change: '+8.2%', positive: true,
  },
  {
    key: 'expenses', label: 'Total Expenses', sub: 'All outgoing payments',
    icon: TrendingDown, iconBg: 'bg-error-50 dark:bg-error-700/20', iconColor: 'text-error-600 dark:text-error-400',
    change: '+3.1%', positive: false,
  },
  {
    key: 'savings', label: 'Savings Rate', sub: 'Income retained',
    icon: PiggyBank, iconBg: 'bg-warning-50 dark:bg-warning-700/20', iconColor: 'text-warning-600 dark:text-warning-500',
    isSavings: true, change: '+2.3%', positive: true,
  },
];

export default function SummaryCards() {
  const { transactions } = useApp();
  const summary = getSummary(transactions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {CARDS.map((card, i) => {
        const Icon = card.icon;
        const val = card.isSavings ? `${summary.savings}%` : usd(summary[card.key]);
        return (
          <div key={card.key} className={clsx('card p-5 animate-fade-up', `s${i + 1}`)}>
            <div className="flex items-start justify-between mb-4">
              <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', card.iconBg)}>
                <Icon size={18} className={card.iconColor} strokeWidth={2} />
              </div>
              <span className={card.positive ? 'delta-up' : 'delta-down'}>
                {card.positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {card.change}
              </span>
            </div>
            <p className="num text-2xl font-bold tracking-tight leading-none text-gray-900 dark:text-white">{val}</p>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">{card.label}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{card.sub}</p>
            <div className="mt-4 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={clsx('h-full rounded-full transition-all duration-700', card.positive ? 'bg-success-500' : 'bg-error-500')}
                style={{ width: card.isSavings ? `${summary.savings}%` : '72%' }}
              />
            </div>
            <p className="text-2xs text-gray-400 dark:text-gray-600 mt-1.5">vs last quarter</p>
          </div>
        );
      })}
    </div>
  );
}
