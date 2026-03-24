"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function RabbitCard() {
    const t = useTranslations("About");
    
    return (
        <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-[340px] aspect-square bg-[#FF3B00] rounded-[40px] p-2.5 flex shadow-md overflow-hidden"
        >
            {/* Left Black Screen */}
            <div className="h-full bg-[#0A0A0A] rounded-[32px] flex-1 flex flex-col justify-between p-7 relative overflow-hidden ring-1 ring-white/5">
                
                {/* Rabbit SVG Center Piece */}
                <div className="absolute inset-0 flex items-center justify-center pb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" className="w-[100px] h-[100px] drop-shadow-md">
                        <g fill="#FFFFFF">
                            {/* Left Ear */}
                            <polygon points="28,50 15,5 40,15 45,45" />
                            {/* Right Ear */}
                            <polygon points="72,50 85,5 60,15 55,45" />
                            
                            {/* Head Block - Top */}
                            <polygon points="15,60 50,45 85,60 50,75" />
                            {/* Head Block - Left */}
                            <polygon points="15,60 50,75 50,110 15,95" />
                            {/* Head Block - Right */}
                            <polygon points="85,60 50,75 50,110 85,95" />
                        </g>

                        {/* Minimalist Face Cutouts (Eyes/Snout lines) */}
                        <g stroke="#0A0A0A" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            {/* Left Eye Slit */}
                            <path d="M 28 80 L 38 86" />
                            {/* Right Eye Slit */}
                            <path d="M 72 80 L 62 86" />
                            {/* Nose/Mouth V-shape */}
                            <path d="M 45 98 L 50 102 L 55 98" />
                        </g>
                    </svg>
                </div>

                {/* Typography Bottom Left */}
                <div className="mt-auto z-10 font-sans tracking-tight font-medium text-[26px] leading-[1.05]">
                    <span className="text-white">{t('rabbit_hello')}</span><br/>
                    <span className="text-white">{t('rabbit_i_am')}</span>
                    <span className="text-[#FF3B00]">r2</span>
                </div>
            </div>

            {/* Right Orange Hardware Strip */}
            <div className="w-[76px] h-full flex flex-col items-center justify-start pt-6 gap-6 relative">
                
                {/* Camera Module (Rotating Eye Simulator) */}
                <div className="w-[52px] h-[64px] bg-[#D63200] rounded-[20px] shadow-inner flex items-center justify-center">
                    {/* The Lens */}
                    <div className="w-[30px] h-[30px] bg-[#141414] rounded-full shadow-lg relative flex items-center justify-center">
                        <div className="w-[12px] h-[12px] bg-[#0A0A0A] rounded-full ring-1 ring-stone-800" />
                        {/* Lens Reflection */}
                        <div className="absolute top-1.5 right-1.5 w-[4px] h-[4px] bg-white/40 rounded-full blur-[0.5px]" />
                    </div>
                </div>

                {/* Speaker Grille / Push-To-Talk Button */}
                <div className="w-[48px] h-[48px] bg-[#D63200] rounded-full shadow-inner flex items-center justify-center mt-2">
                    <div className="grid grid-cols-3 gap-[3px]">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="w-[5px] h-[5px] bg-[#B32A00] rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
