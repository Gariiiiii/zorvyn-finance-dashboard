import { NavLink } from "react-router-dom";
import { FaHome, FaChartBar } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ThemeContext } from "../../context/ThemeContext";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user, saveUser } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);
  const userRole = user?.role || "viewer";

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Transactions", path: "/transactions", icon: <GrTransaction /> },
    { name: "Insights", path: "/insights", icon: <FaChartBar /> },
  ];

  const roleInfo = {
    viewer: "👁 Viewer has read-only access.",
    admin: "⚡ Admin can add & manage transactions.",
  };

  return (
    <div
      className={`
  fixed top-0 left-0 h-screen w-60 flex flex-col justify-between py-4 pl-4 shadow-lg
  ${darkMode ? "bg-[var(--primary)] text-white" : "bg-[var(--primary-light)] text-[var(--text-dark)]"}
  transform transition-transform duration-300 ease-in-out
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0 z-40
`}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <img
            src="https://companyasset.blob.core.windows.net/assets/zorvynfulllogolight.png"
            alt="Zorvyn Logo"
            className="h-10 w-auto"
          />
        </div>

        <div className="flex flex-col items-start gap-1">
          <p className="font-semibold text-lg">
            Hello,{" "}
            {user?.name?.length > 12
              ? user?.name.slice(0, 12) + "..."
              : user?.name || "User"}
          </p>
          <p
            className={`text-xs ${darkMode ? "text-[var(--textLight)]" : "text-[var(--text-dark)]"}`}
          >
            {user?.email || "abc@example.com"}
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-tl-full rounded-bl-full transition ease-in-out duration-500 outline-none border-l border-t border-b ${
                  isActive
                    ? `${
                        darkMode
                          ? "bg-[var(--secondary)] font-semibold text-[var(--primary)] border-[var(--card)]"
                          : "bg-[var(--secondary)] text-white font-semibold border-[var(--primary)]"
                      }`
                    : `${darkMode ? "hover:bg-[var(--secondary)]/10 text-gray-200" : "hover:bg-gray-200 text-[var(--text-dark)]"}`
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div
        className={`flex flex-col gap-2 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="flex flex-col gap-1 mx-2">
          <select
            value={userRole}
            onChange={(e) => {
              const newRole = e.target.value;
              const updatedUser = { ...user, role: newRole };
              localStorage.setItem("user", JSON.stringify(updatedUser));
              saveUser(updatedUser);
            }}
            className={`w-full p-2 rounded-lg border transition-all duration-500 ease-in-out cursor-pointer outline-none focus:outline-none ${
              darkMode
                ? "border-gray-600 bg-gray-800 text-white"
                : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

          <p
            className={`text-xs mt-1 ${userRole === "viewer" ? "text-blue-500" : "text-yellow-500"} transition-all duration-500 ease-in-out cursor-pointer`}
          >
            {roleInfo[userRole]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
