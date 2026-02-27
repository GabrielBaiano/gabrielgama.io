"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

export function AcademicRoadmap() {
    const t = useTranslations("About");

    const milestones = [
        {
            id: 1,
            title: t("academic_milestone_1_title"),
            degree: t("academic_cert_degree_bsc"),
            sub: t("academic_milestone_1_sub"),
            institution: t("academic_milestone_1_institution"),
            status: "concluded",
            gpa: "9.7",
            bullets: [
                t("academic_milestone_1_focus_1"),
                t("academic_milestone_1_focus_2")
            ],
            icon: BookOpen,
        },
        {
            id: 2,
            title: t("academic_milestone_2_title"),
            degree: t("academic_cert_degree_msc"),
            sub: t("academic_milestone_2_sub"),
            institution: t("academic_milestone_2_institution"),
            status: "in_progress",
            gpa: null,
            bullets: [
                t("academic_milestone_2_focus_1"),
                t("academic_milestone_2_focus_2")
            ],
            icon: GraduationCap,
        }
    ];

    return (
        <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[24px] p-6 shadow-sm border border-stone-200 dark:border-zinc-800 flex flex-col relative overflow-y-auto custom-scrollbar">
            <h2 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-tight mb-8">
                {t("academic_roadmap_title")}
            </h2>

            <div className="relative flex flex-col gap-8">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-stone-200 dark:bg-zinc-800 z-0" />

                {milestones.map((m, index) => (
                    <div key={m.id} className="relative flex gap-6 z-10">
                        {/* Node */}
                        <div className="flex-shrink-0 relative w-8 h-8 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className={`w-4 h-4 rounded-full shadow-lg ${m.status === "concluded"
                                        ? "bg-zinc-400 dark:bg-zinc-500"
                                        : "bg-zinc-600 dark:bg-zinc-400 ring-4 ring-zinc-100 dark:ring-zinc-900 shadow-xl"
                                    }`}
                            />
                        </div>

                        {/* Card Bubble Container */}
                        <div className="relative flex-1">
                            {/* Triangle Pointing to Node */}
                            <div className="absolute top-4 -left-2 w-4 h-4 bg-stone-50 dark:bg-zinc-900 border-l border-b border-stone-200 dark:border-zinc-800 rotate-45 z-10" />

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.3 }}
                                className="bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-4 md:p-5 shadow-sm relative z-20 group hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-2 mb-2 text-zinc-900 dark:text-zinc-100 font-black text-sm md:text-base">
                                    <m.icon className="w-4 h-4 text-zinc-500" />
                                    <h3 className="uppercase tracking-wide">{m.title}</h3>
                                </div>

                                <div className="text-[12px] md:text-[13px] text-zinc-500 dark:text-zinc-400 font-medium space-y-0.5 mb-3">
                                    <p>{m.degree} {m.gpa && `| GPA: ${m.gpa}`}</p>
                                    <p>{m.sub}</p>
                                    <p className="text-zinc-800 dark:text-zinc-200 font-bold">{m.institution}</p>
                                </div>

                                <ul className="space-y-2">
                                    {m.bullets.map((bullet, k) => (
                                        <li key={k} className="flex gap-2 text-[11px] md:text-[12px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-400 flex-shrink-0" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>

                                {m.status === "in_progress" && (
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 text-[10px] text-amber-600 dark:text-amber-400 font-black uppercase tracking-wider">
                                            {t("academic_status_in_progress")}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
