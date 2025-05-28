import { useState } from 'react';
import { Droplets, Wind, Thermometer, Sun, Umbrella } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

export default function CurrentWeather({ current }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="current-weather"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="icon-wrapper">
        <WeatherIcon condition={current.condition.text} animated={true} />
      </div>
      
      <div className="weather-main">
        <div className="condition-text">
          <h2 className="text-2xl font-semibold text-white">
            {current.condition.text}
          </h2>
        </div>
        
        <div className={`temperature ${isHovered ? 'scale-up' : ''}`}>
          <p className="text-5xl font-bold text-white temperature-value">
            {current.temp_c}°C
          </p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <Thermometer className="detail-icon" size={20} />
          <div>
            <p className="detail-label">Feels Like</p>
            <p className="detail-value">{current.feelslike_c}°C</p>
          </div>
        </div>
        
        <div className="detail-item">
          <Droplets className="detail-icon" size={20} />
          <div>
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{current.humidity}%</p>
          </div>
        </div>
        
        <div className="detail-item">
          <Wind className="detail-icon" size={20} />
          <div>
            <p className="detail-label">Wind</p>
            <p className="detail-value">{current.wind_kph} km/h</p>
          </div>
        </div>
        
        <div className="detail-item">
          <Sun className="detail-icon" size={20} />
          <div>
            <p className="detail-label">UV Index</p>
            <p className="detail-value">{current.uv}</p>
          </div>
        </div>
        
        {current.precip_mm > 0 && (
          <div className="detail-item">
            <Umbrella className="detail-icon" size={20} />
            <div>
              <p className="detail-label">Precipitation</p>
              <p className="detail-value">{current.precip_mm} mm</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}