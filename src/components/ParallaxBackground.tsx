// ParallaxBackground.tsx - แก้ไขให้พื้นหลังวนลูปไม่รู้จบ
import React, { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Set initial window height
    setWindowHeight(window.innerHeight);
    
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Use windowHeight from state instead of window.innerHeight directly
  const safeWindowHeight = windowHeight || 800; // fallback value

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background Layer - วนลูปไม่รู้จบ */}
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Animated gradient overlays - วนลูป */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at ${20 + (scrollY * 0.02) % 80}% ${30 + (scrollY * 0.03) % 70}%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
              radial-gradient(circle at ${70 + (scrollY * 0.025) % 30}% ${60 + (scrollY * 0.02) % 40}%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              radial-gradient(circle at ${40 + (scrollY * 0.015) % 60}% ${80 + (scrollY * 0.02) % 20}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
            `
          }}
        ></div>

        {/* Moving particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                left: `${(i * 47) % 100}%`,
                top: `${((i * 67) % 100) + (scrollY * (0.1 + i * 0.005)) % 100}%`,
                width: `${2 + (i % 4)}px`,
                height: `${2 + (i % 4)}px`,
                backgroundColor: i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#3b82f6' : '#8b5cf6',
                transform: `translateY(${-(scrollY * (0.1 + i * 0.005)) % safeWindowHeight}px)`
              }}
            ></div>
          ))}
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${(i * 73) % 90}%`,
                top: `${((i * 41) % 80) + (scrollY * (0.05 + i * 0.003)) % 100}%`,
                width: `${20 + (i % 3) * 10}px`,
                height: `${20 + (i % 3) * 10}px`,
                transform: `rotate(${scrollY * (0.1 + i * 0.02)}deg) translateY(${-(scrollY * (0.05 + i * 0.003)) % (safeWindowHeight + 100)}px)`,
                background: i % 2 === 0 ? 
                  'linear-gradient(45deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))' : 
                  'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
                borderRadius: i % 3 === 0 ? '50%' : '10%'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;