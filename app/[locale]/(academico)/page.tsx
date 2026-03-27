"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "@/i18n/routing";
import { 
  User, 
  ArrowRight, 
  Play, 
  LayoutGrid, 
  Layers, 
  FileText, 
  Feather, 
  Terminal, 
  Folder, 
  BarChart3, 
  Compass, 
  Zap,
  Search
} from "lucide-react";

export default function InstitucionalHomePage() {
  const t = useTranslations("Index");
  const fullText = t("hero_title");
  const lines = fullText.split('\n');

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const springScale = useSpring(scale, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsFinished(true);
      return;
    }

    if (currentCharIndex < lines[currentLineIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, 15 + Math.random() * 25);
      return () => clearTimeout(timeout);
    } else if (currentLineIndex < lines.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsFinished(true);
    }
  }, [currentCharIndex, currentLineIndex, lines]);

  const dockIcons = [
    { icon: LayoutGrid, color: "text-blue-500" },
    { icon: Layers, color: "text-cyan-500" },
    { icon: Compass, color: "text-purple-500" },
    { icon: Feather, color: "text-emerald-500" },
    { icon: Search, color: "text-orange-500" },
    { icon: Terminal, color: "text-stone-400" },
    { icon: Folder, color: "text-sky-500" },
    { icon: BarChart3, color: "text-rose-500" },
    { icon: Zap, color: "text-amber-500" },
    { icon: FileText, color: "text-indigo-500" },
  ];

  return (
    <div ref={containerRef} className="relative w-full bg-background selection:bg-stone-200">
      {/* HERO SECTION */}
      <section className="flex h-screen flex-col items-center justify-center p-6 text-center overflow-hidden sticky top-0">
        <h1 className="max-w-[95vw] w-full text-4xl font-medium tracking-[-0.05em] text-stone-900 md:text-7xl lg:text-8xl leading-[1.0] font-sans mb-12">
          {lines.map((line, i) => (
            <div key={i} className="relative block h-[1.1em] flex justify-center items-center">
              <div className="invisible whitespace-nowrap">
                {line.split(/(Gama)/g).map((part, partIndex) => (
                  <span key={partIndex} className={part === "Gama" ? "text-stone-500" : ""}>
                    {part}
                  </span>
                ))}
                {i === lines.length - 1 && (
                  <span className="inline-block w-[4px] ml-1">|</span>
                )}
              </div>

              <div className="absolute inset-0 flex justify-center items-center whitespace-nowrap">
                {i <= currentLineIndex && (
                  <>
                    {line.split(/(Gama)/g).map((part, partIndex) => {
                      const prevParts = line.split(/(Gama)/g).slice(0, partIndex).join("");
                      const partInTyped = i < currentLineIndex 
                        ? part 
                        : part.slice(0, Math.max(0, currentCharIndex - prevParts.length));
                      
                      if (part === "Gama") {
                        return (
                          <span key={partIndex} className="text-stone-500">
                            {partInTyped}
                          </span>
                        );
                      }
                      return <span key={partIndex}>{partInTyped}</span>;
                    })}
                    
                    {(i < currentLineIndex || (i === currentLineIndex && currentCharIndex <= lines[i].length)) && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className={`inline-block w-[4px] h-[0.9em] bg-stone-900 translate-y-[0.1em] ml-1 ${
                          (isFinished && i === lines.length - 1) || (!isFinished && i === currentLineIndex) 
                            ? "opacity-100" 
                            : "opacity-0"
                        }`}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/projects"
            className="group flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-black hover:shadow-xl active:scale-[0.98]"
          >
            {t("hero_primary_button")}
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </Link>
          <Link
            href="/about"
            className="group flex items-center gap-2 rounded-full bg-stone-100 border border-stone-200 px-8 py-3.5 text-[15px] font-medium text-stone-600 transition-all hover:bg-stone-200 hover:text-stone-900 active:scale-[0.98]"
          >
            <User className="w-4 h-4 text-stone-400 group-hover:text-stone-600 transition-colors" />
            {t("hero_secondary_button")}
          </Link>
        </motion.div>
      </section>

      {/* SCROLL REVEAL VIDEO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 z-20 gap-16">
        <motion.div 
          style={{ scale: springScale, opacity, y }}
          className="relative w-full max-w-6xl aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
        >
          <div className="absolute inset-0 bg-stone-900/50" />
          <iframe 
            className="w-full h-full relative z-10 opacity-80"
            src="https://www.youtube.com/embed/Ecq2kcubTnY?autoplay=1&mute=1&loop=1&playlist=Ecq2kcubTnY&controls=0&modestbranding=1&rel=0" 
            title="Hero Video"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          />
          
          <div className="absolute bottom-8 right-8 z-20">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-3 hover:bg-white/20 transition-colors cursor-pointer border border-white/10">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          </div>
        </motion.div>

        {/* DOCK */}
        <motion.div
          style={{ opacity, y: useTransform(scrollYProgress, [0.3, 0.6], [50, 0]) }}
          className="flex items-center gap-2 p-3 bg-stone-100/40 backdrop-blur-2xl rounded-3xl border border-stone-200/50 shadow-2xl"
        >
          {dockIcons.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-2xl bg-white shadow-sm cursor-pointer border border-stone-200/50 hover:shadow-md transition-shadow group`}
            >
              <item.icon className={`w-6 h-6 ${item.color} group-hover:brightness-110 transition-all`} />
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Spacer to allow scrolling */}
      <div className="h-[20vh]" />
    </div>
  );
}