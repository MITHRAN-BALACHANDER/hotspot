// components/AnimatedBackground.jsx
import React from 'react';

const AnimatedBackground = () => {
  return (
    <>
      {/* Animated Background - Fixed */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10"></div>
      
      {/* Floating Elements - Fixed */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .floating-bubble {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: floatUp linear infinite;
          width: 40px;
          height: 40px;
        }

        .floating-bubble:nth-child(odd) {
          background: rgba(59, 130, 246, 0.1);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        }

        .floating-bubble:nth-child(2) { width: 60px; height: 60px; }
        .floating-bubble:nth-child(3) { width: 30px; height: 30px; }
        .floating-bubble:nth-child(4) { width: 50px; height: 50px; }
        .floating-bubble:nth-child(5) { width: 70px; height: 70px; }
        .floating-bubble:nth-child(6) { width: 35px; height: 35px; }
        .floating-bubble:nth-child(7) { width: 45px; height: 45px; }
        .floating-bubble:nth-child(8) { width: 55px; height: 55px; }

        @keyframes floatUp {
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
            transform: translateY(-100px) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .floating-bubble:nth-child(n+5) {
            display: none;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .floating-bubble {
            animation: none;
            opacity: 0.3;
          }
        }
      `}</style>
    </>
  );
};

export default AnimatedBackground;
