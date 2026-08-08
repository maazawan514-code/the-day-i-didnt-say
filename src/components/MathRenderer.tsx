import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathRendererProps {
  latex: string;
  inline?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  latex,
  inline = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLSpanElement | HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(latex, containerRef.current, {
          displayMode: !inline,
          throwOnError: false,
        });
      } catch (err) {
        if (containerRef.current) {
          containerRef.current.textContent = latex;
        }
      }
    }
  }, [latex, inline]);

  if (inline) {
    return (
      <span
        ref={containerRef as React.RefObject<HTMLSpanElement>}
        className={`font-math inline-block ${className}`}
      />
    );
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`font-math my-6 p-4 rounded-lg bg-[#EFEDE8] border border-[#DDD7CC] overflow-x-auto text-center text-lg ${className}`}
    />
  );
};
