import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const initialAppointments = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    date: "2024-03-15",
    hour: 9,
    email: "sarah.j@example.com",
    phone: "123-456-7890",
    notes: "Regular checkup",
    doctor: "Dr. Michael Smith",
    status: "confirmed"
  },
  {
    id: 2,
    patientName: "James Wilson",
    date: "2024-03-15",
    hour: 14,
    email: "james.w@example.com",
    phone: "123-456-7891",
    notes: "Follow-up appointment",
    doctor: "Dr. Emily Brown",
    status: "pending"
  }
];

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [records] = useState([
    {
      id: 1,
      patientName: "Sarah Johnson",
      date: "2024-02-15",
      diagnosis: "Common cold",
      prescription: "Antibiotics",
      nextVisit: "2024-03-15",
      doctor: "Dr. Michael Smith"
    },
    {
      id: 2,
      patientName: "James Wilson",
      date: "2024-02-20",
      diagnosis: "Allergies",
      prescription: "Antihistamines",
      nextVisit: "2024-03-20",
      doctor: "Dr. Emily Brown"
    }
  ]);

  const isSlotBooked = (date, hour) => {
    return appointments.some(apt => 
      apt.date === date && 
      apt.hour === hour && 
      apt.status !== 'cancelled'
    );
  };

  const addAppointment = (appointment) => {
    if (isSlotBooked(appointment.date, appointment.hour)) {
      toast.error('This slot is already booked. Please select another time.');
      return false;
    }

    const newAppointment = {
      ...appointment,
      id: appointments.length + 1,
      status: 'pending'
    };
    setAppointments([...appointments, newAppointment]);
    toast.success('Appointment booked successfully!');
    return true;
  };

  const deleteAppointment = (appointmentId) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (!appointment) {
      toast.error('Appointment not found');
      return;
    }

    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'cancelled' }
        : apt
    ));
    toast.success('Appointment cancelled successfully');
  };

  const updateAppointment = (appointmentId, updatedData) => {
    if (updatedData.date && updatedData.hour) {
      if (isSlotBooked(updatedData.date, updatedData.hour)) {
        toast.error('This slot is already booked. Please select another time.');
        return false;
      }
    }

    setAppointments(
      appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, ...updatedData } : apt
      )
    );
    toast.success('Appointment updated successfully');
    return true;
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        records,
        addAppointment,
        deleteAppointment,
        updateAppointment,
        isSlotBooked
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
}