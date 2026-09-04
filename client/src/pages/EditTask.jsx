import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import * as taskService from "../services/taskService";

const EditTask = () => {
  const { id } = useParams();
  const { editTask } = useTasks();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (formData) => {
    await editTask(id, formData);
    setTimeout(() => navigate(`/tasks/${id}`), 700);
  };

  if (loading) return <LoadingSpinner message="Loading task..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Edit Task</h1>
      </div>
      {task && <TaskForm initialTask={task} onSubmit={handleSubmit} submitLabel="Update Task" />}
    </div>
  );
};

export default EditTask;
