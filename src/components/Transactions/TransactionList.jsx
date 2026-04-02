import { useState } from 'react';
import {
  Search, Plus, Pencil, Trash2, Download,
  ArrowUpRight, ArrowDownRight, ChevronsUpDown, ChevronUp, ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { initialTransactions } from '../../data/mockData';
import { CategoryAvatar, getCategoryMeta } from '../../utils/categoryConfig';
import { format } from 'date-fns';
import clsx from 'clsx';
import TransactionModal from './TransactionModal';

const usd = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
const CATEGORIES = [...new Set(initialTransactions.map(t => t.category))];

function SortBtn({ field, filters, onToggle }) {
  const active = filters.sortBy === field;
  return (
    <button onClick={() => onToggle(field)} className="inline-flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
      {active
        ? filters.sortDir === 'desc' ? <ChevronDown size={12} className="text-blue-500" /> : <ChevronUp size={12} className="text-blue-500" />
        : <ChevronsUpDown size={11} className="text-gray-300 dark:text-gray-600" />
      }
    </button>
  );
}

export default function TransactionList() {
  const { filteredTransactions, filters, setFilters, role, deleteTransaction, transactions } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState(null);

  const toggleSort = (field) => {
    setFilters(f => ({
      ...f,
      sortBy: field,
      sortDir: f.sortBy === field && f.sortDir === 'desc' ? 'asc' : 'desc',
    }));
  };

  const exportCSV = () => {
    const rows = transactions.map(t => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`);
    const blob = new Blob(['Date,Description,Category,Type,Amount\n' + rows.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'transactions.csv';
    a.click();
  };

  return (
    <div className="space-y-4 animate-fade-up">

      {/* Filter bar */}
      <div className="card p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-56">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="input pl-10 text-sm"
              placeholder="Search transactions…"
              value={filters.search}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            />
          </div>

          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-0.5">
            {[
              { val: 'all', label: 'All' },
              { val: 'income', label: 'Income' },
              { val: 'expense', label: 'Expense' },
            ].map(({ val, label }) => (
              <button key={val}
                onClick={() => setFilters(f => ({ ...f, type: val }))}
                className={clsx(
                  'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
                  filters.type === val
                    ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                )}>
                {label}
              </button>
            ))}
          </div>

          <select
            className="input w-auto text-sm"
            value={filters.category}
            onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <div className="ml-auto flex items-center gap-2">
            <button onClick={exportCSV} className="btn btn-secondary btn-sm">
              <Download size={13} /> Export CSV
            </button>
            {role === 'admin' && (
              <button onClick={() => { setEditTx(null); setModalOpen(true); }} className="btn btn-primary btn-sm">
                <Plus size={14} /> Add Transaction
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Showing{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-300">{filteredTransactions.length}</span>
            {' '}of{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-300">{transactions.length}</span>
            {' '}transactions
          </p>
          {filters.search || filters.type !== 'all' || filters.category !== 'all' ? (
            <button
              onClick={() => setFilters(f => ({ ...f, search: '', type: 'all', category: 'all' }))}
              className="text-xs text-blue-500 hover:text-blue-700 font-semibold"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-gray-50/70 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <th className="table-head-cell">
                  <span className="flex items-center gap-1">Date <SortBtn field="date" filters={filters} onToggle={toggleSort} /></span>
                </th>
                <th className="table-head-cell">Description</th>
                <th className="table-head-cell">Category</th>
                <th className="table-head-cell">Type</th>
                <th className="table-head-cell text-right">
                  <span className="flex items-center gap-1 justify-end">Amount <SortBtn field="amount" filters={filters} onToggle={toggleSort} /></span>
                </th>
                {role === 'admin' && <th className="table-head-cell text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Search size={20} className="text-gray-300 dark:text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">No transactions found</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filters</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {filteredTransactions.map((tx) => {
                const meta = getCategoryMeta(tx.category);
                const Icon = meta.icon;
                return (
                  <tr key={tx.id} className="table-row group">
                    <td className="table-cell">
                      <span className="num text-xs text-gray-500 dark:text-gray-400">
                        {format(new Date(tx.date), 'MMM d, yyyy')}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <CategoryAvatar category={tx.category} size="sm" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{tx.description}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-1.5">
                        <Icon size={11} style={{ color: meta.color }} strokeWidth={2} />
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{tx.category}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={tx.type === 'income' ? 'badge-income' : 'badge-expense'}>
                        {tx.type === 'income' ? <><ArrowUpRight size={10} /> Income</> : <><ArrowDownRight size={10} /> Expense</>}
                      </span>
                    </td>
                    <td className="table-cell text-right">
                      <span className={clsx('num text-sm font-bold', tx.type === 'income' ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400')}>
                        {tx.type === 'income' ? '+' : '−'}{usd(tx.amount)}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td className="table-cell text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setEditTx(tx); setModalOpen(true); }}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={() => deleteTransaction(tx.id)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-error-600 hover:bg-error-50 dark:hover:bg-error-700/20 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && <TransactionModal onClose={() => setModalOpen(false)} editTx={editTx} />}
    </div>
  );
}
