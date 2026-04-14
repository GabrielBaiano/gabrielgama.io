"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useAnimationFrame, useMotionValue } from "framer-motion";
import { Link } from "@/i18n/routing";
import {
  User,
  ArrowRight,
  Play,
  LayoutGrid,
  Layers,
  FileText,
  Terminal,
  Folder,
  BarChart3,
  Compass,
  Zap,
  Search,
  ChevronLeft,
  ChevronRight,
  Mail,
  Linkedin,
  Feather,
  Code,
  Globe,
  Copy,
  UserPlus,
  Send,
  X,
  Sparkles,
  MousePointer2,
  Pointer
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
      const baseDelay = Math.max(3, 800 / text.length);
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, baseDelay + Math.random() * (baseDelay * 0.5));
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

// WAVE ICON COMPONENT
function WaveIcon({ item, index, waveTime, hoveredIndex, setHoveredIndex, waveHovered }: any) {
  const y = useTransform(waveTime, (time: number) => {
    const phase = (index / 12) * Math.PI * 2;
    const current = (time / 5000) * Math.PI * 2;
    return Math.sin(current + phase) * 35;
  });

  const isHovered = hoveredIndex === index;

  return (
    <motion.div 
      className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FAFAFA] border border-stone-200/80 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0 cursor-pointer ${index > 17 ? 'hidden 2xl:flex' : ''}`}
      style={{ y }}
      onMouseEnter={() => {
        setHoveredIndex(index);
        waveHovered.current = true;
      }}
      onMouseLeave={() => {
        setHoveredIndex(null);
        waveHovered.current = false;
      }}
    >
      <img src={`https://cdn.simpleicons.org/${item.brand}/44403c`} alt={item.name} className="w-7 h-7 md:w-9 md:h-9 opacity-90 object-contain" />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div 
             initial={{ opacity: 0, y: 10, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 5, scale: 0.95 }}
             className="absolute -top-12 px-3 py-1.5 bg-stone-900 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-xl flex items-center justify-center pointer-events-none z-50"
          >
             {item.name}
             <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AIPromptWidget() {
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const text = "Generate a semantic login component...";
    let i = 0;
    setIsTyping(true);
    const interval = setInterval(() => {
      setPrompt(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setTimeout(() => setIsTyping(false), 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white/60 backdrop-blur-xl rounded-[20px] border border-stone-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-transparent z-0 pointer-events-none" />
      <div className="flex flex-col gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500 fill-purple-500/20" />
          <span className="text-[11px] font-semibold tracking-wide text-purple-700 uppercase bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100/50">AI Copilot</span>
        </div>
        
        <div className="flex items-center gap-3 bg-white/80 rounded-[14px] p-2 border border-stone-200/50 shadow-inner overflow-hidden">
          <div className="text-[13px] font-mono text-stone-500 w-full flex items-center h-6 px-1 truncate">
            {prompt}
            {isTyping && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-1.5 h-3.5 bg-purple-500 ml-0.5" />}
          </div>
          <div className="w-8 h-8 bg-black rounded-[10px] flex items-center justify-center shadow-md shrink-0 hover:scale-105 transition-transform cursor-pointer">
             <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    </div>
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

function SolidSend({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function ShareWidget() {
  const [isPublic, setIsPublic] = useState(false);
  const [email, setEmail] = useState("");
  const [chips, setChips] = useState<string[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);
  const [cursorType, setCursorType] = useState<"arrow" | "pointer">("arrow");
  const [ghostPress, setGhostPress] = useState<"toggle" | "invite" | "remove" | null>(null);

  const [interacted, setInteracted] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(widgetRef, { margin: "0px", amount: 0.5, once: true });

  useEffect(() => {
    if (interacted || !isInView) return;

    let isMounted = true;
    let timeouts: NodeJS.Timeout[] = [];
    let typingInterval: NodeJS.Timeout;

    const cycle = () => {
      if (!isMounted || interacted) return;
      
      // Clean slate
      setIsPublic(false);
      setEmail("");
      setChips([]);
      setInvitedUsers([]);
      setCursorType("arrow");

      // 0.5s: Hover Toggle
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) setCursorType("pointer");
      }, 500));

      // 1.6s: Click Toggle
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) {
          setGhostPress("toggle");
          setIsPublic(true);
        }
      }, 1590));
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) setGhostPress(null);
      }, 1700));

      // 2.0s: Leave Toggle
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) setCursorType("arrow");
      }, 2000));

      // 3.3s: Click Input and Type
      timeouts.push(setTimeout(() => {
        if (!isMounted || interacted) return;
        let i = 0;
        const text = "ux@gama.io "; // Trailing space triggers natural evaluation
        typingInterval = setInterval(() => {
          if (!isMounted || interacted) {
            clearInterval(typingInterval);
            return;
          }
          setEmail(text.substring(0, i + 1));
          i++;
          if (i >= text.length) clearInterval(typingInterval);
        }, 100);
      }, 3300));
      
      // 6.4s: Hover Invite
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) setCursorType("pointer");
      }, 6400));

      // 6.6s: Click Invite
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) {
          setGhostPress("invite");
          setInvitedUsers(["ux@gama.io"]);
          setChips([]);
          setEmail("");
        }
      }, 6600));
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) setGhostPress(null);
      }, 6700));
      
      // 7.0s: Leave Invite
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) setCursorType("arrow");
      }, 7000));
      
      // 8.1s: Hover Remove
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) setCursorType("pointer");
      }, 8100));

      // 8.3s: Click Remove
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) {
          setGhostPress("remove");
          setInvitedUsers([]);
        }
      }, 8300));
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) setGhostPress(null);
      }, 8400));
      
      // 8.8s: Leave Remove
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) setCursorType("arrow");
      }, 8800));
      
      // 9.9s: Hover Toggle OFF
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) setCursorType("pointer");
      }, 9900));

      // 10.1s: Click Toggle OFF
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) {
          setGhostPress("toggle");
          setIsPublic(false);
        }
      }, 10100));
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) setGhostPress(null);
      }, 10200));
      
      // 11.0s: Leave Toggle
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) setCursorType("arrow");
      }, 11000));

      // 14.0s: Repeat
      timeouts.push(setTimeout(() => {
        if (isMounted && !interacted) cycle();
      }, 14000));
    };

    timeouts.push(setTimeout(cycle, 500));

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
      clearInterval(typingInterval);
    };
  }, [interacted, isInView]);

  // Automatically "recognize" if it's a valid email or specific trigger
  useEffect(() => {
    const handler = setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email.trim())) {
        setChips(prev => {
          if (!prev.includes(email.trim())) {
            return [...prev, email.trim()];
          }
          return prev;
        });
        setEmail("");
      }
    }, 1200);

    return () => clearTimeout(handler);
  }, [email]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (email.trim()) {
        setChips([...chips, email.trim()]);
        setEmail("");
      }
    } else if (e.key === 'Backspace' && email === '' && chips.length > 0) {
      setChips(chips.slice(0, -1));
    }
  };

  const handleInvite = () => {
    const toInvite = [...chips];
    if (email.trim()) {
      toInvite.push(email.trim());
    }
    if (toInvite.length > 0) {
      setInvitedUsers([...invitedUsers, ...toInvite]);
      setChips([]);
      setEmail("");
    }
  };

  return (
    <div 
      ref={widgetRef}
      className="w-[490px] bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-stone-200/60 p-6 text-left flex flex-col z-10 transition-transform duration-500 relative"
      onMouseEnter={() => setInteracted(true)}
      onTouchStart={() => setInteracted(true)}
    >
      {!interacted && isInView && (
        <motion.div
          initial={{ opacity: 0, left: "70%", top: 350 }}
          animate={{
            opacity: [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
            left:    ["70%","90%","90%","90%","90%","30%","30%","30%","30%","86%","86%","86%","86%","88%","88%","88%","88%","90%","90%","90%","90%","70%","70%"],
            top:     [ 350, 85, 85, 85, 85, 265, 265, 265, 265, 265, 265, 265, 265, 345, 345, 345, 345, 85, 85, 85, 85, 350, 350 ],
            scale:   [ 1, 1, 1, 0.8, 1, 1, 0.8, 1, 1, 1, 0.8, 1, 1, 1, 0.8, 1, 1, 1, 0.8, 1, 1, 1, 1 ]
          }}
          transition={{
            duration: 14,
            times:   [ 0, 0.035, 0.107, 0.114, 0.121, 0.2, 0.228, 0.235, 0.414, 0.464, 0.471, 0.478, 0.55, 0.585, 0.592, 0.6, 0.678, 0.714, 0.721, 0.728, 0.785, 0.857, 1 ],
            repeat: Infinity,
          }}
          className="absolute z-50 pointer-events-none origin-top-left"
          style={{ width: 28, height: 28 }}
        >
          {cursorType === "pointer" ? (
            <Pointer className="w-8 h-8 text-white fill-black drop-shadow-lg" strokeWidth={1.5} />
          ) : (
            <MousePointer2 className="w-8 h-8 text-white fill-black drop-shadow-lg" strokeWidth={1.5} />
          )}
        </motion.div>
      )}

      {/* Share Section */}
      <div className="flex flex-col">
        <h3 className="font-semibold text-stone-900 text-[18px] tracking-tight pb-3">Share</h3>
        <div className="bg-[#f4f4f5] rounded-[20px] p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-[14px] p-2.5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-stone-100">
              <Globe className="w-5 h-5 text-stone-500" strokeWidth={2.2} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-stone-900 text-[15px] leading-tight">Anyone</span>
              <span className="text-stone-500 text-[13px] leading-tight">Everyone with link can access</span>
            </div>
          </div>
          {/* Toggle */}
          <button 
            onClick={() => setIsPublic(!isPublic)}
            className={`relative w-[44px] h-[24px] rounded-full transition-all duration-300 ${isPublic ? 'bg-[#18181b]' : 'bg-[#e4e4e7]'} ${ghostPress === "toggle" ? "scale-90" : "scale-100"}`}
          >
            <motion.div 
              initial={false}
              animate={{ x: isPublic ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 600, damping: 35 }}
              className="absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full shadow-sm"
            />
          </button>
        </div>
        
        <div className="h-px bg-stone-100 w-full mt-4 mb-3" />
        
        <div className="flex items-center justify-between px-1">
          <span className="text-stone-400 text-[13.5px] truncate pr-4 font-mono font-medium">acme.com/enterprise/note/453</span>
          <button className="text-stone-400 hover:text-stone-600 transition-colors active:scale-95">
            <Copy className="w-[18px] h-[18px]" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Invite Section */}
      <AnimatePresence>
        {isPublic && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Wrapper to control padding/margins smoothly within the animated expanding height */}
            <div className="pt-6 pb-2 flex flex-col gap-3">
              <div className="h-px bg-stone-100 w-full mb-1" />
              <h3 className="font-medium text-stone-600 text-[14px]">Invite</h3>
              
              <div className="flex items-center justify-between border-2 border-stone-200 focus-within:border-black transition-colors bg-white p-1 rounded-xl group">
                <div className="flex items-center gap-2 pl-2 pr-1 w-full flex-wrap">
                  <UserPlus strokeWidth={2.5} className="w-[18px] h-[18px] text-stone-400 shrink-0 group-focus-within:text-stone-600 transition-colors" />
                  
                  {chips.map((chip, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 border border-stone-200 bg-white rounded-full py-0.5 px-1 pr-2 shadow-sm">
                      <img src={`https://i.pravatar.cc/150?u=${chip}`} alt="Avatar" className="w-[22px] h-[22px] rounded-full object-cover bg-blue-100" />
                      <span className="text-[13px] font-medium text-stone-700 pl-0.5">
                        {chip.split('@')[0].charAt(0).toUpperCase() + chip.split('@')[0].slice(1)}
                      </span>
                      <button 
                        onClick={() => setChips(chips.filter((_, i) => i !== idx))}
                        className="text-stone-400 hover:text-stone-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <input 
                    type="text" 
                    placeholder={chips.length === 0 ? "Enter email to share" : ""}
                    className="bg-transparent border-none outline-none text-[14px] flex-1 min-w-[60px] text-stone-900 placeholder:text-stone-400 py-1.5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <button 
                  onClick={handleInvite}
                  className={`bg-black text-white px-4 py-2 rounded-lg text-[13px] font-medium flex items-center gap-1.5 transition-all shrink-0 ${ghostPress === "invite" ? "scale-90 bg-stone-800" : "hover:bg-stone-800 scale-100"}`}
                >
                  <SolidSend className="w-3.5 h-3.5" />
                  Invite
                </button>
              </div>

              <AnimatePresence>
                {invitedUsers.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 flex flex-col gap-2">
                      {invitedUsers.map((user, idx) => (
                        <div key={idx} className="flex items-center justify-between border border-stone-100 rounded-xl p-2.5 bg-stone-50">
                          <div className="flex items-center gap-3">
                            <img src={`https://i.pravatar.cc/150?u=${user}`} alt="Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm bg-stone-200 border border-stone-200/50" />
                            <div className="flex flex-col gap-0.5">
                              <span className="font-semibold text-stone-900 text-[14.5px] leading-none">
                                {user.split('@')[0].charAt(0).toUpperCase() + user.split('@')[0].slice(1)}
                              </span>
                              <span className="text-stone-500 text-[13px] leading-tight">{user}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => setInvitedUsers(invitedUsers.filter((_, i) => i !== idx))}
                            className={`text-[13px] font-medium transition-all pr-1 py-1 px-2 rounded-md ${ghostPress === "remove" ? "scale-90 text-red-500 bg-red-50" : "text-stone-400 hover:text-red-500 hover:bg-stone-100"}`}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="min-w-[320px] md:min-w-[880px] flex-shrink-0">
      <motion.div
        className={`relative aspect-[16/9] ${project.color} rounded-[3rem] overflow-hidden border border-stone-100/50 shadow-sm transition-colors transition-shadow duration-700`}
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

function AutoPlayVideo({ src, className }: { src: string, className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { margin: "200px 0px" });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      className={className}
    />
  );
}

function MobileShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32 space-y-16 border-t border-stone-100">
      
      {/* Section Title */}
      <div className="max-w-4xl">
        <h2 className="text-5xl md:text-[60px] lg:text-[72px] font-medium tracking-tight text-stone-900 leading-[1.05]">
          <TypingText text="Crafting Mobile Experiences" />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        
        {/* Left Column */}
        <div className="flex flex-col gap-10">
          {/* Phone Mockup Frame */}
          <div className="w-full max-w-[500px] lg:max-w-[540px] aspect-[720/1560] bg-stone-300 rounded-[32px] md:rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-[8px] md:border-[12px] border-stone-300 relative overflow-hidden">
             <AutoPlayVideo 
               src="/mockup01.mp4" 
               className="absolute inset-0 w-full h-full object-cover"
             />
          </div>
          
          <div className="flex flex-col gap-5 w-full">
            <h4 className="text-2xl lg:text-3xl font-medium tracking-tight text-stone-900">Fluid & Native Experiences.</h4>
            <div className="flex flex-col gap-5 text-stone-500 text-lg leading-relaxed">
              <p>
                I build mobile applications that prioritize intuitive UX and seamless navigation. Whether it's a sleek educational platform or a complex productivity tool.
              </p>
              <p>
                My focus is always on creating distraction-free interfaces where every interaction feels fluid, modern, and perfectly tailored to the device.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-10 md:mt-[200px]">
          <div className="flex flex-col gap-5 w-full">
            <h4 className="text-2xl lg:text-3xl font-medium tracking-tight text-stone-900">Engaging Micro-Interactions.</h4>
            <div className="flex flex-col gap-5 text-stone-500 text-lg leading-relaxed">
              <p>
                Great usability is fundamentally found in the details. I specialize in crafting effortless user flows and deep micro-interactions that bring digital products to life.
              </p>
              <p>
                By combining thoughtful motion design with intuitive architecture, I ensure users stay deeply engaged from their very first swipe.
              </p>
            </div>
          </div>

          {/* Phone Mockup Frame */}
          <div className="w-full max-w-[500px] lg:max-w-[540px] aspect-[720/1560] bg-stone-300 rounded-[32px] md:rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-[8px] md:border-[12px] border-stone-300 relative overflow-hidden">
             <AutoPlayVideo 
               src="/mockup02.mp4" 
               className="absolute inset-0 w-full h-full object-cover"
             />
          </div>
        </div>

      </div>
    </section>
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

  // Global Wave Time Controller
  const waveTime = useMotionValue(0);
  const waveHovered = useRef(false);
  const [hoveredWaveIndex, setHoveredWaveIndex] = useState<number | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useAnimationFrame((t, delta) => {
    // 0.15 makes it run at 15% speed (SUPER slow) when hovering ANY ball inside the section
    waveTime.set(waveTime.get() + (waveHovered.current ? delta * 0.15 : delta));
  });

  const waveStack = [
    { brand: "figma", name: "Figma" },
    { brand: "react", name: "React" },
    { brand: "javascript", name: "JavaScript" },
    { brand: "typescript", name: "TypeScript" },
    { brand: "nodedotjs", name: "Node.js" },
    { brand: "nextdotjs", name: "Next.js" },
    { brand: "deno", name: "Deno" },
    { brand: "tailwindcss", name: "Tailwind CSS" },
    { brand: "android", name: "Android" },
    { brand: "postman", name: "Postman" },
    { brand: "vercel", name: "Vercel" },
    { brand: "framer", name: "Framer Motion" },
    { brand: "github", name: "GitHub" },
    { brand: "docker", name: "Docker" },
    { brand: "graphql", name: "GraphQL" },
    { brand: "jest", name: "Jest" },
    { brand: "firebase", name: "Firebase" },
    { brand: "supabase", name: "Supabase" },
    // Only shows on ultrawide (2xl)
    { brand: "figma", name: "Figma" },
    { brand: "react", name: "React Native" },
    { brand: "javascript", name: "JavaScript" },
    { brand: "typescript", name: "TypeScript" },
    { brand: "tailwindcss", name: "Tailwind CSS" },
    { brand: "nodedotjs", name: "Node.js" },
  ];



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
      {/* NEW LIGHT HERO GRID SECTION */}
      <section className="relative z-20 w-full pt-12 pb-32">
        
        {/* HERO TITLE & BIO (Side-by-Side) */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-end pt-20 pb-16">
          <h1 className="text-5xl md:text-[60px] lg:text-[72px] font-medium tracking-tight text-stone-900 leading-[1.05]">
            <TypingText text="Hi, I am a Frontend Software Engineer." />
          </h1>
          <div className="text-lg text-stone-500 leading-relaxed max-w-xl lg:pb-2">
            <TypingText text="With 4+ years of experience, I am a software engineer passionate about creating scalable, high-performance web applications. Focused on blending meticulous design with robust architecture using React, Next.js, TypeScript, and modern tools to deliver exceptional digital experiences." delay={300} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start pb-24 pt-4">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-4">
              <div className="w-full bg-white rounded-[5px] border border-stone-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden relative">
                <img 
                  src="https://i.pinimg.com/originals/ab/34/21/ab3421f81bf6b5253793fe83c29cfd19.gif" 
                  className="w-full h-auto" 
                  alt="Music Player" 
                />
              </div>
              <div className="px-1">
                <h3 className="text-stone-900 font-semibold text-[17px]">Music Player</h3>
                <p className="text-stone-500 text-[11px] uppercase tracking-[0.15em] font-semibold mt-1">Interactive Interface</p>
              </div>
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-4">
              <div className="w-full bg-white rounded-[5px] border border-stone-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden relative">
                <img 
                  src="https://i.pinimg.com/originals/ec/f3/a1/ecf3a12f3413df7a79e40cf90c41b028.gif" 
                  className="w-full h-auto" 
                  alt="Interface Interaction" 
                />
              </div>
              <div className="px-1">
                <h3 className="text-stone-900 font-semibold text-[17px]">Dynamic Calendar</h3>
                <p className="text-stone-500 text-[11px] uppercase tracking-[0.15em] font-semibold mt-1">System Design</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WAVE TOOLS SECTION (Omitted for now per user request) */}



      {/* AGENTIC ERA FEATURE SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-32 space-y-32">
        <div className="max-w-7xl">
          <h2 className="text-5xl md:text-[60px] lg:text-[72px] font-medium tracking-tight text-stone-900 leading-[1.05]">
            <TypingText text={t("agentic_era_title")} />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-[52px] font-medium tracking-tight text-stone-900 leading-[1.1]">
                <TypingText text={t("agentic_era_subtitle")} delay={200} />
              </h3>
              <p className="text-xl text-stone-600 leading-relaxed max-w-xl">
                <TypingText text={t("agentic_era_description")} delay={400} />
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 2.7 }}
              className="flex items-center gap-4 pt-2"
            >
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <div className="text-sm font-medium text-stone-900">Intelligent Workflows</div>
                <div className="text-xs text-stone-500 italic">Automating UI components creation and logic</div>
              </div>
            </motion.div>
          </div>

          <div className="relative w-full pb-8 md:pb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <CodeWindow />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-10 -right-2 md:-right-8 w-[90%] md:w-[85%] z-10"
            >
              <AIPromptWidget />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CRAFTING VISUAL COMPONENTS FEATURE SECTION (STANDARDIZED DESIGN) */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left side visually (Reversed order on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 flex items-center justify-center min-h-[400px] w-full"
          >
            <div className="scale-110 md:scale-[1.15] origin-center">
              <ShareWidget />
            </div>
          </motion.div>

          {/* Right side text */}
          <div className="space-y-8 order-1 lg:order-2 pl-0 lg:pl-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-[52px] font-medium tracking-tight text-stone-900 leading-[1.1]">
                <TypingText text="Crafting Visual Components" delay={150} />
              </h2>
              <p className="text-[19px] md:text-xl text-stone-600 leading-relaxed">
                <TypingText text="I build beautiful, interactive UI components directly into the application, reducing dependency overhead while ensuring pixel-perfect fidelity." delay={300} />
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
                <Code className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <div className="text-sm font-medium text-stone-900">Reusable & Configurable</div>
                <div className="text-xs text-stone-500 italic">Built primarily with Tailwind and Framer Motion</div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* FLUID MICRO-INTERACTIONS FEATURE SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-[52px] font-medium tracking-tight text-stone-900 leading-[1.1]">
                <TypingText text="Fluid Micro-Interactions" delay={150} />
              </h3>
              <p className="text-[19px] md:text-xl text-stone-600 leading-relaxed max-w-lg">
                <TypingText text="Every great digital product relies on details that elevate the experience. Small animations and well-crafted physics make interfaces feel natural and engaging." delay={300} />
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
                <Play className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
              </div>
              <div>
                <div className="text-sm font-medium text-stone-900">Motion & Physics</div>
                <div className="text-xs text-stone-500 italic">Spring animations feeling alive and responsive</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center w-full"
          >
            <div className="w-full max-w-[840px] rounded-3xl border border-stone-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden bg-stone-50 relative group flex">
                <video 
                  src="/PinDown.io_@max0743_1776060477.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-auto block scale-[1.01] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
            </div>
          </motion.div>

        </div>
      </section>

      {/* MOBILE SHOWCASE SECTION */}
      <MobileShowcase />

      {/* PROJECT SHOWCASE SECTION */}
      <section className="max-w-[100vw] overflow-hidden py-32 space-y-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
          <h2 className="text-5xl md:text-[60px] lg:text-[72px] font-medium tracking-tight text-stone-900 leading-[1.05]">
            <TypingText text={t("showcase_title")} />
          </h2>
          <p className="text-[19px] md:text-xl text-stone-600 leading-relaxed max-w-md pb-4">
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
          <h2 className="text-5xl md:text-[60px] lg:text-[72px] font-medium tracking-tight text-stone-900 leading-[1.05]">
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