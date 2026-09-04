import React from "react";

const TaskSearch = ({ value, onChange }) => {
  return (
    <div className="task-search">
      <input
        type="text"
        placeholder="Search by title, description, or category..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TaskSearch;
