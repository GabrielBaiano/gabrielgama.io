"use client";

import { motion } from "framer-motion";

export function PosterCard() {
    return (
        <motion.div
            className="bg-[#EBEBEB] rounded-[24px] shadow-sm border border-stone-200/50 w-full h-full relative overflow-hidden group aspect-[2/4]"
            style={{ containerType: 'inline-size' }}
        >
            <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between z-10">
                {/* Main Typography */}
                <div className="flex flex-col gap-0 relative z-20">
                    <h2 className="leading-[0.85] font-medium tracking-tighter text-[#111111] w-full" style={{ fontSize: 'min(21cqw, 4.5rem)' }}>
                        Making
                    </h2>
                    <h2 className="leading-[0.85] font-medium tracking-tighter text-[#111111] w-full" style={{ fontSize: 'min(21cqw, 4.5rem)' }}>
                        things
                    </h2>
                    <h2 className="leading-[0.85] font-medium tracking-tighter text-[#111111] w-full" style={{ fontSize: 'min(21cqw, 4.5rem)' }}>
                        that
                    </h2>
                    <h2 className="leading-[0.85] font-medium tracking-tighter text-[#111111] w-full" style={{ fontSize: 'min(21cqw, 4.5rem)' }}>
                        people
                    </h2>
                    <h2 className="leading-[0.85] font-medium tracking-tighter text-[#111111] w-full" style={{ fontSize: 'min(21cqw, 4.5rem)' }}>
                        like.
                    </h2>
                </div>
            </div>

            {/* Huge Yellow Smile SVG */}
            <div className="absolute bottom-[-12%] left-1/2 -translate-x-1/2 w-[120%] aspect-square z-0">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                    {/* Yellow Circle */}
                    <circle cx="50" cy="50" r="48" fill="#FBCD31" />

                    {/* Black Smile (Semi-circle) */}
                    <path
                        d="M 15 50 A 35 35 0 0 0 85 50 Z"
                        fill="#0A0A0A"
                    />
                </svg>
            </div>

            {/* Subtle grain/noise overlay for print effect */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        </motion.div>
    );
}
