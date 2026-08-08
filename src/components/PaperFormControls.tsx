import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, AlertCircle } from 'lucide-react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface PaperInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  containerClassName?: string;
}

export const PaperInput: React.FC<PaperInputProps> = ({
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  success,
  icon,
  type = 'text',
  className = '',
  containerClassName = '',
  required,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [typedEffectKey, setTypedEffectKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const isLabelFloating = isFocused || hasValue;

  const handleRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedEffectKey((prev) => prev + 1);
    if (onChange) onChange(e);
  };

  return (
    <div className={`relative group ${containerClassName}`}>
      {/* Gentle Radial Moonlight Light behind input when focused */}
      <div
        className={`absolute -inset-2 rounded-[22px] transition-opacity duration-500 pointer-events-none ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at center, rgba(166, 124, 82, 0.08) 0%, transparent 75%)',
        }}
      />

      {/* Main Glass Input Wrapper */}
      <div
        onClick={handleRipple}
        className={`relative flex items-center rounded-[18px] bg-[#FFFFFF]/90 backdrop-blur-md border transition-all duration-500 ease-out ${
          error
            ? 'border-red-400/80 ring-2 ring-red-400/20 shadow-[0_4px_16px_rgba(239,68,68,0.08)] animate-paper-shake'
            : success
            ? 'border-emerald-500/70 ring-2 ring-emerald-500/20 shadow-[0_4px_16px_rgba(16,185,129,0.08)]'
            : isFocused
            ? 'border-[#A67C52] ring-4 ring-[#A67C52]/15 shadow-[0_8px_25px_rgba(166,124,82,0.12)] -translate-y-[2px] scale-[1.005]'
            : 'border-[#DDD7CC] hover:border-[#C4A482] shadow-[0_2px_10px_rgba(0,0,0,0.02),0_6px_18px_rgba(166,124,82,0.04)] hover:-translate-y-[1.5px] hover:shadow-[0_4px_16px_rgba(166,124,82,0.08)]'
        }`}
      >
        {/* Ink Ripples Container */}
        <div className="absolute inset-0 rounded-[18px] overflow-hidden pointer-events-none z-0">
          {ripples.map((r) => (
            <span
              key={r.id}
              className="absolute rounded-full bg-[#A67C52]/15 animate-ripple-expand"
              style={{
                left: r.x - 25,
                top: r.y - 25,
                width: 50,
                height: 50,
              }}
            />
          ))}
        </div>

        {/* Optional Icon */}
        {icon && (
          <div className="pl-4 pr-1 text-[#A67C52] flex-shrink-0 transition-transform duration-300 group-hover:scale-105 z-10">
            {icon}
          </div>
        )}

        {/* Floating Animated Label */}
        <label
          onClick={() => inputRef.current?.focus()}
          className={`absolute pointer-events-none transition-all duration-300 ease-out z-30 select-none origin-left ${
            icon ? 'left-10' : 'left-4'
          } ${
            isLabelFloating
              ? 'top-0 -translate-y-1/2 scale-75 text-[11px] font-semibold tracking-wider uppercase text-[#A67C52] bg-[#FFFFFF] px-2 py-0.5 rounded-md border border-[#DDD7CC] shadow-2xs'
              : 'top-1/2 -translate-y-1/2 scale-100 text-sm text-[#666666]/70 font-serif italic bg-transparent px-0 border-transparent shadow-none'
          }`}
        >
          {label} {required && <span className="text-red-400/80">*</span>}
        </label>

        {/* Input Field with Ink Typing Effect */}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={(e) => {
            setIsFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          className={`w-full bg-transparent px-4 text-sm text-[#2B2B2B] focus:outline-none font-serif leading-relaxed caret-[#A67C52] transition-all duration-300 z-10 ${
            isLabelFloating ? 'pt-5 pb-2.5' : 'py-3.5'
          } ${className}`}
          required={required}
          {...props}
        />

        {/* Validation Icons */}
        <div className="pr-3 flex items-center space-x-1 flex-shrink-0">
          {success && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="p-1 rounded-full bg-emerald-500/10 text-emerald-600"
            >
              <Check className="w-4 h-4" />
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="p-1 rounded-full bg-red-400/10 text-red-500"
            >
              <AlertCircle className="w-4 h-4" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Error text */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[11px] text-red-500 font-serif italic mt-1.5 ml-2"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

interface PaperTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  success?: boolean;
  containerClassName?: string;
}

export const PaperTextarea: React.FC<PaperTextareaProps> = ({
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  success,
  rows = 4,
  className = '',
  containerClassName = '',
  required,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const isLabelFloating = isFocused || hasValue;

  // Auto-grow smooth height adjustment
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(110, textareaRef.current.scrollHeight)}px`;
    }
  }, [value]);

  const handleRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <div className={`relative group ${containerClassName}`}>
      {/* Moonlight radial focus lighting */}
      <div
        className={`absolute -inset-2 rounded-[22px] transition-opacity duration-500 pointer-events-none ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at center, rgba(166, 124, 82, 0.08) 0%, transparent 75%)',
        }}
      />

      <div
        onClick={handleRipple}
        className={`relative rounded-[18px] bg-[#FFFFFF]/90 backdrop-blur-md border transition-all duration-500 ease-out ${
          error
            ? 'border-red-400/80 ring-2 ring-red-400/20 shadow-[0_4px_16px_rgba(239,68,68,0.08)] animate-paper-shake'
            : success
            ? 'border-emerald-500/70 ring-2 ring-emerald-500/20 shadow-[0_4px_16px_rgba(16,185,129,0.08)]'
            : isFocused
            ? 'border-[#A67C52] ring-4 ring-[#A67C52]/15 shadow-[0_8px_25px_rgba(166,124,82,0.12)] -translate-y-[2px] scale-[1.003]'
            : 'border-[#DDD7CC] hover:border-[#C4A482] shadow-[0_2px_10px_rgba(0,0,0,0.02),0_6px_18px_rgba(166,124,82,0.04)] hover:-translate-y-[1.5px] hover:shadow-[0_4px_16px_rgba(166,124,82,0.08)]'
        }`}
      >
        {/* Paper Grid & Ripples Container */}
        <div className="absolute inset-0 rounded-[18px] overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 diary-grid opacity-25" />
          {ripples.map((r) => (
            <span
              key={r.id}
              className="absolute rounded-full bg-[#A67C52]/15 animate-ripple-expand"
              style={{
                left: r.x - 25,
                top: r.y - 25,
                width: 50,
                height: 50,
              }}
            />
          ))}
        </div>

        {/* Floating Label */}
        <label
          onClick={() => textareaRef.current?.focus()}
          className={`absolute left-4 pointer-events-none transition-all duration-300 ease-out z-30 select-none origin-left ${
            isLabelFloating
              ? 'top-0 -translate-y-1/2 scale-75 text-[11px] font-semibold tracking-wider uppercase text-[#A67C52] bg-[#FFFFFF] px-2 py-0.5 rounded-md border border-[#DDD7CC] shadow-2xs'
              : 'top-4 scale-100 text-sm text-[#666666]/70 font-serif italic bg-transparent px-0 border-transparent shadow-none'
          }`}
        >
          {label} {required && <span className="text-red-400/80">*</span>}
        </label>

        {/* Textarea Field */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          rows={rows}
          className={`w-full bg-transparent px-4 py-3.5 text-sm text-[#2B2B2B] focus:outline-none font-serif leading-relaxed caret-[#A67C52] transition-all duration-300 resize-none ${
            isLabelFloating ? 'pt-5 pb-2' : 'pt-3.5 pb-3.5'
          } ${className}`}
          required={required}
          {...props}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[11px] text-red-500 font-serif italic mt-1.5 ml-2"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

interface PaperButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
}

export const PaperButton: React.FC<PaperButtonProps> = ({
  children,
  icon,
  loading,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`group relative overflow-hidden inline-flex items-center justify-center space-x-2 rounded-full bg-[#A67C52] hover:bg-[#8C6842] text-white text-xs font-serif tracking-wider uppercase font-medium py-3.5 px-7 shadow-[0_4px_14px_rgba(166,124,82,0.25)] hover:shadow-[0_8px_25px_rgba(166,124,82,0.38)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.97] transition-all duration-500 ease-out cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {/* Golden Light Sweep Overlay */}
      <span className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />

      {/* Ink Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple-expand"
          style={{
            left: r.x - 20,
            top: r.y - 20,
            width: 40,
            height: 40,
          }}
        />
      ))}

      {icon && <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
