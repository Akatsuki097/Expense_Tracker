// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import "./App.css"


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
        
          <div className="expense-tracker-header">
          <h1 className="heading-center">Expense Tracker</h1>
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
