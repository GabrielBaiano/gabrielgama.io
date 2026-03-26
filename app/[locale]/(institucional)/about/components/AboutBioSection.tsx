"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function AboutBioSection() {
    const t = useTranslations("About");

    return (
        <section className="w-full max-w-2xl mx-auto py-12 px-2 flex flex-col gap-10 text-stone-900 leading-relaxed tracking-tight">
            {/* Work Section */}
            <div className="flex flex-col gap-5">
                <div className="relative w-fit">
                    <h3 className="text-[22px] font-bold tracking-tight underline-offset-[8px] decoration-[4px] decoration-stone-200/60 underline">
                        Work
                    </h3>
                </div>
                <p className="text-[17px] font-medium text-stone-700 indent-4">
                    Gabriel is a <span className="text-[#F97316]">Software Engineer</span> focused on creating exceptional digital experiences. He combines technical rigor with a sharp aesthetic vision to deliver solutions that truly make a difference. Currently, he is building high-performance applications at <span className="text-[#F97316]">Flash</span> and pursuing his Master's at UNESP.
                </p>
                <div className="flex justify-center mt-4">
                    <button className="bg-[#56E3BC] hover:brightness-105 active:scale-95 px-8 py-3 rounded-[12px] text-stone-900 font-bold text-[16px] flex items-center gap-2 transition-all shadow-lg shadow-[#56E3BC]/20">
                        My portfolio 
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Bio Section */}
            <div className="flex flex-col gap-5">
                <div className="relative w-fit">
                    <h3 className="text-[22px] font-bold tracking-tight underline-offset-[8px] decoration-[4px] decoration-stone-200/60 underline">
                        Bio
                    </h3>
                </div>
                <div className="flex flex-col gap-3 font-medium">
                    <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="font-bold text-stone-900">2021</span>
                        <span className="text-stone-700">Worked as a Freelancer at Emporio 24h, automating inventory systems.</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="font-bold text-stone-900">2023</span>
                        <span className="text-stone-700">Joined TechSolution as a Junior Front-end Developer.</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="font-bold text-stone-900">2024</span>
                        <span className="text-stone-700">Mobile Development Internship at Compass UOL (iOS/Android).</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="font-bold text-stone-900">2025</span>
                        <span className="text-stone-700">Promoted to Software Engineer (Pleno) at Flash. Completed ADS at FACINT.</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="font-bold text-stone-900 italic opacity-60">Future</span>
                        <span className="text-stone-700 italic opacity-60">Started Master's degree in Computer Science at UNESP (Starting 2026).</span>
                    </div>
                </div>
            </div>

            {/* Hobbies Section */}
            <div className="flex flex-col gap-5">
                <div className="relative w-fit">
                    <h3 className="text-[22px] font-bold tracking-tight underline-offset-[8px] decoration-[4px] decoration-stone-200/60 underline">
                        I ♥
                    </h3>
                </div>
                <p className="text-[17px] font-medium text-stone-700 indent-4 lowercase">
                    Art, Music, <span className="text-[#EC4899]">Building Stuff</span>, Photography, UI Design, <span className="text-[#F97316]">Clean Code</span>, Researching.
                </p>
            </div>
        </section>
    );
}
