import React, { createContext, useContext, useState, useEffect } from 'react';

const SupportContext = createContext();

export function SupportProvider({ children }) {
  const [supportHistory, setSupportHistory] = useState([]);

  // Load support history from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem('supportHistory');
    if (savedHistory) {
      setSupportHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save support history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('supportHistory', JSON.stringify(supportHistory));
  }, [supportHistory]);

  const addSupportInteraction = (interaction) => {
    setSupportHistory(prev => [...prev, {
      ...interaction,
      id: Date.now(),
      timestamp: new Date().toISOString()
    }]);
  };

  const clearSupportHistory = () => {
    setSupportHistory([]);
    localStorage.removeItem('supportHistory');
  };

  return (
    <SupportContext.Provider value={{ supportHistory, addSupportInteraction, clearSupportHistory }}>
      {children}
    </SupportContext.Provider>
  );
}

export function useSupport() {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error('useSupport must be used within a SupportProvider');
  }
  return context;
} 