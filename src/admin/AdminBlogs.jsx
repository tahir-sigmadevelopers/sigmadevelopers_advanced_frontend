import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getAllBlogs, bulkDeleteBlogs } from "../redux/actions/blog";
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

  const bulkDeleteBlogsHandle = async (blogIds) => {
    setIsDeleting(true);
    try {
      await dispatch(bulkDeleteBlogs(blogIds));
      // Toast is shown via useEffect when message changes
    } catch (err) {
      toast.error(err?.message || "Failed to delete blogs");
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

  // Extract unique categories for filter options
  const categoryOptions = useMemo(() => {
    if (!blogs) return [];
    
    const categories = [...new Set(blogs.map(blog => blog.category?.category))]
      .filter(Boolean)
      .map(category => ({
        label: category,
        value: category
      }));
        
    return categories;
  }, [blogs]);

  // Extract unique authors for filter options
  const authorOptions = useMemo(() => {
    if (!blogs) return [];
    
    const authors = [...new Set(blogs.map(blog => blog.author))]
      .filter(Boolean)
      .map(author => ({
        label: author,
        value: author
      }));
        
    return authors;
  }, [blogs]);

  // Define filter options
  const filterOptions = [
    {
      key: 'category.category',
      label: 'Category',
      options: categoryOptions
    },
    {
      key: 'author',
      label: 'Author',
      options: authorOptions
    },
    {
      key: 'createdAt',
      label: 'Time Period',
      options: [
        { label: 'Last 7 days', value: 'last7days' },
        { label: 'Last 30 days', value: 'last30days' },
        { label: 'Last 90 days', value: 'last90days' },
        { label: 'This year', value: 'thisyear' }
      ]
    }
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
  
  // Filter data based on time period
  const getFilteredBlogs = () => {
    if (!blogs) return [];
    
    return blogs.map(blog => {
      // Add computed properties for filtering if needed
      return {
        ...blog,
        // Add any computed properties here
      };
    });
  };
  
  return (
    <DashboardLayout 
      title="Blogs" 
      addButton={true} 
      addButtonLink="/dashboard/blog/create" 
      addButtonText="Add New Blog"
    >
      <DataTable 
        data={getFilteredBlogs()}
        columns={columns}
        loading={loading}
        onDelete={deleteBlogHandle}
        onBulkDelete={bulkDeleteBlogsHandle}
        editLink="/dashboard/blog/edit"
        viewLink={(item) => `/blog/${item._id}`}
        emptyMessage="No blog posts available. Create your first blog post!"
        searchPlaceholder="Search blogs by title, author, category..."
        deleteConfirmTitle="Delete Blog Post"
        deleteConfirmMessage="Are you sure you want to delete this blog post? This action cannot be undone and will remove all associated content and comments."
        bulkDeleteConfirmTitle="Delete Multiple Blog Posts"
        bulkDeleteConfirmMessage="Are you sure you want to delete the selected blog posts? This action cannot be undone."
        filterOptions={filterOptions}
      />
    </DashboardLayout>
  );
};

export default AdminBlogs;
