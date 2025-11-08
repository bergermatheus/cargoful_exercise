import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

function DeleteConfirmDialog({ open, onClose, onConfirm, automationName }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
        Delete Automation
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
          Are you sure you want to delete this automation?
          {automationName && (
            <Box
              component="span"
              sx={{ fontWeight: "bold", display: "block", mt: 1 }}
            >
              "{automationName}"
            </Box>
          )}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#999", fontSize: "0.875rem" }}
        >
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: "#666" }}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: "#d32f2f",
            color: "#fff",
            "&:hover": {
              bgcolor: "#c62828",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmDialog;
