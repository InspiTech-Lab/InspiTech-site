import { motion } from "framer-motion";

function MobilePrompt({ onConfirm }) {
  const handleSwitch = () => {
    const viewport = document.querySelector("meta[name=viewport]");
    if (viewport) viewport.setAttribute("content", "width=1024");
    onConfirm();
  };


  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex flex-col items-center w-full max-w-sm gap-4 p-6 text-white shadow-xl sm:max-w-md bg-gradient-to-r from-purple-600 to-indigo-500 rounded-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        }}
        exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
      >
        <h2 className="text-xl font-bold text-center sm:text-2xl">
          Desktop Mode Required
        </h2>
        <p className="text-sm text-center sm:text-base">
          For the best experience, please switch to desktop mode.
        </p>
        <div className="flex gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSwitch}
            className="px-4 py-2 font-semibold text-purple-600 bg-white shadow-md rounded-xl hover:bg-white/90"
          >
            Switch to Desktop
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MobilePrompt;
