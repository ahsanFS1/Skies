import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ message }) {
  return (
    <div className="error-container">
      <div className="error-content">
        <AlertTriangle className="error-icon" size={48} />
        <h2 className="error-title">Unable to Load Weather</h2>
        <p className="error-message">{message}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}