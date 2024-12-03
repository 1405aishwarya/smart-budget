import React, { useState } from "react";

const AddTransaction = ({ addTransaction }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");

  const expenseCategories = [
    "Food",
    "Transport",
    "Entertainment",
    "Healthcare",
    "Education",
    "Utilities",
    "Rent",
    "Shopping",
    "Miscellaneous",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || (type === "Expense" && !category) || !month) {
      alert("Please fill in all required fields!");
      return;
    }

    addTransaction({
      type,
      amount: parseFloat(amount),
      category: type === "Income" ? "Income" : category,
      month,
    });

    setAmount("");
    setCategory("");
    setMonth("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>
      {type === "Expense" && (
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {expenseCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}
      <input
        type="text"
        placeholder="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <button type="submit">Add {type}</button>
    </form>
  );
};

export default AddTransaction;
