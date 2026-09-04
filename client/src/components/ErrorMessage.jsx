import React from "react";

const ErrorMessage = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      <p>⚠️ {message}</p>
      {onRetry && (
        <button className="btn btn-secondary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
