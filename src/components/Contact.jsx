import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Need help? Call our customer care team
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          24/7 Customer Care
        </h2>
        
        <a 
          href="tel:+15551234567" 
          className="text-3xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          +1 (555) 123-4567
        </a>
        
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Available round the clock for your assistance
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Contact; 