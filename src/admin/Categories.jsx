import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getAllCategories } from "../redux/actions/category";
import toast from "react-hot-toast";
import DashboardLayout from "./DashboardLayout";
import DataTable from "./components/DataTable";

const Categories = () => {
  const dispatch = useDispatch();
  const { loading, categories, message, error } = useSelector((state) => state.category);

  const deleteCategoryHandle = async (categoryId) => {
    await dispatch(deleteCategory(categoryId));
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
      <DataTable 
        data={categories || []}
        columns={columns}
        loading={loading}
        onDelete={deleteCategoryHandle}
        editLink="/dashboard/category/edit"
        emptyMessage="No categories available. Add your first category!"
      />
    </DashboardLayout>
  );
};

export default Categories;