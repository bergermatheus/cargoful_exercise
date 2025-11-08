import { formatDateTime } from './dateUtils';

export const getFilteredAutomations = (automations, filterActive, filterSuccess, searchQuery) => {
  let filtered = [...automations];

  if (filterActive) {
    filtered = filtered.filter(a => a.status === 'ACTIVE');
  }

  if (filterSuccess) {
    filtered = filtered.filter(a => a.last_run_status === 'Success');
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(a =>
      a.name.toLowerCase().includes(query) ||
      a.schedule.toLowerCase().includes(query) ||
      formatDateTime(a.last_run).toLowerCase().includes(query) ||
      formatDateTime(a.next_run).toLowerCase().includes(query) ||
      (a.last_run_status && a.last_run_status.toLowerCase().includes(query))
    );
  }

  return filtered;
};

