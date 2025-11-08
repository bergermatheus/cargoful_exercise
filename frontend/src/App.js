import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import HeaderSection from "./components/HeaderSection";
import KPISection from "./components/KPISection";
import TodayScheduleCard from "./components/TodayScheduleCard";
import YesterdayRunsCard from "./components/YesterdayRunsCard";
import AutomationTable from "./components/AutomationTable";
import CreateAutomationDialog from "./components/CreateAutomationDialog";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import UpdateAutomationDialog from "./components/UpdateAutomationDialog";
import {
  fetchAutomations,
  fetchStats,
  fetchTodaySchedule,
  fetchYesterdayRuns,
  createAutomation,
  updateAutomation,
  deleteAutomation,
} from "./services/api";
import {
  formatSchedule,
  calculateNextRun,
  parseDateTimeLocalAsUTC,
} from "./utils/dateUtils";
import { getFilteredAutomations } from "./utils/filterUtils";
import { formatDateTime } from "./utils/dateUtils";
import "./App.css";

function App() {
  const [automations, setAutomations] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, success_rate: 0 });
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [yesterdayRuns, setYesterdayRuns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const [filterSuccess, setFilterSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteAutomationId, setDeleteAutomationId] = useState(null);
  const [deleteAutomationName, setDeleteAutomationName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    repetition: "Daily",
    start_date: "",
    status: true,
  });
  const [updateFormData, setUpdateFormData] = useState({
    id: null,
    name: "",
    repetition: "Daily",
    start_date: "",
    status: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [automationsRes, statsRes, todayRes, yesterdayRes] =
        await Promise.all([
          fetchAutomations(),
          fetchStats(),
          fetchTodaySchedule(),
          fetchYesterdayRuns(),
        ]);

      setAutomations(automationsRes.data);
      setStats(statsRes.data);
      setTodaySchedule(todayRes.data);
      setYesterdayRuns(yesterdayRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreateAutomation = async () => {
    try {
      const startDateUTC = parseDateTimeLocalAsUTC(formData.start_date);
      if (!startDateUTC) {
        console.error("Invalid start date");
        return;
      }

      const nextRun = calculateNextRun(startDateUTC, formData.repetition);

      await createAutomation({
        name: formData.name,
        schedule: formatSchedule(formData.repetition, startDateUTC),
        status: formData.status ? "ACTIVE" : "INACTIVE",
        repetition: formData.repetition,
        start_date: startDateUTC.toISOString(),
        next_run: nextRun.toISOString(),
      });

      setOpenDialog(false);
      setFormData({
        name: "",
        repetition: "Daily",
        start_date: "",
        status: true,
      });
      fetchData();
    } catch (error) {
      console.error("Error creating automation:", error);
    }
  };

  const handleUpdateClick = (automation) => {
    let startDate = "";
    if (automation.start_date) {
      const date = new Date(automation.start_date);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      startDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    setUpdateFormData({
      id: automation.id,
      name: automation.name,
      repetition: automation.repetition || "Daily",
      start_date: startDate,
      status: automation.status === "ACTIVE",
    });
    setOpenUpdateDialog(true);
  };

  const handleUpdateAutomation = async () => {
    try {
      const startDateUTC = parseDateTimeLocalAsUTC(updateFormData.start_date);
      if (!startDateUTC) {
        console.error("Invalid start date");
        return;
      }

      const nextRun = calculateNextRun(startDateUTC, updateFormData.repetition);

      await updateAutomation(updateFormData.id, {
        name: updateFormData.name,
        schedule: formatSchedule(updateFormData.repetition, startDateUTC),
        status: updateFormData.status ? "ACTIVE" : "INACTIVE",
        repetition: updateFormData.repetition,
        start_date: startDateUTC.toISOString(),
        next_run: nextRun.toISOString(),
      });

      setOpenUpdateDialog(false);
      setUpdateFormData({
        id: null,
        name: "",
        repetition: "Daily",
        start_date: "",
        status: true,
      });
      fetchData();
    } catch (error) {
      console.error("Error updating automation:", error);
    }
  };

  const handleDeleteClick = (id, name) => {
    setDeleteAutomationId(id);
    setDeleteAutomationName(name);
    setOpenDeleteDialog(true);
  };

  const handleDeleteAutomation = async () => {
    if (deleteAutomationId) {
      try {
        await deleteAutomation(deleteAutomationId);
        setOpenDeleteDialog(false);
        setDeleteAutomationId(null);
        setDeleteAutomationName("");
        fetchData();
      } catch (error) {
        console.error("Error deleting automation:", error);
      }
    }
  };

  const filteredAutomations = getFilteredAutomations(
    automations,
    filterActive,
    filterSuccess,
    searchQuery
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <HeaderSection onOpenDialog={() => setOpenDialog(true)} />

      <KPISection
        stats={stats}
        filterActive={filterActive}
        filterSuccess={filterSuccess}
        onFilterActive={setFilterActive}
        onFilterSuccess={setFilterSuccess}
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TodayScheduleCard schedule={todaySchedule} />
        </Grid>
        <Grid item xs={12} md={6}>
          <YesterdayRunsCard runs={yesterdayRuns} />
        </Grid>
      </Grid>

      <AutomationTable
        automations={filteredAutomations}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        formatDateTime={formatDateTime}
        onUpdate={handleUpdateClick}
        onDelete={handleDeleteClick}
      />

      <CreateAutomationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleCreateAutomation}
      />

      <UpdateAutomationDialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        formData={updateFormData}
        onFormDataChange={setUpdateFormData}
        onSubmit={handleUpdateAutomation}
      />
      <DeleteConfirmDialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setDeleteAutomationId(null);
          setDeleteAutomationName("");
        }}
        onConfirm={handleDeleteAutomation}
        automationName={deleteAutomationName}
      />
    </Container>
  );
}

export default App;
