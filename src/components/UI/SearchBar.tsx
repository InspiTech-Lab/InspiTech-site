import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSearchQuery } from "../../store/projectsSlice";

export function SearchBar() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.projects);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full px-3 mx-auto sm:max-w-md md:max-w-lg lg:max-w-2xl"
    >
      <div className="relative">
        {/* Search Icon */}
        <Search
          className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
          size={18}
        />

        {/* Input with background */}
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="
            w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-lg
            text-sm sm:text-base
            border border-purple-400/40
            bg-gradient-to-r from-purple-600/10 via-blue-500/10 to-cyan-400/10
            backdrop-blur-sm
            focus:border-purple-500 focus:ring-1 focus:ring-purple-500
            transition
          "
        />
      </div>
    </motion.div>
  );
}
