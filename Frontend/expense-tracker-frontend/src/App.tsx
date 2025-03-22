// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import ChartComponent from './components/ChartComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Dummy data for the chart component example
const dummyChartData = [
  { date: '2025-03-10T00:00:00.000Z', amount: 50 },
  { date: '2025-03-11T00:00:00.000Z', amount: 75 },
  { date: '2025-03-12T00:00:00.000Z', amount: 60 },
];

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Expense Tracker</h1>
          <Routes>
            <Route path="/" element={
              <>
                <ExpenseForm />
                <ExpenseList />
                <h2>Daily Expense Chart</h2>
                <ChartComponent data={dummyChartData} />
              </>
            } />
            <Route path="/expenses" element={
              <>
                <ExpenseForm />
                <ExpenseList />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
