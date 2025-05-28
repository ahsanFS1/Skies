import { Cloud, CloudRain, CloudSnow, Sun, CloudLightning, CloudFog, Wind, CloudDrizzle } from 'lucide-react';

export default function WeatherIcon({ condition, size = 'medium', animated = false }) {
  const sizeClass = {
    tiny: 'w-6 h-6',
    small: 'w-10 h-10',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  }[size];
  
  const getWeatherIcon = () => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('thunder') || conditionLower.includes('lightning')) {
      return <CloudLightning className={`${sizeClass} ${animated ? 'animate-flash' : ''}`} />;
    } else if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
      return <CloudRain className={`${sizeClass} ${animated ? 'animate-rain' : ''}`} />;
    } else if (conditionLower.includes('snow') || conditionLower.includes('sleet') || conditionLower.includes('ice')) {
      return <CloudSnow className={`${sizeClass} ${animated ? 'animate-snow' : ''}`} />;
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return <Cloud className={`${sizeClass} ${animated ? 'animate-float' : ''}`} />;
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      return <CloudFog className={`${sizeClass} ${animated ? 'animate-pulse' : ''}`} />;
    } else if (conditionLower.includes('drizzle')) {
      return <CloudDrizzle className={`${sizeClass} ${animated ? 'animate-drizzle' : ''}`} />;
    } else if (conditionLower.includes('wind')) {
      return <Wind className={`${sizeClass} ${animated ? 'animate-wind' : ''}`} />;
    } else {
      // Default to sunny for clear conditions
      return <Sun className={`${sizeClass} ${animated ? 'animate-sun' : ''}`} />;
    }
  };
  
  return (
    <div className={`weather-icon ${animated ? 'animated' : ''}`}>
      {getWeatherIcon()}
    </div>
  );
}