"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Sparkles, ArrowUpRight, Code2, Mountain, Loader2, Feather, Clock, Linkedin, Terminal, GraduationCap, CheckCircle2, Compass, PencilRuler, Youtube, Award } from "lucide-react";
import Image from "next/image";
import { ProjectsFolderModal } from "./ProjectsFolderModal";
import { Certificate } from "./Certificate";
import { EducationCard } from "./EducationCard";
import { FolderCard } from "./FolderCard";
import { VolunteerCard } from "./VolunteerCard";
import { PosterCard } from "./PosterCard";
import { GithubActivityCard } from "./GithubActivityCard";
import { LocationCard } from "./LocationCard";

export function AboutGrid() {
    const t = useTranslations("About");
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const [time, setTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Use a timeout to avoid synchronous state update in useEffect
        const mountTimer = setTimeout(() => {
            setMounted(true);
        }, 0);

        const timer = setInterval(() => {
            const now = new Date();
            // Offset for Brazil (UTC-3)
            // Note: In production it's better to use a library like date-fns-tz or Intl.DateTimeFormat
            // but for a simple visual clock we can use Intl to get the current time in BR
            const brTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
            setTime(brTime);
        }, 1000);

        return () => {
            clearTimeout(mountTimer);
            clearInterval(timer);
        };
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
                {/* 1. Folder Card - Blue */}
                <FolderCard
                    color="#94B9FF"
                    hoverColor="#9DBEFF"
                    label={t("projects")}
                    onClick={() => setIsFolderOpen(true)}
                    className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 lg:row-span-2"
                />

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

                {/* 3. About me Card (Reference Styled - Refined) */}
                <motion.div
                    variants={item}
                    className="col-span-2 md:col-span-2 lg:col-span-4 row-span-2 lg:row-span-4 bg-[#1C1C1E] text-white rounded-[24px] p-6 lg:p-8 flex flex-col shadow-sm h-full w-full justify-between relative overflow-hidden group aspect-square"
                >
                    {/* Top Title */}
                    <div className="relative z-20 w-fit">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-none text-white/95">
                            {t("about_me_title")}
                        </h3>
                    </div>

                    {/* Single Asterisk Graphic (Right aligned) */}
                    <div className="absolute right-[-10%] top-[45%] -translate-y-1/2 z-10 pointer-events-none opacity-90 transition-transform group-hover:rotate-12 duration-700 ease-out">
                        <svg viewBox="0 0 100 100" className="w-[180px] md:w-[220px] lg:w-[260px] aspect-square fill-[#BE38DE]">
                            <g transform="translate(50, 50)">
                                <rect x="-10" y="-45" width="20" height="90" rx="3" />
                                <rect x="-10" y="-45" width="20" height="90" rx="3" transform="rotate(45)" />
                                <rect x="-10" y="-45" width="20" height="90" rx="3" transform="rotate(90)" />
                                <rect x="-10" y="-45" width="20" height="90" rx="3" transform="rotate(135)" />
                            </g>
                        </svg>
                    </div>

                    {/* Bottom Text */}
                    <div className="relative z-20 mt-auto pointer-events-none pr-4 md:pr-12">
                        <p className="text-[#A1A1AA] text-[15px] md:text-base font-medium leading-relaxed">
                            {t("about_me_desc")}
                        </p>
                    </div>
                </motion.div>

                <motion.a
                    variants={item}
                    href="https://www.linkedin.com/in/gabriel-gama-6301633b2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-1 row-span-1 bg-[#0077B5] rounded-[24px] shadow-sm flex items-center justify-center aspect-square group cursor-pointer hover:bg-[#006396] transition-colors"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-10 h-10 text-white fill-current group-hover:scale-110 transition-transform"
                    >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                </motion.a>

                <motion.a
                    variants={item}
                    href="https://youtube.com/@gabrielgamadev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-1 row-span-1 bg-[#FF0000] rounded-[24px] shadow-sm flex items-center justify-center aspect-square group cursor-pointer hover:bg-[#E60000] transition-colors overflow-hidden"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-12 h-12 text-white fill-current group-hover:scale-110 transition-transform"
                    >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                </motion.a>

                {/* 7. SVG Poster Card (2x4) */}
                <motion.div
                    variants={item}
                    className="col-span-2 row-span-4"
                >
                    <PosterCard />
                </motion.div>

                {/* 8. Education Card */}
                <motion.div
                    variants={item}
                    className="col-span-1 md:col-span-1 lg:col-span-3 row-span-1 lg:row-span-2"
                >
                    <EducationCard />
                </motion.div>

                {/* 9. Yellow Folder (Windows style) */}
                <FolderCard
                    color="#FFC439"
                    hoverColor="#FFD36A"
                    label={t("academic_certificates")}
                    className="col-span-1 md:col-span-1 lg:col-span-3 row-span-1 lg:row-span-2"
                />

                {/* 10. Volunteer Card */}
                <motion.div
                    variants={item}
                    className="col-span-1 md:col-span-1 lg:col-span-3 row-span-1 lg:row-span-2"
                >
                    <VolunteerCard />
                </motion.div>

                {/* 11. GitHub Activity Card */}
                <GithubActivityCard />

                {/* 12. Location Card */}
                <motion.div
                    variants={item}
                    className="col-span-1 md:col-span-1 lg:col-span-3 row-span-1 lg:row-span-2"
                >
                    <LocationCard />
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
