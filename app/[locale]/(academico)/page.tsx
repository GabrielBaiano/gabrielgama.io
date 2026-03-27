"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
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
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

function TypingText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => setIsStarted(true), delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, delay]);

  useEffect(() => {
    if (isStarted && displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 15 + Math.random() * 20);
      return () => clearTimeout(timeout);
    }
  }, [isStarted, displayedText, text]);

  return (
    <span ref={ref} className={className}>
      {displayedText}
      {isStarted && displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-[2px] h-[1em] bg-stone-900 ml-1 translate-y-[0.1em]"
        />
      )}
    </span>
  );
}

function CodeWindow() {
  return (
    <div className="w-full bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden font-mono text-[13px] leading-relaxed">
      <div className="flex items-center gap-2 px-4 py-3 bg-stone-50 border-b border-stone-200">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
        </div>
        <div className="text-[11px] text-stone-400 ml-2">LoginButton.tsx</div>
      </div>
      <div className="p-6 overflow-x-auto">
        <pre className="text-stone-800">
          <code>
            <span className="text-purple-500">import</span> Link <span className="text-purple-500">from</span> <span className="text-emerald-600">'next/link'</span>;<br /><br />
            <span className="text-purple-500">export default function</span> <span className="text-blue-600">LoginButton</span>() &#123;<br />
            &nbsp;&nbsp;<span className="text-purple-500">return</span> (<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-600">Link</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;href=<span className="text-emerald-600">"/api/auth/login"</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className=<span className="text-emerald-600">"rounded-full bg-orange-500..."</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login with Strava<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-blue-600">Link</span>&gt;<br />
            &nbsp;&nbsp;);<br />
            &#125;
          </code>
        </pre>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="min-w-[320px] md:min-w-[1100px] space-y-6 group cursor-pointer">
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="relative aspect-[16/10] bg-stone-100 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-stone-100"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
        
        <div className="absolute inset-0 flex items-center justify-center bg-stone-50">
          <Layers className="w-16 h-16 text-stone-100" />
        </div>
        
        <div className="absolute bottom-12 left-12 z-20">
          <h4 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-tight max-w-lg">
            {project.title}
          </h4>
        </div>
        
        <div className="absolute bottom-12 right-12 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="bg-white/10 backdrop-blur-xl rounded-full p-4 border border-white/20">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const noScrollbarStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

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

  const projects = [
    { title: "Frontend developer" },
    { title: "Product Designer" },
    { title: "System Architect" },
  ];

  // Hero animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  // Video animations
  const videoScale = useTransform(scrollYProgress, [0, 0.3], [0.75, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const videoY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const springVideoScale = useSpring(videoScale, { stiffness: 100, damping: 20 });

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
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="flex h-screen flex-col items-center justify-center p-6 text-center overflow-hidden"
      >
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

              <div className="absolute inset-0 flex justify-center items-center whitespace-nowrap text-center">
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
                    
                    {((!isFinished && i === currentLineIndex) || (isFinished && i === lines.length - 1)) && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-[4px] h-[0.9em] bg-stone-900 translate-y-[0.1em] ml-1"
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
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/about"
            className="group flex items-center gap-2 rounded-full bg-stone-100 border border-stone-200 px-8 py-3.5 text-[15px] font-medium text-stone-600 transition-all hover:bg-stone-200 hover:text-stone-900 active:scale-[0.98]"
          >
            <User className="w-4 h-4 text-stone-400 group-hover:text-stone-600 transition-colors" />
            {t("hero_secondary_button")}
          </Link>
        </motion.div>
      </motion.section>

      {/* SCROLL REVEAL VIDEO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 md:p-12 z-20 overflow-visible">
        <motion.div 
          style={{ scale: springVideoScale, opacity: videoOpacity, y: videoY }}
          className="relative w-full max-w-7xl aspect-video bg-black rounded-[3rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.3)]"
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
      </section>

      {/* AGENTIC ERA FEATURE SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-32 space-y-32">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-stone-900 leading-[1.1]">
            <TypingText text={t("agentic_era_title")} />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-medium text-stone-900">
                <TypingText text={t("agentic_era_subtitle")} delay={1000} />
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
                <TypingText text={t("agentic_era_description")} delay={1500} />
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div className="text-sm font-medium text-stone-900">Next-gen Performance</div>
                <div className="text-xs text-stone-500 italic">Optimized for search engine visibility and user experience</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <CodeWindow />
          </motion.div>
        </div>
      </section>

      {/* PROJECT SHOWCASE SECTION */}
      <section className="max-w-[100vw] overflow-hidden py-32 space-y-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-stone-900 leading-[1.1] max-w-xl">
            <TypingText text={t("showcase_title")} />
          </h2>
          <p className="text-lg text-stone-500 leading-relaxed max-w-md pb-2">
            <TypingText text={t("showcase_description")} delay={1000} />
          </p>
        </div>

        <div className="flex gap-8 overflow-x-auto px-6 md:px-[calc((100vw-80rem)/2+1.5rem)] pb-12 no-scrollbar">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/projects" className="inline-flex items-center gap-2 text-stone-900 font-medium hover:underline transition-all text-base group/link">
            {t("showcase_view_case")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
          <div className="flex gap-4">
            <button className="p-4 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors">
              <ChevronLeft className="w-6 h-6 text-stone-400" />
            </button>
            <button className="p-4 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors">
              <ChevronRight className="w-6 h-6 text-stone-400" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Final Spacer */}
      <div className="h-[40vh]" />
      <style dangerouslySetInnerHTML={{ __html: noScrollbarStyles }} />
    </div>
  );
}