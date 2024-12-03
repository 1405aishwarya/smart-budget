import React from "react";

const TransactionList = ({ groupedTransactions, deleteTransaction }) => {
  const months = Object.keys(groupedTransactions); // Get all the months dynamically

  return (
    <div className="transaction-list">
      <h2>Transaction List</h2>
      {months.map((month) => (
        <div key={month}>
          <h3>{month}</h3>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th>Amount (₹)</th>
                <th>Category</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {groupedTransactions[month].map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.type}</td>
                  <td>₹{transaction.amount}</td>
                  <td>{transaction.category}</td>
                  <td>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
