import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getAllBlogs } from "../redux/actions/blog";
import { toast } from "react-hot-toast";
import DashboardLayout from "./DashboardLayout";
import DataTable from "./components/DataTable";

const AdminBlogs = () => {
  const dispatch = useDispatch();
  const { loading, blogs, message, error } = useSelector((state) => state.blog);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBlogHandle = async (blogId) => {
    setIsDeleting(true);
    try {
      await dispatch(deleteBlog(blogId));
      // Toast is shown via useEffect when message changes
    } catch (err) {
      toast.error(err?.message || "Failed to delete blog");
    } finally {
      setIsDeleting(false);
    }
  };

  // Define table columns
  const columns = [
    {
      header: 'Title',
      accessor: 'title',
    },
    {
      header: 'Created At',
      accessor: 'createdAt',
      render: (item) => item.createdAt?.slice(0, 10)
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (item) => item.category?.category || 'Uncategorized'
    },
    {
      header: 'Author',
      accessor: 'author',
    },
  ];

  useEffect(() => {
    dispatch(getAllBlogs());
    
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
      title="Blogs" 
      addButton={true} 
      addButtonLink="/dashboard/blog/create" 
      addButtonText="Add New Blog"
    >
      <DataTable 
        data={blogs || []}
        columns={columns}
        loading={loading}
        onDelete={deleteBlogHandle}
        editLink="/dashboard/blog/edit"
        viewLink={(item) => `/blog/${item._id}`}
        emptyMessage="No blog posts available. Create your first blog post!"
        searchPlaceholder="Search blogs by title, author, category..."
        deleteConfirmTitle="Delete Blog Post"
        deleteConfirmMessage="Are you sure you want to delete this blog post? This action cannot be undone and will remove all associated content and comments."
      />
    </DashboardLayout>
  );
};

export default AdminBlogs;
