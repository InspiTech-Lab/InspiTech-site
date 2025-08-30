// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";

// interface DemoModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   demoUrl: string;
// }

// export function DemoModal({ isOpen, onClose, title, demoUrl }: DemoModalProps) {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 120, damping: 20 }}
//             className="
//               relative w-full h-full max-w-7xl min-w-[60%] max-h-[95vh]
//               rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.5)]
//             "
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Neon Border Layer */}
//             <div className="absolute inset-0 rounded-2xl p-[2px] animate-[neon_6s_linear_infinite]"
//               style={{
//                 background: "linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)",
//                 WebkitMask:
//                   "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
//                 WebkitMaskComposite: "xor",
//                 maskComposite: "exclude",
//               }}
//             />

//             {/* Content */}
//             <div className="relative flex flex-col w-full h-full overflow-hidden rounded-2xl bg-slate-950">
//               {/* Header */}
//               <div className="flex items-center justify-between px-4 py-2 border-b bg-slate-900/80 border-white/10">
//                 <h3 className="font-semibold text-white">{title} - Live Demo</h3>
//                 <button
//                   onClick={onClose}
//                   className="px-3 py-1 text-white transition rounded-lg bg-white/10 hover:bg-white/20"
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* Iframe */}
//               <iframe
//                 src={demoUrl}
//                 className="flex-1 w-full rounded-b-2xl"
//                 title={`${title} Demo`}
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
