import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

interface CursorFollowButtonProps {
  label: string;
  to?: string; // Route path
  className?: string;
}

export function CursorFollowButton({
  label,
  to,
  className,
}: CursorFollowButtonProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detect mobile
  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isMobile) setIsHovering(true); // Always show on mobile
  }, [isMobile]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = () => {
    if (to) navigate(`/project/${to}`);
  };

  return (
    <div
      className={`absolute inset-0 ${className || ""}`}
      onMouseMove={handleMove}
      onMouseEnter={() => !isMobile && setIsHovering(true)}
      onMouseLeave={() => !isMobile && setIsHovering(false)}
      onClick={handleClick} // Click anywhere on the card
    >
      {isHovering && (
        <motion.div
          className="absolute bottom-0 flex items-center justify-center w-full pointer-events-none md:w-fit b md:inset-auto"
          animate={
            isMobile
              ? { x: 0, y: 0 } // Centered on mobile
              : { x: pos.x, y: pos.y } // Follow cursor on desktop
          }
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
        >
          <motion.div
            className="w-full px-2 py-1 text-sm font-medium text-center text-black border rounded-full shadow-lg pointer-events-auto bg-white/10 backdrop-blur-md border-white/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {label}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
