import React from 'react';
import { motion } from 'motion/react';

interface EnsoLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export const EnsoLogo: React.FC<EnsoLogoProps> = ({
  className = "",
  size = 76,
  animated = true,
}) => {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      whileHover={animated ? { rotate: 8, scale: 1.03 } : undefined}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <img
        src="/logo.png"
        alt="The Day I Didn't Say Logo"
        width={size}
        height={size}
        className="w-full h-full object-contain pointer-events-none select-none"
      />
    </motion.div>
  );
};

