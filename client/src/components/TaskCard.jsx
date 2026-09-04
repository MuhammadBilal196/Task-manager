import React from "react";
import { Link } from "react-router-dom";

const statusOrder = ["Pending", "In Progress", "Completed"];

const formatDate = (dateStr) => {
  if (!dateStr) return "No due date";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const nextStatus = () => {
    const currentIndex = statusOrder.indexOf(task.status);
    const next = statusOrder[(currentIndex + 1) % statusOrder.length];
    onStatusChange(task._id, next);
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-meta">
        <span className={`status-badge status-${task.status.replace(/\s+/g, "-").toLowerCase()}`}>
          {task.status}
        </span>
        <span className="category-badge">{task.category}</span>
      </div>

      <div className="task-dates">
        <span>Due: {formatDate(task.dueDate)}</span>
        <span>Created: {formatDate(task.createdAt)}</span>
      </div>

      <div className="task-actions">
        <button className="btn btn-small btn-status" onClick={nextStatus}>
          Mark as {statusOrder[(statusOrder.indexOf(task.status) + 1) % statusOrder.length]}
        </button>
        <Link to={`/tasks/${task._id}/edit`} className="btn btn-small btn-secondary">
          Edit
        </Link>
        <button className="btn btn-small btn-danger" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
