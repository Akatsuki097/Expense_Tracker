// src/components/ExpenseList.tsx
import React, { useState } from 'react';
import { useGetExpensesQuery } from '../services/expense';

const ExpenseList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data: expenses = [], error, isLoading } = useGetExpensesQuery({ page, limit: 10 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading expenses</div>;

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense: any) => (
          <li key={expense._id}>
            {expense.description} - ${expense.amount}
          </li>
        ))}
      </ul>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default ExpenseList;
