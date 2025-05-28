import { useEffect, useState } from "react";
import LoadingState from "./WeatherPage/LoadingState";

export default function WeatherInsights() {
  const [weatherData, setWeatherData] = useState(null);
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWeatherAndInsights() {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;

        const weatherRes = await fetch(
          `http://localhost:5000/api/weather?lat=${latitude}&lon=${longitude}`
        );
        if (!weatherRes.ok) throw new Error("Weather fetch failed");
        const weather = await weatherRes.json();
        setWeatherData(weather);

        const aiRes = await fetch("http://localhost:5000/api/insights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ weather }),
        });
        if (!aiRes.ok) throw new Error("AI insights fetch failed");
        const aiData = await aiRes.json();
        setInsights(aiData.insight);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    }

    fetchWeatherAndInsights();
  }, []);

  if (loading) {
    return (
       <LoadingState insights={true}/>
     
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-red-400 text-lg">
        Error: {error}
      </div>
    );
  }

  const { location, current } = weatherData;

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6 text-white">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-blue-300">
            {location.name}, {location.country}
          </h2>
          <p className="text-blue-200 text-sm">
            {new Date(location.localtime).toLocaleString(undefined, {
              weekday: "long",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between flex-wrap">
          <div>
            <p className="text-xl font-medium">{current.condition.text}</p>
            <p className="text-4xl font-bold">{current.temp_c}°C</p>
          </div>
          <img
            src={current.condition.icon}
            alt={current.condition.text}
            className="w-20 h-20"
          />
        </div>

        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Insights
          </h3>
          <p className="text-gray-200 whitespace-pre-line">{insights}</p>
        </div>
      </div>
    </div>
  );
}
