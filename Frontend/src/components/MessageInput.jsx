// components/MessageInput.jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const MessageInput = ({ onSendMessage }) => {
  const [isTyping, setIsTyping] = useState(false);
  const messageRef = useRef(null);

  const handleSend = () => {
    const messageText = messageRef.current.value.trim();
    if (messageText) {
      onSendMessage(messageText);
      messageRef.current.value = '';
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex-shrink-0 bg-white/10 backdrop-blur-lg border-t border-white/20 p-4"
    >
      <div className="max-w-4xl mx-auto flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            ref={messageRef}
            type="text"
            onChange={handleTyping}
            onKeyDown={handleKeyDown}
            className="w-full p-4 pr-12 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            placeholder="Type your message..."
          />
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </motion.div>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Send size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MessageInput;
