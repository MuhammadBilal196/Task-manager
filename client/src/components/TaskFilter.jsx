import React from "react";

const TaskFilter = ({ filters, onChange, sort, onSortChange }) => {
  const handleFilterChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="task-filter">
      <select value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)}>
        <option value="All">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select value={filters.priority} onChange={(e) => handleFilterChange("priority", e.target.value)}>
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select value={filters.category} onChange={(e) => handleFilterChange("category", e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Work">Work</option>
        <option value="Study">Study</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>

      <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default TaskFilter;
