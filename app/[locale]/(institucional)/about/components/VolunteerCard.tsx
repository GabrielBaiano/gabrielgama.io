"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function VolunteerCard() {
    const t = useTranslations("About");

    return (
        <motion.div
            className="bg-[#FF3366] text-white rounded-[24px] p-6 lg:p-7 flex flex-col justify-between shadow-sm w-full h-full relative overflow-hidden group aspect-square"
        >
            <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl md:text-[28px] font-bold leading-tight mb-4 tracking-tight">
                        Volunteer<br />Teacher
                    </h3>
                    <p className="text-sm md:text-[15px] font-medium leading-relaxed opacity-90 pr-4">
                        Teaching basic programming and logical thinking to youth from local public schools.
                    </p>
                </div>

                <motion.a
                    href="https://doe.programadoresdoamanha.org.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-fit bg-white/20 text-white px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 hover:bg-white/30 transition-colors self-end mt-4 backdrop-blur-sm"
                >
                    at Programadores do Amanhã
                    <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.a>
            </div>

            {/* Decorative background glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </motion.div>
    );
}
