import React from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';
import AppointmentModal from './components/AppointmentModal';
import DatePicker from './components/DatePicker';
import DoctorsList from './components/DoctorsList';
import { AppointmentProvider } from './context/AppointmentContext';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [isDoctorsListOpen, setIsDoctorsListOpen] = React.useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
    setIsModalOpen(true);
  };

  return (
    <ThemeProvider>
      <AppointmentProvider>
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Sidebar component */}
          <Sidebar 
            onDoctorsClick={() => setIsDoctorsListOpen(true)}
            onDatePickerClick={() => setIsDatePickerOpen(true)}
          />
          
          {/* Main content area */}
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <Calendar 
                onDateSelect={(date) => {
                  setSelectedDate(date);
                  setIsModalOpen(true);
                }}
              />
            </div>
          </main>

          {/* Modals */}
          <AnimatePresence>
            {isModalOpen && (
              <AppointmentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDate={selectedDate}
              />
            )}

            {isDatePickerOpen && (
              <DatePicker
                selectedDate={selectedDate}
                onSelect={handleDateSelect}
                onClose={() => setIsDatePickerOpen(false)}
              />
            )}

            {isDoctorsListOpen && (
              <DoctorsList
                onClose={() => setIsDoctorsListOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
        <Toaster />
      </AppointmentProvider>
    </ThemeProvider>
  );
}

export default App;