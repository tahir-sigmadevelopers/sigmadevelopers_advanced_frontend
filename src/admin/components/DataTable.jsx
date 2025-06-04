import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Edit, Delete, Visibility, CheckCircle } from '@mui/icons-material';
import Loader from '../../components/Loader';

const DataTable = ({
  data,
  columns,
  loading,
  onDelete,
  onApprove,
  emptyMessage = 'No data available',
  editLink,
  viewLink,
  showApprove = false
}) => {
  const { darkMode } = useSelector(state => state.theme);
  
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
            {data.map((item, rowIndex) => (
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
                    {column.render ? column.render(item) : item[column.accessor]}
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
                    
                    {showApprove && onApprove && (
                      <button
                        onClick={() => onApprove(item._id)}
                        className={`
                          p-1.5 rounded-full transition-colors duration-150
                          ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-yellow-50 hover:bg-yellow-100 text-yellow-600'}
                        `}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item._id)}
                        className={`
                          p-1.5 rounded-full transition-colors duration-150
                          ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'}
                        `}
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
    </div>
  );
};

export default DataTable; 