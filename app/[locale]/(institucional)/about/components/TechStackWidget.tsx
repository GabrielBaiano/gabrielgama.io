"use client";

import React from "react";
import { SmartWidget } from "./SmartWidget";
import { motion } from "framer-motion";
import { Cpu, Terminal, Laptop, Globe, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const TECH_STACK = [
    { name: "React", icon: Laptop },
    { name: "Next.js", icon: Globe },
    { name: "TypeScript", icon: Terminal },
    { name: "Tailwind", icon: Cpu },
    { name: "Framer", icon: Sparkles },
];

export function TechStackWidget() {
    const t = useTranslations("About");

    return (
        <SmartWidget className="w-full max-w-[340px] aspect-square !bg-[#FF3B00] border-none !p-0 relative overflow-hidden group cursor-pointer shadow-[0_20px_50px_rgba(255,59,0,0.3)]">
            {/* Hardware Module Effect */}
            <div className="absolute inset-2 bg-[#0A0A0A] rounded-[32px] overflow-hidden flex flex-col p-6 border border-white/5 shadow-2xl transition-transform group-hover:scale-[0.98] duration-500">
                {/* Status Bar */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#FF3B00] animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    <span className="text-white/40 font-mono text-[10px] tracking-[0.2em] uppercase">System v2.0</span>
                </div>

                {/* Tech List */}
                <div className="flex flex-col gap-4 mt-2">
                    {TECH_STACK.slice(0, 4).map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-3 group/item">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center transition-colors group-hover/item:bg-[#FF3B00]/20">
                                <tech.icon className="w-4 h-4 text-white/60 group-hover/item:text-[#FF3B00] transition-colors" />
                            </div>
                            <span className="text-white/90 font-medium tracking-tight text-[15px]">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Rabbit-style Bottom Text */}
                <div className="mt-auto font-sans tracking-tight font-bold text-[22px] leading-none">
                    <span className="text-white">Gabriel</span>
                    <span className="text-[#FF3B00]">.r2</span>
                </div>
            </div>
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </SmartWidget>
    );
}
