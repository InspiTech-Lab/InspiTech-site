import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface LiveDemoCursorOverlayProps {
  onClick: () => void;
  isDarkMode?: boolean;
  disabled?: boolean;
}

export function LiveDemoCursorOverlay({ onClick, isDarkMode, disabled }: LiveDemoCursorOverlayProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-2xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Blur BG on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 backdrop-blur-md bg-black/40"
      />

      {/* Cursor-follow Button */}
      {isHovering && !disabled && (
        <motion.div
          className="absolute pointer-events-none"
          animate={{ x: pos.x - 50, y: pos.y - 20 }} // cursor ke sath chalega
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-lg pointer-events-auto
              ${isDarkMode
                ? "bg-cyan-400 text-slate-900 hover:bg-cyan-300"
                : "bg-purple-600 text-white hover:bg-purple-700"}
            `}
          >
            <ExternalLink size={18} />
            Live Demo
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
