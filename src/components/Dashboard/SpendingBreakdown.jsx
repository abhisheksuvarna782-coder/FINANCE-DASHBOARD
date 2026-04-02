import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { getCategoryBreakdown } from '../../data/mockData';
import { getCategoryMeta } from '../../utils/categoryConfig';
import { useApp } from '../../context/AppContext';
import { PieChart as PieIcon } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  const meta = getCategoryMeta(d.name);
  const Icon = meta.icon;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-3.5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: meta.bg }}>
          <Icon size={11} style={{ color: meta.color }} strokeWidth={2} />
        </div>
        <p className="text-sm font-bold text-gray-900 dark:text-white">{d.name}</p>
      </div>
      <p className="num text-sm font-bold text-gray-900 dark:text-white">${d.value.toLocaleString()}</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{d.payload.percent?.toFixed(1)}% of spending</p>
    </div>
  );
};

export default function SpendingBreakdown() {
  const { transactions, darkMode } = useApp();
  const data = getCategoryBreakdown(transactions);
  const total = data.reduce((s, d) => s + d.value, 0);
  const dataWithPercent = data.map(d => ({ ...d, percent: (d.value / total * 100) }));

  return (
    <div className="card p-6 animate-fade-up s4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-1">
        <PieIcon size={15} className="text-blue-500" strokeWidth={2.5} />
        <h3 className="font-display font-bold text-gray-900 dark:text-white text-[15px]">Spending Breakdown</h3>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">By category · all time</p>

      <div className="relative mx-auto flex-shrink-0">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie data={dataWithPercent} cx="50%" cy="50%" innerRadius={56} outerRadius={82} dataKey="value" paddingAngle={2} stroke="none">
              {dataWithPercent.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-2xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Total</p>
          <p className="num text-lg font-bold text-gray-900 dark:text-white leading-none mt-0.5">
            ${(total / 1000).toFixed(1)}k
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3 flex-1">
        {dataWithPercent.slice(0, 5).map((d, i) => {
          const meta = getCategoryMeta(d.name);
          const Icon = meta.icon;
          return (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: meta.bg }}>
                <Icon size={11} style={{ color: meta.color }} strokeWidth={2} />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium flex-1 truncate">{d.name}</span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-14 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${d.percent}%`, background: d.color }} />
                </div>
                <span className="num text-xs font-bold text-gray-700 dark:text-gray-300 w-14 text-right">
                  ${d.value.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
