import React from "react";
import { Bar } from "react-chartjs-2";

const ComparisonChart = ({ transactions, predictedExpense }) => {
  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const data = {
    labels: ["Current Month", "Predicted Next Month"],
    datasets: [
      {
        label: "Expenses Comparison",
        data: [totalExpenses, predictedExpense || 0],
        backgroundColor: ["#ff9800", "#673ab7"],
        size: 30,
      },
    ],
  };

  return (
    <div className="chart-container comparison-chart-container">
      <h2 className="chart-title">Comparison of Expenses</h2>
      <Bar data={data} />
    </div>
  );
};

export default ComparisonChart;
