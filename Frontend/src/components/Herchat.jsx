import React from 'react';
import { motion } from 'framer-motion';

const Herchat = ({ message, name }) => {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  // Generate consistent avatar initial
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-pink-500', 'bg-purple-500', 'bg-indigo-500', 'bg-green-500',
      'bg-yellow-500', 'bg-red-500', 'bg-cyan-500', 'bg-violet-500'
    ];
    
    let hash = 0;
    if (name) {
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -40, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 25,
        duration: 0.3 
      }}
      className="w-full flex justify-start mb-3 px-2 sm:px-4"
    >
      <div className="max-w-[85%] sm:max-w-[75%] lg:max-w-[60%] flex items-end space-x-2">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${getAvatarColor(name)} flex items-center justify-center flex-shrink-0 text-white text-xs sm:text-sm font-bold shadow-lg`}
        >
          {getInitial(name)}
        </motion.div>

        <div className="flex-1">
          {/* Message Bubble */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/15 backdrop-blur-lg rounded-2xl rounded-bl-md shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20"
          >
            <div className="p-3 sm:p-4">
              {/* Sender Name */}
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/80 text-xs font-medium mb-1 capitalize"
              >
                {name}
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white text-sm sm:text-base leading-relaxed mb-2 break-words"
              >
                {message}
              </motion.div>

              {/* Time */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-start"
              >
                <span className="text-white/60 text-xs">
                  {timeString}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Herchat;
