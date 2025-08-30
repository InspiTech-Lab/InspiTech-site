import React from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../hooks/redux';

export function LoadingSpinner() {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer Ring */}
        <motion.div
          className={`
            w-16 h-16 rounded-full border-4 border-transparent
            ${isDarkMode ? 'border-t-cyan-400' : 'border-t-purple-600'}
          `}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Ring */}
        <motion.div
          className={`
            absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-transparent
            ${isDarkMode ? 'border-r-pink-400' : 'border-r-blue-600'}
          `}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Dot */}
        <div className={`
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-2 h-2 rounded-full
          ${isDarkMode ? 'bg-cyan-400' : 'bg-purple-600'}
        `} />
      </motion.div>
    </div>
  );
}