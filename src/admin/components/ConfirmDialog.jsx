import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { WarningAmberRounded } from '@mui/icons-material';

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, isDeleting }) => {
  const { darkMode } = useSelector(state => state.theme);
  
  return (
    <Dialog 
      open={open} 
      onClose={onCancel}
      PaperProps={{
        style: {
          backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
          color: darkMode ? '#F3F4F6' : '#111827',
          maxWidth: '400px',
          width: '100%',
          borderRadius: '0.5rem'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        color: darkMode ? '#F87171' : '#DC2626'
      }}>
        <WarningAmberRounded color="inherit" />
        <Typography variant="h6" component="span">
          {title || 'Confirm Deletion'}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body1" sx={{ color: darkMode ? '#D1D5DB' : '#4B5563' }}>
          {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button 
          onClick={onCancel} 
          variant="outlined"
          sx={{ 
            color: darkMode ? '#D1D5DB' : '#4B5563',
            borderColor: darkMode ? '#4B5563' : '#D1D5DB',
            '&:hover': {
              borderColor: darkMode ? '#9CA3AF' : '#6B7280',
              backgroundColor: darkMode ? 'rgba(156, 163, 175, 0.04)' : 'rgba(107, 114, 128, 0.04)'
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="error"
          disabled={isDeleting}
          sx={{ 
            backgroundColor: darkMode ? '#DC2626' : '#EF4444',
            '&:hover': {
              backgroundColor: darkMode ? '#B91C1C' : '#DC2626'
            }
          }}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog; 