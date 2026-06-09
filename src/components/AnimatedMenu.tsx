import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: string[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuVariants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  },
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const menuItemVariants = {
  closed: { opacity: 0, x: 50 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  })
};

export const AnimatedMenu: React.FC<AnimatedMenuProps> = ({
  isOpen,
  onClose,
  menuItems = [], // แก้ไข: เพิ่ม default value
  activeSection,
  onSectionChange
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] md:hidden"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90" 
            onClick={onClose}
          ></motion.div>
          <motion.div 
  variants={menuVariants}
  initial="closed"
  animate="open"
  exit="closed"
  className="fixed inset-0 w-screen h-screen bg-slate-900 shadow-xl"
>
            <div className="flex flex-col p-6">
              <div className="flex justify-end">
                <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={onClose}
  className="p-3 w-12 h-12 rounded-full text-cyan-200/60 hover:text-cyan-400 transition-colors duration-300 flex items-center justify-center"
>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              <nav className="flex flex-col space-y-4 mt-8">
                {/* แก้ไข: เพิ่ม safety check ด้วย optional chaining และ nullish coalescing */}
                {(menuItems || []).map((item, i) => (
                  <motion.button
                    key={item}
                    custom={i}
                    variants={menuItemVariants}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSectionChange(item)}
                    className={`py-2 px-4 rounded-lg transition-all duration-300 text-left ${
                      activeSection === item.toLowerCase()
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "text-cyan-200/60 hover:bg-cyan-500/10 hover:text-cyan-400"
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};