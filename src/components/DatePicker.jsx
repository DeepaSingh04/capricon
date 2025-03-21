import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, getYear, setYear, getMonth, setMonth } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import 'react-day-picker/dist/style.css';

function DatePicker({ selectedDate, onSelect, onClose }) {
  const [month, setCurrentMonth] = useState(selectedDate || new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const currentYear = getYear(month);
  const currentMonth = format(month, 'MMMM');

  // Generate years array (10 years before and after current year)
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  
  // Generate months array
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleYearChange = (year) => {
    setCurrentMonth(setYear(month, year));
    setShowYearPicker(false);
  };

  const handleMonthChange = (monthIndex) => {
    setCurrentMonth(setMonth(month, monthIndex));
    setShowMonthPicker(false);
  };

  const footer = selectedDate ? (
    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
      Selected: {format(selectedDate, 'EEEE, MMMM do, yyyy')}
    </p>
  ) : (
    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
      Please select a date
    </p>
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
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 relative"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Select Date</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Month and Year Selectors */}
        <div className="flex justify-center gap-2 mb-4">
          <div className="relative">
            <button
              onClick={() => {
                setShowMonthPicker(!showMonthPicker);
                setShowYearPicker(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {currentMonth}
              <ChevronDown className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {showMonthPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-1 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto"
                >
                  {months.map((monthName, index) => (
                    <button
                      key={monthName}
                      onClick={() => handleMonthChange(index)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                        monthName === currentMonth ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' : ''
                      }`}
                    >
                      {monthName}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowYearPicker(!showYearPicker);
                setShowMonthPicker(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {currentYear}
              <ChevronDown className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {showYearPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-1 w-32 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto"
                >
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => handleYearChange(year)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                        year === currentYear ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' : ''
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={onSelect}
          month={month}
          onMonthChange={setCurrentMonth}
          footer={footer}
          className="rdp-custom dark:bg-gray-800 dark:text-white"
          classNames={{
            day_selected: "bg-indigo-600 text-white hover:bg-indigo-700",
            day_today: "font-bold text-indigo-600 dark:text-indigo-400",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default DatePicker;