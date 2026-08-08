import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Feather, Mail } from 'lucide-react';
import { PaperInput, PaperButton } from './PaperFormControls';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [unfolded, setUnfolded] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !isValidEmail(email.trim())) {
      setError('Please provide a valid quiet email address');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto my-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FFFFFF] border border-[#DDD7CC] rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-xs overflow-hidden relative"
      >
        <div className="w-12 h-12 rounded-full bg-[#A67C52]/10 text-[#A67C52] flex items-center justify-center mx-auto">
          <Feather className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2B2B] font-normal">
            A Quiet Newsletter
          </h3>

          <p className="font-body text-sm text-[#666666] max-w-md mx-auto leading-relaxed">
            Sent only when there is something genuine worth saying. No promotions, no weekly spam, no urgency.
          </p>
        </div>

        {subscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-sm font-serif italic inline-flex items-center space-x-2 shadow-xs"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            <span>You have been added to the quiet dispatch list. Thank you.</span>
          </motion.div>
        ) : (
          <div className="pt-2">
            {!unfolded ? (
              <PaperButton onClick={() => setUnfolded(true)} icon={<Feather className="w-3.5 h-3.5" />}>
                Unfold Dispatch Form
              </PaperButton>
            ) : (
              <motion.div
                initial={{ rotateX: 60, opacity: 0, scale: 0.95 }}
                animate={{
                  rotateX: isFocused ? 2 : 0,
                  rotateY: isFocused ? -1 : 0,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                className="max-w-md mx-auto"
              >
                <form
                  onSubmit={handleSubscribe}
                  className={`p-6 sm:p-8 rounded-[24px] bg-[#F8F7F4] border border-[#DDD7CC] transition-all duration-500 space-y-4 ${
                    isFocused
                      ? 'shadow-[0_16px_40px_rgba(166,124,82,0.12)] border-[#C4A482]'
                      : 'shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                  }`}
                >
                  <PaperInput
                    label="Quiet Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    error={error}
                    success={isValidEmail(email.trim())}
                    icon={<Mail className="w-4 h-4" />}
                    required
                  />

                  <PaperButton
                    type="submit"
                    className="w-full"
                    icon={<Feather className="w-3.5 h-3.5" />}
                  >
                    Subscribe Slowly
                  </PaperButton>
                </form>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
};

