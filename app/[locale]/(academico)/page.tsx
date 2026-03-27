"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { User, ArrowRight } from "lucide-react";

export default function InstitucionalHomePage() {
  const t = useTranslations("Index");
  const fullText = t("hero_title");
  const lines = fullText.split('\n');

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

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

  return (
    <main className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center p-6 text-center overflow-hidden bg-background text-foreground selection:bg-stone-200">
      <h1 className="max-w-[95vw] w-full text-4xl font-medium tracking-[-0.05em] text-stone-900 md:text-7xl lg:text-8xl leading-[1.0] font-sans mb-12">
        {lines.map((line, i) => (
          <div key={i} className="relative block h-[1.1em] flex justify-center items-center">
            {/* Hidden layer for layout stability */}
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

            {/* Visible typing layer */}
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
                  
                  {/* Cursor */}
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
    </main>
  );
}