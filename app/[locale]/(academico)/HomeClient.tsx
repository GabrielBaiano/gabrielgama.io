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
    <div className="min-w-[320px] md:min-w-[880px] flex-shrink-0">
      <motion.div
        className={`relative aspect-[16/9] ${project.color} rounded-[3rem] overflow-hidden border border-stone-100/50 shadow-sm transition-all duration-700`}
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
          <div className="bg-white/10 backdrop-blur-md rounded-full p-2.5 border border-white/10">
            <Play className="w-5 h-5 text-white/50" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BlogCard({ blog }: { blog: any }) {
  return (
    <div className="flex flex-col gap-6 w-[300px] shrink-0 group">
      <div className={`aspect-square ${blog.image} rounded-3xl overflow-hidden relative flex items-center justify-center border border-stone-100 shadow-sm group-hover:shadow-md transition-shadow duration-500`}>
        {/* Mock background pattern / grain */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
        
        {/* Central visual element */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <blog.icon className="w-12 h-12 text-white/30" />
          <div className="text-white/20 text-[10px] font-mono tracking-widest uppercase">{blog.category}</div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </div>
      
      <div className="space-y-3">
        <h4 className="text-[19px] font-medium text-stone-900 leading-snug group-hover:text-stone-600 transition-colors">
          {blog.title}
        </h4>
        <div className="flex items-center gap-2 text-[13px] text-stone-400">
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.category}</span>
        </div>
        <Link href={blog.href || "/blog"} className="inline-flex items-center gap-1.5 text-[14px] text-stone-500 hover:text-stone-900 transition-colors pt-1 group/link">
          Read blog
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
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

import type { BlogPostData } from "../../../services/blogService";

export function InstitucionalHomePage({ initialBlogs }: { initialBlogs: BlogPostData[] }) {
  const t = useTranslations("Index");
  const fullText = t("hero_title");
  const lines = fullText.split('\n');

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const projects = [
    {
      title: "Frontend developer",
      description: "Streamline UX development by leveraging browser-in-the-loop agents to automate repetitive tasks.",
      color: "bg-indigo-500/10"
    },
    {
      title: "Product Designer",
      description: "Crafting intuitive and aesthetically pleasing interfaces for a global audience.",
      color: "bg-rose-500/10"
    },
    {
      title: "System Architect",
      description: "Building scalable and resilient backends that support high-performance web applications.",
      color: "bg-emerald-500/10"
    },
  ];

  const mockBlogs = [
    {
      title: "Gemini 3.1 Pro in Google Antigravity",
      date: "Feb 19, 2026",
      category: "Product",
      image: "bg-indigo-950",
      icon: LayoutGrid
    },
    {
      title: "Gemini 3 Flash in Google Antigravity",
      date: "Dec 17, 2025",
      category: "Product",
      image: "bg-blue-950",
      icon: Zap
    },
    {
      title: "Nano Banana Pro in Google Antigravity",
      date: "Nov 20, 2025",
      category: "Product",
      image: "bg-orange-950",
      icon: Layers
    },
    {
      title: "Introducing Google Antigravity",
      date: "Nov 18, 2025",
      category: "Product",
      image: "bg-stone-900",
      icon: Compass
    }
  ];

  const colors = ["bg-[#1E1B4B]", "bg-[#064E3B]", "bg-[#451A03]", "bg-stone-900"];
  const icons = [Feather, Terminal, FileText, Compass];

  const blogs = initialBlogs && initialBlogs.length > 0 
    ? initialBlogs.map((b, i) => ({
      title: b.title,
      date: b.timeAgo,
      category: b.category || "General",
      image: colors[i % colors.length],
      icon: icons[i % icons.length],
      href: `/blog/${b.id}`
    })) 
    : mockBlogs;

  const nextProject = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const [blogActiveIndex, setBlogActiveIndex] = useState(0);
  const nextBlog = () => setBlogActiveIndex((prev) => (prev + 1) % blogs.length);
  const prevBlog = () => setBlogActiveIndex((prev) => (prev - 1 + blogs.length) % blogs.length);

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
                className="p-1.5 rounded-full bg-stone-50 border border-stone-100 hover:bg-stone-100 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 text-stone-600" />
              </button>
              <button
                onClick={nextProject}
                className="p-1.5 rounded-full bg-stone-50 border border-stone-100 hover:bg-stone-100 transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 text-stone-600" />
              </button>
            </div>
          </div>

          <p className="text-lg text-stone-500 max-w-2xl leading-relaxed">
            {projects[activeIndex].description}
          </p>

          <div className="pt-2">
            <Link href="/projects" className="inline-flex items-center gap-2 text-stone-900 font-medium hover:underline transition-all text-base group/link">
              {t("showcase_view_case")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="max-w-[100vw] overflow-hidden py-32 space-y-12">
        <div className="max-w-7xl mx-auto px-6 flex items-end justify-between">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-stone-900">
            Latest Blogs
          </h2>
          <Link 
            href="/blog" 
            className="px-6 py-2.5 rounded-full bg-stone-50 border border-stone-100 text-stone-600 font-medium text-sm hover:bg-stone-100 hover:text-stone-900 transition-all"
          >
            View blog
          </Link>
        </div>

        <div className="relative w-full overflow-hidden">
          <motion.div
            animate={{ x: -blogActiveIndex * 332 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex gap-8 pl-6 md:pl-[calc((100vw-80rem)/2+1.5rem)]"
          >
            {blogs.map((blog, i) => (
              <BlogCard key={i} blog={blog} />
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3">
            <button
              onClick={prevBlog}
              className="p-2 rounded-full bg-stone-50 border border-stone-100 hover:bg-stone-100 transition-colors"
              aria-label="Previous blog"
            >
              <ChevronLeft className="w-4 h-4 text-stone-600" />
            </button>
            <button
              onClick={nextBlog}
              className="p-2 rounded-full bg-stone-50 border border-stone-100 hover:bg-stone-100 transition-colors"
              aria-label="Next blog"
            >
              <ChevronRight className="w-4 h-4 text-stone-600" />
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