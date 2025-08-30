import React from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux";
import { SearchBar } from "./SearchBar";

export function Header() {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-40 w-full"
    >
      <div
        className={`backdrop-blur-xl border-b 
        ${isDarkMode
          ? "bg-slate-900/70 border-cyan-400/20"
          : "bg-white/70 border-purple-600/20"}
        `}
      >
        <div className="flex flex-col items-center justify-between gap-3 px-4 py-3 mx-auto sm:flex-row sm:px-6 sm:py-4 max-w-7xl">
          
          {/* Logo / Title */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center gap-2"
          >
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight 
              bg-clip-text text-transparent 
              ${isDarkMode
                ? "bg-gradient-to-r from-cyan-400 to-purple-600"
                : "bg-gradient-to-r from-purple-600 to-blue-600"}
              `}
            >
              Inspitech Lab
            </motion.h1>
          </motion.div>

          {/* Search Bar */}
          <div className="w-full sm:w-72 md:w-96">
            <SearchBar />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
