import React from "react";

export default function Button({ children, className, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transform hover:scale-105 active:scale-95
                 transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}