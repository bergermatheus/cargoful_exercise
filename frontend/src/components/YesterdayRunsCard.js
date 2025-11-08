import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { CalendarToday, Adjust } from "@mui/icons-material";

function YesterdayRunsCard({ runs }) {
  return (
    <Card sx={{ borderRadius: "12px", bgcolor: "#f5f5f5" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <CalendarToday sx={{ mr: 1, color: "#666" }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
            Yesterday's Runs
          </Typography>
        </Box>
        {runs.length > 0 ? (
          runs.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                bgcolor: "#eaebea",
                p: 1.5,
                borderRadius: "8px",
              }}
            >
              <Adjust
                sx={{
                  color: "#7b2cbf",
                  mr: 1.5,
                }}
              />
              <Typography variant="body1" sx={{ flex: 1, color: "#333" }}>
                {item.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: item.status === "Success" ? "#4caf50" : "#f44336",
                  fontWeight: "medium",
                }}
              >
                {item.status}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "#999" }}>
            No automations ran yesterday
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default YesterdayRunsCard;
