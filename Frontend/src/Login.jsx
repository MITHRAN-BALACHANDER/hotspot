import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TERMS = [
  'Maintain discipline.',
  "Don't disclose your personal details.",
  'You will be banned if any misbehaviours are found.',
  'No threatening/warning of others.',
  'For entertainment purposes only.',
];

const Login = () => {
  const [navigate, setNavigate] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const userData = localStorage.getItem('userdata');

  if (userData || navigate) return <Navigate to="/home" />;

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animated-gradient-bg"></div>
      
      {/* Floating Geometric Elements - Fixed Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-elements">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`floating-element element-${i + 1}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container - Fixed Sizing */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        {/* Animated Login Card - Fixed Overflow */}
        <motion.div
          className="relative w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center gap-6 p-6 sm:p-8 sm:gap-8"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
        >
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl"></div>
          
          {/* Header Section - Fixed Spacing */}
          <div className="relative z-10 text-center">
            <motion.h1
              className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
            >
              Welcome to Hotspot
            </motion.h1>
            <motion.div
              className="text-sm text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
            >
              Find & connect with people nearby — instantly.
            </motion.div>
          </div>

          {/* Google Login Section - Fixed Container */}
          <div className="flex flex-col items-center w-full relative z-10">
            <motion.div 
              whileTap={{ scale: 0.96 }}
              className="google-login-container w-full flex justify-center"
            >
              <GoogleLogin
                width="270"
                text="continue_with"
                shape="pill"
                theme="outline"
                onSuccess={({ credential }) => {
                  if (!credential) return;
                  try {
                    const decodedToken = JSON.parse(atob(credential.split('.')[1]));
                    const userData = {
                      name: decodedToken.name,
                      email: decodedToken.email,
                      picture: decodedToken.picture,
                    };
                    localStorage.setItem('userdata', JSON.stringify(userData));
                    setNavigate(true);
                  } catch (e) {
                    alert('Failed to process the login. Try again!');
                  }
                }}
                onError={() => {
                  alert('Google login failed. Try again!');
                }}
              />
            </motion.div>
          </div>

          {/* Terms Link - Fixed Positioning */}
          <motion.div
            className="w-full text-center text-xs text-white/70 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            By continuing, you agree to our{' '}
            <button
              className="underline text-blue-300 hover:text-blue-200 transition-colors"
              onClick={() => setTermsAccepted(false)}
              type="button"
            >
              Terms & Conditions
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Terms Modal - Fixed Sizing */}
      <AnimatePresence>
        {!termsAccepted && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 55, damping: 16 }}
            >
              <div className="bg-white/95 backdrop-blur-lg w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/20 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">
                  Terms & Conditions
                </h2>
                <ul className="text-slate-700 text-sm space-y-3 mb-8">
                  {TERMS.map((term, i) => (
                    <li key={i} className="flex items-start">
                      <span className="font-semibold text-blue-600 mr-3 mt-0.5 flex-shrink-0">{i + 1}.</span>
                      <span className="flex-1">{term}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTermsAccepted(true)}
                    className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Accept
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Updated CSS Styles */}
      <style jsx>{`
        .animated-gradient-bg {
          background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .floating-element {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float linear infinite;
          will-change: transform;
        }

        .floating-element:nth-child(odd) {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        }

        .floating-element:nth-child(1) { width: 60px; height: 60px; }
        .floating-element:nth-child(2) { width: 45px; height: 45px; }
        .floating-element:nth-child(3) { width: 80px; height: 80px; }
        .floating-element:nth-child(4) { width: 35px; height: 35px; }
        .floating-element:nth-child(5) { width: 55px; height: 55px; }
        .floating-element:nth-child(6) { width: 90px; height: 90px; }
        .floating-element:nth-child(7) { width: 40px; height: 40px; }
        .floating-element:nth-child(8) { width: 70px; height: 70px; }
        .floating-element:nth-child(9) { width: 85px; height: 85px; }
        .floating-element:nth-child(10) { width: 38px; height: 38px; }
        .floating-element:nth-child(11) { width: 65px; height: 65px; }
        .floating-element:nth-child(12) { width: 58px; height: 58px; }

        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(20px) rotate(360deg);
            opacity: 0;
          }
        }

        .google-login-container {
          filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
        }

        /* Prevent scrollbars */
        body, html {
          overflow-x: hidden;
        }

        /* Custom Button Styles */
        .accept-button {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
          border: none;
          position: relative;
          overflow: hidden;
        }

        .accept-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .accept-button:hover::before {
          left: 100%;
        }

        .accept-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }

        .accept-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(59, 130, 246, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .floating-element {
            animation-duration: 12s !important;
          }
          
          .animated-gradient-bg {
            animation-duration: 10s;
          }
        }

        @media (max-width: 480px) {
          .floating-element:nth-child(n+7) {
            display: none;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animated-gradient-bg {
            animation: none;
            background: linear-gradient(-45deg, #667eea, #764ba2);
          }
          
          .floating-element {
            animation: none;
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
