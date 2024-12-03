import React, { useState, useEffect } from "react";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import BudgetChart from "./components/BudgetChart";
import ComparisonChart from "./components/ComparisonChart";
import * as tf from "@tensorflow/tfjs";
import './app.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(5000); // Example default budget
  const [predictedExpense, setPredictedExpense] = useState(null);

  // Load data from local storage on initial render
  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (savedTransactions) {
      setTransactions(savedTransactions);
    }
  }, []);

  // Save transactions to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Add a new transaction
  const addTransaction = (transaction) => {
    const newTransaction = { ...transaction, id: Date.now() }; // Ensure each transaction has a unique id
    setTransactions([...transactions, newTransaction]);
  };

  // Delete a transaction by id
  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions); // Update the state with the new filtered list
  };

  // Group transactions by month dynamically
  const groupTransactionsByMonth = () => {
    const groupedTransactions = {};

    transactions.forEach((transaction) => {
      if (transaction.type === "Expense" || transaction.type === "Income") {
        const month = transaction.month; // Extract the month
        if (!groupedTransactions[month]) {
          groupedTransactions[month] = []; // Initialize an empty array if the month is not present
        }
        groupedTransactions[month].push(transaction); // Add transaction to the correct month
      }
    });

    return groupedTransactions;
  };

  // Predict next month’s expenses using TensorFlow.js
  const predictExpense = async () => {
    const expenseData = transactions
      .filter((t) => t.type === "Expense")
      .map((t, index) => [index, t.amount]); // [monthIndex, amount]

    if (expenseData.length < 2) {
      setPredictedExpense(null); // Not enough data for prediction
      return;
    }

    const xs = tf.tensor2d(expenseData.map(([index]) => [index])); // Input (month index)
    const ys = tf.tensor2d(expenseData.map(([_, amount]) => [amount])); // Output (amount)

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

    // Train the model
    await model.fit(xs, ys, { epochs: 200 });

    // Predict for the next month (December)
    const nextMonthIndex = expenseData.length; // Index for December
    const prediction = model.predict(tf.tensor2d([[nextMonthIndex]]));
    const predictionValue = await prediction.data(); // Get prediction value
    setPredictedExpense(parseFloat(predictionValue[0].toFixed(2)));
  };

  // Recalculate predictions whenever transactions change
  useEffect(() => {
    predictExpense();
  }, [transactions]);

  return (
    <div className="app">
      <h1>Personal Finance Tracker</h1>

      {/* Form to Add New Transactions */}
      <AddTransaction addTransaction={addTransaction} />

      {/* Budget Overview Chart */}
      <BudgetChart transactions={transactions} budget={budget} />

      {/* Comparison Chart */}
      {predictedExpense !== null && (
        <ComparisonChart
          transactions={transactions}
          predictedExpense={predictedExpense}
        />
      )}

      {/* Predicted Expense Overview */}
      {predictedExpense !== null && (
        <div className="predicted-expense">
          <h2>Predicted Next Month's Expense: ₹{predictedExpense}</h2>
        </div>
      )}

      {/* Transaction List grouped by month */}
      <TransactionList
        groupedTransactions={groupTransactionsByMonth()}
        deleteTransaction={deleteTransaction}
      />
    </div>
  );
};

export default App;
