import React, { createContext, useState, useEffect } from 'react';

// Create the context with default values
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  // Try to load from localStorage, fallback to empty string
  const [email, setEmail] = useState(() => localStorage.getItem('email') || '');
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');
  const [plan, setPlan] = useState(() => localStorage.getItem('plan') || '');

  // Save to localStorage whenever these change
  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);
  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);
  useEffect(() => {
    localStorage.setItem('plan', plan);
  }, [plan]);

  return (
    <UserContext.Provider value={{ userName, setUserName, email, setEmail, plan, setPlan }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };