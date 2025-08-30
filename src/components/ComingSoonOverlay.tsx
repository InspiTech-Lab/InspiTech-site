import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function ComingSoonOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex items-center gap-3 px-6 py-4 shadow-lg rounded-xl "
      >
        {/* Icon subtle pulse */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Clock size={24} className="text-white/80" />
        </motion.div>

        {/* Elegant text */}
        <motion.span
          className="text-xl font-semibold tracking-wide text-white/90"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Coming Soon
        </motion.span>
      </motion.div>
    </div>
  );
}
