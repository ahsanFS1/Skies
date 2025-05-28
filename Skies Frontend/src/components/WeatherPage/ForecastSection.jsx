import { use, useState,useEffect } from "react";
import ForecastDay from "./ForecastDay";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

export default function ForecastSection({ forecast }) {
  const [expandedDay, setExpandedDay] = useState(null);
  const user = use(UserContext);
  const navigate = useNavigate();
  const [limit, setLimit] = useState(1);
  useEffect(() => {
    const setForecastLimit = () => {
      if (user.plan.toString().toLowerCase().includes("standard")) {
        setLimit(1);
      } else if (user.plan.toString().toLowerCase().includes("basic")) {
        setLimit(2);
      } else if (user.plan.toString().toLowerCase().includes("premium")) {
        setLimit(3)  
      }
      console.log(limit)
    };

    if(user.plan) setForecastLimit()
  }, [user.plan]);
  const toggleDay = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };
  const renderText = () => {
    if (user.plan.toString().toLowerCase().includes("standard")) {
      return <>1-day-forecast</>;
    } else if (user.plan.toString().toLowerCase().includes("basic")) {
      return <>2-day-forecast</>;
    } else if (user.plan.toString().toLowerCase().includes("premium")) {
      return <>3-day-forecast</>;
    } else {
      navigate("/");
    }
  };
  return (
    <div className="forecast-section">
      <h2 className="forecast-title">{renderText()}</h2>

      <div className="forecast-days">
        {forecast?.forecastday?.slice(0,limit+1).map((day, index) => (
          <ForecastDay
            key={day.date}
            day={day}
            isExpanded={expandedDay === index}
            onClick={() => toggleDay(index)}
          />
        ))}
      </div>
    </div>
  );
}
