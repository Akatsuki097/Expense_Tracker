// src/components/ExpenseList.tsx
import React, { useState } from 'react';
import { useGetExpensesQuery , useUpdateExpenseMutation, useDeleteExpenseMutation} from '../services/expense';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import '../App.css'

const ExpenseList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ amount: '', description: '', category: '' });
  const { data: expenses = [], error, isLoading, refetch } = useGetExpensesQuery({ page, limit: 10 });
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();


  const startEdit = (expense: any) => {
    setEditingId(expense._id);
    setEditValues({
      amount: expense.amount.toString(),
      description: expense.description,
      category: expense.category
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ amount: '', description: '', category: '' });
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateExpense({
        id,
        amount: Number(editValues.amount),
        description: editValues.description,
        category: editValues.category
      }).unwrap();
      refetch(); // Refresh the list
      cancelEdit();
    } catch (error) {
      console.error('Failed to update expense:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
      refetch();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading expenses</div>;

  // return (
  //   <div>
  //     <h2>Expenses</h2>
  //     <ul>
  //       {expenses.map((expense: any) => (
  //         <li key={expense._id}>
  //           {expense.description} - ${expense.amount}
  //         </li>
  //       ))}
  //     </ul>
  //     <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
  //       Previous
  //     </button>
  //     <button onClick={() => setPage(page + 1)}>Next</button>
  //   </div>
  // );

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense: any) => (
          <li key={expense._id}>
            {editingId === expense._id ? (
              <div>
                <input
                  type="number"
                  value={editValues.amount}
                  onChange={(e) => setEditValues({ ...editValues, amount: e.target.value })}
                  placeholder="Amount"
                />
                <input
                  value={editValues.description}
                  onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                  placeholder="Description"
                />
                <input
                  value={editValues.category}
                  onChange={(e) => setEditValues({ ...editValues, category: e.target.value })}
                  placeholder="Category"
                />
                <button onClick={() => handleUpdate(expense._id)}> 
                  <FaSave />
                </button>
                <button onClick={cancelEdit}>
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div>
                {expense.description} - ${expense.amount} ({expense.category})
                <button onClick={() => startEdit(expense)}>
                <FaEdit />
                  </button>
                <button onClick={() => handleDelete(expense._id)}>
                <FaTrash />
                  </button>
              </div>
            )}
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


