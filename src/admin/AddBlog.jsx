import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { addBlog } from "../redux/actions/blog";
import { getAllCategories } from "../redux/actions/category";
import DashboardLayout from "./DashboardLayout";
import { toast } from "react-hot-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles/editor.css';
import { CloudUpload } from '@mui/icons-material';

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("/logo.webp");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading, message, error } = useSelector((state) => state.blog);
  const { categories } = useSelector((state) => state.category);
  const { darkMode } = useSelector((state) => state.theme);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload an image file");
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }]
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background',
    'align'
  ];

  const addBlogSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Blog content cannot be empty");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    // Find the category name from the selected category ID
    const selectedCategory = categories.find(cat => cat._id === category);
    if (!selectedCategory) {
      toast.error("Invalid category selected");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortDescription", description);
    formData.append("category", selectedCategory.category); // Send category name instead of ID
    formData.append("author", author);
    formData.append("content", content);
    formData.append("image", image);

    setIsSubmitting(true);
    try {
      const result = await dispatch(addBlog(formData));
      
      if (result?.type === "addBlogSuccess") {
        toast.success(result.payload?.message || "Blog added successfully");
        setTitle("");
        setDescription("");
        setCategory("");
        setAuthor("");
        setContent("");
        setImage("/logo.webp");
        navigate("/dashboard/blogs");
      }
    } catch (err) {
      console.error("Error adding blog:", err);
      toast.error(err?.message || "Failed to add blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(getAllCategories());
    
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
      setIsSubmitting(false);
    }
  }, [error, dispatch]);

  return (
    <DashboardLayout title="Add Blog">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 max-w-6xl mx-auto h-full`}>
        <form onSubmit={addBlogSubmit} className="space-y-6 h-full">
          <div className="grid grid-cols-3 gap-6 h-full">
            <div className="col-span-3 md:col-span-1 space-y-4">
              <div>
                <label htmlFor="title" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Blog Title
                </label>
                <input 
                  value={title} 
                  type="text" 
                  name='title' 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                  className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset 
                    ${darkMode ? 'bg-gray-700 text-white ring-gray-600' : 'bg-white text-gray-900 ring-gray-300'} 
                    focus:ring-2 focus:ring-blue-600`} 
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <label htmlFor="description" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Description
                </label>
                <textarea 
                  value={description} 
                  name='description' 
                  onChange={(e) => setDescription(e.target.value)} 
                  type="text" 
                  required 
                  rows="3"
                  className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset 
                    ${darkMode ? 'bg-gray-700 text-white ring-gray-600' : 'bg-white text-gray-900 ring-gray-300'} 
                    focus:ring-2 focus:ring-blue-600`}
                  placeholder="Enter short description" 
                />
              </div>

              <div>
                <label htmlFor="category" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset 
                    ${darkMode ? 'bg-gray-700 text-white ring-gray-600' : 'bg-white text-gray-900 ring-gray-300'} 
                    focus:ring-2 focus:ring-blue-600`}
                >
                  <option value="">Select a category</option>
                  {categories && categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="author" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Author
                </label>
                <input 
                  value={author} 
                  onChange={(e) => setAuthor(e.target.value)} 
                  type="text" 
                  name='author' 
                  required 
                  className={`block w-full rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset 
                    ${darkMode ? 'bg-gray-700 text-white ring-gray-600' : 'bg-white text-gray-900 ring-gray-300'} 
                    focus:ring-2 focus:ring-blue-600`}
                  placeholder="Enter author name" 
                />
              </div>

              <div>
                <label htmlFor="image" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Featured Image
                </label>
                <div 
                  className={`relative group rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-2 border-dashed ${isDragging ? 'border-blue-500' : darkMode ? 'border-gray-600' : 'border-gray-300'} transition-all duration-200`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center p-4 h-40">
                    <div className={`mb-2 ${image !== '/logo.webp' ? 'h-full w-full' : 'h-16 w-16'}`}>
                      {image === '/logo.webp' ? (
                        <CloudUpload className={`h-full w-full ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      ) : (
                        <img 
                          src={image} 
                          alt="Blog preview" 
                          className="h-full w-full object-contain" 
                        />
                      )}
                    </div>
                    
                    {image === '/logo.webp' && (
                      <div className="text-center">
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Drag & drop image here
                        </p>
                        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Supports JPG, PNG, GIF
                        </p>
                      </div>
                    )}
                    
                    <input
                      id="image-upload"
                      name="image"
                      accept="image/*"
                      required
                      onChange={handleImageChange}
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  
                  {image !== '/logo.webp' && (
                    <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                      <p className="text-white text-sm font-medium">Click to change image</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                {loading || isSubmitting ? (
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                ) : (
                  <button 
                    type="submit" 
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-1"
                  >
                    Create Blog Post
                  </button>
                )}
              </div>
            </div>

            <div className="col-span-3 md:col-span-2 h-full min-h-[650px]">
              <div className="editor-container h-full">
                <label htmlFor="content" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Content
                </label>
                <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} rounded-md overflow-hidden flex-grow`}>
                  <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    className={`${darkMode ? 'ql-snow-dark' : ''} editor-height`}
                  />
                </div>
                <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Use the toolbar above to format your content.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Add dark theme support for Quill editor */}
      {darkMode && (
        <style jsx="true">{`
          .ql-snow-dark .ql-toolbar {
            background-color: #374151;
            border-color: #4B5563;
          }
          .ql-snow-dark .ql-container {
            background-color: #374151;
            border-color: #4B5563;
            color: white;
          }
          .ql-snow-dark .ql-picker-label {
            color: #E5E7EB;
          }
          .ql-snow-dark .ql-stroke {
            stroke: #E5E7EB;
          }
          .ql-snow-dark .ql-fill {
            fill: #E5E7EB;
          }
          .ql-snow-dark .ql-picker-options {
            background-color: #374151;
          }
          .ql-snow-dark .ql-picker-item {
            color: #E5E7EB;
          }
        `}</style>
      )}
    </DashboardLayout>
  );
};

export default AddBlog;

