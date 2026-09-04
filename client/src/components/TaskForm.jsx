import React, { useState } from "react";

const toDateInputValue = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toISOString().split("T")[0];
};

const TaskForm = ({ initialTask, onSubmit, submitLabel = "Save Task" }) => {
  const [form, setForm] = useState({
    title: initialTask?.title || "",
    description: initialTask?.description || "",
    status: initialTask?.status || "Pending",
    priority: initialTask?.priority || "Medium",
    category: initialTask?.category || "Other",
    dueDate: toDateInputValue(initialTask?.dueDate),
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (form.title.length > 120) newErrors.title = "Title cannot exceed 120 characters";
    if (!form.priority) newErrors.priority = "Priority is required";
    if (!form.status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit(form);
      setSuccessMessage("Task saved successfully!");
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || "Something went wrong while saving the task."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {successMessage && <div className="form-success">{successMessage}</div>}
      {submitError && <div className="form-error">{submitError}</div>}

      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Complete internship report"
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Optional details about the task"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && <span className="field-error">{errors.status}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority *</label>
          <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && <span className="field-error">{errors.priority}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={form.category} onChange={handleChange}>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default TaskForm;
