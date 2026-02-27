"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

interface DiplomaCardProps {
    type: "msc" | "bsc";
    institution: string;
    degree: string;
    date: string;
    status: "concluded" | "in_progress";
}

export function DiplomaCard({ type, institution, degree, date, status }: DiplomaCardProps) {
    const t = useTranslations("About");
    const isMsc = type === "msc";

    return (
        <motion.div
            className="w-full h-full bg-[#FCF9F2] dark:bg-zinc-950 rounded-[24px] p-2 shadow-sm border border-stone-200 dark:border-zinc-800 flex flex-col relative overflow-hidden group select-none"
            whileHover={{ scale: 0.98 }}
        >
            {/* Ornate Border SVG */}
            <div className="absolute inset-2 pointer-events-none opacity-80 dark:opacity-30">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="96" height="96" rx="12" stroke="#B8860B" strokeWidth="0.5" strokeDasharray="2 1" />
                    <rect x="4" y="4" width="92" height="92" rx="10" stroke="#B8860B" strokeWidth="0.2" />
                    {/* Decorative Corners */}
                    <path d="M 2 15 L 2 5 Q 2 2 5 2 L 15 2" stroke="#B8860B" strokeWidth="1" strokeLinecap="round" />
                    <path d="M 85 2 L 95 2 Q 98 2 98 5 L 98 15" stroke="#B8860B" strokeWidth="1" strokeLinecap="round" />
                    <path d="M 2 85 L 2 95 Q 2 98 5 98 L 15 98" stroke="#B8860B" strokeWidth="1" strokeLinecap="round" />
                    <path d="M 85 98 L 95 98 Q 98 98 98 95 L 98 85" stroke="#B8860B" strokeWidth="1" strokeLinecap="round" />
                </svg>
            </div>

            <div className="relative z-10 flex flex-col h-full p-4 md:p-5 text-center">
                {/* Header / Seal */}
                <div className="flex justify-center mb-2">
                    <div className="relative">
                        <svg className="w-12 h-12 md:w-16 md:h-16 drop-shadow-md" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#D4AF37" />
                                    <stop offset="50%" stopColor="#F9E29C" />
                                    <stop offset="100%" stopColor="#8B6D1E" />
                                </linearGradient>
                            </defs>
                            <circle cx="50" cy="50" r="35" fill="url(#goldGrad)" stroke="#8B6D1E" strokeWidth="1" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="#8B6D1E" strokeWidth="0.5" strokeDasharray="1 1" />
                            <foreignObject x="35" y="35" width="30" height="30">
                                <div className="flex items-center justify-center w-full h-full">
                                    <GraduationCap className="w-5 h-5 text-zinc-800" />
                                </div>
                            </foreignObject>
                        </svg>

                        <div className={`absolute -top-1 -right-6 text-[8px] font-black px-1.5 py-0.5 rounded-sm border uppercase tracking-tighter shadow-sm z-10 ${status === "concluded"
                                ? "bg-emerald-50/90 text-emerald-600 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800"
                                : "bg-amber-50/90 text-amber-600 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800"
                            }`}>
                            {status === "concluded" ? t("academic_status_concluded") : t("academic_status_in_progress")}
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center">
                    <h2 className="text-[10px] md:text-[11px] font-bold text-stone-500 dark:text-zinc-500 uppercase tracking-[0.3em] mb-2 leading-none">
                        {isMsc ? t("academic_cert_msc") : t("academic_cert_bsc")}
                    </h2>

                    <div className="w-12 h-px bg-stone-300 dark:bg-zinc-800 mb-3" />

                    <h3 className="text-base md:text-lg font-serif italic font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight mb-1">
                        {degree}
                    </h3>

                    <p className="text-[11px] md:text-xs text-stone-500 dark:text-zinc-400 font-medium italic opacity-80 mb-2">
                        {t("academic_cert_certifies")} Gabriel Gama
                    </p>

                    <p className="text-[10px] md:text-[11px] font-bold text-stone-600 dark:text-zinc-300 uppercase tracking-widest leading-relaxed">
                        {institution}
                    </p>
                </div>

                <div className="mt-4 flex flex-col items-center">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 dark:via-zinc-800 to-transparent mb-2" />
                    <div className="flex justify-between w-full px-2 text-[10px] font-bold text-stone-400 dark:text-zinc-500 uppercase tracking-widest">
                        <span>{date}</span>
                        <span className="italic font-serif normal-case opacity-60">Gabriel Gama</span>
                    </div>
                </div>
            </div>

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
        </motion.div>
    );
}
