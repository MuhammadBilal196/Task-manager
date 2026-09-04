import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Builds a clean query string from filter/search/sort params
const buildQuery = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });
  const str = query.toString();
  return str ? `?${str}` : "";
};

// GET /api/tasks — supports { search, status, priority, category, sort }
export const getTasks = async (params = {}) => {
  const { data } = await api.get(`/tasks${buildQuery(params)}`);
  return data;
};

// GET /api/tasks/stats
export const getTaskStats = async () => {
  const { data } = await api.get("/tasks/stats");
  return data;
};

// GET /api/tasks/:id
export const getTask = async (id) => {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
};

// POST /api/tasks
export const createTask = async (task) => {
  const { data } = await api.post("/tasks", task);
  return data;
};

// PUT /api/tasks/:id
export const updateTask = async (id, task) => {
  const { data } = await api.put(`/tasks/${id}`, task);
  return data;
};

// PATCH /api/tasks/:id/status
export const updateTaskStatus = async (id, status) => {
  const { data } = await api.patch(`/tasks/${id}/status`, { status });
  return data;
};

// DELETE /api/tasks/:id
export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};

export default api;
