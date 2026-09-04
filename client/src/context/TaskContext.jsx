import React, { createContext, useCallback, useContext, useState } from "react";
import * as taskService from "../services/taskService";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks(params);
      setTasks(data.tasks || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not reach the server. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const data = await taskService.getTaskStats();
      setStats(data.stats);
    } catch (err) {
      // Stats are supplementary — don't block the whole dashboard on this failing
      console.error("Failed to load stats:", err.message);
    }
  }, []);

  const addTask = async (task) => {
    const data = await taskService.createTask(task);
    setTasks((prev) => [data.task, ...prev]);
    fetchStats();
    return data.task;
  };

  const editTask = async (id, task) => {
    const data = await taskService.updateTask(id, task);
    setTasks((prev) => prev.map((t) => (t._id === id ? data.task : t)));
    fetchStats();
    return data.task;
  };

  const changeStatus = async (id, status) => {
    const data = await taskService.updateTaskStatus(id, status);
    setTasks((prev) => prev.map((t) => (t._id === id ? data.task : t)));
    fetchStats();
    return data.task;
  };

  const removeTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    fetchStats();
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loading,
        error,
        fetchTasks,
        fetchStats,
        addTask,
        editTask,
        changeStatus,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within a TaskProvider");
  return ctx;
};
