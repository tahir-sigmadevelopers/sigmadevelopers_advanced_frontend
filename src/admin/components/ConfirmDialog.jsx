import React from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';

const ConfirmDialog = ({ 
  open, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  isDeleting = false,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  confirmColor = 'red'
}) => {
  const { darkMode } = useSelector(state => state.theme);
  
  const getButtonColorClass = () => {
    switch (confirmColor) {
      case 'green':
        return 'bg-green-600 hover:bg-green-700';
      case 'blue':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'red':
      default:
        return 'bg-red-600 hover:bg-red-700';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        style: {
          backgroundColor: darkMode ? '#1f2937' : 'white',
          color: darkMode ? 'white' : 'inherit',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: '0.5rem',
          padding: '0.5rem',
        },
      }}
    >
      <DialogTitle sx={{ color: darkMode ? 'white' : 'inherit' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
          {message}
        </p>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          variant="outlined"
          disabled={isDeleting}
          sx={{
            borderColor: darkMode ? 'rgba(209, 213, 219, 0.5)' : 'rgba(107, 114, 128, 0.5)',
            color: darkMode ? 'white' : 'inherit',
            '&:hover': {
              borderColor: darkMode ? 'rgba(209, 213, 219, 0.8)' : 'rgba(107, 114, 128, 0.8)',
              backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.04)' : 'rgba(249, 250, 251, 0.04)',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isDeleting}
          className={`${getButtonColorClass()} text-white`}
          sx={{
            backgroundColor: 'inherit', // Override with className
            '&:hover': {
              backgroundColor: 'inherit', // Override with className
            },
          }}
        >
          {isDeleting ? (
            <>
              <CircularProgress size={16} color="inherit" className="mr-2" />
              Processing...
            </>
          ) : (
            confirmText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog; 