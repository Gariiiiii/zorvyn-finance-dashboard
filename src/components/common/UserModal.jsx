import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { motion } from "framer-motion";

function UserModal() {
  const { saveUser } = useContext(UserContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    saveUser(form);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 w-[350px] shadow-xl flex flex-col gap-4"
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 12,
        }}
      >
        <div>
          <h2 className="text-xl text-[var(--primary)] font-semibold">Welcome User 👋</h2>

          <p className="text-sm text-gray-500">
            We need your details to proceed further
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 text-[var(--primary)] border border-gray-300 hover:border-[var(--text-light)] focus:border-[var(--secondary)] transition duration-300 ease-in-out outline-none rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 text-[var(--primary)] border border-gray-300 hover:border-[var(--text-light)] focus:border-[var(--secondary)] transition duration-300 ease-in-out outline-none rounded"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* <select
            className="w-full p-2 text-[var(--primary)] border border-gray-300 hover:border-[var(--text-light)] focus:border-[var(--secondary)] transition duration-300 ease-in-out outline-none rounded"
            value={form.role} 
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Admin">Admin</option>
            <option value="User">Viewer</option>
          </select> */}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[var(--primary)] text-white py-2 rounded-lg hover:opacity-90 transition duration-300 ease-in-out outline-none cursor-pointer"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
}

export default UserModal;
