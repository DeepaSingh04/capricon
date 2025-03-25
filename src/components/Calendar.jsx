import React, { useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, eachDayOfInterval, subMonths, addMonths } from 'date-fns';
import { useAppointments } from '../context/AppointmentContext';
import { ChevronLeft, ChevronRight, Trash2, Clock, Calendar as CalendarIcon, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import './calander.css';
import DoctorsList from './DoctorsList';

function Calendar({ onDateSelect }) {
  const { appointments, deleteAppointment, addAppointment } = useAppointments();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showDoctorsList, setShowDoctorsList] = useState(false);
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDeleteAppointment = (e, appointmentId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      deleteAppointment(appointmentId);
    }
  };

  const getSlotStatus = (date, hour) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const appointment = appointments.find(
      apt => apt.date === formattedDate && 
            apt.hour === hour && 
            apt.status !== 'cancelled'
    );

    if (appointment) {
      return {
        status: 'booked',
        appointment
      };
    }

    return {
      status: 'available'
    };
  };

  const handleSlotClick = (date, hour) => {
    const slotStatus = getSlotStatus(date, hour);
    
    if (slotStatus.status === 'available') {
      setSelectedSlot({ date, hour });
      setShowBookingPopup(true);
    } else if (slotStatus.status === 'booked') {
      toast.error('This slot is already booked');
    }
  };

  const handleBookAppointment = () => {
    setShowBookingPopup(false);
    setShowDoctorsList(true);
    
    // Create a date object with the selected date and time
    const selectedDateTime = new Date(selectedSlot.date);
    selectedDateTime.setHours(selectedSlot.hour);
    
    // Format the date as YYYY-MM-DD
    const formattedDate = format(selectedDateTime, 'yyyy-MM-dd');
    
    // Call onDateSelect with the formatted date
    onDateSelect(formattedDate);
  };

  const handleDoctorSelect = (doctor) => {
    // Create a new appointment
    const newAppointment = {
      id: Date.now(),
      date: format(selectedSlot.date, 'yyyy-MM-dd'),
      hour: selectedSlot.hour,
      doctor: doctor,
      status: 'confirmed'
    };

    // Add the appointment
    addAppointment(newAppointment);
    
    // Close the doctors list
    setShowDoctorsList(false);
    
    // Show success message
    toast.success('Appointment booked successfully!');
  };

  const handleCloseDoctorsList = () => {
    setShowDoctorsList(false);
    setSelectedSlot(null); // Reset the selected slot
    setShowBookingPopup(false); // Also close the booking popup if it's open
  };

  const renderBookingPopup = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
      >
        <h3 className="text-xl font-semibold mb-4">Book Appointment</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Would you like to proceed with booking an appointment for this time slot?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowBookingPopup(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleBookAppointment}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Book Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        {/* Calendar header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <button 
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Week days header */}
            <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
              <div className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Time</div>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
                  {format(addDays(startDate, i), 'EEE')}
                </div>
              ))}
            </div>

            {/* Time slots */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {timeSlots.map((hour) => (
                <div key={hour} className="grid grid-cols-8">
                  <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date().setHours(hour), 'ha')}
                  </div>
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const currentSlotDate = addDays(startDate, dayIndex);
                    const slotStatus = getSlotStatus(currentSlotDate, hour);

                    return (
                      <motion.div
                        key={dayIndex}
                        className={`p-4 relative hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer`}
                        onClick={() => handleSlotClick(currentSlotDate, hour)}
                      >
                        <AnimatePresence>
                          {slotStatus.status === 'booked' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute inset-2 bg-red-100 dark:bg-red-900/30 rounded-lg p-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-red-700 dark:text-red-300">
                                  Booked
                                </span>
                                <button
                                  onClick={(e) => handleDeleteAppointment(e, slotStatus.appointment.id)}
                                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </motion.div>
                          )}
                          {slotStatus.status === 'available' && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-2 border-2 border-dashed border-green-200 dark:border-green-800 rounded-lg flex items-center justify-center"
                            >
                              <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                                <UserPlus className="h-3 w-3" />
                                <span className="text-xs">Available</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showBookingPopup && renderBookingPopup()}
        {showDoctorsList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Select a Doctor</h3>
                <button
                  onClick={handleCloseDoctorsList}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  ✕
                </button>
              </div>
              <DoctorsList onDoctorSelect={handleDoctorSelect} onClose={handleCloseDoctorsList} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Calendar;