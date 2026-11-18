"use client";

import { motion } from "framer-motion";
import { Download, X } from "lucide-react";

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-black text-[#111]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}>
            Resume Preview
          </h2>
          <div className="flex items-center gap-3">
            <a
              href="/Ankit_Resume.pdf"
              download="Ankit_Resume.pdf"
              className="flex items-center gap-2 bg-[#cc0000] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#b30000] transition-colors duration-300"
            >
              <Download size={18} />
              Download PDF
            </a>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="h-[70vh]">
          <iframe
            src="/Ankit_Resume.pdf"
            className="w-full h-full border-0"
            title="Resume Preview"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}