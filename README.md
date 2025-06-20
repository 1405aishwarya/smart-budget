**SmartBudget – Expense Prediction & Tracker**

**Project Overview**

SmartBudget is a browser-based personal finance application that allows users to log and manage their daily income and expenses while also providing basic expense forecasting using machine learning. The goal of the project is to help users gain better control over their budgeting habits through clear visual feedback and simple predictive insights.

The application enables users to input transaction details such as amount, type (income or expense), category, and month. As users log transactions, the app displays real-time summaries and visualizations using Chart.js, including income vs. expenses and monthly trends.

To add a predictive component, the project incorporates TensorFlow.js to build a linear regression model within the browser. Based on previously entered data, the model estimates future expenses, giving users an idea of how their spending may evolve over time.



**Tech Stack**

HTML, CSS, JavaScript 

React.js 

TensorFlow.js

Chart.js 

**Getting Started**

1. Clone the Repository

git clone https://github.com/yourusername/smartbudget.git
cd smartbudget
Clones the project files to your local machine.

2. Install Dependencies
   
npm install
Installs all required frontend libraries.

3. Run the App
   
npm start
Starts the development server at http://localhost:3000.

Enter your transaction details:

Amount

Type (Income or Expense)

Category

Month

The app will store the inputs and automatically update the charts.

Scroll to the "Prediction" section to view future expense forecasts based on the past spending data.



