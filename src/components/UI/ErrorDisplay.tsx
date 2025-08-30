import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProjects, clearError } from '../../store/projectsSlice';

interface ErrorDisplayProps {
  error: string;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchProjects());
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <div className={`
        max-w-md p-8 rounded-2xl text-center backdrop-blur-xl border
        ${isDarkMode 
          ? 'bg-red-900/20 border-red-400/20' 
          : 'bg-red-50/60 border-red-300/20'
        }
      `}>
        <AlertCircle 
          className={`mx-auto mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} 
          size={48} 
        />
        
        <h3 className={`
          text-lg font-semibold mb-2
          ${isDarkMode ? 'text-red-400' : 'text-red-600'}
        `}>
          Something went wrong
        </h3>
        
        <p className={`
          text-sm mb-6
          ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
        `}>
          {error}
        </p>

        <motion.button
          onClick={handleRetry}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-medium
            transition-all duration-300 mx-auto
            ${isDarkMode 
              ? 'bg-red-400 text-slate-900 hover:bg-red-300' 
              : 'bg-red-600 text-white hover:bg-red-700'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw size={16} />
          Try Again
        </motion.button>
      </div>
    </motion.div>
  );
}