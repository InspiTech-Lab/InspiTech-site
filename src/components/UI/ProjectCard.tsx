import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Project } from "../../types/project";
import { useAppSelector } from "../../hooks/redux";

import { CursorFollowButton } from "../CursorFollowButton";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  // console.log("Rendering ProjectCard for:", project.title);
  return (
    <>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          type: "spring",
          stiffness: 100,
        }}
        whileHover={{
          y: -10,
          rotateX: 5,
          rotateY: 5,
        }}
        className={`
          group relative rounded-2xl overflow-hidden  backdrop-blur-xl border
          ${
            isDarkMode
              ? "bg-slate-900/60 border-cyan-400/20 hover:border-cyan-400/40"
              : "bg-white/60 border-purple-600/20 hover:border-purple-600/40"
          }
          shadow-2xl hover:shadow-3xl transition-all duration-500
          transform-gpu perspective-1000
        `}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow Effect */}
        <div
          className={`
          absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
          ${
            isDarkMode
              ? "bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-pink-400/10"
              : "bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-indigo-600/10"
          }
        `}
        />
        <div
          className="absolute inset-0 rounded-[1rem] p-[2px] animate-[neonBorder_6s_linear_infinite]"
          style={{
            background: "linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {!isImageLoaded && (
            <div
              className={`
              absolute inset-0 flex items-center justify-center
              ${isDarkMode ? "bg-slate-800" : "bg-gray-200"}
            `}
            >
              <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-cyan-400" />
            </div>
          )}

          <img
            src={project.thumbnail}
            alt={project.title}
            className={`
              w-full h-full object-cover transition-all duration-500
              group-hover:scale-110 group-hover:brightness-110
              ${isImageLoaded ? "opacity-100" : "opacity-0"}
            `}
            onLoad={() => setIsImageLoaded(true)}
          />

          {/* Coming Soon Overlay */}
          {!project.isPublished && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <div className="flex items-center gap-2 font-bold text-yellow-400">
                <Clock size={20} />
                <span>Coming Soon</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3
              className={`
              text-xl font-bold leading-tight
              ${isDarkMode ? "text-white" : "text-gray-900"}
            `}
            >
              {project.title}
            </h3>
            {!project.isPublished && (
              <span className="px-2 py-1 text-xs text-yellow-400 rounded-full bg-yellow-400/20">
                Soon
              </span>
            )}
          </div>

          <p
            className={`
            text-sm mb-4 line-clamp-3
            ${isDarkMode ? "text-gray-300" : "text-gray-600"}
          `}
          >
            {project.description}
          </p>

          {/* Action Buttons */}
          {project.isPublished && (
            <div className="flex gap-3">
              {/* <motion.button
                onClick={handleDemo}
                disabled={!project.liveDemo}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg
                  font-medium transition-all duration-300
                  ${
                    isDarkMode
                      ? "bg-cyan-400 text-slate-900 hover:bg-cyan-300"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={16} />
                Live Demo
              </motion.button> */}
              {project.isPublished && (
                <CursorFollowButton label="Live Demo" to={project.title} />
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Demo Modal */}
    </>
  );
}
