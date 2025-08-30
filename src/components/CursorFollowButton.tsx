import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CursorFollowButtonProps {
  label: string;
  to?: string; // Route path
}

export function CursorFollowButton({ label, to }: CursorFollowButtonProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="absolute inset-0"
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <motion.div
          className="absolute pointer-events-none"
          animate={{ x: pos.x, y: pos.y }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
        >
          {to ? (
            <Link
              to={`/project/${to}`}
              className="flex items-center justify-center pointer-events-auto"
            >
              <motion.div
                className="px-2 py-1 text-sm font-medium text-white border rounded-full shadow-lg bg-white/10 backdrop-blur-md border-white/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                {label}
              </motion.div>
            </Link>
          ) : (
            <motion.div
              className="px-2 py-1 text-sm font-medium text-white border rounded-full shadow-lg bg-white/10 backdrop-blur-md border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {label}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
