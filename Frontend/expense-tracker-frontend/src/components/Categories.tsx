import React, { useState } from 'react';
import { 
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from '../services/category';

import "../Categories.css"

const Categories: React.FC = () => {
  const { data: categories = [], isLoading, error  } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleCreate = async () => {
    if (newCategory.trim()) {
      await createCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const startEdit = (category: { _id: string; name: string }) => {
    setEditingId(category._id);
    setEditName(category.name);
  };

  const handleUpdate = async () => {
    if (editingId && editName.trim()) {
      await updateCategory({ 
        id: editingId, 
        name: editName.trim() 
      });
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

 

  return (
    <div className="categories">
      <h2>Manage Categories</h2>
      
      <div className="add-category">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
        />
        <button onClick={handleCreate}>Add Category</button>
      </div>

      {isLoading && <div>Loading categories...</div>}
      {error && <div>Error loading categories</div>}

      <div className="category-list">
        {categories.map((category) => (
          <div key={category._id} className="category-item">
            {editingId === category._id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span>{category.name}</span>
                <button onClick={() => startEdit(category)}>Edit</button>
                <button onClick={() => deleteCategory(category._id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;