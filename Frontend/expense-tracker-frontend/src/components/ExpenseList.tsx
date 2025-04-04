import React, { useState } from 'react';
import {
  useGetExpensesQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} from '../services/expense';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import '../ExpenseList.css';

const ExpenseList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    amount: '',
    description: '',
    category: '',
  });
  const { data: expenses = [], error, isLoading, refetch } = useGetExpensesQuery({
    page,
    limit: 10,
  });
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();

  const startEdit = (expense: any) => {
    setEditingId(expense._id);
    setEditValues({
      amount: expense.amount.toString(),
      description: expense.description || '',
      category: expense.category?.name || '',
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
        category: editValues.category,
      }).unwrap();
      refetch();
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

  return (
    <div className="expense-tracker">
      <table className="expense-table">
        <thead>
          <tr>
            <th className="amount-column">Amount</th>
            <th className="description-column">Description</th>
            <th className="category-column">Category</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense: any) => (
            <tr key={expense._id} className="expense-row">
              {editingId === expense._id ? (
                <>
                  <td>
                    <input
                      type="number"
                      value={editValues.amount}
                      onChange={(e) =>
                        setEditValues({ ...editValues, amount: e.target.value })
                      }
                      className="edit-input"
                    />
                  </td>
                  <td>
                    <input
                      value={editValues.description}
                      onChange={(e) =>
                        setEditValues({ ...editValues, description: e.target.value })
                      }
                      className="edit-input"
                    />
                  </td>
                  <td>
                    <input
                      value={editValues.category}
                      onChange={(e) =>
                        setEditValues({ ...editValues, category: e.target.value })
                      }
                      className="edit-input"
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(expense._id)}>
                      <FaSave />
                    </button>
                    <button onClick={cancelEdit}>
                      <FaTimes />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>${expense.amount}</td>
                  <td>{expense.description}</td>
                  <td>
                    <span className="category-tag">
                      {expense.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => startEdit(expense)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(expense._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ExpenseList;
