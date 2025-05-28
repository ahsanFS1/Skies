import React, { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function ErrorAlert({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in animation
    setVisible(true);
    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out before closing
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-6 py-4
                  bg-red-600 text-white rounded-xl shadow-lg flex items-center gap-3
                  transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <AlertCircle className="w-6 h-6" />
      <span className="flex-1 text-sm">{message}</span>
      <button onClick={() => setVisible(false)}>
        <X className="w-5 h-5 hover:text-gray-200 transition-colors" />
      </button>
    </div>
  );
}
