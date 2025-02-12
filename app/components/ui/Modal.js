import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;  

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Verify OTP</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
