# FinVault — Finance Dashboard UI

A clean, interactive finance dashboard built with **React**, **Recharts**, and **Tailwind CSS**.

## Features

- **Dashboard Overview** — Summary cards (Balance, Income, Expenses, Savings Rate), area chart for balance trend, donut chart for spending breakdown, and recent transactions list
- **Transactions Section** — Full list with search, filtering by type/category, sorting by date/amount, add/edit/delete (admin only), and CSV export
- **Insights Section** — Spending analysis, monthly comparison bar chart, category breakdown, and smart financial observations
- **Role-Based UI (RBAC)** — Switch between Admin (full CRUD) and Viewer (read-only) roles via the dropdown in the header
- **State Management** — React Context API with centralized state for transactions, filters, and role
- **Responsive Design** — Works across desktop and tablet screen sizes
- **Optional Enhancements** — CSV export, animations/transitions, dark theme throughout

## Tech Stack

- React 18
- Recharts (charts)
- Tailwind CSS (styling)
- Lucide React (icons)
- date-fns (date formatting)
- Vite (build tool)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation & Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── context/
│   └── AppContext.jsx       # Global state (transactions, role, filters)
├── data/
│   └── mockData.js          # Mock transactions & data helpers
├── components/
│   ├── Layout/
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   ├── Dashboard/
│   │   ├── SummaryCards.jsx
│   │   ├── BalanceTrend.jsx
│   │   ├── SpendingBreakdown.jsx
│   │   └── RecentTransactions.jsx
│   ├── Transactions/
│   │   ├── TransactionList.jsx
│   │   └── TransactionModal.jsx
│   └── Insights/
│       └── InsightsPanel.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   └── Insights.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Role-Based Access

| Feature | Admin | Viewer |
|---|---|---|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| View insights | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |

Switch roles using the dropdown in the top-right header.

## Design Approach

The UI follows a **luxury dark fintech** aesthetic:
- Deep navy color palette with gold accent (#f6c90e)
- DM Serif Display + DM Sans typography pairing
- Subtle noise texture, gradient borders, and glow effects
- Staggered fade-in animations on page load
- Micro-interactions on hover (cards, table rows, buttons)
