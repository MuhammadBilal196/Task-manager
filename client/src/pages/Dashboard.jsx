import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskStats from "../components/TaskStats";
import TaskList from "../components/TaskList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const Dashboard = () => {
  const { tasks, stats, loading, error, fetchTasks, fetchStats, changeStatus, removeTask } =
    useTasks();

  useEffect(() => {
    fetchTasks({ sort: "newest" });
    fetchStats();
  }, [fetchTasks, fetchStats]);

  const recentTasks = tasks.slice(0, 6);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <Link to="/tasks/new" className="btn btn-primary">
          + Add Task
        </Link>
      </div>

      <ErrorMessage message={error} onRetry={() => fetchTasks({ sort: "newest" })} />
      <TaskStats stats={stats} />

      <div className="section-header">
        <h2>Recent Tasks</h2>
        <Link to="/tasks">View all →</Link>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <TaskList tasks={recentTasks} onStatusChange={changeStatus} onDelete={removeTask} />
      )}
    </div>
  );
};

export default Dashboard;
