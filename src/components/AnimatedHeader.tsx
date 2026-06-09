import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedHeaderProps {
  scrolled: boolean;
  menuItems: string[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  scrolled,
  menuItems,
  activeSection,
  onSectionChange,
  onMenuToggle,
  isMenuOpen
}) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const targetPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
const currentPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const moveGlow = (e: MouseEvent) => {
      targetPosition.current = {
        x: e.clientX - 40,
        y: e.clientY - 40
      };
    };

    const smoothMove = () => {
      if (glowRef.current) {
        // Smooth interpolation with easing factor (0.1 = slower, 0.9 = faster)
        const easingFactor = 0.15;
        
        currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * easingFactor;
        currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * easingFactor;
        
        glowRef.current.style.left = `${currentPosition.current.x}px`;
        glowRef.current.style.top = `${currentPosition.current.y}px`;
      }
      
      animationFrameRef.current = requestAnimationFrame(smoothMove);
    };

    window.addEventListener('mousemove', moveGlow);
    animationFrameRef.current = requestAnimationFrame(smoothMove);
    
    return () => {
      window.removeEventListener('mousemove', moveGlow);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-50 w-20 h-20 rounded-full bg-cyan-400/30 blur-2xl opacity-70 transition-opacity duration-500 ease-out"
        style={{ left: 0, top: 0 }}
      />
      <motion.header
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.2 }} // เพิ่ม duration: 0.2
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-900/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0"
            >
              <div className="text-xl font-bold">
                <span
                  className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-move"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Kanokporn Hudsree
                </span>
              </div>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {menuItems && menuItems.length > 0 && menuItems.map((item: string, i: number) => (
  <motion.button
    key={`menu-item-${i}-${item}`}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0, duration: 0.07 }} // ลด delay และ duration ให้สั้นลง
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onSectionChange(item)}
    className={`relative px-4 py-2 text-sm transition-all duration-300 ${
      activeSection === item.toLowerCase()
        ? "text-cyan-400"
        : "text-cyan-200/60 hover:text-cyan-400"
    }`}
  >
    {activeSection === item.toLowerCase() && (
      <motion.div
        layoutId="activeSection"
        className="absolute inset-0 bg-cyan-500/10 rounded-lg"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    <span className="relative z-10">{item}</span>
  </motion.button>
))}
            </nav>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="md:hidden"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onMenuToggle}
                className="p-3 w-12 h-12 rounded-full text-cyan-200/60 hover:text-cyan-400 transition-colors duration-300 flex items-center justify-center"
              >
                <div className="w-6 h-4 relative transform transition-all duration-300">
                  <motion.span
                    animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    className="absolute h-0.5 w-full bg-current"
                  />
                  <motion.span
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="absolute h-0.5 w-full bg-current top-2"
                  />
                  <motion.span
                    animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    className="absolute h-0.5 w-full bg-current top-4"
                  />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>
    </>
  );
};