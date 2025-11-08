import React from "react";
import { Grid } from "@mui/material";
import { Apps, Bolt, CheckCircle } from "@mui/icons-material";
import KPICard from "./KPICard";

function KPISection({
  stats,
  filterActive,
  filterSuccess,
  onFilterActive,
  onFilterSuccess,
}) {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <KPICard
          icon={Apps}
          iconColor="#7b2cbf"
          iconBgColor="#e8d5ff"
          label="Total Automations"
          value={stats.total}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <KPICard
          icon={Bolt}
          iconColor="#7b2cbf"
          iconBgColor="#e8d5ff"
          label="Active Schedules"
          value={stats.active}
          onClick={() => {
            onFilterActive(!filterActive);
            onFilterSuccess(false);
          }}
          isActive={filterActive}
          borderColor="#7b2cbf"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <KPICard
          icon={CheckCircle}
          iconColor="#4caf50"
          iconBgColor="#c8e6c9"
          label="Success Rate"
          value={`${stats.success_rate}%`}
          onClick={() => {
            onFilterSuccess(!filterSuccess);
            onFilterActive(false);
          }}
          isActive={filterSuccess}
          borderColor="#4caf50"
        />
      </Grid>
    </Grid>
  );
}

export default KPISection;
