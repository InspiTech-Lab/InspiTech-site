import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCurrentPage } from '../../store/projectsSlice';

export function Pagination() {
  const dispatch = useAppDispatch();
  const { currentPage, itemsPerPage, totalProjects } = useAppSelector((state) => state.projects);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const totalPages = Math.ceil(totalProjects / itemsPerPage);
  
  if (totalPages <= 1) return null;

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center gap-2 mt-12"
    >
      {/* Previous Button */}
      <motion.button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          p-2 rounded-lg transition-all duration-300
          ${currentPage === 1 
            ? 'opacity-50 cursor-not-allowed' 
            : isDarkMode 
              ? 'hover:bg-slate-800/50 text-cyan-400' 
              : 'hover:bg-purple-100/50 text-purple-600'
          }
        `}
        whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
      >
        <ChevronLeft size={20} />
      </motion.button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <motion.button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-300
            ${page === currentPage
              ? isDarkMode 
                ? 'bg-cyan-400 text-slate-900' 
                : 'bg-purple-600 text-white'
              : isDarkMode 
                ? 'text-gray-300 hover:bg-slate-800/50' 
                : 'text-gray-700 hover:bg-purple-100/50'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {page}
        </motion.button>
      ))}

      {/* Next Button */}
      <motion.button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          p-2 rounded-lg transition-all duration-300
          ${currentPage === totalPages 
            ? 'opacity-50 cursor-not-allowed' 
            : isDarkMode 
              ? 'hover:bg-slate-800/50 text-cyan-400' 
              : 'hover:bg-purple-100/50 text-purple-600'
          }
        `}
        whileHover={currentPage !== totalPages ? { scale: 1.1 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
      >
        <ChevronRight size={20} />
      </motion.button>
    </motion.div>
  );
}