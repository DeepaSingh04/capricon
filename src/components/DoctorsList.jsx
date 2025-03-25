import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, IndianRupee, Star, Phone, Mail, Calendar } from 'lucide-react';
import AppointmentForm from './AppointmentForm';

const doctors = [
  {
    id: 1,
    name: "Dr. Michael Smith",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=top",
    specialization: "Cardiologist",
    qualification: "MD, FACC",
    experience: "15 years",
    rating: 4.8,
    availability: "Mon-Fri",
  },
  {
    id: 2,
    name: "Dr. Emily Brown",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=top",
    specialization: "Neurologist",
    qualification: "MD, PhD",
    experience: "12 years",
    rating: 4.9,
    availability: "Mon-Sat",
  },
  {
    id: 3,
    name: "Dr. David Wilson",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=top",
    specialization: "Pediatrician",
    qualification: "MBBS, MD",
    experience: "10 years",
    rating: 4.7,
    availability: "Tue-Sat",
  },
  {
    id: 4,
    name: "Dr. Sarah Chen",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=top",
    specialization: "Dermatologist",
    qualification: "MD, FAAD",
    experience: "8 years",
    rating: 4.9,
    availability: "Mon-Fri",
  },
  {
    id: 5,
    name: "Dr. James Anderson",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=500&fit=crop&crop=top",
    specialization: "Orthopedic Surgeon",
    qualification: "MD, FACS",
    experience: "18 years",
    rating: 4.8,
    availability: "Mon-Thu",
  },
  {
    id: 6,
    name: "Dr. Lisa Patel",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop&crop=top",
    specialization: "Psychiatrist",
    qualification: "MD, PhD",
    experience: "14 years",
    rating: 4.9,
    availability: "Mon-Sat",
  },
  {
    id: 7,
    name: "Dr. Robert Taylor",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=500&fit=crop&crop=top",
    specialization: "Ophthalmologist",
    qualification: "MD, FACS",
    experience: "16 years",
    rating: 4.7,
    availability: "Mon-Fri",
  },
  {
    id: 8,
    name: "Dr. Maria Garcia",
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=500&fit=crop&crop=top",
    specialization: "Endocrinologist",
    qualification: "MD, PhD",
    experience: "11 years",
    rating: 4.8,
    availability: "Mon-Fri",
  },
  {
    id: 9,
    name: "Dr. Thomas Lee",
    image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=400&h=500&fit=crop&crop=top",
    specialization: "ENT Specialist",
    qualification: "MD, FACS",
    experience: "13 years",
    rating: 4.6,
    availability: "Mon-Sat",
  }
];

function DoctorsList({ onClose, selectedDate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor({
      ...doctor,
      selectedDate: selectedDate
    });
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Available Doctors</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                <p className="text-primary-600 dark:text-primary-400">{doctor.specialization}</p>
                <div className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>Qualification: {doctor.qualification}</p>
                  <p>Experience: {doctor.experience}</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{doctor.rating}</span>
                  </div>
                  <p className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {doctor.availability}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBookAppointment(doctor)}
                  className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Book Appointment
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedDoctor && (
          <AppointmentForm
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default DoctorsList;