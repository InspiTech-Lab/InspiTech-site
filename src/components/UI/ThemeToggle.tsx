import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleTheme } from '../../store/themeSlice';

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const { isDarkMode, isTransitioning } = useAppSelector((state) => state.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
    setTimeout(() => {
      document.documentElement.classList.toggle('dark');
    }, 150);
  };

  return (
    <motion.button
      onClick={handleToggle}
      disabled={isTransitioning}
      className={`
        fixed top-6 right-6 z-50 p-3 rounded-full
        ${isDarkMode 
          ? 'bg-slate-800/80 text-cyan-400 hover:bg-slate-700/80' 
          : 'bg-white/80 text-purple-600 hover:bg-gray-100/80'
        }
        backdrop-blur-md border transition-all duration-300
        ${isDarkMode ? 'border-cyan-400/20' : 'border-purple-600/20'}
        shadow-lg hover:shadow-xl
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
    </motion.button>
  );
}