import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import { ThemeContext } from "./context/ThemeContext";
import UserModal from "./components/common/UserModal";
import { transactionsData } from "./data/mockData";

function App() {
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prepare category data
  const categoryMap = {};
  transactionsData.forEach((t) => {
    if (t.type === "expense") {
      if (!categoryMap[t.category]) categoryMap[t.category] = 0;
      categoryMap[t.category] += t.amount;
    }
  });
  const categoryData = Object.entries(categoryMap).map(([name, amount]) => ({
    name,
    amount,
  }));

  return (
    <BrowserRouter>
      <>
        {!user && <UserModal />}
        <div
          className={`flex flex-row p-2 ${
            darkMode
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--primary-light)] text-[var(--text-dark)]"
          }`}
        >
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div
            className={`flex-1 w-full min-h-screen p-2 rounded-2xl overflow-y-auto border-t border-r border-b  
  lg:ml-58   
  ${
    darkMode
      ? "bg-[var(--secondary)] text-white border-[var(--card)]"
      : "bg-[var(--secondary)] text-[var(--text-dark)] border-[var(--primary)]"
  }`}
          >
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <Routes>
              <Route
                path="/"
                element={<Dashboard categoryData={categoryData} />}
              />
              <Route path="/transactions" element={<Transactions />} />
              <Route
                path="/insights"
                element={<Insights categoryData={categoryData} />}
              />
            </Routes>
          </div>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
