import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { SupportProvider } from './context/SupportContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';
import { Toaster } from 'react-hot-toast';
import DoctorsList from './components/DoctorsList';
import { AnimatePresence } from 'framer-motion';
import Auth from './components/Auth';

function MainApp() {
  const [showDoctors, setShowDoctors] = useState(false);
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Auth />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar onDoctorsClick={() => setShowDoctors(true)} />
      <main className="flex-1 overflow-auto">
        <Calendar />
      </main>
      {showDoctors && <DoctorsList onClose={() => setShowDoctors(false)} />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppointmentProvider>
          <SupportProvider>
            <MainApp />
            <Toaster position="top-center" />
          </SupportProvider>
        </AppointmentProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;