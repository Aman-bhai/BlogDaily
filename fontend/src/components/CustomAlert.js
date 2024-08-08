import React from "react";
import PropTypes from "prop-types";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 w-96 p-4 py-2 bg-red-600 text-white rounded-lg shadow-lg sm:mx-auto">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="flex-1">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
        >
          ×
        </button>
      </div>
    </div>
  );
};

CustomAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomAlert;
