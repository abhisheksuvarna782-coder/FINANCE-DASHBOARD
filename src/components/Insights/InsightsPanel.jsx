import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../../context/AppContext';
import { getCategoryBreakdown, getMonthlyData } from '../../data/mockData';
import { getCategoryMeta } from '../../utils/categoryConfig';
import { Award, TrendingUp, TrendingDown, Target, Lightbulb, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import clsx from 'clsx';

const usd = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-3.5">
      <p className="text-2xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center justify-between gap-6 py-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{p.dataKey}</span>
          </div>
          <span className="num text-xs font-bold text-gray-900 dark:text-white">${p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function InsightsPanel() {
  const { transactions, darkMode } = useApp();
  const breakdown = getCategoryBreakdown(transactions);
  const monthly   = getMonthlyData(transactions).filter(m => m.income > 0 || m.expenses > 0);

  const totalExpenses = breakdown.reduce((s, d) => s + d.value, 0);
  const totalIncome   = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const highestCat    = breakdown[0];
  const lowestCat     = breakdown[breakdown.length - 1];
  const savingsRate   = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1);
  const latestMonths  = monthly.slice(-2);
  const mom = latestMonths.length === 2
    ? ((latestMonths[1].expenses - latestMonths[0].expenses) / latestMonths[0].expenses * 100).toFixed(1) : 0;

  const gridColor = darkMode ? '#1D2939' : '#F2F4F7';
  const tickColor = darkMode ? '#475467' : '#98A2B3';
  const cursorColor = darkMode ? 'rgba(255,255,255,0.03)' : '#F9FAFB';

  const STATS = [
    { label: 'Total Income',   value: usd(totalIncome),   delta: '+8.2%',  up: true  },
    { label: 'Total Expenses', value: usd(totalExpenses), delta: '+3.1%',  up: false },
    { label: 'Net Savings',    value: usd(totalIncome - totalExpenses), delta: '+12.4%', up: true },
    { label: 'Savings Rate',   value: `${savingsRate}%`,  delta: '+2.3%',  up: true  },
  ];

  const INSIGHTS = [
    {
      icon: Award, bg: 'bg-warning-50 dark:bg-warning-700/20', color: 'text-warning-600 dark:text-warning-500',
      title: 'Top Spending Category',
      body: highestCat ? `${highestCat.name} represents ${(highestCat.value / totalExpenses * 100).toFixed(1)}% of your total spend at ${usd(highestCat.value)}.` : 'Not enough data.',
    },
    {
      icon: parseFloat(mom) > 0 ? TrendingUp : TrendingDown,
      bg: parseFloat(mom) > 0 ? 'bg-error-50 dark:bg-error-700/20' : 'bg-success-50 dark:bg-success-700/20',
      color: parseFloat(mom) > 0 ? 'text-error-600 dark:text-error-400' : 'text-success-600 dark:text-success-400',
      title: 'Month-over-Month Change',
      body: `Expenses ${parseFloat(mom) > 0 ? 'increased' : 'decreased'} by ${Math.abs(mom)}% vs the previous month.`,
    },
    {
      icon: Target,
      bg: parseFloat(savingsRate) >= 20 ? 'bg-success-50 dark:bg-success-700/20' : 'bg-warning-50 dark:bg-warning-700/20',
      color: parseFloat(savingsRate) >= 20 ? 'text-success-600 dark:text-success-400' : 'text-warning-600 dark:text-warning-500',
      title: 'Savings Health',
      body: `You're saving ${savingsRate}% of income. ${parseFloat(savingsRate) >= 20 ? 'Above the recommended 20% threshold. Strong performance.' : 'Aim for 20%+ to build long-term financial health.'}`,
    },
    {
      icon: Lightbulb, bg: 'bg-blue-50 dark:bg-blue-950', color: 'text-blue-600 dark:text-blue-400',
      title: 'Lowest Expense Area',
      body: lowestCat ? `${lowestCat.name} is your most controlled category at only ${usd(lowestCat.value)}.` : 'Not enough data.',
    },
  ];

  return (
    <div className="space-y-5 animate-fade-up">

      {/* KPI strip */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <div key={i} className={clsx('card p-4', `s${i + 1}`)}>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-2">{s.label}</p>
            <p className="num text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
            <div className="mt-2 flex items-center gap-1">
              {s.up
                ? <span className="delta-up"><ArrowUpRight size={10} />{s.delta}</span>
                : <span className="delta-down"><ArrowDownRight size={10} />{s.delta}</span>
              }
              <span className="text-2xs text-gray-400 dark:text-gray-600 ml-1">vs last quarter</span>
            </div>
          </div>
        ))}
      </div>

      {/* Insight cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INSIGHTS.map((ins, i) => {
          const Icon = ins.icon;
          return (
            <div key={i} className={clsx('card p-5 animate-fade-up', `s${i + 1}`)}>
              <div className="flex items-start gap-4">
                <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', ins.bg)}>
                  <Icon size={18} className={ins.color} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{ins.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{ins.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bar chart */}
      <div className="card p-6 animate-fade-up s3">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-[15px]">Monthly Comparison</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Income vs expenses by month</p>
          </div>
          <div className="flex items-center gap-4">
            {[{ color: '#12B76A', label: 'Income' }, { color: '#F04438', label: 'Expenses' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthly} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={4} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 11, fontFamily: 'Figtree', fontWeight: 500 }} axisLine={false} tickLine={false} dy={4} />
            <YAxis tick={{ fill: tickColor, fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(1)}k`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: cursorColor, radius: 8 }} />
            <Bar dataKey="income"   fill="#12B76A" radius={[6,6,0,0]} maxBarSize={40} />
            <Bar dataKey="expenses" fill="#F04438" radius={[6,6,0,0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category breakdown */}
      <div className="card p-6 animate-fade-up s4">
        <h3 className="font-display font-bold text-gray-900 dark:text-white text-[15px] mb-1">Category Breakdown</h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">All expense categories · ranked by spend</p>
        <div className="space-y-4">
          {breakdown.map((cat, i) => {
            const meta = getCategoryMeta(cat.name);
            const Icon = meta.icon;
            const pct  = (cat.value / breakdown[0].value * 100);
            return (
              <div key={i} className="flex items-center gap-4">
                <span className="num text-xs font-bold text-gray-300 dark:text-gray-700 w-5 text-center flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: meta.bg }}>
                  <Icon size={14} style={{ color: meta.color }} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{cat.name}</span>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      <span className="num text-xs text-gray-400 dark:text-gray-500 font-medium">
                        {(cat.value / totalExpenses * 100).toFixed(1)}%
                      </span>
                      <span className="num text-sm font-bold text-gray-900 dark:text-white w-20 text-right">
                        {usd(cat.value)}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: cat.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
