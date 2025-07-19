import React, { useEffect, useState } from 'react';
import UserImg from '../assets/user.jpg';
import { Loader, Sun, Moon, User, Settings, LogOut, Info, Edit3 } from 'lucide-react';
import { Navigate, Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import LogoImage from '../assets/op.png';
import { motion, AnimatePresence } from 'framer-motion';
import NicknameSetup from './NicknameSetup'; // Import the enhanced component

const Navbar = (props) => {
  const navigate = useNavigate(); // Add navigation hook
  const storedUserData = localStorage.getItem("userdata");
  const UserData = storedUserData ? JSON.parse(storedUserData) : null;

  const [hover, setHover] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [bigger, setBigger] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showNicknameSetup, setShowNicknameSetup] = useState(false); // Modal state

  useEffect(() => {
    const timer = setTimeout(() => {
      setBigger(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleHover = () => {
    setHover(!hover);
  };

  const handleNickname = () => {
    setHover(false);
    setShowNicknameSetup(true);
  };

  const handleNicknameSave = (newNickname) => {
    localStorage.setItem('nickname', newNickname);
    // Optional: trigger any additional actions
    console.log('Nickname saved:', newNickname);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("userdata");
      localStorage.removeItem("nickname");
      setRedirect(true);
    }, 1000);
  };

  const closeMenu = () => {
    setHover(false);
  };

  // Add navigation handler for HOTSPOT button
  const handleNavigateToHome = () => {
    navigate('/home');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hover && !event.target.closest('.dropdown-container')) {
        setHover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hover]);

  return (
    <>
      {redirect && <Navigate to="/" />}
      
      {/* NicknameSetup Modal */}
      <NicknameSetup
        isModal={true}
        isOpen={showNicknameSetup}
        onClose={() => setShowNicknameSetup(false)}
        onNicknameSet={handleNicknameSave}
        currentName={localStorage.getItem('nickname') || ''}
      />
      
      {/* Overlay to close menu when clicking outside */}
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="relative z-50 w-full bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <motion.img
                  initial={{ scale: 8, rotate: 180 }}
                  animate={{ 
                    scale: bigger ? 1.2 : 1, 
                    rotate: bigger ? 360 : 0 
                  }}
                  transition={{ 
                    duration: 1, 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15 
                  }}
                  className="w-10 h-10 rounded-full shadow-lg"
                  src={LogoImage}
                  alt="Hotspot Logo"
                />
                {bigger && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-30"
                  />
                )}
              </div>
              
              {/* Updated HOTSPOT as clickable button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onClick={handleNavigateToHome}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 15px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent cursor-pointer transition-all duration-200 hover:from-blue-300 hover:to-purple-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg px-2 py-1"
              >
                HOTSPOT
              </motion.button>
            </motion.div>

            {/* Location Info */}
            {props.props?.latitude && props.props?.longitude && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-3 py-1.5 border border-white/20"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-xs sm:text-sm">
                  {props.props.latitude.toFixed(2)}, {props.props.longitude.toFixed(2)}
                </span>
              </motion.div>
            )}

            {/* User Profile Section */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative dropdown-container"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHover}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-lg border-2 border-white/30 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <img
                  src={UserData?.picture ? UserData.picture : UserImg}
                  className="w-full h-full object-cover"
                  alt="User Avatar"
                />
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {hover && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                    className="absolute right-0 mt-2 w-64 sm:w-72 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl overflow-hidden z-50"
                  >
                    {/* User Info Header */}
                    <div className="p-4 border-b border-white/20">
                      <div className="flex items-center space-x-3">
                        <img
                          src={UserData?.picture ? UserData.picture : UserImg}
                          className="w-10 h-10 rounded-full ring-2 ring-white/20"
                          alt="User Avatar"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm truncate">
                            {UserData?.name || 'Anonymous User'}
                          </p>
                          <p className="text-white/60 text-xs truncate">
                            {UserData?.email || 'No email'}
                          </p>
                          {/* Show current nickname if exists */}
                          {localStorage.getItem('nickname') && (
                            <p className="text-blue-300 text-xs truncate mt-1">
                              Nickname: {localStorage.getItem('nickname')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                      <motion.button
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNickname}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                      >
                        <Edit3 size={18} />
                        <span className="font-medium">Set Name</span>
                      </motion.button>

                      <motion.div
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full"
                      >
                        <Link
                          to="/aboutus"
                          onClick={closeMenu}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                        >
                          <Info size={18} />
                          <span className="font-medium">About Us</span>
                        </Link>
                      </motion.div>

                      <div className="border-t border-white/20 mt-2 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLogout}
                          disabled={isLoading}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <Loader size={18} className="animate-spin" />
                          ) : (
                            <LogOut size={18} />
                          )}
                          <span className="font-medium">
                            {isLoading ? 'Logging out...' : 'Logout'}
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/30"
            >
              <div className="flex flex-col items-center space-y-4">
                <Loader size={40} className="text-white animate-spin" />
                <p className="text-white font-medium text-sm sm:text-base">Logging out...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Styles */}
      <style jsx>{`
        /* Custom animations */
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .dropdown-container .absolute {
            width: 90vw;
            right: 0;
            left: auto;
            transform: translateX(calc(100% - 90vw));
          }
        }

        @media (max-width: 480px) {
          .dropdown-container .absolute {
            width: 95vw;
            transform: translateX(calc(100% - 95vw));
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
