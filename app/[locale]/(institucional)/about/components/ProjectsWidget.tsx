"use client";

import React from "react";
import { SmartWidget } from "./SmartWidget";
import { PillButton } from "./PillButton";
import { Folder, ArrowUpRight, Code2, Layout, Database } from "lucide-react";
import { useTranslations } from "next-intl";

const FEATURED_PROJECTS = [
    { title: "Portfolio V2", category: "Fullstack", icon: Layout },
    { title: "Design System", category: "UI/UX", icon: Code2 },
    { title: "BFF API", category: "Backend", icon: Database },
];

export function ProjectsWidget() {
    const t = useTranslations("About");

    return (
        <SmartWidget className="flex-1 flex flex-col h-full min-h-[380px]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Folder className="w-5 h-5 text-white/60" />
                    </div>
                    <div>
                        <h3 className="text-white text-[22px] font-bold tracking-tight leading-none">
                            {t('projects')}
                        </h3>
                        <p className="text-white/40 text-[12px] font-medium tracking-tight mt-1 upperase">
                            Experimentações Web
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8">
                {FEATURED_PROJECTS.map((project, idx) => (
                    <div 
                        key={idx} 
                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#94B9FF]/20 flex items-center justify-center group-hover:bg-[#94B9FF]/40 transition-colors">
                                <project.icon className="w-5 h-5 text-[#94B9FF]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-semibold tracking-tight">{project.title}</span>
                                <span className="text-white/30 text-xs font-medium tracking-wide">{project.category}</span>
                            </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                ))}
            </div>

            <div className="mt-auto">
                <PillButton variant="glass" className="w-full py-3 flex items-center justify-center gap-2 group">
                    <span className="text-[14px]">Explore Repository</span>
                    <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                </PillButton>
            </div>
        </SmartWidget>
    );
}
