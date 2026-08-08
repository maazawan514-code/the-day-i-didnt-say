import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { literaryAmbience } from '../lib/ambientSound';

export const AmbientSoundToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [fadeStatus, setFadeStatus] = useState<'none' | 'in' | 'out'>('none');
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // Check user preference from localStorage on mount (Never Autoplay!)
  useEffect(() => {
    const saved = localStorage.getItem('blog_ambient_audio');
    // If user previously enabled it, keep track in localStorage but wait for user gesture/click
  }, []);

  const handleToggle = async () => {
    if (isFading) return; // Prevent double toggling during 5s fade window

    if (!isPlaying) {
      setIsPlaying(true);
      setIsFading(true);
      setFadeStatus('in');
      localStorage.setItem('blog_ambient_audio', 'true');

      // Start 5-second smooth fade in
      await literaryAmbience.start();

      setTimeout(() => {
        setIsFading(false);
        setFadeStatus('none');
      }, 5000);
    } else {
      setIsFading(true);
      setFadeStatus('out');
      localStorage.setItem('blog_ambient_audio', 'false');

      // Start 5-second smooth fade out
      literaryAmbience.stop();

      setTimeout(() => {
        setIsPlaying(false);
        setIsFading(false);
        setFadeStatus('none');
      }, 5000);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={
          isPlaying
            ? 'Pause Reading Room Ambience (5s Fade)'
            : 'Play Reading Room Ambience (Soft Wind, Clock, Vinyl & Rain)'
        }
        className={`relative flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border cursor-pointer ${
          isPlaying
            ? 'bg-[#A67C52] text-white border-[#A67C52] shadow-xs'
            : 'bg-[#DFDCD4] text-[#2B2B2B] border-[#D2CDC0] hover:bg-[#D4D0C5] hover:border-[#BFB8A8]'
        }`}
      >
        {isPlaying ? (
          <>
            {/* Animated Soundwave / Speaker */}
            <div className="flex items-center space-x-0.5 h-3">
              <span className="w-0.5 bg-white rounded-full animate-[bounce_1.2s_infinite_100ms] h-2" />
              <span className="w-0.5 bg-white rounded-full animate-[bounce_1.2s_infinite_300ms] h-3" />
              <span className="w-0.5 bg-white rounded-full animate-[bounce_1.2s_infinite_200ms] h-1.5" />
            </div>
            <span className="font-serif italic text-[11px] tracking-wide">
              {fadeStatus === 'in'
                ? 'Fading in...'
                : fadeStatus === 'out'
                ? 'Fading out...'
                : 'Ambience'}
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#A67C52]" />
            <span className="hidden sm:inline font-serif text-[11px] tracking-wide">
              Reading Sound
            </span>
          </>
        )}
      </button>

      {/* Floating Tooltip Description */}
      {showTooltip && (
        <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-[#FFFFFF] border border-[#DDD7CC] rounded-xl shadow-xl z-50 text-left pointer-events-none animate-fadeIn">
          <div className="flex items-center space-x-1.5 text-[#A67C52] mb-1">
            <Sparkles className="w-3 h-3" />
            <span className="font-serif text-xs font-semibold uppercase tracking-wider">
              Midnight Reading Room
            </span>
          </div>
          <p className="font-serif italic text-[11px] text-[#666666] leading-relaxed">
            A quiet autumn night ambience: soft window rain, antique clock ticks, gentle vinyl crackle, and distant wind chimes.
          </p>
          <p className="mt-1.5 text-[10px] text-[#A67C52] font-mono">
            {isPlaying ? '• 5-second smooth fade active' : '• Soft 12% max volume • 5s fade'}
          </p>
        </div>
      )}
    </div>
  );
};
