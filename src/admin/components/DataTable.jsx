import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Edit, 
  Delete, 
  Visibility, 
  CheckCircle, 
  Search, 
  KeyboardArrowLeft, 
  KeyboardArrowRight,
  FilterList,
  DeleteSweep,
  Close,
  CheckBox,
  CheckBoxOutlineBlank,
  CheckCircleOutline
} from '@mui/icons-material';
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
  onBulkDelete,
  onApprove,
  onBulkApprove,
  emptyMessage = 'No data available',
  editLink,
  viewLink,
  showApprove = false,
  searchPlaceholder = 'Search...',
  deleteConfirmTitle = 'Confirm Deletion',
  deleteConfirmMessage = 'Are you sure you want to delete this item? This action cannot be undone.',
  bulkDeleteConfirmTitle = 'Confirm Bulk Deletion',
  bulkDeleteConfirmMessage = 'Are you sure you want to delete the selected items? This action cannot be undone.',
  filterOptions = []
}) => {
  const { darkMode } = useSelector(state => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [bulkApproveDialogOpen, setBulkApproveDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const itemsPerPage = 10;
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [isBulkApproving, setIsBulkApproving] = useState(false);
  
  // Reset selections when data changes
  useEffect(() => {
    setSelectedItems([]);
    setSelectAll(false);
  }, [data]);

  // Apply filters and search
  useEffect(() => {
    if (!data) return setFilteredData([]);
    
    let filtered = [...data];
    
    // Apply active filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        filtered = filtered.filter(item => {
          const itemValue = getNestedValue(item, key);
          
          // Handle different filter types
          if (typeof value === 'boolean') {
            return itemValue === value;
          } else if (Array.isArray(value)) {
            return value.includes(itemValue);
          } else {
            return String(itemValue) === String(value);
          }
        });
      }
    });
    
    // Apply search term
    if (searchTerm.trim() !== '') {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(item => {
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
    }
    
    setFilteredData(filtered);
    // Reset to first page when filters or search changes
    setCurrentPage(1);
  }, [searchTerm, data, columns, activeFilters]);
  
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

  const handleBulkDeleteClick = () => {
    if (selectedItems.length === 0) return;
    setBulkDeleteDialogOpen(true);
  };

  const handleConfirmBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    
    setIsBulkDeleting(true);
    try {
      await onBulkDelete?.(selectedItems);
      setSelectedItems([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Bulk delete error:", error);
    } finally {
      setIsBulkDeleting(false);
      setBulkDeleteDialogOpen(false);
    }
  };

  const handleCancelBulkDelete = () => {
    setBulkDeleteDialogOpen(false);
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedData.map(item => item._id));
    }
    setSelectAll(!selectAll);
  };

  const handleFilterChange = (key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilter = (key) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
  };

  // Compute if all items on the current page are selected
  useEffect(() => {
    if (paginatedData.length > 0) {
      const allSelected = paginatedData.every(item => selectedItems.includes(item._id));
      setSelectAll(allSelected);
    } else {
      setSelectAll(false);
    }
  }, [paginatedData, selectedItems]);

  // Get pending items that are selected
  const selectedPendingItems = useMemo(() => {
    if (!data || !selectedItems.length) return [];
    return data.filter(item => 
      selectedItems.includes(item._id) && 
      item.approved === false
    );
  }, [data, selectedItems]);

  const handleBulkApproveClick = () => {
    if (selectedPendingItems.length === 0) return;
    setBulkApproveDialogOpen(true);
  };

  const handleConfirmBulkApprove = async () => {
    if (selectedPendingItems.length === 0) return;
    
    setIsBulkApproving(true);
    try {
      await onBulkApprove?.(selectedPendingItems.map(item => item._id));
      setSelectedItems([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Bulk approve error:", error);
    } finally {
      setIsBulkApproving(false);
      setBulkApproveDialogOpen(false);
    }
  };

  const handleCancelBulkApprove = () => {
    setBulkApproveDialogOpen(false);
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

  // Render active filters
  const renderActiveFilters = () => {
    const filterCount = Object.keys(activeFilters).length;
    if (filterCount === 0) return null;

    return (
      <div className={`flex flex-wrap items-center gap-2 px-4 py-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Active filters:
        </span>
        {Object.entries(activeFilters).map(([key, value]) => {
          const filterOption = filterOptions.find(option => option.key === key);
          const filterName = filterOption?.label || key;
          let displayValue = value;
          
          if (filterOption?.options) {
            const option = filterOption.options.find(opt => opt.value === value);
            displayValue = option?.label || value;
          }
          
          return (
            <div 
              key={key}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs 
                ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
            >
              <span>{filterName}: {displayValue}</span>
              <button 
                onClick={() => clearFilter(key)}
                className="ml-1 p-0.5 rounded-full hover:bg-gray-600 hover:text-white"
              >
                <Close fontSize="small" className="w-3 h-3" />
              </button>
            </div>
          );
        })}
        <button 
          onClick={clearAllFilters}
          className={`text-xs underline ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
        >
          Clear all
        </button>
      </div>
    );
  };
  
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Search and filter bar */}
      <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className={`relative rounded-md shadow-sm flex-grow`}>
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
          
          {filterOptions.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md border-0 ring-1 ring-inset
                  ${darkMode 
                    ? 'bg-gray-700 text-white ring-gray-600' 
                    : 'bg-white text-gray-900 ring-gray-300'}`}
              >
                <FilterList className="h-5 w-5" />
                <span>Filter</span>
              </button>
              
              {showFilterMenu && (
                <div className={`absolute right-0 mt-2 w-64 rounded-md shadow-lg z-10
                  ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <div className="p-3 space-y-3">
                    {filterOptions.map((filter) => (
                      <div key={filter.key} className="space-y-1">
                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {filter.label}
                        </label>
                        <select
                          value={activeFilters[filter.key] || ''}
                          onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                          className={`block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset 
                            ${darkMode 
                              ? 'bg-gray-600 text-white ring-gray-500' 
                              : 'bg-white text-gray-900 ring-gray-300'} 
                            focus:ring-2 focus:ring-blue-600 text-sm`}
                        >
                          <option value="">All</option>
                          {filter.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                    <div className="pt-2 flex justify-between">
                      <button
                        onClick={clearAllFilters}
                        className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:underline`}
                      >
                        Clear all
                      </button>
                      <button
                        onClick={() => setShowFilterMenu(false)}
                        className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="flex gap-2">
            {onBulkDelete && selectedItems.length > 0 && (
              <button
                onClick={handleBulkDeleteClick}
                disabled={isBulkDeleting}
                className={`flex items-center gap-2 px-4 py-2 rounded-md
                  bg-red-600 text-white hover:bg-red-700 transition-colors
                  ${isBulkDeleting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isBulkDeleting ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1"></span>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <DeleteSweep className="h-5 w-5" />
                    <span>Delete ({selectedItems.length})</span>
                  </>
                )}
              </button>
            )}

            {showApprove && onBulkApprove && selectedPendingItems.length > 0 && (
              <button
                onClick={handleBulkApproveClick}
                disabled={isBulkApproving}
                className={`flex items-center gap-2 px-4 py-2 rounded-md
                  bg-green-600 text-white hover:bg-green-700 transition-colors
                  ${isBulkApproving ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isBulkApproving ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1"></span>
                    <span>Approving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircleOutline className="h-5 w-5" />
                    <span>Approve ({selectedPendingItems.length})</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active filters */}
      {renderActiveFilters()}

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              {onBulkDelete && (
                <th className={`px-4 py-3 w-10`}>
                  <button 
                    onClick={handleSelectAll}
                    className={`p-1 rounded-md transition-colors
                      ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                  >
                    {selectAll ? (
                      <CheckBox className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    ) : (
                      <CheckBoxOutlineBlank className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </button>
                </th>
              )}
              {columns.map((column, index) => (
                <th key={index} className={`px-6 py-3 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {column.header}
                </th>
              ))}
              <th className={`px-6 py-3 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
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
                  ${selectedItems.includes(item._id) ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}
                `}
              >
                {onBulkDelete && (
                  <td className={`px-4 py-4 w-10`}>
                    <button 
                      onClick={() => handleSelectItem(item._id)}
                      className={`p-1 rounded-md transition-colors
                        ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                    >
                      {selectedItems.includes(item._id) ? (
                        <CheckBox className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      ) : (
                        <CheckBoxOutlineBlank className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      )}
                    </button>
                  </td>
                )}
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

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title={deleteConfirmTitle}
        message={deleteConfirmMessage}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
      
      <ConfirmDialog
        open={bulkDeleteDialogOpen}
        title={bulkDeleteConfirmTitle}
        message={`${bulkDeleteConfirmMessage} (${selectedItems.length} items)`}
        onConfirm={handleConfirmBulkDelete}
        onCancel={handleCancelBulkDelete}
        isDeleting={isBulkDeleting}
      />

      <ConfirmDialog
        open={bulkApproveDialogOpen}
        title="Approve Multiple Testimonials"
        message={`Are you sure you want to approve ${selectedPendingItems.length} testimonials?`}
        onConfirm={handleConfirmBulkApprove}
        onCancel={handleCancelBulkApprove}
        confirmText="Approve"
        confirmColor="green"
        isDeleting={isBulkApproving}
      />
    </div>
  );
};

export default DataTable; 