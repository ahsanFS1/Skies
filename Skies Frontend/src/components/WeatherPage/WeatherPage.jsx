import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import ForecastSection from "./ForecastSection";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import WeatherBackground from "./WeatherBackground";
import "./weatherStyles.css";

export default function WeatherPage() {
  const location = useLocation();
  const { weatherData: initialWeatherData } = location.state || {};
  const [weatherData, setWeatherData] = useState(initialWeatherData);
  const [loading, setLoading] = useState(!initialWeatherData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (weatherData){
      console.log(weatherData)
      return};

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }
   
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          console.log("Lat",latitude,longitude)
          const response = await fetch(
            `http://localhost:5000/api/weather?lat=${latitude}&lon=${longitude}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
          }
          const data = await response.json();
          setWeatherData(data);
          setLoading(false);
        } catch (err) {
          setError("Unable to retrieve weather data.");
          setLoading(false);
        }
      },
      (err) => {
        setError("Permission to access location was denied.");
        setLoading(false);
      }
    );
  }, [weatherData]);

  if (loading) {
    return <LoadingState insights={false}/>;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  const { location: loc, current, forecast } = weatherData;
  
  return (
    <div className="weather-container">
      <WeatherBackground condition={current.condition.text} />
      
      <div className="weather-content">
        <header className="location-header">
          <h1 className="text-4xl font-bold text-white mb-1 location-name">
            {loc.name}, {loc.country}
          </h1>
          <p className="text-lg text-blue-200 mb-6 local-time">
            {new Date(loc.localtime).toLocaleString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </header>

        <CurrentWeather current={current} />
        <ForecastSection forecast={forecast} />
      </div>
    </div>
  );
}