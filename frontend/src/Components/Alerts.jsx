import React, { useEffect } from "react";


const AlertMessage = ({ type = "info", message, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  // Tailwind color styles based on alert type
  const typeClasses = {
    info: "bg-blue-500",
    error: "bg-red-500",
    success: "bg-green-500",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div
      className={`w-96 h-auto fixed z-50  right-5 px-4 py-7 top-5 rounded-lg capitalize text-white shadow-lg transition-opacity duration-300 ${typeClasses[type]}`}
    >
      <div className="flex items-center justify-between space-x-2">
        <span>{message}</span>
        <button
          className="text-white/80 hover:text-white text-lg leading-none"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AlertMessage;
