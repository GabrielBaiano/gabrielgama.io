"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

interface ExperienceCardProps {
    children?: React.ReactNode;
    className?: string;
    currentJob: {
        company: string;
        role: string;
        color: string;
        period: string;
        description: string;
    };
}

export function ExperienceCard({ currentJob, children, className = "" }: ExperienceCardProps) {
    const t = useTranslations("About");
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleClose = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsOpen(false);
    };

    return (
        <div className={`w-full h-full relative ${className}`}>
            {/* --- CLOSED WIDGET STATE --- */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div 
                        layoutId="experience-container"
                        onClick={() => setIsOpen(true)}
                        className={`w-full h-full relative cursor-pointer group bg-[#1C1C1E] rounded-[24px] overflow-hidden border-2 border-transparent transition-colors duration-300 flex items-stretch p-4 sm:p-5 gap-4 sm:gap-6`}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = currentJob.color;
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                        }}
                    >
                        {/* Branded Icon Column */}
                        <div className="flex flex-col justify-center shrink-0">
                            <div 
                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 shadow-2xl border-4 border-[#1C1C1E] group-hover:scale-105 transition-transform duration-500"
                                style={{ backgroundColor: currentJob.color }}
                            >
                                <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                        </div>

                        {/* Job Info Box ("Square" / "Balão") */}
                        <div className="flex-1 bg-[#141414] border border-white/5 rounded-[22px] p-5 sm:p-6 shadow-sm transition-all group-hover:bg-[#1A1A1A] group-hover:border-white/10 group-hover:translate-x-1 duration-300 flex flex-col justify-center">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-stone-300 font-bold text-[13px] sm:text-[14px] tracking-tight">{currentJob.company}</span>
                                    <span className="text-stone-500 text-[10px] sm:text-[11px] font-medium opacity-60">• {t("currently_working_at", { company: "" }).replace(" {company}", "").replace("{company}", "")}</span>
                                </div>
                                <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: currentJob.color }} />
                            </div>
                            <motion.h3 
                                layoutId="experience-title"
                                className="text-white font-bold text-[18px] sm:text-[22px] tracking-tight leading-none mb-2"
                            >
                                {currentJob.role}
                            </motion.h3>
                            <p className="text-stone-500 text-[11px] sm:text-[12px] leading-relaxed font-medium line-clamp-3 opacity-80">
                                {currentJob.description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- OPEN MODAL STATE --- */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => handleClose()}
                                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl"
                            />
                            
                            <div 
                                className="fixed inset-0 z-[101] overflow-y-auto overflow-x-hidden custom-scrollbar overscroll-none"
                                onClick={() => handleClose()}
                            >
                                <div className="flex flex-col w-full min-h-full items-center z-20 relative pt-20 sm:pt-32 px-4 sm:px-8 pb-32">
                                    
                                    {/* Modal Container */}
                                    <motion.div 
                                        layoutId="experience-container"
                                        className="w-full max-w-[640px] bg-[#0C0C0C] rounded-[40px] relative overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/* Header */}
                                        <div className="p-8 sm:p-10 flex justify-between items-start relative z-10">
                                            <div className="flex flex-col">
                                                <motion.h3 
                                                    layoutId="experience-title"
                                                    className="text-white font-bold text-[36px] md:text-[42px] tracking-tighter leading-none mb-2"
                                                >
                                                    Experiência
                                                </motion.h3>
                                                <motion.p 
                                                    layoutId="experience-subtitle"
                                                    className="text-white/40 font-medium text-[20px] tracking-tight"
                                                >
                                                    Minha Trajetória Profissional
                                                </motion.p>
                                            </div>
                                            <button 
                                                onClick={() => handleClose()}
                                                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                            >
                                                <X className="w-6 h-6 text-white" />
                                            </button>
                                        </div>

                                        {/* Timeline Content */}
                                        <div className="px-2 pb-10">
                                            <AnimatePresence>
                                                {children && React.Children.map(children, (child, index) => {
                                                    const total = React.Children.count(children);
                                                    const stagger = (index * 0.1);
                                                    const exitStagger = (total - index - 1) * 0.05;

                                                    return (
                                                        <motion.div
                                                            key={`exp-${index}`}
                                                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ 
                                                                opacity: 0, y: 20, scale: 0.95,
                                                                transition: { duration: 0.2, delay: exitStagger }
                                                            }}
                                                            transition={{ 
                                                                duration: 0.5, 
                                                                delay: stagger,
                                                                type: "spring",
                                                                damping: 20,
                                                                stiffness: 100
                                                            }}
                                                        >
                                                            {child}
                                                        </motion.div>
                                                    );
                                                })}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}
