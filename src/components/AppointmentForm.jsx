import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import toast from 'react-hot-toast';

const AppointmentForm = ({ doctor, onClose }) => {
  const { addAppointment, appointments } = useAppointments();
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    disease: '',
    notes: '',
    date: doctor.selectedDate || new Date().toISOString().split('T')[0],
    timeSlot: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [error, setError] = useState('');

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "02:00 PM",
    "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
    "04:30 PM", "05:00 PM"
  ];

  useEffect(() => {
    // Load booked appointments from localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const bookedSlotsForDate = appointments
      .filter(apt => apt.date === formData.date && apt.doctorId === doctor.id)
      .map(apt => apt.timeSlot);
    setBookedSlots(bookedSlotsForDate);

    // Filter out booked slots from available slots
    const available = timeSlots.filter(slot => !bookedSlotsForDate.includes(slot));
    setAvailableSlots(available);
  }, [formData.date, doctor.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'date') {
      // Reset time slot when date changes
      setFormData(prev => ({
        ...prev,
        timeSlot: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.patientName || !formData.phoneNumber || !formData.date || !formData.timeSlot) {
      setError('Please fill in all required fields');
      return;
    }

    // Check if slot is already booked
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const isSlotBooked = appointments.some(
      app => 
        app.doctorId === doctor.id && 
        app.date === formData.date && 
        app.timeSlot === formData.timeSlot
    );

    if (isSlotBooked) {
      setError('This time slot is already booked. Please select another.');
      return;
    }

    // Create new appointment
    const newAppointment = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      ...formData,
      status: 'upcoming'
    };

    // Get existing appointments
    const updatedAppointments = [...appointments, newAppointment];
    
    // Save to localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Close the form
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-[90%] max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Book Appointment</h2>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700">{doctor.name}</h3>
            <p className="text-xs text-gray-600">{doctor.specialization}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="text-red-500 text-xs mb-2">{error}</div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disease/Reason
              </label>
              <input
                type="text"
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                required
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Slot
              </label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                required
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a time slot</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="2"
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AppointmentForm; 