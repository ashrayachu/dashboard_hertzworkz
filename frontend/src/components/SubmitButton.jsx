import React from 'react';

function SubmitButton({ loading, text, loadingText, disabled }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? loadingText : text}
    </button>
  );
}

export default SubmitButton;