// filepath: src/components/AnimatedContent.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedContentProps {
  activeSection?: string;
  isActive?: boolean;
  content: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animationType?: 'default' | 'slide' | 'fade' | 'scale';
  duration?: number;
  staggerChildren?: number;
}

const getVariants = (type: string, duration: number) => {
  const baseTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration
  };

  switch (type) {
    case 'slide':
      return {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: baseTransition },
        exit: { opacity: 0, x: 50, transition: { duration: duration * 0.5 } }
      };
    case 'fade':
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: baseTransition },
        exit: { opacity: 0, transition: { duration: duration * 0.5 } }
      };
    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: baseTransition },
        exit: { opacity: 0, scale: 0.8, transition: { duration: duration * 0.5 } }
      };
    default:
      return {
        hidden: { 
          opacity: 0,
          y: 20,
          scale: 0.95
        },
        visible: { 
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            ...baseTransition,
            staggerChildren: 0.1
          }
        },
        exit: {
          opacity: 0,
          y: -20,
          scale: 0.95,
          transition: {
            duration: duration * 0.5
          }
        }
      };
  }
};

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  activeSection,
  isActive = true,
  content,
  className = "",
  containerClassName = "relative min-h-screen pt-20",
  animationType = 'default',
  duration = 0.4,
  //staggerChildren = 0.1
}) => {
  const variants = getVariants(animationType, duration);
  
  // Support both activeSection-based and isActive-based usage
  const shouldShow = activeSection ? true : isActive;
  const animationKey = activeSection || 'content';

  return (
    <main className={containerClassName}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {shouldShow && (
            <motion.div
              key={animationKey}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`relative ${className}`}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

// Alternative simpler version for basic usage
export const SimpleAnimatedContent: React.FC<{
  isActive: boolean;
  content: React.ReactNode;
  className?: string;
}> = ({ isActive, content, className = "" }) => (
  <AnimatePresence mode="wait">
    {isActive && (
      <motion.div
        key="content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={className}
      >
        {content}
      </motion.div>
    )}
  </AnimatePresence>
);

// Hook for managing animated sections
export const useAnimatedSections = (initialSection: string = '') => {
  const [activeSection, setActiveSection] = React.useState(initialSection);
  
  const switchSection = React.useCallback((newSection: string) => {
    setActiveSection(newSection);
  }, []);

  return { activeSection, switchSection };
};