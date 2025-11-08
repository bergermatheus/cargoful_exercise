import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchAutomations = () => axios.get(`${API_BASE_URL}/automations/`);
export const fetchStats = () => axios.get(`${API_BASE_URL}/automations/stats/`);
export const fetchTodaySchedule = () => axios.get(`${API_BASE_URL}/automations/today_schedule/`);
export const fetchYesterdayRuns = () => axios.get(`${API_BASE_URL}/automations/yesterday_runs/`);
export const createAutomation = (data) => axios.post(`${API_BASE_URL}/automations/`, data);
export const updateAutomation = (id, data) => axios.put(`${API_BASE_URL}/automations/${id}/`, data);
export const deleteAutomation = (id) => axios.delete(`${API_BASE_URL}/automations/${id}/`);

