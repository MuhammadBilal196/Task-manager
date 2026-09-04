import React from "react";

const StatCard = ({ label, value, colorClass }) => (
  <div className={`stat-card ${colorClass}`}>
    <span className="stat-value">{value ?? 0}</span>
    <span className="stat-label">{label}</span>
  </div>
);

const TaskStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="stats-grid">
      <StatCard label="Total Tasks" value={stats.total} colorClass="stat-total" />
      <StatCard label="Pending" value={stats.pending} colorClass="stat-pending" />
      <StatCard label="In Progress" value={stats.inProgress} colorClass="stat-progress" />
      <StatCard label="Completed" value={stats.completed} colorClass="stat-completed" />
      <StatCard label="High Priority" value={stats.highPriority} colorClass="stat-high" />
    </div>
  );
};

export default TaskStats;
