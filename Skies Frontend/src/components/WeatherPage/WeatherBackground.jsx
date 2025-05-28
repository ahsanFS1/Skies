import { useEffect, useState } from 'react';

export default function WeatherBackground({ condition }) {
  const [particles, setParticles] = useState([]);
  const [backgroundClass, setBackgroundClass] = useState('');
  
  useEffect(() => {
    const conditionLower = condition?.toLowerCase() || '';
    
    // Set background class based on weather condition
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      setBackgroundClass('bg-clear');
    } else if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
      setBackgroundClass('bg-rainy');
      generateRaindrops();
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      setBackgroundClass('bg-cloudy');
    } else if (conditionLower.includes('snow')) {
      setBackgroundClass('bg-snowy');
      generateSnowflakes();
    } else if (conditionLower.includes('thunder')) {
      setBackgroundClass('bg-thunder');
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      setBackgroundClass('bg-foggy');
    } else {
      // Default night/day background
      const currentHour = new Date().getHours();
      setBackgroundClass(currentHour >= 6 && currentHour < 18 ? 'bg-day' : 'bg-night');
    }
  }, [condition]);
  
  const generateRaindrops = () => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${0.5 + Math.random() * 0.5}s`,
      animationDelay: `${Math.random() * 2}s`,
      opacity: 0.3 + Math.random() * 0.7
    }));
    setParticles(newParticles);
  };
  
  const generateSnowflakes = () => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: 0.5 + Math.random() * 0.5,
      size: `${3 + Math.random() * 5}px`
    }));
    setParticles(newParticles);
  };
  
  return (
    <div className={`weather-background ${backgroundClass}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`${backgroundClass.includes('rain') ? 'raindrop' : 'snowflake'}`}
          style={{
            left: particle.left,
            animationDuration: particle.animationDuration,
            animationDelay: particle.animationDelay,
            opacity: particle.opacity,
            width: particle.size,
            height: particle.size
          }}
        />
      ))}
    </div>
  );
}