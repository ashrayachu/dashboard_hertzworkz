import React from 'react';

function ErrorAlert({ message }) {
  return (
    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
      {message}
    </div>
  );
}

export default ErrorAlert;