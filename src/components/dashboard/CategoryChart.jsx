// import React, { useContext } from "react";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";
// import { ThemeContext } from "../../context/ThemeContext";
// import { LuChartPie } from "react-icons/lu";

// const COLORS = [
//   "#4f46e5",
//   "#06b6d4",
//   "#f59e0b",
//   "#ef4444",
//   "#22c55e",
//   "#a78bfa",
//   "#f97316",
// ];

// function CategoryChart({ data }) {
//   const { darkMode } = useContext(ThemeContext);

//   // Total amount for percentage calculation
//   const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

//   // Custom label function to show % inside pie slices
//   const renderLabel = (entry) => {
//     const percent = ((entry.amount / totalAmount) * 100).toFixed(1); // 1 decimal
//     return `${percent}%`;
//   };

//   return (
//     <div
//       className={`${darkMode ? "bg-[var(--card)]/90" : "bg-[var(--primary-light)]"} p-5 rounded-xl border-t-3 border-r-3 border-teal-900 shadow-sm flex flex-col md:flex-row items-center gap-6`}
//     >
//       <div>
//         <div className="flex items-center gap-2 mb-4">
//           <LuChartPie className="text-xl text-gray-700" />
//           <h3 className="font-semibold text-gray-700 uppercase">
//             Spending Breakdown
//           </h3>
//         </div>
//         <PieChart width={300} height={300}>
//           <Pie
//             data={data}
//             dataKey="amount"
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             innerRadius={40}
//             label
//           >
//             {data.map((entry, index) => (
//               <Cell key={index} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip formatter={(value) => `₹ ${value.toLocaleString()}`} />
//         </PieChart>
//       </div>

//       <div className="flex-1">
//         {data.map((entry, index) => {
//           const percent = ((entry.amount / totalAmount) * 100).toFixed(1);
//           return (
//             <div key={index} className="flex items-center gap-2 mb-2">
//               <div
//                 className="w-4 h-4 rounded-sm"
//                 style={{ backgroundColor: COLORS[index % COLORS.length] }}
//               />
//               <span className="text-gray-500">{entry.name}</span>
//               <span className="ml-auto font-semibold text-gray-500">
//                 ₹ {entry.amount.toLocaleString()} ({percent}%)
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default CategoryChart;

import React, { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ThemeContext } from "../../context/ThemeContext";
import { LuChartPie } from "react-icons/lu";

const COLORS = [
  "#4f46e5",
  "#06b6d4",
  "#f59e0b",
  "#ef4444",
  "#22c55e",
  "#a78bfa",
  "#f97316",
  "#ec4899",
];

function CategoryChart({ data }) {
  const { darkMode } = useContext(ThemeContext);

  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div
      className={`${darkMode ? "bg-[var(--card)]/90" : "bg-[var(--primary-light)]"} p-3 sm:p-5 rounded-xl border-t-3 border-r-3 border-teal-900 shadow-sm flex flex-col sm:items-start justify-between gap-4 lg:gap-6`}
    >
      <div className="flex items-center gap-2 w-full">
        <LuChartPie className="text-xl text-gray-700" />
        <h3 className="font-semibold text-gray-700 uppercase">
          Spending Breakdown
        </h3>
      </div>

      <div className="w-full flex justify-center">
        <PieChart width={300} height={170}>
          <Pie
            data={data}
            dataKey="amount"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹ ${value.toLocaleString()}`} />
        </PieChart>
      </div>

      <div className="w-full flex flex-wrap gap-4 justify-center">
        {data.map((entry, index) => {
          const percent = ((entry.amount / totalAmount) * 100).toFixed(1);
          return (
            <div
              key={index}
              className="flex items-center gap-1 whitespace-nowrap"
            >
              <div
                className="w-2 h-2 rounded-md"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                  boxShadow: `0 0 6px ${COLORS[index % COLORS.length]}`,
                }}
              />
              <span className="texty-sm text-gray-500 font-medium">
                {entry.name} <strong>₹{entry.amount.toLocaleString()}</strong>(
                {percent}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryChart;
