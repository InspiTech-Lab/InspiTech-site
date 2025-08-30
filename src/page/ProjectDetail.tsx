import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector } from "../hooks/redux";
import { DownloadButton } from "../components/DownloadButton";

export function ProjectDetail() {
  const { title } = useParams<{ title?: string }>();
  const navigate = useNavigate();
  const { projects } = useAppSelector((state) => state.projects);
  const [isLoading, setIsLoading] = useState(true);

  // Find project by title (case-insensitive)
  const project = projects.find(
    (p) => p?.title.toLowerCase() === title?.toLowerCase()
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="
          relative w-full h-full max-w-7xl min-w-[60%] max-h-[95vh]
          rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.5)]
        "
      >
        {/* Neon Border Layer */}
        <div
          className="absolute inset-0 rounded-2xl p-[2px] animate-[neon_6s_linear_infinite]"
          style={{
            background: "linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col w-full h-full overflow-hidden rounded-2xl bg-slate-950">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-slate-900/80 border-white/10">
            <h3 className="font-semibold text-white">
              {project?.title} - Live Demo
            </h3>

            <div className="flex items-center gap-2">
              {/* Download Button placed here */}
              {project?.zipUrl && (
                <DownloadButton
                  zipUrl={project?.zipUrl}
                  fileName={project?.title}
                />
              )}

              <motion.button
                onClick={() => navigate("/")}
                className="px-4 py-2 text-sm font-semibold text-white transition-all duration-500 rounded-lg shadow-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                ✖ Close
              </motion.button>
            </div>
          </div>

          {/* Iframe with Loader */}
          <div className="relative flex-1">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                <motion.div
                  className="w-10 h-10 border-4 border-purple-500 rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
              </div>
            )}
            {project?.liveDemo && (
              <iframe
                src={project?.liveDemo}
                className="flex-1 w-full h-full rounded-b-2xl"
                title={`${project.title} Demo`}
                onLoad={() => setIsLoading(false)}
              />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
