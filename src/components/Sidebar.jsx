import React, { useState } from 'react';
import { Users, FileText, Settings, LogOut, Mail, ChevronDown, Calendar, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAppointments } from '../context/AppointmentContext';
import { useAuth } from '../context/AuthContext';
import DoctorsList from './DoctorsList';
import HomeVisitForm from './HomeVisitForm';
import SupportModal from './SupportModal';

function Sidebar({ onDoctorsClick }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const { appointments } = useAppointments();
  const [showAppointments, setShowAppointments] = useState(false);
  const [showHomeVisit, setShowHomeVisit] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Successfully logged out! Thank you for using our service.', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: isDarkMode ? '#1f2937' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000',
        },
      });
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  const settingsOptions = [
    { icon: Mail, label: 'Support', onClick: () => setShowSupport(true) },
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 relative h-screen flex flex-col"
    >
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          CareConnect 
        </h1>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-3 space-y-2 overflow-hidden">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDoctorsClick}
          className="sidebar-link w-full"
        >
          <Users className="h-5 w-5 mr-3 text-primary-500" />
          Doctors
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowHomeVisit(true)}
          className="sidebar-link w-full"
        >
          <Home className="h-5 w-5 mr-3 text-primary-500" />
          Home Visit
        </motion.button>

        {/* Appointments Dropdown */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAppointments(!showAppointments)}
          className="sidebar-link w-full"
        >
          <FileText className="h-5 w-5 mr-3 text-primary-500" />
          Appointments
          <ChevronDown className={`ml-auto h-4 w-4 transform transition-transform ${showAppointments ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {showAppointments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="ml-4 space-y-2 overflow-hidden max-h-40 overflow-y-auto"
            >
              {appointments.length === 0 ? (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">No appointments booked yet</p>
                </motion.div>
              ) : (
                appointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <p className="font-medium text-primary-600 dark:text-primary-400">{appointment.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.date}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.time}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.disease}</p>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Dropdown */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSettings(!showSettings)}
          className="sidebar-link w-full"
        >
          <Settings className="h-5 w-5 mr-3 text-primary-500" />
          Settings
          <ChevronDown className={`ml-auto h-4 w-4 transform transition-transform ${showSettings ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="ml-4 space-y-2 overflow-hidden max-h-40 overflow-y-auto"
            >
              {settingsOptions.map((option) => (
                <motion.button
                  key={option.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={option.onClick}
                  className="flex items-center w-full p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <option.icon className="h-4 w-4 mr-2" />
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Theme toggle and logout */}
      <div className="px-6 pb-6 mt-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleTheme}
          className="flex items-center justify-center w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 mb-4"
        >
          <span className="mr-2">{isDarkMode ? '🌞' : '🌙'}</span>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex items-center justify-center w-full p-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-all duration-200"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </motion.button>
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showHomeVisit && <HomeVisitForm onClose={() => setShowHomeVisit(false)} />}
        {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}
      </AnimatePresence>
    </motion.aside>
  );
}

export default Sidebar;
