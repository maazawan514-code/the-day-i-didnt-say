import React from 'react';
import { motion } from 'motion/react';

interface AuthorSignatureProps {
  className?: string;
  width?: number;
  height?: number;
}

export const AuthorSignature: React.FC<AuthorSignatureProps> = ({
  className = "text-[#A67C52]",
  width = 180,
  height = 50,
}) => {
  return (
    <div className={`inline-block ${className}`}>
      <motion.svg
        width={width}
        height={height}
        viewBox="0 0 240 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Handwritten signature curve paths for "M. Al-Farabi" or author mark */}
        <motion.path
          d="M 15,42 C 10,20 25,12 30,35 C 32,45 28,50 35,40 C 42,25 50,22 55,38 C 58,45 62,40 68,36"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M 72,40 C 78,35 85,30 90,42 C 95,20 102,15 108,35 C 112,45 118,30 125,40 C 130,42 135,38 142,35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
        />
        {/* Underline flourish loop */}
        <motion.path
          d="M 12,50 C 40,54 110,55 180,48 C 210,45 225,42 195,52 C 160,60 80,58 140,54"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
};
