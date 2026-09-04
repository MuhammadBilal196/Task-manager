import React from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

const AddTask = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const task = await addTask(formData);
    setTimeout(() => navigate(`/tasks/${task._id}`), 700);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Add New Task</h1>
      </div>
      <TaskForm onSubmit={handleSubmit} submitLabel="Create Task" />
    </div>
  );
};

export default AddTask;
