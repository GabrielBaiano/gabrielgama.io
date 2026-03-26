"use client";

import React from "react";
import { SmartWidget } from "./SmartWidget";
import { PillButton } from "./PillButton";
import { ChevronRight, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export function ExperienceWidget() {
    const t = useTranslations("About");

    return (
        <SmartWidget className="flex-[1.5] h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6 opacity-60">
                <Zap className="w-4 h-4 text-[#F97316]" />
                <span className="text-white text-[14px] font-medium tracking-tight uppercase">
                    {t('current_position_title')}
                </span>
            </div>

            <p className="text-white/60 text-[15px] sm:text-[17px] leading-snug font-medium tracking-tight mb-8">
                {t('current_role')} na <span className="text-white">Flash</span>
            </p>
            
            <div className="mb-10 text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.1] tracking-tighter">
                <span className="text-white/40">Especialista em </span>
                <span className="text-white font-bold">Front-end </span><br />
                <span className="text-white/40">com foco em </span>
                <span className="text-white font-bold">Performance </span>
                <span className="text-white/40">& </span><br />
                <span className="text-white font-bold flex items-center mt-1 text-[#F97316]">
                    UI Premium
                </span>
            </div>
            
            <div className="mt-auto">
                <PillButton variant="glass" className="text-[15px] py-2 px-6 flex items-center gap-2">
                    View full history <ChevronRight className="w-4 h-4 stroke-[3px]" />
                </PillButton>
            </div>
        </SmartWidget>
    );
}
