"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function InstitucionalHomePage() {
  const t = useTranslations("Index");
  const fullText = t("hero_title");
  const lines = fullText.split('\n');

  const [displayedLines, setDisplayedLines] = useState(["", ""]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    if (currentCharIndex < lines[currentLineIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = lines[currentLineIndex].slice(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 50 + Math.random() * 50); // Random delay for realism
      return () => clearTimeout(timeout);
    } else if (currentLineIndex < lines.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 200); // Pause between lines
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentLineIndex, lines]);

  return (
    <main className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center p-6 text-center overflow-hidden bg-background text-foreground selection:bg-stone-200">
      <h1 className="max-w-[95vw] w-full text-4xl font-medium tracking-[-0.05em] text-stone-900 md:text-7xl lg:text-8xl leading-[1.0] font-sans">
        {displayedLines.map((line, i) => (
          <span key={i} className="block whitespace-nowrap min-h-[1.1em]">
            {line.split(/(Gama)/g).map((part, partIndex) => {
              if (part === "Gama") {
                return (
                  <span key={partIndex} className="text-stone-500">
                    {part.split("").map((char, charIndex) => (
                      <span key={charIndex} className="inline-block">
                        {char}
                      </span>
                    ))}
                  </span>
                );
              }
              return (
                <span key={partIndex}>
                  {part.split("").map((char, charIndex) => (
                    <span key={charIndex} className="inline-block">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              );
            })}
            {currentLineIndex === i && currentCharIndex < lines[i].length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[4px] h-[0.9em] bg-stone-900 ml-1 translate-y-[0.1em]"
              />
            )}
            {i === lines.length - 1 && currentCharIndex === lines[i].length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[4px] h-[0.9em] bg-stone-900 ml-1 translate-y-[0.1em]"
              />
            )}
          </span>
        ))}
      </h1>
    </main>
  );
}