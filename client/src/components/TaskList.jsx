import React, { useState } from "react";
import TaskCard from "./TaskCard";
import ConfirmationModal from "./ConfirmationModal";

const TaskList = ({ tasks, onStatusChange, onDelete }) => {
  const [pendingDelete, setPendingDelete] = useState(null);

  const confirmDelete = async () => {
    if (pendingDelete) {
      await onDelete(pendingDelete._id);
      setPendingDelete(null);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found.</p>
        <p className="empty-state-sub">Try adjusting your search or filters, or add a new task.</p>
      </div>
    );
  }

  return (
    <>
      <div className="task-grid">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={setPendingDelete}
          />
        ))}
      </div>

      {pendingDelete && (
        <ConfirmationModal
          title="Delete Task"
          message={`Are you sure you want to delete "${pendingDelete.title}"? This cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </>
  );
};

export default TaskList;
