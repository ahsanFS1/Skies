import React, { use, useEffect, useState } from "react";
import Standard from "./components/Standard";
import Basic from "./components/Basic";
import Premium from "./components/Premium";
import "./styles/SubscriptionPortal.css";
import { UserContext } from "../../UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SubscriptionPortal = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const context = use(UserContext)
  const {email,setPlan} = context
  const navigate = useNavigate()
  // Handle subscription plan selection

 useEffect(() => {
    // Check if user is already subscribed
    const checkSubscription = async () => {
      try {
        console.log("Hello")
        const res = await fetch(`http://localhost:5000/api/auth/check-subscription?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        console.log(data)
        if (data.subscribed) {
         
          setPlan(data.selectedPlan)
          navigate('/')
        }
      } catch (err) {
  
      }
    };
    if (email) checkSubscription();
    
  }, [email, setPlan]);



  
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };
  
  // Return to plan selection
  const handleBackToPlans = () => {
    setSelectedPlan(null);
  };
  
  const subscribeToPlan = async(e) =>{
  e.preventDefault()
  console.log(selectedPlan)
    try{
      console.log(selectedPlan)
    const response = await fetch("http://localhost:5000/api/auth/subscribe",
      {
        

        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({selectedPlan,email})

        

      }
   )
    if(response.ok)
        {
         toast.success("Plan Subscribed") 
         setPlan(selectedPlan);
         navigate('/')

        }
    
    }catch(err){
      alert("An error occured")
    }
    
  }
  return (
  <>
    <div className="weather-container1">
      <div className="weather-background1 bg-day"></div>
      <div className="weather-content1">
        <div className="location-header1">
          <h1 className="location-name1">Weather Forecast Subscription</h1>
          <p className="local-time1">Choose the perfect plan for your needs</p>
        </div>
        
        {!selectedPlan ? (
          <div className="subscription-options">
            <div className="subscription-grid">
              <div className="plan-card" onClick={() => handleSelectPlan('basic')}>
                <div className="plan-header">
                  <h2>Basic</h2>
                  <div className="plan-price">$4.99<span>/month</span></div>
                </div>
                <div className="plan-features">
                  <p>• 1-day forecast</p>
                  <p>• Basic weather alerts</p>
                  <p>• Limited location search</p>
                </div>
                <button className="plan-button">Select Plan</button>
              </div>
              
              <div className="plan-card featured">
                <div className="featured-tag">Popular</div>
                <div className="plan-header">
                  <h2>Standard</h2>
                  <div className="plan-price">$9.99<span>/month</span></div>
                </div>
                <div className="plan-features">
                  <p>• 2-day forecast</p>
                  <p>• Detailed weather alerts</p>
                  <p>• Unlimited location search</p>
                  <p>• Hourly forecasts</p>
                </div>
                <button className="plan-button" onClick={() => handleSelectPlan('standard')}>Select Plan</button>
              </div>
              
              <div className="plan-card">
                <div className="plan-header">
                  <h2>Premium</h2>
                  <div className="plan-price">$14.99<span>/month</span></div>
                </div>
                <div className="plan-features">
                  <p>• 3-day forecast</p>
                  <p>• Advanced weather alerts</p>
                  <p>• Historical weather data</p>
                  <p>• Climate analysis</p>
                  <p>• AI Insights</p>
                </div>
                <button className="plan-button" onClick={() => handleSelectPlan('premium')}>Select Plan</button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {selectedPlan === 'basic' && <Basic onBack={handleBackToPlans} onSubscribe={subscribeToPlan}/>}
            {selectedPlan === 'standard' && <Standard onBack={handleBackToPlans} onSubscribe={subscribeToPlan}/>}
            {selectedPlan === 'premium' && <Premium onBack={handleBackToPlans} onSubscribe={subscribeToPlan}/>}
          </>
        )}
      </div>
    </div>

    <div className="rain-container">
      <div className="raindrop"></div>
      <div className="raindrop"></div>
      <div className="raindrop"></div>
      <div className="raindrop"></div>
      <div className="raindrop"></div>
      <div className="raindrop"></div>
      <div className="raindrop"></div>
      <div className="raindrop"></div>
      <div className="raindrop"></div>
      <div className="raindrop"></div>
    </div>
  </>
);

};

export default SubscriptionPortal;