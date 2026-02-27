"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Sparkles, ArrowUpRight, Code2, Mountain, Loader2, Feather, Clock, Linkedin, Terminal } from "lucide-react";
import { ProjectsFolderModal } from "./ProjectsFolderModal";

export function AboutGrid() {
    const t = useTranslations("About");
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const [time, setTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            const now = new Date();
            // Offset for Brazil (UTC-3)
            // Note: In production it's better to use a library like date-fns-tz or Intl.DateTimeFormat
            // but for a simple visual clock we can use Intl to get the current time in BR
            const brTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
            setTime(brTime);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const secondDegrees = (time.getSeconds() / 60) * 360;
    const minuteDegrees = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360;
    const hourDegrees = ((time.getHours() % 12 + time.getMinutes() / 60) / 12) * 360;

    const item: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
    };

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3 md:gap-4 grid-flow-dense max-w-[1200px] mx-auto p-4 auto-rows-[calc((100vw-2.75rem)/2)] md:auto-rows-[calc((100vw-4rem)/4)] lg:auto-rows-[calc((min(100vw,1200px)-13rem)/12)]"
            >
                {/* 1. Folder Card - Corrected Span */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 0.98 }}
                    onClick={() => setIsFolderOpen(true)}
                    className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 lg:row-span-2 relative group cursor-pointer flex flex-col drop-shadow-sm h-full w-full aspect-[2/1] lg:aspect-auto"
                >
                    <div className="w-full h-8 relative z-20 flex" style={{ marginBottom: "-1px" }}>
                        <svg
                            className="ml-6 h-full w-[140px] text-[#94B9FF] group-hover:text-[#9DBEFF] transition-colors fill-current"
                            viewBox="0 0 160 32"
                            preserveAspectRatio="none"
                        >
                            <path d="M 0 32 C 12 32, 16 24, 20 16 C 24 8, 28 0, 40 0 L 120 0 C 132 0, 136 8, 140 16 C 144 24, 148 32, 160 32 Z" />
                        </svg>
                    </div>
                    <div className="w-full h-[calc(100%-2rem)] bg-[#94B9FF] group-hover:bg-[#9DBEFF] transition-colors rounded-[24px] relative shadow-inner overflow-hidden flex flex-col justify-end z-[11] p-4 md:p-5">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 right-4 bg-[#FCE28A] text-yellow-900 px-4 py-2 rounded-full text-xs font-bold shadow-sm flex items-center group-hover:scale-105 transition-transform duration-300">
                            {t("projects")}
                        </div>
                    </div>
                </motion.div>

                {/* 2. Current Position Card (Square proportional to Folder) */}
                <motion.div
                    variants={item}
                    className="col-span-1 md:col-span-1 lg:col-span-3 row-span-1 lg:row-span-2 bg-[#F9F3E9] rounded-[24px] p-5 md:p-6 flex flex-col justify-between shadow-sm border border-stone-200 text-zinc-950 w-full relative overflow-hidden aspect-square lg:aspect-auto"
                >
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">current position</span>
                        <h3 className="text-lg md:text-xl lg:text-[22px] font-bold leading-[1.2] tracking-tight">
                            Software Engineer <br />
                            Front end Pleno
                        </h3>
                        <p className="text-[13px] md:text-sm text-zinc-500 font-semibold mt-1">at Flash</p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-fit bg-zinc-900 text-white px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 hover:bg-zinc-800 transition-colors self-end"
                    >
                        Previous works
                        <ArrowUpRight className="w-3 h-3" />
                    </motion.button>
                </motion.div>

                {/* 4. Vibrant Analog Clock (Green) - Fixed Borders & Hydration */}
                <motion.div
                    variants={item}
                    className="col-span-1 row-span-1 bg-[#B5E180] rounded-[24px] shadow-sm flex items-center justify-center aspect-square relative overflow-hidden group p-1"
                >
                    {mounted && (
                        <>
                            <div className="relative w-[85%] h-[85%] rounded-full bg-white shadow-sm flex items-center justify-center">
                                {/* Clock Center */}
                                <div className="w-1 h-1 rounded-full bg-black/60 z-30" />

                                {/* Hour Hand */}
                                <motion.div
                                    className="absolute bottom-1/2 left-1/2 w-1 h-[30%] bg-black/80 rounded-full origin-bottom"
                                    style={{ rotate: hourDegrees, x: "-50%" }}
                                />

                                {/* Minute Hand */}
                                <motion.div
                                    className="absolute bottom-1/2 left-1/2 w-0.5 h-[40%] bg-black/60 rounded-full origin-bottom"
                                    style={{ rotate: minuteDegrees, x: "-50%" }}
                                />

                                {/* Second Hand */}
                                <motion.div
                                    className="absolute bottom-1/2 left-1/2 w-0.5 h-[45%] bg-red-500 rounded-full origin-bottom"
                                    style={{ rotate: secondDegrees, x: "-50%" }}
                                />
                            </div>

                            {/* Hover Info (Compact) */}
                            <div className="absolute inset-0 bg-[#B5E180]/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none px-1 text-center">
                                <span className="text-[10px] font-bold text-black/80 leading-none">
                                    {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                                <span className="text-[8px] font-bold text-black/40 uppercase tracking-tighter mt-1">GMT-3</span>
                            </div>
                        </>
                    )}
                </motion.div>

                {/* 4. GitHub Square (1x1) */}
                <motion.a
                    variants={item}
                    href="https://github.com/GabrielBaiano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-1 row-span-1 bg-black rounded-[24px] shadow-sm flex items-center justify-center aspect-square group cursor-pointer hover:bg-zinc-900 transition-colors"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-14 h-14 text-white group-hover:scale-110 transition-transform fill-current"
                    >
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.137 20.161 22 16.415 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                </motion.a>

                {/* 3. Orange About me Card */}
                <motion.div
                    variants={item}
                    className="col-span-2 md:col-span-2 lg:col-span-4 row-span-2 lg:row-span-4 bg-[#F26C20] text-white rounded-[24px] p-6 md:p-8 flex flex-col shadow-sm h-full w-full justify-between relative overflow-hidden group aspect-square"
                >
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-4">
                                {t("about_me_title")}
                            </h3>
                            <p className="text-sm md:text-base lg:text-[17px] font-medium leading-relaxed opacity-90">
                                {t("about_me_desc")}
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 5. LinkedIn Square (1x1) - Under Clock */}
                <motion.a
                    variants={item}
                    href="https://www.linkedin.com/in/gabriel-gama-6301633b2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-1 row-span-1 bg-[#0077B5] rounded-[24px] shadow-sm flex items-center justify-center aspect-square group cursor-pointer hover:bg-[#006396] transition-colors"
                >
                    <Linkedin className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                </motion.a>

                {/* 6. Interactive Pato (Quack) Card - Under GitHub */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{
                        scale: 0.95,
                        rotate: [0, -20, 20, -20, 20, 0],
                        transition: { duration: 0.2 }
                    }}
                    onClick={() => {
                        const sound = new Audio("https://www.soundjay.com/misc/sounds/duck-quack-1.mp3");
                        sound.play().catch(e => console.error("Audio play failed:", e));
                    }}
                    className="col-span-1 row-span-1 bg-yellow-400 rounded-[24px] shadow-sm flex items-center justify-center aspect-square group cursor-pointer relative overflow-hidden"
                >
                    <motion.div className="relative">
                        <svg viewBox="0 0 24 24" className="w-12 h-12 text-yellow-900 fill-current">
                            <path d="M12,2C10.9,2,10,2.9,10,4c0,0.1,0,0.2,0,0.3C7.9,5,6,7.3,6,10c0,1.3,0.4,2.5,1.1,3.5C5.9,14.6,5,16.2,5,18c0,2.2,1.8,4,4,4h6 c2.2,0,4-1.8,4-4c0-1.8-0.9-3.4-2.1-4.5c0.7-1,1.1-2.2,1.1-3.5c0-2.7-1.9-5-4-5.7c0-0.1,0-0.2,0-0.3C14,2.9,13.1,2,12,2z M12,4 c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S11.4,4,12,4z M9,10c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S8.4,10,9,10z M15,10 c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S14.4,10,15,10z M12,14c-1.1,0-2-0.9-2-2h4C14,13.1,13.1,14,12,14z" />
                        </svg>
                        {/* Visual Quack Feedback */}
                        <motion.span
                            initial={{ opacity: 0, y: 0, scale: 0.5 }}
                            whileTap={{ opacity: 1, y: -20, scale: 1 }}
                            className="absolute -top-4 -right-4 bg-white text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm pointer-events-none"
                        >
                            Quack!
                        </motion.span>
                    </motion.div>
                </motion.div>

            </motion.div>

            <ProjectsFolderModal
                isOpen={isFolderOpen}
                onClose={() => setIsFolderOpen(false)}
                title={t("projects")}
            />
        </>
    );
}
