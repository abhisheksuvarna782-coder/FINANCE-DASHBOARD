import {
  Utensils, Car, ShoppingBag, Film, HeartPulse,
  Zap, Briefcase, Monitor, TrendingUp, HelpCircle
} from 'lucide-react';
import clsx from 'clsx';

export const categoryMeta = {
  'Food & Dining': { icon: Utensils,   color: '#F97316', bg: '#FFF7ED', ring: '#FFEDD5', label: 'F&D'  },
  'Transport':     { icon: Car,         color: '#2563EB', bg: '#EFF4FF', ring: '#DBEAFE', label: 'TRN'  },
  'Shopping':      { icon: ShoppingBag, color: '#7C3AED', bg: '#F5F3FF', ring: '#EDE9FE', label: 'SHP'  },
  'Entertainment': { icon: Film,        color: '#DB2777', bg: '#FDF2F8', ring: '#FCE7F3', label: 'ENT'  },
  'Healthcare':    { icon: HeartPulse,  color: '#059669', bg: '#ECFDF5', ring: '#D1FAE5', label: 'HLT'  },
  'Utilities':     { icon: Zap,         color: '#4F46E5', bg: '#EEF2FF', ring: '#E0E7FF', label: 'UTL'  },
  'Salary':        { icon: Briefcase,   color: '#D97706', bg: '#FFFBEB', ring: '#FEF3C7', label: 'SAL'  },
  'Freelance':     { icon: Monitor,     color: '#0D9488', bg: '#F0FDFA', ring: '#CCFBF1', label: 'FRL'  },
  'Investment':    { icon: TrendingUp,  color: '#16A34A', bg: '#F0FDF4', ring: '#DCFCE7', label: 'INV'  },
};

export const getCategoryMeta = (cat) =>
  categoryMeta[cat] || { icon: HelpCircle, color: '#667085', bg: '#F9FAFB', ring: '#F2F4F7', label: '???' };

/**
 * A styled icon avatar for a category
 * size: 'sm' | 'md' | 'lg'
 */
export function CategoryAvatar({ category, size = 'md' }) {
  const meta = getCategoryMeta(category);
  const Icon = meta.icon;

  const dims = { sm: 'w-7 h-7', md: 'w-9 h-9', lg: 'w-11 h-11' };
  const iconSizes = { sm: 13, md: 15, lg: 18 };
  const radii = { sm: 'rounded-lg', md: 'rounded-xl', lg: 'rounded-xl' };

  return (
    <div
      className={clsx('flex items-center justify-center flex-shrink-0', dims[size], radii[size])}
      style={{ background: meta.bg }}
    >
      <Icon size={iconSizes[size]} style={{ color: meta.color }} strokeWidth={2} />
    </div>
  );
}