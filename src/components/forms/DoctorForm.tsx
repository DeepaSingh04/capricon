import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Star, Phone, Mail } from 'lucide-react';

interface DoctorFormProps {
  onClose: () => void;
  doctorName?: string;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ onClose, doctorName = "Dr. Michael Smith" }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    disease: '',
    detailedSymptoms: '',
    phone: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded shadow-xl w-[280px]"
      >
        <div className="py-1 px-2 border-b border-gray-200">
          <p className="text-[10px] text-gray-600">{doctorName}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-2 space-y-1">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-0.5 px-1 text-[10px] border rounded"
              required
            />
          </div>

          <div>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full py-0.5 px-1 text-[10px] border rounded"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="disease"
              placeholder="Disease/Symptoms"
              value={formData.disease}
              onChange={handleChange}
              className="w-full py-0.5 px-1 text-[10px] border rounded"
              required
            />
          </div>

          <div>
            <textarea
              name="detailedSymptoms"
              placeholder="Detailed Symptoms"
              value={formData.detailedSymptoms}
              onChange={handleChange}
              rows={1}
              className="w-full py-0.5 px-1 text-[10px] border rounded resize-none"
              required
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full py-0.5 px-1 text-[10px] border rounded"
              required
            />
          </div>

          <div className="flex gap-1">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-1/2 py-0.5 px-1 text-[10px] border rounded"
              required
            />
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-1/2 py-0.5 px-1 text-[10px] border rounded"
              required
            >
              <option value="">Select time</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="16:00">04:00 PM</option>
              <option value="17:00">05:00 PM</option>
            </select>
          </div>

          <div className="flex justify-end gap-1">
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-0.5 text-[9px] border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-0.5 text-[9px] bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default DoctorForm; 