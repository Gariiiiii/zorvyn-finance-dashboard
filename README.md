# Personal Finance Dashboard (React)

A modern, responsive personal finance dashboard built using React. The application enables users to manage transactions, visualize financial data, and gain insights into spending behavior.

---

## Features

### User Management
- User onboarding modal (Name, Email, Role)  
- Data persisted in localStorage  
- Role-based access:
  - Admin: Can add, edit, and delete transactions  
  - Viewer: Read-only access  

### Dashboard Overview
- Total Balance  
- Total Income  
- Total Expenses  
- Saving Rate  
- Recent Activities  

### Transactions Management
- Add new transactions (Admin only)  
- Edit transactions  
- Delete transactions with confirmation  
- Pagination support  
- Persistent storage using localStorage  

### Filters and Search
- Filter by:
  - Transaction Type (Income / Expense)  
  - Category  
- Search by category  
- Dynamic category dropdown  

### Data Visualization
- Balance Trend (Monthly / Yearly)  
- Category Breakdown (Pie Chart)  
- Monthly Income Chart  
- Monthly Savings Chart  

### Insights Page
- Financial insights including:
  - Top spending category  
  - Savings rate analysis  
  - Expense ratio  
  - Peak spending month  
  - Monthly trend comparison  

### Export Features
- Export transactions as:
  - CSV  
  - JSON  

### UI/UX
- Dark and Light mode toggle  
- Fully responsive layout  
- Sidebar navigation  
- Smooth animations using Framer Motion  
- Animated numbers via custom hook  

---

## Architecture and Approach

### State Management (Context API)
- UserContext  
  - Stores user information (name, email, role)  
  - Persists data in localStorage  

- ThemeContext  
  - Manages dark and light modes  
  - Dynamically updates UI styles  

- AppContext  
  - Stores shared application data such as transactions and role  

### Routing
Handled using React Router DOM:
/
/transactions
/insights

### Component Structure

src/
├── components/
│ ├── dashboard/
│ ├── transactions/
│ ├── insights/
│ ├── layout/
│ └── common/
│
├── pages/
│ ├── Dashboard.jsx
│ ├── Transactions.jsx
│ └── Insights.jsx
│
├── context/
│ ├── UserContext.jsx
│ ├── ThemeContext.jsx
│ └── AppContext.jsx
│
├── hooks/
│ └── useCountUp.js
│
├── data/
│ └── mockData.js


---

## 5. Key Logic Highlights

The following snippets represent core application logic including transaction filtering, savings calculation, and data persistence.

### Filtering Transactions
Filters transactions based on type, category, and search input.
// Filtering Transactions
transactions.filter((t) => {
  return (
    (filter.type ? t.type === filter.type : true) &&
    (filter.category ? t.category === filter.category : true) &&
    t.category.toLowerCase().includes(filter.search.toLowerCase())
  );
});

### Saving Rate Calculation
Calculates the percentage of savings based on income and expenses.
// Saving Rate Calculation
const savingRate = ((income - expense) / income) * 100;

### LocalStorage Persistence
Ensures transactions are stored and retained using browser localStorage.
// LocalStorage Persistence
useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}, [transactions]);


## Setup Instructions

Follow the steps below to run the project locally.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/finance-dashboard.git
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Run the application
npm run dev

# 4. Open in browser
http://localhost:5173

## Dependencies

- React  
- React Router DOM  
- Recharts  
- React Icons  
- Framer Motion  

---

## Screens

- Dashboard  
- Transactions Page  
- Insights Page  
