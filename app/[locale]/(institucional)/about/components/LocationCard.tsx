"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function LocationCard() {
    const t = useTranslations("About");

    // Coordinates for São Paulo, Brazil
    const SP_COORDS = { lat: -23.5505, lon: -46.6333 };

    // Helper to map lat/lon to SVG percentage for the simplified world map
    const getMapXY = (lat: number, lon: number) => {
        const x = (lon + 180) * (100 / 360);
        const y = (90 - lat) * (100 / 180);
        return { x, y };
    };

    const spPos = getMapXY(SP_COORDS.lat, SP_COORDS.lon);

    return (
        <motion.div
            className="bg-[#0D1117] rounded-[24px] flex flex-col justify-between shadow-xl border border-white/5 text-zinc-400 w-full h-full relative overflow-hidden group"
            whileHover={{ scale: 0.98 }}
        >
            {/* World Map Background Wrapper - Full Height */}
            <div className="absolute inset-0 z-0 opacity-60">
                <svg viewBox="0 0 100 60" className="w-full h-full text-zinc-800 fill-current preserve-3d">
                    {/* Simplified World Map Paths */}
                    <path d="M12,18 L15,16 L20,16 L25,18 L30,22 L28,28 L22,30 L15,28 L12,22 Z M45,15 L50,12 L55,14 L60,18 L58,25 L52,28 L48,25 L45,18 Z M70,20 L75,18 L85,20 L90,25 L88,35 L80,40 L72,38 L70,28 Z M30,35 L35,32 L40,35 L42,45 L38,55 L32,55 L28,45 Z M55,45 L60,42 L65,45 L68,55 L62,58 L55,55 Z" />
                </svg>
            </div>

            {/* Content Over Map */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Visual Markers */}
                <div className="relative w-full h-full">
                    {/* Avatar at SP */}
                    <motion.div
                        className="absolute w-12 h-12 rounded-full border-2 border-white shadow-2xl bg-zinc-800 flex items-center justify-center translate-x-1/2 overflow-hidden z-20"
                        style={{ left: `calc(${spPos.x}% - 24px)`, top: `calc(${spPos.y}% - 24px)` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                    >
                        <img src="https://github.com/GabrielBaiano.png" alt="Gabriel" className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none" />
        </motion.div>
    );
}
