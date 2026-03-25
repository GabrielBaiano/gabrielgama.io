"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, Settings, MoreHorizontal, X } from "lucide-react";

interface FolderCardProps {
    color: string;
    hoverColor: string;
    label: string;
    subtitle?: string;
    children?: React.ReactNode;
    className?: string;
}

export function FolderCard({ color, hoverColor, label, subtitle = "12 files", children, className = "" }: FolderCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleClose = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsClosing(true);
        // Faster delay sequence: (total objects * 0.06s) + 0.3s base duration + 50ms safety buffer
        const totalCards = React.Children.count(children);
        const waitTime = (totalCards * 60) + 300 + 50;
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, waitTime);
    };

    const folderTabSvg = (
        <svg className="w-full h-full fill-current" style={{ color }} viewBox="0 0 160 22" preserveAspectRatio="none">
            <path d="M 0 22 C 12 22, 16 16.5, 20 11 C 24 5.5, 28 0, 40 0 L 120 0 C 132 0, 136 5.5, 140 11 C 144 16.5, 148 22, 160 22 Z" />
        </svg>
    );

    return (
        <div className={`w-full h-full relative ${className}`}>
            {/* --- CLOSED THUMBNAIL STATE --- */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div 
                        layoutId={`folder-container-${label.replace(/\s+/g, '-')}`}
                        onClick={() => setIsOpen(true)}
                        className="w-full h-full relative cursor-pointer drop-shadow-sm group border-2 border-transparent transition-colors duration-300 rounded-[28px]"
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = hoverColor;
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                        }}
                    >
                        {/* Back Cover Tab & Body */}
                        <motion.div 
                            layoutId={`folder-back-${label.replace(/\s+/g, '-')}`}
                            className="absolute inset-0 flex flex-col z-10 pointer-events-none"
                        >
                            <div className="w-full h-[24px] relative flex" style={{ marginBottom: "-1px" }}>
                                <div className="ml-[24px] w-[130px] h-full transition-colors duration-300 group-hover:brightness-110">
                                    {folderTabSvg}
                                </div>
                            </div>
                            
                            {/* Back Cover Body (Behind Papers) */}
                            <div 
                                className="w-full flex-1 rounded-[24px] relative z-10 transition-colors duration-300 group-hover:brightness-110"
                                style={{ backgroundColor: color }}
                            />
                        </motion.div>

                        {/* Front Cover Flap */}
                        <motion.div 
                            layoutId={`folder-flap-${label.replace(/\s+/g, '-')}`}
                            className="absolute left-0 bottom-0 w-full h-[calc(100%-24px)] rounded-[24px] z-30 p-5 flex flex-col justify-start overflow-hidden transition-colors duration-300 group-hover:brightness-110"
                            style={{ backgroundColor: color, boxShadow: "inset 0px 4px 10px rgba(0,0,0,0.05)" }}
                        >
                            <div className="flex justify-between items-start text-white relative z-10">
                                <div className="flex flex-col">
                                    <span className="font-bold text-[17px] tracking-tight truncate drop-shadow-sm">{label}</span>
                                    <span className="text-white/80 text-[11px] font-medium tracking-tight mt-0.5">{subtitle}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- OPEN MODAL STATE --- */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Dark Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 z-[100] bg-stone-900/40 backdrop-blur-sm"
                            />
                            
                            {/* OPEN MODAL ARCHITECTURE: CASCADE SPIT & EAT PHYSICS */}
                            <div 
                                className="fixed inset-0 z-[101] overflow-y-auto overflow-x-hidden custom-scrollbar overscroll-none"
                                onClick={handleClose} // Clicking anywhere outside closes the folder
                            >
                                {/* Layout wrapper */}
                                <div 
                                    className="flex flex-col w-full min-h-full items-center z-20 relative pt-16 sm:pt-24 px-4 sm:px-8 pb-0" 
                                >
                                    
                                    {/* The Stack of Papers - Animate Height/Opacity to PUSH the folder down! */}
                                    <div className="w-full flex flex-col items-center">
                                        <AnimatePresence>
                                            {!isClosing && (children ? React.Children.map(children, (child, index) => {
                                                if (!React.isValidElement(child)) return child;
                                                const total = React.Children.count(children);
                                                const organicTilts = [-1.2, 0.8, -0.6, 1.4, -1, 0.5, -1.8, 1, -0.8, 1.2];
                                                const randomTilt = organicTilts[index % organicTilts.length];
                                                
                                                // Calculate reverse stagger
                                                const staggerTime = (total - index - 1) * 0.06;
                                                // Global max time to PREVENT DOM nodes from unmounting early and causing the "teleport" jump!
                                                const maxTime = (total * 0.06) + 0.35;
                                                
                                                return (
                                                    <motion.div
                                                        key={`sheet-${index}`}
                                                        initial={{ height: 0, opacity: 0, scale: 0.8, y: -50 }}
                                                        animate={{ height: "auto", opacity: 1, scale: 1, y: 0, rotate: randomTilt }}
                                                        exit={{ 
                                                            height: 0, opacity: 0, scale: 0.5, y: -50, rotate: 0, filter: "brightness(1)",
                                                            transition: { 
                                                                duration: 0.3, delay: staggerTime, // Fast reverse eat order!
                                                                filter: { duration: maxTime } // FORCES node to stay in DOM until the end
                                                            } 
                                                        }}
                                                        transition={{ 
                                                            height: { duration: 0.6, ease: "easeOut", delay: index * 0.15 },
                                                            opacity: { duration: 0.4, delay: index * 0.15 },
                                                            scale: { type: "spring", damping: 20, stiffness: 100, delay: index * 0.15 },
                                                            y: { type: "spring", damping: 20, stiffness: 100, delay: index * 0.15 },
                                                            rotate: { type: "spring", damping: 20, stiffness: 100, delay: index * 0.15 }
                                                        }}
                                                        className="w-full max-w-[800px] flex justify-center overflow-hidden" // overflow-hidden is crucial for height 0
                                                    >
                                                        {/* We use margin-bottom internally so height 0 perfectly trims the gaps */}
                                                        <div 
                                                            className="w-[96%] bg-white rounded-none shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-6 sm:p-10 border border-stone-200 flex flex-col mb-16 shrink-0 origin-bottom relative"
                                                            onClick={(e) => e.stopPropagation()} // Clicking the paper doesn't close the folder!
                                                        >
                                                            <div className="flex justify-between items-center mb-6 text-stone-400 font-medium pb-4 border-b border-stone-100">
                                                                <span className="text-[13px] tracking-tight">{new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                                <MoreHorizontal className="w-5 h-5 cursor-pointer hover:text-stone-600 transition-colors" />
                                                            </div>
                                                            
                                                            <div className="flex-1 w-full flex flex-col">
                                                                {child}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )
                                            }) : (
                                                <motion.div
                                                    key="empty-sheet"
                                                    initial={{ height: 0, opacity: 0, scale: 0.9 }} animate={{ height: "auto", opacity: 1, scale: 1 }} exit={{ opacity: 0, y: 100, transition: { duration: 0.2 } }}
                                                    className="w-full max-w-[700px] mx-auto overflow-hidden"
                                                >
                                                    <div 
                                                        className="w-full bg-white rounded-none shadow-2xl p-6 sm:p-10 border border-stone-200 flex flex-col min-h-[300px] mb-16 relative"
                                                        onClick={(e) => e.stopPropagation()} // Clicking the empty placeholder paper doesn't close it!
                                                    >
                                                        <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-stone-200 rounded-none">
                                                            <span className="text-stone-400 text-sm font-medium">Pasta vazia</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>

                                    {/* The Folder Base ("Lá embaixo da última folha") */}
                                    <div className="w-full flex justify-center mt-4 mb-0 pb-0 perspective-[1000px]">
                                        <motion.div
                                            layoutId={`folder-container-${label.replace(/\s+/g, '-')}`}
                                            className="w-full max-w-[700px] aspect-[1.8] relative flex flex-col drop-shadow-2xl cursor-pointer"
                                            onClick={handleClose} // Clicking the physical folder triggers sequence
                                        >
                                            <motion.div 
                                                layoutId={`folder-back-${label.replace(/\s+/g, '-')}`}
                                                className="absolute inset-0 flex flex-col z-10 pointer-events-none"
                                            >
                                                {/* Back Cover Tab (Expanded) */}
                                                <div className="w-full h-[32px] relative flex" style={{ marginBottom: "-1px" }}>
                                                    <div className="ml-[32px] w-[160px] h-full text-white">
                                                        {folderTabSvg}
                                                    </div>
                                                </div>

                                                {/* Back Cover Body */}
                                                <div 
                                                    className="w-full flex-1 rounded-[32px] relative z-10 transition-colors"
                                                    style={{ backgroundColor: color }}
                                                />
                                            </motion.div>

                                            {/* Front Flap (Sliding DOWN) */}
                                            <motion.div 
                                                layoutId={`folder-flap-${label.replace(/\s+/g, '-')}`}
                                                initial={{ rotateX: 0, y: 0 }} 
                                                animate={{ rotateX: -15, y: 32 }} 
                                                exit={{ rotateX: 0, y: 0 }}
                                                transition={{ type: "spring", damping: 14, stiffness: 100 }}
                                                className="absolute bottom-0 left-0 w-full h-[calc(100%-32px)] rounded-[32px] z-30 pointer-events-none origin-bottom p-8 drop-shadow-[0_-5px_25px_rgba(0,0,0,0.2)]"
                                                style={{ backgroundColor: color, boxShadow: "inset 0px 4px 10px rgba(0,0,0,0.05)" }}
                                            >
                                                <div className="flex justify-between items-start text-white relative z-10">
                                                    <div className="flex flex-col">
                                                        <h3 className="font-bold text-[36px] tracking-tight drop-shadow-sm">{label}</h3>
                                                        <span className="text-white/80 text-[16px] font-medium tracking-tight mt-1">{subtitle}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </div>

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
