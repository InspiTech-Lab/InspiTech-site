import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function CursorTrail() {
  const trailRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Array<{ x: number; y: number; id: number; timestamp: number }>>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        id: particleId++,
        timestamp: Date.now(),
      });

      // Keep only recent particles
      particles.current = particles.current.filter(
        (particle) => Date.now() - particle.timestamp < 1000
      );
    };

    const animate = () => {
      if (trailRef.current) {
        const now = Date.now();
        const trailElements = particles.current.map((particle, index) => {
          const age = (now - particle.timestamp) / 1000;
          const opacity = Math.max(0, 1 - age);
          const size = Math.max(2, 8 * (1 - age));
          
          return `
            <div
              key="${particle.id}"
              style="
                position: fixed;
                left: ${particle.x}px;
                top: ${particle.y}px;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(6, 182, 212, ${opacity}) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 ${size * 2}px rgba(6, 182, 212, ${opacity * 0.5});
              "
            ></div>
          `;
        }).join('');

        trailRef.current.innerHTML = trailElements;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <div ref={trailRef} className="fixed inset-0 pointer-events-none z-50" />;
}