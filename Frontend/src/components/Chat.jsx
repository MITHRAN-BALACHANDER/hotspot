import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck } from 'lucide-react';

const Chat = ({ message, name }) => {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 25,
        duration: 0.3 
      }}
      className="w-full flex justify-end mb-3 px-2 sm:px-4"
    >
      <div className="max-w-[85%] sm:max-w-[75%] lg:max-w-[60%]">
        {/* Glass Message Bubble */}
        <motion.div
          whileHover={{ scale: 1.02, y: -1 }}
          className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl rounded-tr-md shadow-xl hover:shadow-2xl transition-all duration-300 p-3 sm:p-4"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl rounded-tr-md pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Sender Name */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-xs font-medium mb-1"
            >
              You
            </motion.div>

            {/* Message Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-sm sm:text-base leading-relaxed mb-2 break-words font-medium"
            >
              {message}
            </motion.div>

            {/* Time and Status */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-end space-x-2"
            >
              <span className="text-white/70 text-xs">
                {timeString}
              </span>
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              >
                <CheckCheck size={14} className="text-green-400" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Glass tail/pointer */}
        <div className="flex justify-end pr-2 -mt-1">
          <div className="relative">
            <div 
              className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-white/20 border-t-[10px] border-t-white/20"
              style={{
                filter: 'blur(0.5px)',
                backdropFilter: 'blur(10px)'
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;
