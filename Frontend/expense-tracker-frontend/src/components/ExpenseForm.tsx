// src/components/ExpenseForm.tsx
import React, { useState, useEffect, useRef  } from 'react';
import { useAddExpenseMutation, useGetCategoriesQuery  } from '../services/expense';
import "../ExpenseForm.css"
import { Category } from '../types';

const ExpenseForm: React.FC = () => {
const [formData, setFormData] = useState({ amount: '', description: '', category: '' });
const [addExpense] = useAddExpenseMutation();
const { data: categories = [] } = useGetCategoriesQuery();
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

// Add ref to track initial category set
const initialCategorySet = useRef(false);

useEffect(() => {
  const categoryNames = categories.map((c: Category) => c.name);
  setFilteredCategories(categoryNames);
  // if (categoryNames.length > 0 &&  !initialCategorySet.current) {
  //   initialCategorySet.current = true;
  //   setFormData(prev => ({ ...prev, category: categoryNames[0] }));
  // }
}, [categories]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (document.activeElement === e.target) {
      setFormData({ ...formData, category: value });
    }

    // Filter categories based on input
    // const filtered = categories
    //   .map((c: any) => c.name)
    //   .filter(name => name.toLowerCase().includes(value.toLowerCase()));
    
    // Case-insensitive search with exact match priority
    const searchTerm = value.toLowerCase();
    const filtered = categories
      .map(c => c.name)
      .sort((a, b) => {
        // Prioritize exact matches
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
    // Prevent useEffect from overriding
    initialCategorySet.current = true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     // Validate amount is provided and valid
     if (!formData.amount || isNaN(Number(formData.amount))) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      await addExpense({
        amount: Number(formData.amount),
        description: formData.description,
        category: formData.category
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

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="amount"
//         placeholder="Amount"
//         value={formData.amount}
//         onChange={handleChange}
//       />
//       <input
//         name="description"
//         placeholder="Description"
//         value={formData.description}
//         onChange={handleChange}
//       />
//        <div className="category-selector">
//        <input
//         type="text"
//         placeholder="Select or type a category"
//         value={formData.category}
//         onChange={handleInputChange}
//         onFocus={() => {
//           setIsDropdownOpen(true);
//         }}
//         onBlur={() => {
//           setTimeout(() => {
//             setIsDropdownOpen(false);
//           }, 100);
//         }}
//       />
        
//         {isDropdownOpen && (
//           <div className="category-dropdown">
//             {filteredCategories.map((categoryName) => (
//               <div
//                 key={categoryName}
//                 className="category-option"
//                 onMouseDown={() => handleCategorySelect(categoryName)}
//               >
//                 {categoryName}
//                 {categoryName.toLowerCase() === formData.category.toLowerCase() && (
//                   <span className="existing-tag"> (existing)</span>
//                 )}
//               </div>
//             ))}
            
//             {!categoryExists && formData.category && (
//               <div className="category-option new-category">
//                 Create new: "{formData.category}"
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//       <button type="submit">Add Expense</button>
//     </form>
//   );
// };
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
}
export default ExpenseForm;
