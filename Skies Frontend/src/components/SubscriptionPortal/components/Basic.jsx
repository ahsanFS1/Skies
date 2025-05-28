import React, { useState } from 'react';
import { ArrowLeft, Check, CreditCard } from 'lucide-react';

const Basic = ({ onBack,onSubscribe}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally process the payment
    // For demo purposes, we'll just show success message
    setIsSubmitted(true);
  };
  
  const basicFeatures = [
    'Current weather conditions',
    '3-day forecast',
    'Limited hourly forecasts',
    'Basic weather alerts',
    'Up to 3 saved locations',
    'Temperature and humidity data'
  ];

  return (
    <div className="subscription-details">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={20} />
      </button>
      
      {!isSubmitted ? (
        <div className="subscription-form">
          <span className="plan-badge">Basic Plan</span>
          <h2>Subscribe to Basic</h2>
          
          <div className="plan-features-list">
            <h3>What you'll get:</h3>
            <div className="features-grid">
              {basicFeatures.map((feature, index) => (
                <div className="feature-item" key={index}>
                  <span className="feature-icon">
                    <Check size={16} />
                  </span>
                  <span className="feature-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        
          <form onSubmit={(e)=>onSubscribe(e)}>
            <div className="form-row">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <label className="form-label">Card Information</label>
              <div className="credit-card-input">
                <input
                  type="text"
                  name="cardNumber"
                  className="form-input"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
                <CreditCard size={20} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)' }} />
              </div>
            </div>
            
            <div className="credit-card-row">
              <div className="form-row">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  className="form-input"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  className="form-input"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="submit-button">
              Subscribe for $4.99/month
            </button>
          </form>
        </div>
      ) : (
        <div className="subscription-form">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Thank You!</h2>
            <p className="success-text">
              Your Basic subscription has been activated. You now have access to all Basic features.
            </p>
            <button className="submit-button" onClick={onSubscribe}>
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basic;