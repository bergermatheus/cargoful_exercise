import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Search, MoreHoriz } from "@mui/icons-material";

function AutomationTable({
  automations,
  searchQuery,
  onSearchChange,
  formatDateTime,
  onUpdate,
  onDelete,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAutomation, setSelectedAutomation] = useState(null);

  const handleMenuOpen = (event, automation) => {
    setAnchorEl(event.currentTarget);
    setSelectedAutomation(automation);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAutomation(null);
  };

  const handleUpdate = () => {
    if (selectedAutomation) {
      onUpdate(selectedAutomation);
      handleMenuClose();
    }
  };

  const handleDelete = () => {
    if (selectedAutomation) {
      onDelete(selectedAutomation.id);
      handleMenuClose();
    }
  };
  return (
    <Card sx={{ borderRadius: "12px", bgcolor: "#f5f5f5" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
            All Automations
          </Typography>
          <TextField
            placeholder="Search automations"
            size="small"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#999" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: 300,
              bgcolor: "#fff",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                  Schedule
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                  Last Run
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                  Next Run
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {automations.map((automation) => (
                <TableRow key={automation.id}>
                  <TableCell sx={{ color: "#333" }}>
                    {automation.name}
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    {automation.schedule}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={automation.status}
                      size="small"
                      sx={{
                        bgcolor:
                          automation.status === "ACTIVE"
                            ? "#c8e6c9"
                            : "#ffcdd2",
                        color:
                          automation.status === "ACTIVE"
                            ? "#2e7d32"
                            : "#c62828",
                        fontWeight: "medium",
                        borderRadius: "12px",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    {automation.last_run ? (
                      <>
                        {formatDateTime(automation.last_run)}{" "}
                        {automation.last_run_status && (
                          <span
                            style={{
                              color:
                                automation.last_run_status === "Success"
                                  ? "#4caf50"
                                  : "#f44336",
                              fontWeight: "medium",
                            }}
                          >
                            {automation.last_run_status}
                          </span>
                        )}
                      </>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell sx={{ color: "#333" }}>
                    {automation.next_run
                      ? formatDateTime(automation.next_run)
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, automation)}
                    >
                      <MoreHoriz />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleUpdate}>Update</MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: "#f44336" }}>
            Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
}

export default AutomationTable;
