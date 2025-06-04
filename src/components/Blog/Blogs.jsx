import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../../redux/actions/blog';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, error, loading } = useSelector(state => state.blog);
  const { darkMode } = useSelector((state) => state.theme);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    dispatch(getAllBlogs());
  }, [error, dispatch]);

  // Extract unique categories from blogs
  const categories = blogs ? 
    ['all', ...new Set(blogs?.map(blog => blog?.category?.category).filter(Boolean))] : 
    ['all'];

  // Filter blogs based on selected category
  const filteredBlogs = blogs && selectedCategory === 'all' ? 
    blogs : 
    blogs?.filter(blog => blog?.category?.category === selectedCategory);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} min-h-screen`}>
      {/* Header */}
      <header className="w-full container mx-auto pt-16 pb-8">
        <div className="flex flex-col items-center">
          <h1 className={`font-bold text-4xl md:text-5xl mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
            Sigma Developers Blog
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg max-w-2xl mx-auto text-center">
            Insights, tutorials, and updates from our team of expert developers and designers.
            Stay informed about the latest trends in web development and design.
          </p>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className={`w-full py-6 ${darkMode ? "border-gray-700" : "border-gray-200"} border-t border-b mb-8`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === category
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-600 text-white"
                    : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <>
            {filteredBlogs && filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog?._id} blog={blog} darkMode={darkMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-1M16 3h5v5h-5V3zM6 8h4M6 12h4M6 16h4" />
                </svg>
                <h3 className="text-xl font-medium mb-1">No blog posts found</h3>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>Try selecting a different category</p>
              </div>
            )}
          </>
        )}

        {/* Newsletter Subscription */}
        <div className={`mt-20 p-8 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
              <p className="mb-6">
                Get the latest articles, tutorials, and updates delivered straight to your inbox.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                  darkMode 
                    ? "bg-gray-700 text-white focus:ring-blue-500" 
                    : "bg-white text-gray-800 focus:ring-blue-500"
                }`}
                required
              />
              <button
                type="submit"
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  darkMode 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Subscribe
              </button>
            </form>
            <p className={`text-xs mt-4 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogCard = ({ blog, darkMode }) => {
  return (
    <div className={`h-full rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      {/* Blog Image */}
      <Link to={`/blog/${blog?._id}`} className="block overflow-hidden h-48">
        <img 
          src={blog?.image?.url} 
          alt={blog?.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>
      
      {/* Blog Content */}
      <div className="p-6">
        {/* Category & Date */}
        <div className="flex justify-between items-center mb-3">
          <span className={`text-xs px-2 py-1 rounded-full ${
            darkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
          }`}>
            {blog?.category?.category || "Uncategorized"}
          </span>
          <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {new Date(blog?.createdAt || Date.now()).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-blue-500 transition-colors">
          <Link to={`/blog/${blog?._id}`}>{blog?.title}</Link>
        </h3>
        
        {/* Excerpt */}
        <p className={`mb-6 line-clamp-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {blog?.shortDescription}
        </p>
        
        {/* Read More Button */}
        <div className="flex justify-between items-center">
          <Link 
            to={`/blog/${blog?._id}`}
            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              darkMode 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
