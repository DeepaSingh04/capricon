import React, { useState } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, eachDayOfInterval, subMonths, addMonths } from 'date-fns';
import { useAppointments } from '../context/AppointmentContext';
import { ChevronLeft, ChevronRight, Trash2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import './calander.css';

function Calendar({ onDateSelect }) {
  const { appointments, deleteAppointment } = useAppointments();
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

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

  return (
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
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button 
              onClick={goToNextMonth}
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
                      onClick={() => {
                        if (slotStatus.status === 'available') {
                          onDateSelect(new Date(currentSlotDate.setHours(hour)));
                        } else if (slotStatus.status === 'booked') {
                          toast.error('This slot is already booked');
                        }
                      }}
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
                              <Clock className="h-3 w-3" />
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
  );
}

export default Calendar;