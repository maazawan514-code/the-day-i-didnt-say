import React, { useState } from 'react';
import { Mail, Instagram, Send, CheckCircle2, Feather, User, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PaperInput, PaperTextarea, PaperButton } from './PaperFormControls';

// Official Brand SVG Icons
const OfficialGmailIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 transition-transform duration-400 ease-out group-hover:scale-105"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1.5 18.5V6.75C1.5 5.23122 2.73122 4 4.25 4H19.75C21.2688 4 22.5 5.23122 22.5 6.75V18.5C22.5 20.0188 21.2688 21.25 19.75 21.25H4.25C2.73122 21.25 1.5 20.0188 1.5 18.5Z"
      fill="#F8F9FA"
    />
    <path
      d="M22.5 6.75V7.5L12 14.25L1.5 7.5V6.75C1.5 5.23122 2.73122 4 4.25 4H19.75C21.2688 4 22.5 5.23122 22.5 6.75Z"
      fill="#EA4335"
    />
    <path
      d="M1.5 7.5V18.5C1.5 20.0188 2.73122 21.25 4.25 21.25H6.5V10.5L1.5 7.5Z"
      fill="#4285F4"
    />
    <path
      d="M22.5 7.5V18.5C22.5 20.0188 21.2688 21.25 19.75 21.25H17.5V10.5L22.5 7.5Z"
      fill="#34A853"
    />
    <path
      d="M6.5 21.25V10.5L12 14.25L17.5 10.5V21.25H6.5Z"
      fill="#FBBC04"
    />
  </svg>
);

const OfficialInstagramIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 transition-transform duration-400 ease-out group-hover:scale-105"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ig-official-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="100%" stopColor="#285AEB" />
      </linearGradient>
    </defs>
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      fill="url(#ig-official-grad)"
    />
  </svg>
);

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; message?: string } = {};
    if (!email.trim() || !isValidEmail(email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!message.trim()) {
      newErrors.message = 'Please write your letter before sending';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSending(true);

    // 1.5s sending animation where envelope closes and flies away
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 1600);
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-3xl mx-auto">
      <div className="bg-[#FFFFFF] border border-[#DDD7CC] rounded-[28px] p-8 sm:p-12 shadow-xs text-center space-y-8 relative overflow-hidden">
        {/* Section Header */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EFEDE8] border border-[#DDD7CC] text-xs font-semibold text-[#A67C52] tracking-wider uppercase">
          <Feather className="w-3.5 h-3.5 text-[#A67C52]" />
          <span>Correspondence</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#2B2B2B] font-normal leading-tight">
          Write Back
        </h2>

        <p className="font-body text-base text-[#666666] max-w-lg mx-auto leading-relaxed">
          Whether you felt a quiet resonance in a poem, an essay, or wish to send a letter across the distance.
        </p>

        {/* Links to Email & Social */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-2">
          {/* Official Gmail Button */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=salehaawan92@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email Salehaawan92@gmail.com via Gmail"
            title="Salehaawan92@gmail.com"
            className="group inline-flex items-center space-x-3 px-6 py-3 rounded-2xl bg-[#FFFFFF] border border-[#DDD7CC] text-sm text-[#2B2B2B] font-serif shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(166,124,82,0.12)] hover:border-[#A67C52] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#A67C52]/50 transition-all duration-400 ease-out cursor-pointer"
          >
            <OfficialGmailIcon />
            <span className="font-medium text-[#2B2B2B]">Salehaawan92@gmail.com</span>
          </a>

          {/* Official Instagram Button */}
          <a
            href="https://instagram.com/sualeha.16"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow @sualeha.16 on Instagram"
            title="@sualeha.16 on Instagram"
            className="group inline-flex items-center space-x-3 px-6 py-3 rounded-2xl bg-[#FFFFFF] border border-[#DDD7CC] text-sm text-[#2B2B2B] font-serif shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(166,124,82,0.12)] hover:border-[#A67C52] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#A67C52]/50 transition-all duration-400 ease-out cursor-pointer"
          >
            <OfficialInstagramIcon />
            <span className="font-medium text-[#2B2B2B]">@sualeha.16</span>
          </a>
        </div>

        <div className="w-16 h-[1px] bg-[#DDD7CC] mx-auto my-6" />

        {/* Paper Letter Style Form */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-[24px] bg-[#F8F7F4] border border-[#A67C52]/30 space-y-3 shadow-xs"
            >
              <CheckCircle2 className="w-10 h-10 text-[#A67C52] mx-auto" />
              <h3 className="font-serif text-2xl text-[#2B2B2B]">
                Your letter is on its way.
              </h3>
              <p className="font-body text-sm text-[#666666]">
                Thank you for taking the time to write back. I will read it gently and reply when the evening permits.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                }}
                className="mt-4 px-4 py-2 rounded-full text-xs font-serif text-[#A67C52] underline hover:text-[#8C6842] cursor-pointer"
              >
                Write another letter
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" className="relative max-w-lg mx-auto">
              {/* Flying Envelope Animation Overlay when sending */}
              {isSending && (
                <motion.div
                  initial={{ opacity: 0, y: 0, x: 0, scale: 1 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [20, -10, -180],
                    x: [0, 30, 200],
                    scale: [0.8, 1, 0.5],
                    rotate: [0, -10, 15],
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                >
                  <div className="p-6 bg-[#FFFFFF] border-2 border-[#A67C52] rounded-xl shadow-2xl flex flex-col items-center">
                    <Send className="w-12 h-12 text-[#A67C52]" />
                    <span className="font-serif italic text-xs text-[#A67C52] mt-2">Sealing & Sending Letter...</span>
                  </div>
                </motion.div>
              )}

              <form
                onSubmit={handleSubmit}
                className={`space-y-5 text-left bg-[#F8F7F4] p-6 sm:p-8 rounded-[24px] border border-[#DDD7CC] shadow-xs relative transition-opacity ${
                  isSending ? 'opacity-30 pointer-events-none' : 'opacity-100'
                }`}
              >
                {/* Paper Lines subtle background */}
                <div className="absolute inset-0 diary-grid pointer-events-none opacity-40 rounded-[24px]" />

                <div className="relative z-10 space-y-5">
                  {/* Name Field Staggered */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <PaperInput
                      label="Your Name or Pseudonym"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      icon={<User className="w-4 h-4" />}
                    />
                  </motion.div>

                  {/* Email Field Staggered */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <PaperInput
                      label="Your Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      error={errors.email}
                      success={isValidEmail(email.trim())}
                      icon={<Mail className="w-4 h-4" />}
                      required
                    />
                  </motion.div>

                  {/* Subject Field Staggered */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <PaperInput
                      label="Subject or Topic"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      icon={<Tag className="w-4 h-4" />}
                    />
                  </motion.div>

                  {/* Message Field Staggered */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <PaperTextarea
                      label="Your Letter or Message..."
                      rows={5}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      error={errors.message}
                      required
                    />
                  </motion.div>

                  {/* Submit Button Staggered */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <PaperButton
                      type="submit"
                      className="w-full"
                      icon={<Send className="w-4 h-4" />}
                    >
                      Send Letter
                    </PaperButton>
                  </motion.div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

