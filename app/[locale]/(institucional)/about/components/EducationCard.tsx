"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

export function EducationCard() {
    const t = useTranslations("About");

    return (
        <motion.div
            className="bg-[#1A233A] rounded-[24px] p-5 md:p-6 flex flex-col justify-between shadow-sm border border-blue-500/20 text-white w-full h-full relative overflow-hidden aspect-square lg:aspect-auto"
        >
            <div className="flex flex-col relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-blue-400 opacity-60" />
                    <span className="text-[10px] font-bold text-blue-300/60 uppercase tracking-[0.25em]">
                        {t("academic_cert_bsc")}
                    </span>
                </div>
                <h3 className="text-lg md:text-xl lg:text-[22px] font-bold leading-[1.2] tracking-tight">
                    {t("academic_milestone_1_title")}
                </h3>
                <p className="text-[13px] md:text-sm text-zinc-400 font-semibold mt-1">
                    at <span className="text-blue-400 font-bold">{t("academic_milestone_1_institution")}</span>
                </p>
            </div>

            <div className="flex justify-between items-end relative z-10">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                            {t("academic_status_concluded")}
                        </span>
                    </div>
                    <span className="text-[13px] text-blue-300/50 font-medium mt-1">
                        GPA: 9.7
                    </span>
                </div>

                {/* Caricature Wax Seal with Ribbons */}
                <div className="relative group/seal mb-2 mr-2">
                    {/* Ribbons */}
                    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 flex -z-10 origin-top">
                        <div
                            className="w-4 h-9 bg-[#D72121] shadow-md -rotate-[15deg] -mr-1"
                            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)' }}
                        />
                        <div
                            className="w-4 h-9 bg-[#B31919] shadow-md rotate-[15deg] -ml-1"
                            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)' }}
                        />
                    </div>

                    <motion.div
                        className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(220,38,38,0.4)] border-2 border-red-500 relative z-10"
                    >
                        <Award className="w-5.5 h-5.5 text-white" />

                        {/* Wax texture highlights */}
                        <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
                        <div className="absolute top-1 left-2 w-3.5 h-1.5 bg-white/20 rounded-full blur-[1px] rotate-[-25deg]" />
                    </motion.div>

                    {/* Animated Glow */}
                    <motion.div
                        className="absolute inset-0 bg-red-500/20 rounded-full blur-xl -z-10"
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_60%)] pointer-events-none" />
        </motion.div>
    );
}
