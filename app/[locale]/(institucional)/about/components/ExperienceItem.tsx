"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface SubRole {
    role: string;
    period: string;
    description: string;
}

interface ExperienceItemProps {
    company: string;
    role?: string;
    period?: string;
    description?: string;
    subRoles?: SubRole[];
    icon: LucideIcon;
    color: string;
    isLast?: boolean;
}

export function ExperienceItem({ company, role, period, description, subRoles, icon: Icon, color, isLast }: ExperienceItemProps) {
    const hasSubRoles = subRoles && subRoles.length > 0;

    return (
        <div className="flex w-full min-h-[80px] gap-4 sm:gap-6 px-4 group">
            {/* Time / Period (Main) */}
            <div className="w-[85px] sm:w-[110px] pt-3 text-right shrink-0">
                <span className="text-stone-500 text-[12px] font-bold tracking-tighter uppercase tabular-nums whitespace-nowrap">
                    {period}
                </span>
            </div>

            {/* Timeline Line & Icon */}
            <div className="flex flex-col items-center relative shrink-0">
                <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center z-10 shrink-0 shadow-lg border-4 border-[#0C0C0C]"
                    style={{ backgroundColor: color }}
                >
                    <Icon className="w-5 h-5 text-white" />
                </div>
                {!isLast && (
                    <div className="w-[1.5px] absolute top-10 bottom-0 bg-stone-800 z-0" />
                )}
            </div>

            {/* Content Item */}
            <div className="flex-1 pb-8">
                <div className="bg-[#141414] border border-white/5 rounded-[20px] p-5 sm:p-6 shadow-lg transition-all hover:bg-[#1A1A1A] hover:border-white/10 group-hover:translate-x-1 duration-300">
                    <div className="flex flex-col">
                        {/* Company Header */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-stone-300 font-bold text-[17px] tracking-tight">{company}</span>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        </div>

                        {/* Scenario 1: Single Role */}
                        {!hasSubRoles && role && (
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-[15px] mb-1.5 leading-tight">{role}</span>
                                <p className="text-stone-500 text-[13px] leading-relaxed font-medium">
                                    {description}
                                </p>
                            </div>
                        )}

                        {/* Scenario 2: Multiple Roles in Same Company */}
                        {hasSubRoles && (
                            <div className="flex flex-col gap-6 relative">
                                {subRoles.map((sr, idx) => (
                                    <div key={`sub-${idx}`} className="flex flex-col relative">
                                        <div className="flex flex-col">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-stone-100 font-bold text-[14px] leading-tight">{sr.role}</span>
                                                <span className="text-stone-600 text-[10px] font-bold tabular-nums whitespace-nowrap ml-4">{sr.period}</span>
                                            </div>
                                            <p className="text-stone-500 text-[12px] leading-relaxed font-medium">
                                                {sr.description}
                                            </p>
                                        </div>
                                        {idx < subRoles.length - 1 && <div className="h-[1px] w-full bg-white/5 mt-6" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
