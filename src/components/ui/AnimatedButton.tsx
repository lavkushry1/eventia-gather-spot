
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  icon,
  isLoading = false,
  disabled,
  ...props
}) => {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent/10 text-foreground',
    ghost: 'hover:bg-accent/10 text-foreground',
    accent: 'bg-accent text-white hover:bg-accent/90',
  };

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={disabled || isLoading ? {} : { y: -2, transition: { duration: 0.2 } }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none shadow-glass-button',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-1.5">
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
        </div>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default AnimatedButton;
