// components/ChatHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, MapPin } from 'lucide-react';

const ChatHeader = ({ location, isConnecting }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex-shrink-0 bg-white/10 backdrop-blur-lg border-b border-white/20 p-4"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Nearby Chat</h3>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <MapPin size={14} />
              <span>
                {location.latitude && location.longitude
                  ? `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}`
                  : 'Getting location...'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnecting ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
          <span className="text-white/60 text-sm">
            {isConnecting ? 'Connecting...' : 'Connected'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
