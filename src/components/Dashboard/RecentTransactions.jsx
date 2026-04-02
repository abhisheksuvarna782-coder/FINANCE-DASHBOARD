import { ArrowUpRight, ArrowDownRight, MoveRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CategoryAvatar } from '../../utils/categoryConfig';
import { format } from 'date-fns';
import clsx from 'clsx';

const usd = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export default function RecentTransactions() {
  const { transactions, setActivePage } = useApp();
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7);

  return (
    <div className="card animate-fade-up s5">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h3 className="font-display font-bold text-gray-900 dark:text-white text-[15px]">Recent Transactions</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Latest financial activity</p>
        </div>
        <button onClick={() => setActivePage('transactions')} className="btn btn-secondary btn-sm">
          View all <MoveRight size={13} />
        </button>
      </div>

      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] px-6 py-2.5 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
        <span className="text-2xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">Description</span>
        <span className="text-2xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">Category</span>
        <span className="text-2xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">Date</span>
        <span className="text-2xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest text-right">Amount</span>
      </div>

      <div>
        {recent.map((tx, i) => (
          <div
            key={tx.id}
            className={clsx(
              'grid grid-cols-[2fr_1fr_1fr_auto] items-center px-6 py-3.5 transition-colors hover:bg-gray-50/70 dark:hover:bg-gray-800/50',
              i < recent.length - 1 && 'border-b border-gray-100 dark:border-gray-800'
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <CategoryAvatar category={tx.category} size="sm" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{tx.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{tx.category}</p>
              </div>
            </div>

            <div className="hidden md:block">
              <span className="badge badge-neutral">{tx.category.split(' ')[0]}</span>
            </div>

            <p className="hidden md:block num text-xs text-gray-500 dark:text-gray-400">
              {format(new Date(tx.date), 'MMM d, yyyy')}
            </p>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className={clsx('num text-sm font-bold', tx.type === 'income' ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400')}>
                {tx.type === 'income' ? '+' : '−'}{usd(tx.amount)}
              </span>
              {tx.type === 'income'
                ? <ArrowUpRight size={14} className="text-success-500" />
                : <ArrowDownRight size={14} className="text-error-500" />
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
