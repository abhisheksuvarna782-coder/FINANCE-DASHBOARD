import { useState, useEffect } from 'react';
import { X, Check, DollarSign, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categoryMeta } from '../../utils/categoryConfig';
import clsx from 'clsx';

const CATEGORIES = Object.keys(categoryMeta);

export default function TransactionModal({ onClose, editTx }) {
  const { addTransaction, editTransaction } = useApp();
  const [form, setForm] = useState({
    description: '', amount: '', category: 'Food & Dining', type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTx) setForm({ ...editTx, amount: String(editTx.amount) });
  }, [editTx]);

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) e.amount = 'Enter a valid positive amount';
    if (!form.date) e.date = 'Date is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const tx = { ...form, amount: parseFloat(form.amount) };
    editTx ? editTransaction(editTx.id, tx) : addTransaction(tx);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl w-full max-w-[440px] animate-scale-in overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 50%, #0D9488 100%)' }} />

        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">
                {editTx ? 'Edit Transaction' : 'New Transaction'}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {editTx ? 'Update the transaction details below' : 'Fill in the details to add a record'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0 mt-0.5"
            >
              <X size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Type toggle */}
            <div>
              <label className="label">Transaction Type</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                {[
                  { val: 'income',  label: 'Income',  accent: 'text-success-600 bg-white dark:bg-gray-700' },
                  { val: 'expense', label: 'Expense', accent: 'text-error-600 bg-white dark:bg-gray-700' },
                ].map(({ val, label, accent }) => (
                  <button
                    key={val}
                    onClick={() => setForm(f => ({ ...f, type: val }))}
                    className={clsx(
                      'py-2.5 rounded-lg text-sm font-semibold transition-all duration-150',
                      form.type === val ? `${accent} shadow-sm` : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    )}
                  >
                    {val === 'income' ? '↑ ' : '↓ '}{label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="label">Description</label>
              <input
                className={clsx('input', errors.description && 'input-error')}
                placeholder="e.g. Monthly Salary"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
              {errors.description && (
                <p className="flex items-center gap-1.5 text-xs text-error-600 dark:text-error-400 mt-1.5">
                  <AlertCircle size={11} /> {errors.description}
                </p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="label">Amount (USD)</label>
              <div className="relative">
                <DollarSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className={clsx('input pl-9 num', errors.amount && 'input-error')}
                  placeholder="0.00" type="number" min="0" step="0.01"
                  value={form.amount}
                  onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                />
              </div>
              {errors.amount && (
                <p className="flex items-center gap-1.5 text-xs text-error-600 dark:text-error-400 mt-1.5">
                  <AlertCircle size={11} /> {errors.amount}
                </p>
              )}
            </div>

            {/* Category + Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Category</label>
                <select className="input text-sm" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Date</label>
                <input
                  type="date"
                  className={clsx('input', errors.date && 'input-error')}
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                />
                {errors.date && <p className="text-xs text-error-600 dark:text-error-400 mt-1">{errors.date}</p>}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="btn btn-secondary flex-1">Cancel</button>
            <button onClick={handleSubmit} className="btn btn-primary flex-1">
              <Check size={14} />
              {editTx ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
