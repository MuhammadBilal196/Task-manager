import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import ConfirmationModal from "../components/ConfirmationModal";
import { useTasks } from "../context/TaskContext";
import * as taskService from "../services/taskService";

const formatDate = (dateStr) => {
  if (!dateStr) return "No due date";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removeTask } = useTasks();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await taskService.getTask(id);
        setTask(data.task);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load this task.");
      } finally {
        setLoading(false);
      }
    };
    loadTask();
  }, [id]);

  const handleDelete = async () => {
    await removeTask(id);
    navigate("/tasks");
  };

  if (loading) return <LoadingSpinner message="Loading task..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!task) return null;

  return (
    <div className="page">
      <div className="page-header">
        <h1>{task.title}</h1>
        <div className="page-actions">
          <Link to={`/tasks/${id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>
            Delete
          </button>
        </div>
      </div>

      <div className="task-detail-card">
        <div className="task-meta">
          <span className={`status-badge status-${task.status.replace(/\s+/g, "-").toLowerCase()}`}>
            {task.status}
          </span>
          <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
            {task.priority} Priority
          </span>
          <span className="category-badge">{task.category}</span>
        </div>

        <p className="task-description">
          {task.description || "No description provided."}
        </p>

        <div className="task-dates">
          <span>Due: {formatDate(task.dueDate)}</span>
          <span>Created: {formatDate(task.createdAt)}</span>
          <span>Last updated: {formatDate(task.updatedAt)}</span>
        </div>
      </div>

      {showConfirm && (
        <ConfirmationModal
          title="Delete Task"
          message={`Are you sure you want to delete "${task.title}"? This cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default TaskDetail;
