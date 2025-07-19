import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const NicknameSetup = ({ 
  onNicknameSet, 
  isModal = false, 
  isOpen = true, 
  onClose = null,
  currentName = '',
  title = "Welcome aboard!",
  subtitle = "Choose an anonymous name to start chatting"
}) => {
  const nameRef = useRef(null);
  const [nickname, setNickname] = useState(currentName);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && nameRef.current && isModal) {
      setTimeout(() => {
        nameRef.current.focus();
      }, 100);
    }
  }, [isOpen, isModal]);

  useEffect(() => {
    setNickname(currentName);
  }, [currentName]);

  const handleSubmit = () => {
    const trimmedName = nickname.trim();
    
    if (!trimmedName) {
      toast.error("Please enter a valid nickname!", {
        style: {
          borderRadius: '12px',
          background: '#1f2937',
          color: '#fff',
        }
      });
      return;
    }

    if (trimmedName.length < 2) {
      toast.error("Nickname must be at least 2 characters!", {
        style: {
          borderRadius: '12px',
          background: '#1f2937',
          color: '#fff',
        }
      });
      return;
    }

    if (trimmedName.length > 20) {
      toast.error("Nickname must be less than 20 characters!", {
        style: {
          borderRadius: '12px',
          background: '#1f2937',
          color: '#fff',
        }
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay for modal, immediate for full-screen
    const delay = isModal ? 800 : 0;
    
    setTimeout(() => {
      onNicknameSet(trimmedName);
      setIsLoading(false);
      
      if (isModal) {
        onClose?.();
        toast.success(`Nickname set to "${trimmedName}"!`, {
          style: {
            borderRadius: '12px',
            background: '#1f2937',
            color: '#fff',
          },
          icon: '✨',
          duration: 3000,
        });
      }
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape' && isModal) {
      onClose?.();
    }
  };

  const handleClose = () => {
    if (!isLoading && isModal) {
      onClose?.();
    }
  };

  const content = (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: isModal ? 0.1 : 0.2, duration: 0.5 }}
      className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8"
    >
      {/* Header */}
      <div className={`text-center ${isModal ? 'mb-4' : 'mb-6'}`}>
        {isModal && onClose && (
          <div className="flex justify-end mb-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              disabled={isLoading}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 disabled:opacity-50"
            >
              <X size={16} />
            </motion.button>
          </div>
        )}
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: isModal ? 0.2 : 0.3, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <User size={24} className="text-white" />
        </motion.div>
        
        <h2 className={`font-bold text-white mb-2 ${isModal ? 'text-xl' : 'text-2xl'}`}>
          {isModal ? "Set Nickname" : title}
        </h2>
        <p className="text-white/70 text-sm">
          {isModal ? "Choose your anonymous identity" : subtitle}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: isModal ? 0.3 : 0.4 }}
        >
          <input
            ref={nameRef}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50"
            type="text"
            placeholder="Enter your anonymous name"
            onKeyDown={handleKeyDown}
            maxLength={20}
            disabled={isLoading}
          />
          {isModal && (
            <div className="flex justify-between items-center mt-2">
              <p className="text-white/60 text-xs">
                🔒 Your privacy is protected
              </p>
              <span className={`text-xs ${
                nickname.length > 15 ? 'text-amber-400' : 'text-white/60'
              }`}>
                {nickname.length}/20
              </span>
            </div>
          )}
        </motion.div>

        {!isModal && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center space-x-2 text-amber-400 text-sm"
          >
            <span>🔒</span>
            <span>Your privacy is protected</span>
          </motion.div>
        )}

        {/* Preview for modal */}
        {isModal && nickname.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-white/10 rounded-lg border border-white/20"
          >
            <p className="text-white/70 text-xs mb-1">Preview:</p>
            <p className="text-white font-medium">{nickname.trim()}</p>
          </motion.div>
        )}

        {/* Buttons */}
        {isModal ? (
          <div className="flex space-x-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-xl border border-white/30 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium disabled:opacity-50"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isLoading || !nickname.trim() || nickname.trim().length < 2}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>Save</span>
                </>
              )}
            </motion.button>
          </div>
        ) : (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isLoading || !nickname.trim() || nickname.trim().length < 2}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Setting up...</span>
              </>
            ) : (
              <span>Start Chatting</span>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );

  if (!isModal) {
    // Full-screen mode (original behavior)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex justify-center items-center p-4"
      >
        {content}
      </motion.div>
    );
  }

  // Modal mode
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NicknameSetup;
