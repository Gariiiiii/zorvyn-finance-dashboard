import React, { useContext } from "react";
import { transactionsData } from "../data/mockData";
import InsightsSummary from "../components/insights/InsightsSummary";
import CategoryChart from "../components/dashboard/CategoryChart";
import InsightsCard from "../components/insights/InsightsCard";
import { ThemeContext } from "../context/ThemeContext";
import {
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import MonthlyComparison from "../components/insights/MonthlyComparison";
import { SiGoogleanalytics } from "react-icons/si";

function Insights({ categoryData }) {
  const { darkMode } = useContext(ThemeContext);

  // TOTAL INCOME
  const totalIncome = transactionsData
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  // TOTAL EXPENSE
  const totalExpense = transactionsData
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  // MONTHLY GROUPING
  const monthlyData = {};

  transactionsData.forEach((t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;

    if (!monthlyData[key]) {
      monthlyData[key] = { income: 0, expense: 0 };
    }

    if (t.type === "income") monthlyData[key].income += t.amount;
    else monthlyData[key].expense += t.amount;
  });

  // SAVING RATE
  const monthlySavingRates = Object.values(monthlyData).map((m) => {
    if (m.income === 0) return 0;
    return ((m.income - m.expense) / m.income) * 100;
  });

  const savingRate =
    monthlySavingRates.length === 0
      ? 0
      : monthlySavingRates.reduce((a, b) => a + b, 0) /
        monthlySavingRates.length;

  // MONTH COUNT
  const months = Object.keys(monthlyData);

  // AVG MONTHLY EXPENSE
  const avgMonthly = months.length === 0 ? 0 : totalExpense / months.length;

  // TOP CATEGORY
  const topCategory = [...categoryData].sort((a, b) => b.amount - a.amount)[0];

  const isGoodSaving = savingRate >= 20;

  // HIGHEST SPENDING MONTH
  let highestMonth = null;
  let maxExpense = 0;

  Object.entries(monthlyData).forEach(([month, data]) => {
    if (data.expense > maxExpense) {
      maxExpense = data.expense;
      highestMonth = month;
    }
  });

  // convert month key → readable
  const formatMonth = (key) => {
    const [year, month] = key.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  };

  // LARGEST TRANSACTION
  const largestTxn = [...transactionsData].sort(
    (a, b) => b.amount - a.amount
  )[0];

  // EXPENSE RATIO
  const expenseRatio =
    totalIncome === 0
      ? 0
      : ((totalExpense / totalIncome) * 100).toFixed(1);

  const insights = [];

  // TOP CATEGORY
  if (topCategory) {
    insights.push({
      title: `${topCategory.name} Dominates`,
      value: `₹ ${topCategory.amount.toLocaleString()}`,
      message: `${topCategory.name} is your highest spending category`,
      type: topCategory.amount > totalExpense * 0.4 ? "warning" : "info",
      icon: FaExclamationTriangle,
    });
  }

  // SAVINGS
  insights.push({
    title: isGoodSaving ? "Savings on Track" : "Low Savings",
    value: `${savingRate.toFixed(1)}%`,
    message: isGoodSaving
      ? "You are saving well (>20%)"
      : "Try to increase your savings",
    type: isGoodSaving ? "success" : "warning",
    icon: FaMoneyBillWave,
  });

  // PEAK MONTH
  if (highestMonth) {
    insights.push({
      title: "Peak Spending Month",
      value: `₹ ${maxExpense.toLocaleString()}`,
      message: `Highest spending in ${formatMonth(highestMonth)}`,
      type: maxExpense > avgMonthly ? "warning" : "info",
      icon: FaExclamationTriangle,
    });
  }

  // EXPENSE RATIO
  insights.push({
    title: "Expense Ratio",
    value: `${expenseRatio}%`,
    message:
      expenseRatio > 80
        ? "You are spending most of your income"
        : "Spending is under control",
    type: expenseRatio > 80 ? "warning" : "success",
    icon: FaMoneyBillWave,
  });

  // LARGEST TRANSACTION
  if (largestTxn) {
    insights.push({
      title: "Largest Transaction",
      value: `₹ ${largestTxn.amount}`,
      message:
        largestTxn.type === "income"
          ? `${largestTxn.category} income received`
          : `${largestTxn.category} expense recorded`,
      type: largestTxn.type === "income" ? "success" : "warning",
      icon: FaMoneyBillWave,
    });
  }

  // MONTHLY TREND
  if (monthlySavingRates.length >= 2) {
    const last = monthlySavingRates[monthlySavingRates.length - 1];
    const prev = monthlySavingRates[monthlySavingRates.length - 2];
    const diff = (last - prev).toFixed(1);

    insights.push({
      title: "Monthly Trend",
      value: `${diff > 0 ? "+" : ""}${diff}%`,
      message:
        diff > 0
          ? "Savings improved this month"
          : "Savings dropped this month",
      type: diff > 0 ? "success" : "warning",
      icon: diff > 0 ? FaArrowUp : FaArrowDown,
    });
  }

  // MONTHLY TABLE DATA
  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const monthlyComparisonData = [];

  for (let year = 2025, month = 5; !(year === 2026 && month === 5); month++) {
    if (month > 12) {
      month = 1;
      year++;
    }

    const monthTransactions = transactionsData.filter((t) => {
      const tDate = new Date(t.date);
      return (
        tDate.getFullYear() === year &&
        tDate.getMonth() + 1 === month
      );
    });

    const income = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    monthlyComparisonData.push({
      month: `${monthNames[month - 1]} ${year}`,
      income,
      expenses,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-2 pt-2 gap-4">
        <InsightsSummary
          title="Savings Rate"
          amount={`${savingRate.toFixed(1)}%`}
          subtext={savingRate >= 20 ? "Above 20% ✓" : "Below 20% ⚠"}
          type="saving"
        />

        <InsightsSummary
          title="Highest Spending Category"
          amount={topCategory ? topCategory.name : "N/A"}
          subtext={`₹ ${
            topCategory ? topCategory.amount.toLocaleString() : 0
            }`}
          disableAnimation={true}
        />

        <InsightsSummary
          title="Total Income"
          amount={`₹ ${totalIncome.toLocaleString()}`}
          subtext={`${months.length} months tracked`}
          type="income"
        />

        <InsightsSummary
          title="Average Monthly Expense"
          amount={`₹ ${Math.round(avgMonthly).toLocaleString()}`}
          subtext="Monthly expense avg"
          type="expense"
        />
      </div>

      {/* INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
        <div
          className={`${
            darkMode ? "bg-[var(--card)]/90" : "bg-[var(--primary-light)]"
          } p-5 rounded-xl border-t-3 border-r-3 border-teal-900 shadow-sm`}
        >
          <div className="flex items-center gap-2 mb-4">
            <SiGoogleanalytics className="text-xl text-gray-700" />
            <h3 className="font-semibold text-gray-700 uppercase">
              Insights
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {insights.map((item, index) => (
              <InsightsCard key={index} {...item} />
            ))}
          </div>
        </div>

        <CategoryChart data={categoryData} />
      </div>

      <MonthlyComparison transactions={monthlyComparisonData} />
    </div>
  );
}

export default Insights;