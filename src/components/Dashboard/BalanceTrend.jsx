import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { getMonthlyData } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { TrendingUp } from 'lucide-react';

const usd = n => `$${(n / 1000).toFixed(1)}k`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const items = [
    { key: 'income',   label: 'Income',   color: '#12B76A' },
    { key: 'expenses', label: 'Expenses', color: '#F04438' },
    { key: 'balance',  label: 'Balance',  color: '#2563EB' },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-4 min-w-[160px]">
      <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">{label} 2025</p>
      {items.map(({ key, label: l, color }) => {
        const p = payload.find(x => x.dataKey === key);
        if (!p) return null;
        return (
          <div key={key} className="flex items-center justify-between gap-6 py-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-xs text-gray-500 dark:text-gray-400">{l}</span>
            </div>
            <span className="num text-xs font-bold text-gray-900 dark:text-white">
              ${p.value.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const LEGEND = [
  { key: 'income',   label: 'Income',   color: '#12B76A' },
  { key: 'expenses', label: 'Expenses', color: '#F04438' },
  { key: 'balance',  label: 'Balance',  color: '#2563EB' },
];

export default function BalanceTrend() {
  const { transactions, darkMode } = useApp();
  const data = getMonthlyData(transactions);
  const avgBalance = data.reduce((s, d) => s + d.balance, 0) / (data.length || 1);

  const gridColor  = darkMode ? '#1D2939' : '#F2F4F7';
  const tickColor  = darkMode ? '#475467' : '#98A2B3';

  return (
    <div className="card p-6 animate-fade-up s3 h-full flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={15} className="text-blue-500" strokeWidth={2.5} />
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-[15px]">Balance Trend</h3>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">Income vs Expenses · Jan – Mar 2025</p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          {LEGEND.map(l => (
            <div key={l.key} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
            <defs>
              {[
                { id: 'gIncome',   color: '#12B76A' },
                { id: 'gExpenses', color: '#F04438' },
                { id: 'gBalance',  color: '#2563EB' },
              ].map(({ id, color }) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={color} stopOpacity={0.12} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <ReferenceLine
              y={avgBalance}
              stroke="#2563EB"
              strokeDasharray="4 4"
              strokeOpacity={0.3}
              label={{ value: 'Avg', position: 'right', fontSize: 10, fill: tickColor }}
            />
            <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 11, fontFamily: 'Figtree', fontWeight: 500 }} axisLine={false} tickLine={false} dy={6} />
            <YAxis tick={{ fill: tickColor, fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={usd} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: darkMode ? '#344054' : '#E4E7EC', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area type="monotone" dataKey="income"   stroke="#12B76A" strokeWidth={2} fill="url(#gIncome)"   dot={false} activeDot={{ r: 4, fill: '#12B76A', stroke: darkMode ? '#111827' : '#fff', strokeWidth: 2 }} />
            <Area type="monotone" dataKey="expenses" stroke="#F04438" strokeWidth={2} fill="url(#gExpenses)" dot={false} activeDot={{ r: 4, fill: '#F04438', stroke: darkMode ? '#111827' : '#fff', strokeWidth: 2 }} />
            <Area type="monotone" dataKey="balance"  stroke="#2563EB" strokeWidth={2} fill="url(#gBalance)"  dot={false} activeDot={{ r: 4, fill: '#2563EB', stroke: darkMode ? '#111827' : '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
