import React from "react";

const LoadingSpinner = ({ message = "Loading tasks..." }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
