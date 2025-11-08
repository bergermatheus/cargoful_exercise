import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Box,
  Typography
} from '@mui/material';

function CreateAutomationDialog({
  open,
  onClose,
  formData,
  onFormDataChange,
  onSubmit
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>
        Create Automation
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
          Fill in the form below to create a new automation
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Repetition</InputLabel>
            <Select
              value={formData.repetition}
              label="Repetition"
              onChange={(e) => onFormDataChange({ ...formData, repetition: e.target.value })}
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Start Date"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.start_date}
            onChange={(e) => onFormDataChange({ ...formData, start_date: e.target.value })}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.status}
                onChange={(e) => onFormDataChange({ ...formData, status: e.target.checked })}
              />
            }
            label="Active"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: '#666' }}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          sx={{
            bgcolor: '#666',
            color: '#fff',
            '&:hover': {
              bgcolor: '#555'
            }
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateAutomationDialog;

