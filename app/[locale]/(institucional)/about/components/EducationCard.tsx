"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award } from "lucide-react";
import { useTranslations } from "next-intl";

export function EducationCard() {
    const t = useTranslations("About");

    return (
        <motion.div
            className="bg-[#F9F3E9] dark:bg-zinc-900 rounded-[24px] p-5 md:p-6 flex flex-col justify-between shadow-sm border border-stone-200 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50 w-full h-full relative overflow-hidden aspect-square lg:aspect-auto group"
            whileHover={{ scale: 0.98 }}
        >
            <div className="flex flex-col relative z-10">
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.25em] mb-2 px-1 border-l-2 border-red-500/50">
                    {t("academic_cert_bsc")}
                </span>
                <h3 className="text-lg md:text-xl lg:text-[22px] font-bold leading-[1.2] tracking-tight text-balance">
                    {t("academic_milestone_1_title")}
                </h3>
                <p className="text-[13px] md:text-sm text-zinc-500 font-semibold mt-1">
                    at <span className="text-zinc-800 dark:text-zinc-300">{t("academic_milestone_1_institution")}</span>
                </p>
            </div>

            <div className="flex justify-between items-end relative z-10">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                            {t("academic_status_concluded")}
                        </span>
                    </div>
                    <span className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium">
                        {t("academic_grade", { grade: "9.7" })}
                    </span>
                </div>

                {/* Red Wax Seal Design */}
                <div className="relative group/seal">
                    <motion.div
                        className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(220,38,38,0.3)] border-2 border-red-500 relative z-10"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                    >
                        <Award className="w-6 h-6 text-white" />

                        {/* Wax texture highlights */}
                        <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
                        <div className="absolute top-1 left-2 w-4 h-2 bg-white/10 rounded-full blur-[2px] rotate-[-30deg]" />
                    </motion.div>

                    {/* Animated Glow */}
                    <motion.div
                        className="absolute inset-0 bg-red-500/20 rounded-full blur-xl -z-10"
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-red-500/10 transition-colors" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/20 dark:from-black/10 to-transparent pointer-events-none" />
        </motion.div>
    );
}
