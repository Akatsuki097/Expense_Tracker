// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import ChartComponent from './components/ChartComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';

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
        <h1 className="heading-center">Expense Tracker</h1>
          <div className="expense-tracker-container">
            
            <Routes>
            <Route path="/expenses" element={
              <>
                <ExpenseForm />
                <ExpenseList />
              </>
            } />
            <Route path="/categories" element={<Categories />} />
          </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
