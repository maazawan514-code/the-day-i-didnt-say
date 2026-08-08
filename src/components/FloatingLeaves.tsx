import React, { useEffect, useState } from 'react';

interface Leaf {
  id: number;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  rotation: number; // initial deg
  opacity: number;
}

export const FloatingLeaves: React.FC = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Generate 12 gentle floating leaves
    const newLeaves: Leaf[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: 14 + Math.random() * 12,
      duration: 18 + Math.random() * 16,
      delay: Math.random() * 12,
      rotation: Math.random() * 360,
      opacity: 0.25 + Math.random() * 0.35,
    }));
    setLeaves(newLeaves);
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute text-[#A67C52] animate-leaf-fall opacity-40 hover:opacity-100 transition-opacity"
          style={{
            left: `${leaf.left}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            opacity: leaf.opacity,
          }}
        >
          {/* Ginkgo or Maple Leaf Minimalist SVG */}
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C10.5 5 8 7.5 5 9C8 10.5 10.5 13 12 16C13.5 13 16 10.5 19 9C16 7.5 13.5 5 12 2Z" />
            <path d="M12 16V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes leafFall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0px);
          }
          33% {
            transform: translateY(35vh) rotate(120deg) translateX(25px);
          }
          66% {
            transform: translateY(70vh) rotate(240deg) translateX(-20px);
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(15px);
          }
        }
        .animate-leaf-fall {
          animation-name: leafFall;
        }
      `}</style>
    </div>
  );
};
