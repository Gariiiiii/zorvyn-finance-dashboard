import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";

function Header({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Overview";
      case "/transactions":
        return "Transactions";
      case "/insights":
        return "Insights";
      default:
        return "";
    }
  };

  const getSubheading = () => {
    switch (location.pathname) {
      case "/":
        return "Track your balance, income and expenses at a glance.";
      case "/transactions":
        return "Browse, search, filter and export all your financial transactions.";
      case "/insights":
        return "Analyze spending patterns and gain smart financial insights.";
      default:
        return "";
    }
  };

  return (
    <div className="px-4 py-2 border-b border-[var(--card)]">
      <div className="flex justify-between items-center">
        <h2
          className={`text-xl sm:text-2xl font-medium cursor-pointer transition-colors ease-in-out duration-500 ${
            darkMode ? "text-[var(--text-lightest)]" : "text-white"
          }`}
        >
          {getTitle()}
        </h2>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            onClick={() => setDarkMode(!darkMode)}
            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ease-in-out duration-500 ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform cursor-pointer ease-in-out duration-500 flex items-center justify-center ${
                darkMode
                  ? "translate-x-0"
                  : "translate-x-8 border border-gray-700"
              }`}
            >
              {darkMode ? (
                <FaMoon className="text-gray-700" />
              ) : (
                <FaSun className="text-yellow-500" />
              )}
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md border border-gray-700 text-gray-700 bg-[var(--card)]/50 cursor-pointer transition-colors ease-in-out duration-500"
            >
              {sidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>
      </div>

      <p
        className={`text-xs sm:text-sm mt-1 cursor-pointer transition-colors ease-in-out duration-500 ${
          darkMode ? "text-[var(--text-lightest)]/80" : "text-white/70"
        }`}
      >
        {getSubheading()}
      </p>
    </div>
  );
}
export default Header;
