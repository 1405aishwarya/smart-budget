import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, 
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BudgetChart = ({ transactions, budget }) => {
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const remainingBudget = budget - totalExpenses;

  const data = {
    labels: ["Income", "Expenses", "Remaining Budget"],
    datasets: [
      {
        label: "Budget Overview",
        data: [totalIncome, totalExpenses, remainingBudget],
        backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
        size:30,
      },
    ],
  };

  return (
    <div className="chart-container budget-chart-container">
      <h2 className="chart-title">Budget Overview</h2>
      <Line data={data} />
    </div>
  );
};

export default BudgetChart;
