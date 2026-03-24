"use client";

import { motion } from "framer-motion";

export function MadeInBrazilCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-row gap-1.5 h-[76px] w-full max-w-[320px]"
        >
            {/* Left Block - Country Flag */}
            <div className="bg-[#0A32C8] rounded-[12px] aspect-square flex items-center justify-center p-3.5 shrink-0 shadow-sm transition-transform hover:scale-[1.02] cursor-default">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 504" className="w-full h-full rounded-[3px] overflow-hidden shadow-sm">
                    <rect width="720" height="504" fill="#009c3b" />
                    <polygon points="360,60 60,252 360,444 660,252" fill="#ffdf00" />
                    <circle cx="360" cy="252" r="120" fill="#002776" />
                    <path d="M 240 270 Q 350 180 480 270" stroke="#fff" stroke-width="18" fill="none" />
                </svg>
            </div>

            {/* Right Block - Text */}
            <div className="bg-[#0A32C8] rounded-[12px] flex-1 flex flex-col justify-center px-4.5 shadow-sm transition-transform hover:scale-[1.02] cursor-default px-5">
                <span className="text-white/90 font-medium text-[15px] leading-tight tracking-tight">
                    Made in Brazil
                </span>
                <span className="text-white font-bold text-[24px] leading-tight tracking-tight mt-[-2px]">
                    BRA • 2026
                </span>
            </div>
        </motion.div>
    );
}
