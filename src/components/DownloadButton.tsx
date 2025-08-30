import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  zipUrl?: string;
  fileName?: string;
  isDarkMode?: boolean;
}

export function DownloadButton({
  zipUrl,
  fileName = "project",
  isDarkMode,
}: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);

  // Extract file ID from Google Drive URL
  const fileId = zipUrl?.match(/[-\w]{25,}/)?.[0];

  const zipUrls = fileId
    ? `https://drive.google.com/uc?export=download&id=${fileId}`
    : undefined;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const handleDownload = async () => {
    if (!zipUrl) return;
    setDownloading(true);

    try {
      if (isMobile) {
        // Fetch file as blob
        const response = await fetch(zipUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const blob = await response.blob();

        // Create temporary link to trigger download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke object URL after download
        URL.revokeObjectURL(link.href);
      } else {
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = zipUrls;
          link.download = `${fileName}.zip`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setDownloading(false);
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      alert("Download failed. Check your internet or file permissions.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      disabled={!zipUrl || downloading}
      className={`
        relative flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg
        font-medium transition-all duration-300 border overflow-hidden
        ${
          isDarkMode
            ? "border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/10"
            : "border-purple-600/20 text-purple-600 hover:bg-purple-600/10"
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {downloading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <motion.div className="w-4 h-4 border-b-2 border-current rounded-full animate-spin" />
            <span>Downloading...</span>
          </motion.div>
        ) : (
          <motion.div
            key="download"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Download
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
