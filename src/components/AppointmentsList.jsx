import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone } from 'lucide-react';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    const loadAppointments = () => {
      const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      
      // Sort appointments by date and time
      storedAppointments.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.timeSlot);
        const dateB = new Date(b.date + ' ' + b.timeSlot);
        return dateA - dateB;
      });

      // Update appointment status based on date
      const now = new Date();
      const updatedAppointments = storedAppointments.map(app => {
        const appointmentDate = new Date(app.date + ' ' + app.timeSlot);
        return {
          ...app,
          status: appointmentDate < now ? 'past' : 'upcoming'
        };
      });

      setAppointments(updatedAppointments);
    };

    loadAppointments();
    const interval = setInterval(loadAppointments, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredAppointments = appointments.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const formatDate = (dateStr) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b">
        <h2 className="text-sm font-semibold">Appointments</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-xs border rounded px-1 py-0.5 bg-transparent"
        >
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredAppointments.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">
            No {filter} appointments
          </p>
        ) : (
          <div className="divide-y">
            {filteredAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-2 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="text-xs font-medium">{appointment.doctorName}</h3>
                    <p className="text-[10px] text-gray-600">{appointment.doctorSpecialization}</p>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    appointment.status === 'upcoming' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-600">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {appointment.patientName}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    {appointment.phoneNumber}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(appointment.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {appointment.timeSlot}
                  </div>
                </div>

                {appointment.disease && (
                  <div className="text-[10px] mt-1 text-gray-600">
                    <span className="font-medium">Reason:</span> {appointment.disease}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList; 