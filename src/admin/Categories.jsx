import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getAllCategories } from "../redux/actions/category";
import toast from "react-hot-toast";
import DashboardLayout from "./DashboardLayout";
import DataTable from "./components/DataTable";

const Categories = () => {
  const dispatch = useDispatch();
  const { loading, categories, message, error } = useSelector((state) => state.category);
  const { darkMode } = useSelector((state) => state.theme);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteCategoryHandle = async (categoryId) => {
    setIsDeleting(true);
    try {
      const result = await dispatch(deleteCategory(categoryId));
      if (result?.type === "deleteCategorySuccess") {
        toast.success(result.payload?.message || "Category deleted successfully");
      }
    } catch (err) {
      toast.error(err?.message || "Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  // Define table columns
  const columns = [
    {
      header: 'Category',
      accessor: 'category',
    }
  ];

  useEffect(() => {
    dispatch(getAllCategories());
    
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);
  
  return (
    <DashboardLayout 
      title="Categories" 
      addButton={true} 
      addButtonLink="/dashboard/category/add" 
      addButtonText="Add New Category"
    >
      <div className="mb-4">
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Categories are used to organize both projects and blogs. They help visitors filter and find content more easily.
        </p>
      </div>
      <DataTable 
        data={categories || []}
        columns={columns}
        loading={loading}
        onDelete={deleteCategoryHandle}
        editLink="/dashboard/category/edit"
        emptyMessage="No categories available. Add your first category!"
        searchPlaceholder="Search categories..."
        deleteConfirmTitle="Delete Category"
        deleteConfirmMessage="Are you sure you want to delete this category? This action cannot be undone. Projects and blogs using this category may be affected."
      />
    </DashboardLayout>
  );
};

export default Categories;