// src/components/ExpenseForm.tsx
import React, { useState } from 'react';
import { useAddExpenseMutation } from '../services/expense';

const ExpenseForm: React.FC = () => {
  const [formData, setFormData] = useState({ amount: '', description: '', category: '' });
  const [addExpense] = useAddExpenseMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addExpense({
      amount: Number(formData.amount),
      description: formData.description,
      category: formData.category,
    });
    setFormData({ amount: '', description: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
