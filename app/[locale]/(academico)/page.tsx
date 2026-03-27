"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
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
    <div className="min-w-[320px] md:min-w-[880px] flex-shrink-0">
      <motion.div 
        className={`relative aspect-[16/9] ${project.color} rounded-[3rem] overflow-hidden border border-stone-100 shadow-md transition-all duration-700`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
        
        {/* Large Title Overlay with Typing Effect */}
        <div className="absolute bottom-12 left-12 z-20">
          <h4 className="text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight max-w-lg">
            <TypingText text={project.title} />
          </h4>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <Layers className="w-16 h-16 text-stone-300/20" />
        </div>
        
        <div className="absolute bottom-8 right-8 z-20">
          <div className="bg-white/10 backdrop-blur-md rounded-full p-2.5 border border-white/10 shadow-sm">
            <Play className="w-5 h-5 text-white/50" />
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
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const projects = [
    { 
      title: "Frontend developer", 
      description: "Streamline UX development by leveraging browser-in-the-loop agents to automate repetitive tasks.",
      color: "bg-indigo-50"
    },
    { 
      title: "Product Designer", 
      description: "Crafting intuitive and aesthetically pleasing interfaces for a global audience.",
      color: "bg-rose-50"
    },
    { 
      title: "System Architect", 
      description: "Building scalable and resilient backends that support high-performance web applications.",
      color: "bg-emerald-50"
    },
    { 
      title: "AI Engineer", 
      description: "Developing intelligent systems that learn and adapt to complex challenges.",
      color: "bg-purple-50"
    },
    { 
      title: "DevOps Specialist", 
      description: "Automating and optimizing development workflows for faster, more reliable deployments.",
      color: "bg-yellow-50"
    },
  ];

  const nextProject = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  // Hero animations
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroTranslate = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  // Video portal reveal logic
  const springVideoScale = useSpring(useTransform(scrollYProgress, [0.38, 0.52], [0.95, 1.2]), { stiffness: 100, damping: 30 });
  const videoOpacity = useTransform(scrollYProgress, [0.38, 0.45], [0, 1]);
  const videoY = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);

  const lines = [
    t("presentation_name"),
    t("presentation_role"),
    t("presentation_location")
  ];

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsFinished(true);
      return;
    }

    const currentLine = lines[currentLineIndex];
    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const lineTimeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 1000);
      return () => clearTimeout(lineTimeout);
    }
  }, [currentCharIndex, currentLineIndex, lines]);

  return (
    <div className="relative selection:bg-stone-200">
      {/* Scroll Context Container */}
      <div 
        ref={containerRef}
        className="relative h-[400vh]"
      >
        {/* Sticky viewport content */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          
          {/* Hero Section */}
          <motion.div 
            style={{ opacity: heroOpacity, y: heroTranslate }}
            className="text-center z-10 px-6 max-w-5xl"
          >
            <div className="space-y-4 mb-12">
              {lines.map((line, idx) => (
                <div key={idx} className="h-[1.1em] relative overflow-hidden flex justify-center items-center">
                  <h1 className={cn(
                    "text-5xl md:text-8xl font-bold tracking-tighter leading-[1.1] transition-all duration-700",
                    idx < currentLineIndex ? "text-stone-900 opacity-100" : 
                    idx === currentLineIndex ? "text-stone-900 opacity-100" : "text-stone-200 opacity-0"
                  )}>
                    {idx < currentLineIndex ? line : 
                     idx === currentLineIndex ? line.substring(0, currentCharIndex) : ""}
                    {idx === currentLineIndex && !isFinished && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-[4px] h-[0.9em] bg-stone-900 ml-1 translate-y-[0.1em]"
                      />
                    )}
                    {idx === lines.length - 1 && isFinished && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-[4px] h-[0.9em] bg-stone-900 ml-1 translate-y-[0.1em]"
                      />
                    )}
                  </h1>
                </div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isFinished ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                href="/projects" 
                className="px-8 py-3.5 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-stone-200"
              >
                {t("explore_projects")}
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-3.5 bg-white text-stone-900 rounded-full font-medium border border-stone-200 hover:border-stone-300 transition-all hover:scale-105 active:scale-95"
              >
                {t("see_more")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Video Portal reveal */}
          <motion.div 
            style={{ 
              scale: springVideoScale,
              opacity: videoOpacity,
              y: videoY
            }}
            className="absolute inset-0 z-0 flex items-center justify-center overflow-visible"
          >
            <div className="w-full h-full max-w-7xl px-6 md:p-12">
              <div className="w-full h-full bg-stone-100 rounded-[3rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.3)] relative group cursor-pointer">
                {/* Visual interface for the "IDE" concept */}
                <div className="absolute inset-0 bg-gradient-to-br from-stone-900/10 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-14 bg-white/50 backdrop-blur-md border-b border-stone-200/50 flex items-center px-6 justify-between z-10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="bg-white/80 px-4 py-1 rounded-md text-xs font-mono text-stone-400 border border-stone-100 italic">
                    ~/gabrielgama/portfolio.ts
                  </div>
                </div>
                
                <iframe 
                  className="w-full h-full opacity-90 pointer-events-none grayscale hover:grayscale-0 transition-all duration-1000"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ" 
                  title="Portfolio Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />

                <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-20 h-20 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                    <Play className="w-8 h-8 text-stone-900 fill-stone-900 translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero-like Message (Formerly Bento) */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl space-y-8">
            <TypingText 
              text={t("agentic_era_title")} 
              className="text-4xl md:text-7xl font-bold tracking-tighter text-stone-900 leading-[1.05]" 
            />
            <p className="text-xl md:text-2xl text-stone-500 font-medium max-w-2xl leading-relaxed">
              {t("agentic_era_description")}
            </p>
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 md:p-12 bg-stone-50 rounded-[2.5rem] border border-stone-100 transition-all hover:bg-white hover:shadow-2xl group">
              <Zap className="w-12 h-12 text-stone-900 mb-8 transition-transform group-hover:scale-110" />
              <h3 className="text-3xl font-bold mb-4">{t("feature_1_title")}</h3>
              <p className="text-lg text-stone-500 leading-relaxed">{t("feature_1_description")}</p>
            </div>
            
            <CodeWindow />
          </div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section className="py-32 bg-white space-y-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-end gap-8 mb-4">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-stone-900 leading-[1.05]">
              {t("showcase_title")}
            </h2>
            <p className="text-xl text-stone-500 max-w-md leading-relaxed">
              {t("showcase_description")}
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <motion.div 
            animate={{ x: -activeIndex * 912 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex gap-8 pl-6 md:pl-[calc((100vw-80rem)/2+1.5rem)]"
          >
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 space-y-4 mt-4">
          <div className="flex items-center justify-between max-w-[880px]">
            <h3 className="text-2xl font-bold text-stone-900">
              {projects[activeIndex].title}
            </h3>
            <div className="flex gap-3 pr-2">
              <button 
                onClick={prevProject}
                className="p-1.5 rounded-full bg-stone-100 border border-stone-200 hover:bg-stone-200 transition-colors shadow-sm"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 text-stone-600" />
              </button>
              <button 
                onClick={nextProject}
                className="p-1.5 rounded-full bg-stone-100 border border-stone-200 hover:bg-stone-200 transition-colors shadow-sm"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 text-stone-600" />
              </button>
            </div>
          </div>
          
          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed">
            {projects[activeIndex].description}
          </p>
          
          <div className="pt-1">
            <Link href="/projects" className="inline-flex items-center gap-2 text-stone-900 font-medium hover:underline transition-all text-base group/link">
              {t("showcase_view_case")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Final Spacer */}
      <div className="h-[40vh]" />
      <style dangerouslySetInnerHTML={{ __html: noScrollbarStyles }} />
    </div>
  );
}