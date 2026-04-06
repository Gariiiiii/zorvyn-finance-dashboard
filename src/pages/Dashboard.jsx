import React, { useState } from "react";
import SummaryCard from "../components/dashboard/SummaryCard";
import BalanceChart from "../components/dashboard/BalanceChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import { transactionsData } from "../data/mockData";
import MonthlySavingsChart from "../components/dashboard/MonthlySavingsChart";
import RecentActivities from "../components/dashboard/RecentActivities";

function Dashboard({ categoryData }) {
  const [viewType, setViewType] = useState("monthly"); 

  const totalIncome = transactionsData
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactionsData
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  // Group transactions by month to calculate monthly saving rate
  const monthlyData = {};

  transactionsData.forEach((t) => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!monthlyData[monthKey])
      monthlyData[monthKey] = { income: 0, expense: 0 };

    if (t.type === "income") monthlyData[monthKey].income += t.amount;
    else monthlyData[monthKey].expense += t.amount;
  });

  // Calculate saving rate per month
  const monthlySavingRates = Object.values(monthlyData).map((m) => {
    if (m.income === 0) return 0; // avoid division by zero
    return ((m.income - m.expense) / m.income) * 100;
  });

  // Average saving rate
  const savingRate =
    monthlySavingRates.reduce((a, b) => a + b, 0) / monthlySavingRates.length;

  // prepare balance data for chart based on viewType (monthly/yearly)
  const balanceMap = {};

  transactionsData.forEach((t) => {
    const date = new Date(t.date);

    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const key = viewType === "monthly" ? `${month}` : `${year}`;

    if (!balanceMap[key]) {
      balanceMap[key] = 0;
    }

    if (!balanceMap[key]) {
      balanceMap[key] = {
        income: 0,
        expense: 0,
      };
    }

    if (t.type === "income") {
      balanceMap[key].income += t.amount;
    } else {
      balanceMap[key].expense += t.amount;
    }
  });

  // sorting
  const sorted = Object.entries(balanceMap)
    .map(([key, value]) => {
      const date =
        viewType === "monthly" ? new Date(key) : new Date(`${key}-01-01`);

      return { label: key, value, date };
    })
    .sort((a, b) => a.date - b.date);

  // cumulative
  let running = 0;

  const balanceData = sorted.map((item) => {
    const { income, expense } = balanceMap[item.label];

    const net = income - expense;
    running += net;

    return {
      label: item.label,
      balance: running,
      income,
      expense,
    };
  });

  return (
    <div className="flex flex-col gap-4">
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-2 pt-2 gap-4">
          <SummaryCard title="Total Balance" amount={totalBalance} />
          <SummaryCard title="Income" amount={totalIncome} type="income" />
          <SummaryCard title="Expenses" amount={totalExpense} type="expense" />
          <SummaryCard title="Saving Rate" amount={`${savingRate.toFixed(2)}%`} type="saving" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 px-2 gap-4">
          <BalanceChart data={balanceData} viewType={viewType} setViewType={setViewType}/>
          <CategoryChart data={categoryData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 px-2 gap-4">
          <MonthlySavingsChart transactions={transactionsData} />
          <RecentActivities transactions={transactionsData} />
        </div>
      </>
    </div>
  );
}

export default Dashboard;
