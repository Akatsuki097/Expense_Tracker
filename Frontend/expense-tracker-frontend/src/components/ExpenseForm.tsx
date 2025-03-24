import React, { useState, useEffect, useRef } from 'react';
import { useAddExpenseMutation, useGetCategoriesQuery } from '../services/expense';
import "../ExpenseForm.css";
import { Category } from '../types';

const ExpenseForm: React.FC = () => {
  const [formData, setFormData] = useState({ amount: '', description: '', category: '' });
  const [addExpense] = useAddExpenseMutation();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  // Ref to prevent overriding default selection from useEffect
  const initialCategorySet = useRef(false);

  useEffect(() => {
    const categoryNames = categories.map((c: Category) => c.name);
    setFilteredCategories(categoryNames);
  }, [categories]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, category: value });

    const searchTerm = value.toLowerCase();
    const filtered = categories
      .map(c => c.name)
      .sort((a, b) => {
        if (a.toLowerCase() === searchTerm) return -1;
        if (b.toLowerCase() === searchTerm) return 1;
        return a.localeCompare(b);
      })
      .filter(name => name.toLowerCase().includes(searchTerm));
    setFilteredCategories(filtered);
    setIsDropdownOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setFormData({ ...formData, category: selectedCategory });
    setIsDropdownOpen(false);
    initialCategorySet.current = true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || isNaN(Number(formData.amount))) {
      alert('Please enter a valid amount');
      return;
    }
    try {
      await addExpense({
        amount: Number(formData.amount),
        description: formData.description,
        category: formData.category,
      });
      setFormData({ amount: '', description: '', category: '' });
    } catch (error) {
      console.error('Failed to save expense:', error);
      alert('Failed to save expense. Please check your input.');
    }
  };

  const categoryExists = categories.some(
    (c: Category) => c.name.toLowerCase() === formData.category.toLowerCase()
  );

  return (
    <div className="expense-form">
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-container">
          {/* Amount Input */}
          <div className="form-group">
            <input
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Description Input */}
          <div className="form-group">
            <input
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Category Selector */}
          <div className="form-group">
            <div className="category-selector">
              <input
                type="text"
                placeholder="Select or type a category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-input"
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
              />
              {isDropdownOpen && (
                <div className="category-dropdown">
                  {filteredCategories.map((categoryName) => (
                    <div
                      key={categoryName}
                      className="category-option"
                      onMouseDown={() => handleCategorySelect(categoryName)}
                    >
                      {categoryName}
                      {categoryName.toLowerCase() === formData.category.toLowerCase() && (
                        <span className="existing-tag"> (existing)</span>
                      )}
                    </div>
                  ))}
                  {!categoryExists && formData.category && (
                    <div className="category-option new-category">
                      Create new: "{formData.category}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button type="submit" className="submit-button">
              Add Expense
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
