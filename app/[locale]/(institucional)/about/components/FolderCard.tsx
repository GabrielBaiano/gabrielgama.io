"use client";

import { motion } from "framer-motion";

interface FolderCardProps {
    color: string;
    hoverColor: string;
    label: string;
    onClick?: () => void;
    className?: string;
}

export function FolderCard({ color, hoverColor, label, onClick, className = "" }: FolderCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 0.98 }}
            onClick={onClick}
            className={`relative group cursor-pointer flex flex-col drop-shadow-sm h-full w-full ${className}`}
        >
            <div className="w-full h-[22px] relative z-20 flex" style={{ marginBottom: "-1px" }}>
                <svg
                    className={`ml-6 h-full w-[140px] transition-colors fill-current`}
                    style={{ color: color }}
                    viewBox="0 0 160 22"
                    preserveAspectRatio="none"
                    onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = color)}
                >
                    <path d="M 0 22 C 12 22, 16 16.5, 20 11 C 24 5.5, 28 0, 40 0 L 120 0 C 132 0, 136 5.5, 140 11 C 144 16.5, 148 22, 160 22 Z" />
                </svg>
            </div>
            <div
                className={`w-full h-[calc(100%-22px)] transition-colors rounded-[24px] relative shadow-inner overflow-hidden flex flex-col justify-end z-[11] p-4 md:p-5`}
                style={{ backgroundColor: color }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = color)}
            >
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-4 bg-[#FCE28A] text-yellow-900 px-4 py-2 rounded-full text-xs font-bold shadow-sm flex items-center group-hover:scale-105 transition-transform duration-300">
                    {label}
                </div>
            </div>
        </motion.div>
    );
}
