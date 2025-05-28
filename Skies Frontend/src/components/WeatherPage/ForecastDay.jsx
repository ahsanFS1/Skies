import { useRef, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';

export default function   ForecastDay({ day, isExpanded, onClick }) {
  const hourlyRef = useRef(null);
  
  // Scroll to the current hour when expanded
  useEffect(() => {
    if (isExpanded && hourlyRef.current) {
      const now = new Date();
      const currentHour = now.getHours();
      
      // Find the closest hour element
      const hourElements = hourlyRef.current.querySelectorAll('.hour-item');
      if (hourElements.length > 0) {
        const closestHourIndex = Math.min(currentHour, hourElements.length - 1);
        const scrollPos = hourElements[closestHourIndex].offsetLeft - 100;
        hourlyRef.current.scrollLeft = scrollPos;
      }
    }
  }, [isExpanded]);
  
  // Format the date
  const dayDate = new Date(day.date);
  const formattedDate = dayDate.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
  
  // Check if this is today
  const isToday = new Date().toDateString() === dayDate.toDateString();
  
  return (
    <div className={`forecast-day ${isExpanded ? 'expanded' : ''}`} onClick={onClick}>
      <div className="forecast-day-header">
        <div className="day-info">
          <h3 className="day-name">
            {isToday ? 'Today' : formattedDate}
          </h3>
          <p className="day-condition">{day.day.condition.text}</p>
        </div>
        
        <div className="day-temp">
          <div className="temp-range">
            <span className="max-temp">{Math.round(day.day.maxtemp_c)}°</span>
            <span className="min-temp">{Math.round(day.day.mintemp_c)}°</span>
          </div>
          <div className="day-icon">
            <WeatherIcon condition={day.day.condition.text} size="small" />
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="hourly-forecast" ref={hourlyRef}>
          {day.hour.map((hourData) => {
            const hourTime = new Date(hourData.time);
            const isNow = new Date().getHours() === hourTime.getHours() && isToday;
            
            return (
              <div key={hourData.time_epoch} className={`hour-item ${isNow ? 'current-hour' : ''}`}>
                <p className="hour-time">
                  {hourTime.toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <div className="hour-icon">
                  <WeatherIcon condition={hourData.condition.text} size="tiny" />
                </div>
                <p className="hour-temp">{Math.round(hourData.temp_c)}°</p>
                <p className="hour-precip">
                  {hourData.precip_mm > 0 ? `${hourData.precip_mm}mm` : ''}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}