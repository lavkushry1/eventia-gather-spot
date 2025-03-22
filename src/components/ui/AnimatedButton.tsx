
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'accent';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  isLoading = false,
  fullWidth = false,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const variantClass = variant === 'accent' ? 'bg-accent text-white hover:bg-accent/90' : '';
  
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(fullWidth ? 'w-full' : '')}
    >
      <Button
        type={type}
        variant={variant === 'accent' ? 'default' : variant}
        size={size}
        onClick={onClick}
        disabled={disabled || isLoading}
        className={cn(
          variantClass,
          fullWidth ? 'w-full' : '',
          className
        )}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
