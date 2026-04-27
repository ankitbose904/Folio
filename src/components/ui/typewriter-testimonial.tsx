'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Testimonial = {
  image: string;
  audio: string;
  text: string;
  name: string;
  jobtitle: string;
};

type ComponentProps = {
  testimonials: Testimonial[];
};

export const TypewriterTestimonial: React.FC<ComponentProps> = ({ testimonials }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [hasBeenHovered, setHasBeenHovered] = useState<boolean[]>(new Array(testimonials.length).fill(false));
  const [typedText, setTypedText] = useState('');
  const typewriterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentTextRef = useRef('');

  const stopAudio = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current.src = '';
      audioPlayerRef.current.load();
      audioPlayerRef.current = null;
    }
  }, []);

  const startTypewriter = useCallback((text: string) => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }
    setTypedText('');
    currentTextRef.current = text;

    let i = 0;
    const type = () => {
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
        i++;
        typewriterTimeoutRef.current = setTimeout(type, 50);
      }
    };
    type();
  }, []);

  const stopTypewriter = useCallback(() => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
      typewriterTimeoutRef.current = null;
    }
    setTypedText('');
    currentTextRef.current = '';
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    stopAudio();
    setHoveredIndex(index);

    // Note: Audio will only play if interaction occurs. 
    // In many browsers, hover doesn't count as strong interaction for first-play.
    const newAudio = new Audio(`/audio/${testimonials[index].audio}`);
    audioPlayerRef.current = newAudio;
    newAudio.play().catch(e => {
      console.warn("Audio playback prevented or failed:", e);
    });

    setHasBeenHovered(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
    startTypewriter(testimonials[index].text);
  }, [testimonials, stopAudio, startTypewriter]);

  const handleMouseLeave = useCallback(() => {
    stopAudio();
    setHoveredIndex(null);
    stopTypewriter();
  }, [stopAudio, stopTypewriter]);

  useEffect(() => {
    return () => {
      stopAudio();
      stopTypewriter();
    };
  }, [stopAudio, stopTypewriter]);

  return (
    <div className="flex justify-center items-center gap-6 flex-wrap py-12">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className="relative flex flex-col items-center"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-20 h-20 rounded-full border-4 cursor-pointer shadow-lg object-cover"
            animate={{
              borderColor: (hoveredIndex === index || hasBeenHovered[index]) ? '#ff3b30' : '#333333',
              scale: hoveredIndex === index ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          />

          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-24 bg-white text-[#111] text-sm px-6 py-5 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-xs w-72 z-[100]"
              >
                <div className="h-32 overflow-y-auto whitespace-pre-wrap font-medium leading-relaxed mb-4 scrollbar-hide">
                  {typedText}
                  <span className="animate-blink font-bold text-[#ff3b30]">|</span>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <p className="font-black uppercase tracking-tight text-base">{testimonial.name}</p>
                  <p className="text-[#ff3b30] font-bold text-[10px] uppercase tracking-widest">{testimonial.jobtitle}</p>
                </div>

                {/* Speech bubble tail */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 flex flex-col items-center">
                  <div className="w-4 h-4 bg-white rotate-45 -mt-2 shadow-lg"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};
