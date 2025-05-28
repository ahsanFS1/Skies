import { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun } from 'lucide-react';

export default function LoadingState(
  {insights},
) {
  const [animationIndex, setAnimationIndex] = useState(0);
  const weatherIcons = [
    <Sun className="w-12 h-12 text-yellow-300" />,
    <Cloud className="w-12 h-12 text-blue-200" />,
    <CloudRain className="w-12 h-12 text-blue-300" />,
    <CloudSnow className="w-12 h-12 text-white" />
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex((prev) => (prev + 1) % weatherIcons.length);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="icon-animation">
          {weatherIcons[animationIndex]}
        </div>
        <h2 className="loading-text">Fetching your weather {insights?"insights":"data"}</h2>
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <p className="loading-subtext">Looking at the sky for you</p>
      </div>
    </div>
  );
}