import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Edit, Delete, Visibility, CheckCircle, Search, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Loader from '../../components/Loader';
import ConfirmDialog from './ConfirmDialog';

// Helper function to get nested property value
const getNestedValue = (obj, path) => {
  if (!obj || !path) return undefined;
  
  // Handle dot notation for nested properties (e.g., "user.name")
  const keys = path.split('.');
  return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : undefined), obj);
};

const DataTable = ({
  data,
  columns,
  loading,
  onDelete,
  onApprove,
  emptyMessage = 'No data available',
  editLink,
  viewLink,
  showApprove = false,
  searchPlaceholder = 'Search...',
  deleteConfirmTitle = 'Confirm Deletion',
  deleteConfirmMessage = 'Are you sure you want to delete this item? This action cannot be undone.'
}) => {
  const { darkMode } = useSelector(state => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const itemsPerPage = 10;
  
  // Filter data based on search term
  useEffect(() => {
    if (!data) return setFilteredData([]);
    
    if (searchTerm.trim() === '') {
      setFilteredData(data);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = data.filter(item => {
        // Search through all column values
        return columns.some(column => {
          // Get the value using the accessor
          let value;
          
          // Check if the column has a render function that we can use for search
          if (column.render) {
            try {
              // For complex render functions, try to get the raw value
              value = getNestedValue(item, column.accessor);
            } catch (e) {
              // If there's an error, just use the accessor directly
              value = item[column.accessor];
            }
          } else {
            // For simple columns, use the accessor directly
            value = getNestedValue(item, column.accessor);
          }
          
          // If the value is an object (like user: {name: '...'}), try to search through its properties
          if (value && typeof value === 'object') {
            return Object.values(value).some(v => 
              v && typeof v === 'string' && v.toLowerCase().includes(lowercasedSearch)
            );
          }
          
          // Handle different types of values
          if (value === undefined || value === null) return false;
          
          if (typeof value === 'string') {
            return value.toLowerCase().includes(lowercasedSearch);
          } else if (typeof value === 'number') {
            return value.toString().includes(lowercasedSearch);
          } else if (typeof value === 'boolean') {
            // Allow searching for "true" or "false"
            return value.toString().toLowerCase().includes(lowercasedSearch);
          }
          
          return false;
        });
      });
      setFilteredData(filtered);
    }
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [searchTerm, data, columns]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete(itemToDelete);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };
  
  // If there's no data and we're not loading, show empty message
  if (!loading && (!data || data.length === 0)) {
    return (
      <div className={`flex justify-center items-center h-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
        <p className={`text-xl font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {emptyMessage}
        </p>
      </div>
    );
  }
  
  // Show loader when loading
  if (loading) {
    return (
      <div className={`flex justify-center items-center h-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
        <Loader />
      </div>
    );
  }
  
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Search bar */}
      <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`relative rounded-md shadow-sm`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`block w-full pl-10 pr-3 py-2 rounded-md border-0 ring-1 ring-inset 
              ${darkMode 
                ? 'bg-gray-700 text-white ring-gray-600 placeholder-gray-400' 
                : 'bg-white text-gray-900 ring-gray-300 placeholder-gray-500'} 
              focus:ring-2 focus:ring-blue-600`}
            placeholder={searchPlaceholder}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={`px-6 py-4 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {column.header}
                </th>
              ))}
              <th className={`px-6 py-4 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((item, rowIndex) => (
              <tr 
                key={item._id || rowIndex} 
                className={`
                  ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} 
                  transition-colors duration-150
                `}
              >
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {column.render ? column.render(item) : getNestedValue(item, column.accessor)}
                  </td>
                ))}
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    {viewLink && (
                      <a 
                        href={typeof viewLink === 'function' ? viewLink(item) : `${viewLink}/${item._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          p-1.5 rounded-full transition-colors duration-150
                          ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-blue-400' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'}
                        `}
                      >
                        <Visibility className="w-5 h-5" />
                      </a>
                    )}
                    
                    {editLink && (
                      <Link 
                        to={typeof editLink === 'function' ? editLink(item) : `${editLink}/${item._id}`}
                        className={`
                          p-1.5 rounded-full transition-colors duration-150
                          ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-green-400' : 'bg-green-50 hover:bg-green-100 text-green-600'}
                        `}
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                    )}
                    
                    {showApprove && onApprove && !item.approved && (
                      <button
                        onClick={() => onApprove(item._id)}
                        className={`
                          p-1.5 rounded-full transition-colors duration-150
                          ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-yellow-50 hover:bg-yellow-100 text-yellow-600'}
                        `}
                        title="Approve"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    
                    {onDelete && (
                      <button
                        onClick={() => handleDeleteClick(item._id)}
                        className={`
                          p-1.5 rounded-full transition-colors duration-150
                          ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'}
                        `}
                        title="Delete"
                      >
                        <Delete className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className={`px-6 py-4 flex items-center justify-between border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`p-1 rounded-full ${
                currentPage === 1 
                  ? `${darkMode ? 'text-gray-600' : 'text-gray-400'} cursor-not-allowed` 
                  : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              <KeyboardArrowLeft />
            </button>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`p-1 rounded-full ${
                currentPage === totalPages 
                  ? `${darkMode ? 'text-gray-600' : 'text-gray-400'} cursor-not-allowed` 
                  : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              <KeyboardArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title={deleteConfirmTitle}
        message={deleteConfirmMessage}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default DataTable; 