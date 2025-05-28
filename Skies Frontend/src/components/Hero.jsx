import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2 } from 'lucide-react';
import ErrorAlert from "../ui/ErrorAlert";
export default function Hero() {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
  
    async function sendRequest() {
      if (!input.trim()) return;
  
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/weather/?city=${encodeURIComponent(input)}`);
        const data = await res.json();
  
        if (res.ok && data && data.location && data.current) {
          navigate('/weather', { state: { weatherData: data } });
        } else {
          setErrorMsg('Location not found. Please enter a valid city name or ZIP code.');
        }
      } catch (error) {
        console.error('Failed to fetch:', error.message);
        setErrorMsg('An error occurred while fetching weather data.');
      } finally {
        setIsLoading(false);
      }
    }
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendRequest();
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 animate-gradient-shift"></div>
      
      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white py-2">
            Skies
          </h1>
          <p className="text-blue-200 text-lg sm:text-xl opacity-80">
            Where the weather is just right.
          </p>
        </div>

        <div className="mt-12 sm:mt-16 w-full max-w-md animate-slide-up">
          <div className="relative flex items-center">
            <input
              placeholder="Enter City Name or Zip Code..."
              className="w-full px-6 py-4 bg-gray-800/50 text-white placeholder-gray-400 rounded-2xl 
                         border border-gray-700 focus:border-blue-400 outline-none transition-all duration-300
                         backdrop-blur-sm shadow-xl"
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={sendRequest}
              disabled={isLoading}
              className="absolute right-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl
                         transition-all duration-300 flex items-center justify-center gap-2
                         disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      {errorMsg && <ErrorAlert message={errorMsg} onClose={() => setErrorMsg('')} />}
    </div>
  );
}