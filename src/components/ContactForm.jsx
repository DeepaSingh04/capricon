import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function ContactFormModal({ onClose }) {
  const [formData, setFormData] = useState({
    userName: "",
    doctorName: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.userName) newErrors.userName = "Name is required!";
    if (!formData.doctorName) newErrors.doctorName = "Doctor's Name is required!";
    if (!formData.feedback) newErrors.feedback = "Feedback is required!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    toast.success("Feedback submitted successfully!");
    
    // Clear form after submission
    setFormData({ userName: "", doctorName: "", feedback: "" });

    // Close the modal after submission
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <motion.div 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: -50, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Contact Us
        </h2>
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-600 dark:text-gray-300 text-xl">
          ✖
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Your Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your name"
            />
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
          </div>

          {/* Doctor Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Doctor's Name</label>
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter doctor’s name"
            />
            {errors.doctorName && <p className="text-red-500 text-sm">{errors.doctorName}</p>}
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Your Feedback</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows="4"
              className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Write your feedback here..."
            />
            {errors.feedback && <p className="text-red-500 text-sm">{errors.feedback}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ContactFormModal;
