import { useContext, useEffect, useState } from "react";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionFilters from "../components/transactions/TransactionFilter";
import Pagination from "../components/transactions/Pagination";
import EmptyState from "../components/common/EmptyState";
import { transactionsData } from "../data/mockData";
import { ThemeContext } from "../context/ThemeContext";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import DeleteConfirmModal from "../components/transactions/DeleteConfirmModal";
import { UserContext } from "../context/UserContext";

function Transactions() {
  const { darkMode } = useContext(ThemeContext);

  const { user } = useContext(UserContext);
  const userRole = user?.role || "viewer";

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : transactionsData;
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filter, setFilter] = useState({ type: "", search: "", category: "" });
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    category: "",
    type: "income",
    amount: "",
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const perPage = 10;

  const filtered = transactions.filter((t) => {
    return (
      (filter.type ? t.type === filter.type : true) &&
      (filter.category ? t.category === filter.category : true) &&
      t.category.toLowerCase().includes(filter.search.toLowerCase())
    );
  });

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  // DELETE
  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = transactions.filter((_, i) => i !== deleteIndex);
    setTransactions(updated);
    setDeleteIndex(null);
    setShowDeleteModal(false);
  };

  // EDIT (OPEN MODAL WITH DATA)
  const handleEdit = (index) => {
    setNewTransaction(transactions[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  // UPDATE TRANSACTION
  const handleUpdateTransaction = () => {
    const updated = [...transactions];
    updated[editingIndex] = {
      ...newTransaction,
      amount: Number(newTransaction.amount),
    };

    setTransactions(updated);
    setEditingIndex(null);
    setShowModal(false);
    setNewTransaction({
      date: "",
      description: "",
      category: "",
      type: "income",
      amount: "",
    });
  };

  const handleAddTransaction = () => {
    if (editingIndex !== null) {
      handleUpdateTransaction();
      return;
    }

    const transaction = {
      ...newTransaction,
      date: newTransaction.date || new Date().toISOString(),
      amount: Number(newTransaction.amount),
    };

    setTransactions([transaction, ...transactions]);
    setNewTransaction({
      date: "",
      description: "",
      category: "",
      type: "income",
      amount: "",
    });
    setShowModal(false);
  };
  return (
    <div className="flex flex-col gap-3 px-2 pt-2">
      <TransactionFilters
        filter={filter}
        setFilter={setFilter}
        transactions={transactions}
        showAdd={userRole === "admin"}
        onAdd={() => setShowModal(true)}
      />

      <div
        className={`${
          darkMode ? "bg-[var(--card)]/90" : "bg-[var(--primary-light)]"
        } p-2 sm:p-4 rounded-xl text-gray-700 border-t-4 border-r-4 border-teal-900 shadow-sm`}
      >
        {filtered.length > 0 ? (
          <>
            <TransactionTable
              transactions={paginated}
              onDelete={handleDeleteClick}
              onEdit={handleEdit}
              userRole={userRole}
              startIndex={start}
            />{" "}
            <Pagination
              total={filtered.length}
              perPage={perPage}
              page={page}
              setPage={setPage}
            />
          </>
        ) : (
          <EmptyState message="No transactions found" />
        )}
      </div>

      <AddTransactionModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingIndex(null);
        }}
        newTransaction={newTransaction}
        setNewTransaction={setNewTransaction}
        onAdd={handleAddTransaction}
        transactions={transactions}
        isEditing={editingIndex !== null}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteIndex(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Transactions;
