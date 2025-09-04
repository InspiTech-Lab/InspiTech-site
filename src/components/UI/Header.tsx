import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux";
import { SearchBar } from "./SearchBar";
import AdminForm from "../AdminForm";

export function Header() {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePasswordSubmit = () => {
    setOtp(["", "", "", ""]);
    if (otp.join("") === "2401") {
      setShowPasswordModal(false);
      setShowForm(true);
    } else {
      alert("Wrong password");
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-40 w-full"
    >
      <div
        className={`backdrop-blur-xl  
        ${
          isDarkMode
            ? "from-slate-900 via-slate-800 to-slate-900"
            : "bg-white/70 border-purple-600/20"
        }`}
      >
        <div className="flex flex-col items-center justify-between mx-auto sm:flex-row sm:px-6 sm:py-4 max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight 
              bg-clip-text text-transparent 
              ${
                isDarkMode
                  ? "bg-gradient-to-r from-cyan-400 to-purple-600"
                  : "bg-gradient-to-r from-purple-600 to-blue-600"
              }
              `}
          >
            Inspitech{" "}
            <span onClick={() => setShowPasswordModal(true)}>Lab</span>
          </motion.h1>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="w-full sm:w-72 md:w-96">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl space-y-6 w-[90%] sm:w-[400px]">
            <h2 className="text-lg font-bold text-center">
              Enter Admin Password
            </h2>
            <div className="flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 text-xl font-bold text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setOtp(["", "", "", ""]);
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Form */}
      {showForm && <AdminForm onClose={() => setShowForm(false)} />}
    </motion.header>
  );
}
