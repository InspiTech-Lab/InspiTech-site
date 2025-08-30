import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../hooks/redux";
import { ProjectCard } from "./UI/ProjectCard";
import { LoadingSpinner } from "./UI/LoadingSpinner";
import { ErrorDisplay } from "./UI/ErrorDisplay";

// tsparticles
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

export function ProjectGrid() {
  const { filteredProjects, loading, error, currentPage, itemsPerPage } =
    useAppSelector((state) => state.projects);

  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // load slim version for performance
    }).then(() => {
      setInit(true);
    });
  }, []);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  if (filteredProjects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <h3 className="mb-2 text-xl font-semibold text-gray-400">
            No projects found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* Particle Background */}
      {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 -z-10"
          options={{
            background: {
              color: {
                value: "#0f172a", // tailwind slate-900
              },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
              },
            },
            particles: {
              color: { value: "#38bdf8" }, // cyan-400
              links: {
                enable: true,
                color: "#38bdf8",
                distance: 120,
                opacity: 0.4,
              },
              move: { enable: true, speed: 1 },
              number: { value: 60, density: { enable: true,  } },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 4 } },
            },
            detectRetina: true,
          }}
        />
      )}

      {/* Projects Grid */}
      <motion.div
        className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {paginatedProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </div>
  );
}
