"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronUp } from "lucide-react";

interface IndexItem {
  id: string;
  title: string;
}

export function FloatingIndex({ items }: { items: IndexItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progressValue = Math.min(100, Math.max(0, Math.round((scrollY / height) * 100)));
      setProgress(progressValue || 0);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-6 md:left-12 z-50 font-sans pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute bottom-[4.5rem] bg-[#1C1C1C] text-stone-300 rounded-[28px] p-6 w-[340px] left-0 shadow-2xl border border-white/10"
          >
            <div className="flex flex-col gap-4">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  onClick={(e) => scrollTo(item.id, e)}
                  className="text-left w-full inline-flex items-start text-[14px] font-medium tracking-wide hover:text-white transition-colors group"
                >
                  <span className="w-8 shrink-0 text-stone-500 font-normal group-hover:text-stone-400">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <span className="flex-1 leading-snug">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        layout
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1C1C1C] hover:bg-black text-white p-2 rounded-full flex items-center gap-6 border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-colors"
      >
        <div className="flex items-center gap-2.5 pl-3">
          <Menu className="w-4 h-4 text-stone-400 stroke-[2.5]" />
          <span className="text-[14px] font-medium tracking-wider">Index</span>
          <ChevronUp className={`w-3.5 h-3.5 text-stone-400 stroke-[2.5] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        
        <div className="bg-white/10 px-3.5 py-1.5 rounded-full text-[13px] font-semibold tracking-wider min-w-[56px] text-center">
          {progress}%
        </div>
      </motion.button>
    </div>
  );
}
