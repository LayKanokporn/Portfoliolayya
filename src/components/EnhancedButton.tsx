// components/EnhancedButton.tsx
"use client";
import React, { useState, useRef } from 'react';

interface EnhancedButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'hire' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

interface RippleType {
  x: number;
  y: number;
  size: number;
  id: number;
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false,
  icon = null,
  loading = false,
  type = 'button',
  ...props 
}) => {
  const [ripples, setRipples] = useState<RippleType[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variants = {
    primary: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25',
    secondary: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-500/50',
    hire: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg hover:shadow-emerald-500/25 animate-pulse hover:animate-none',
    ghost: 'hover:bg-white/5 text-cyan-100/80 hover:text-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: RippleType = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      className={`
        relative overflow-hidden rounded-xl font-medium transition-all duration-300 
        transform hover:scale-105 active:scale-95 group
        ${variants[variant]} 
        ${sizes[size]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={createRipple}
      disabled={disabled || loading}
      {...props}
    >
      {/* Ripple Effect */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animationDuration: '600ms'
          }}
        />
      ))}

      {/* Button Content */}
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : icon ? (
          <span className="transition-transform duration-200 group-hover:scale-110">
            {icon}
          </span>
        ) : null}
        
        <span className={loading ? 'opacity-0' : ''}>
          {children}
        </span>

        {/* Floating particles on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full animate-bounce"
              style={{
                left: `${20 + i * 12}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationDelay: `${i * 100}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </span>

      {/* Shine effect */}
      <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shine" />
    </button>
  );
};

// Floating Action Button for "Hire Me"
interface FloatingHireButtonProps {
  onClick?: () => void;
}

const FloatingHireButton: React.FC<FloatingHireButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div
        className={`relative transition-all duration-300 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Pulsing background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse opacity-75 blur-md" />
        
        {/* Main button */}
        <EnhancedButton
          variant="hire"
          size="lg"
          onClick={onClick}
          className="relative shadow-2xl"
          icon={<span className="text-2xl">💼</span>}
        >
          Hire Me
        </EnhancedButton>

        {/* Tooltip */}
        <div className={`
          absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg
          transition-all duration-200 pointer-events-none
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}>
          Let&apos;s work together!
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800" />
        </div>
      </div>
    </div>
  );
};

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'cyan' | 'blue' | 'emerald';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'cyan' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colors = {
    cyan: 'border-cyan-500',
    blue: 'border-blue-500',
    emerald: 'border-emerald-500'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} ${colors[color]} border-2 border-t-transparent rounded-full animate-spin`} />
    </div>
  );
};

// Page Transition Component
interface PageTransitionProps {
  children: React.ReactNode;
  isVisible?: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, isVisible = true }) => {
  return (
    <div className={`
      transition-all duration-500 ease-in-out transform
      ${isVisible 
        ? 'opacity-100 translate-y-0 scale-100' 
        : 'opacity-0 translate-y-4 scale-95'
      }
    `}>
      {children}
    </div>
  );
};

// Magnetic Button Effect
interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'hire' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, strength = 0.3, ...props }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      >
        <EnhancedButton {...props}>
          {children}
        </EnhancedButton>
      </div>
    </div>
  );
};

export { 
  EnhancedButton, 
  FloatingHireButton, 
  LoadingSpinner, 
  PageTransition, 
  MagneticButton 
};