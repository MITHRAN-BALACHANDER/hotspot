import React from 'react';
import Navbar from '../components/Navbar';
import AnimatedBackground from '../components/AnimatedBackground'; // Import AnimatedBackground
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  MessageCircle, 
  Shield, 
  Zap, 
  Globe,
  ExternalLink,
  Github,
  Linkedin,
  Code,
  Smartphone,
  Users,
  Lock
} from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: <MapPin size={24} />,
      title: "Location-based rooms",
      description: "Auto-joins chat rooms based on GPS, covering approx. 1 km radius."
    },
    {
      icon: <Shield size={24} />,
      title: "Stay anonymous",
      description: "No personal details needed—just pick a nickname and start chatting."
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Instant messaging",
      description: "Built with React, ExpressJS, NodeJS, and Socket.IO."
    },
    {
      icon: <Zap size={24} />,
      title: "Lightweight & Fast",
      description: "Works even on low bandwidth."
    },
    {
      icon: <Lock size={24} />,
      title: "Safe & Moderated",
      description: "Messages stay within the local chatroom and disappear after a session. (No DataBase)"
    },
    {
      icon: <Users size={24} />,
      title: "Free & Easy to Use",
      description: "Chat, and connect instantly!"
    }
  ];

  const techStack = [
    "React.js", "Node.js", "Express.js", "Socket.IO", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"
  ];

  return (
    <>
      {/* Animated Background Component */}
      <AnimatedBackground />

      <Navbar />
      
      <div className="min-h-screen relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <MessageCircle size={32} className="text-white" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              HOTSPOT
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Connect with people nearby without revealing your identity through our 
              <span className="text-blue-300 font-semibold"> location-based anonymous chat app</span>
            </p>
          </motion.div>

          {/* Product Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 lg:p-10 mb-12"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                <Smartphone size={24} className="text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">About The Product</h2>
            </div>
            
            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8">
              HOTSPOT is a <span className="text-blue-300 font-semibold">location-based anonymous chat app</span> that lets you 
              connect with people nearby without revealing your identity. Whether you 
              want to chat with locals, discuss trending topics, or make new connections, 
              HOTSPOT provides a secure and <span className="text-purple-300 font-semibold">real-time messaging</span> experience.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 mb-12"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                <Code size={24} className="text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Technology Stack</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-gradient-to-r from-blue-600/50 to-purple-600/50 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20 text-white font-medium text-sm hover:scale-105 transition-transform duration-200"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Developer Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                <User size={24} className="text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Developed By</h2>
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  MB
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Mithran B</h3>
                  <p className="text-blue-300 font-semibold mb-2">B-Tech IT</p>
                  <p className="text-white/80 mb-4">Sri Shakthi Institute of Engineering and Technology</p>
                  
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href="https://www.linkedin.com/in/mithran-balachander-387710292/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-white font-medium transition-all duration-200"
                    >
                      <Linkedin size={16} />
                      <span>LinkedIn</span>
                      <ExternalLink size={14} />
                    </motion.a>
                    
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href="http://portfolio-lake-three-41.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-full text-white font-medium transition-all duration-200"
                    >
                      <Globe size={16} />
                      <span>Portfolio</span>
                      <ExternalLink size={14} />
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href="https://github.com/MITHRAN-BALACHANDER"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full text-white font-medium transition-all duration-200"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                      <ExternalLink size={14} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12 py-8"
          >
            <p className="text-white/60 text-sm">
              Built with ❤️ for connecting people while keeping privacy first
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
