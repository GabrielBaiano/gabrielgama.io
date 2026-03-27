"use client";

import { useTranslations } from "next-intl";
import { AboutMeCard } from "./AboutMeCard";
import { VideoWidget } from "./VideoWidget";
import { RabbitCard } from "./RabbitCard";
import { WorkHistoryWidget } from "./WorkHistoryWidget";

export function AboutGrid() {
    const t = useTranslations("About");

    return (
        <div className="flex flex-col gap-5 w-full max-w-[1240px] mx-auto p-4 mb-20 lg:p-8">
            {/* Staggered Bento Grid - Granular 12-column */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-stretch">
                {/* Row 1: Small (Empty) + Large (AboutMe) */}
                <div className="md:col-span-4 flex items-center justify-center bg-[#121212] rounded-[32px] aspect-square group hover:bg-[#F1E5D1] transition-colors duration-500 border-2 border-transparent">
                    {/* Placeholder for future widget */}
                </div>
                <div className="md:col-span-8 flex">
                    <AboutMeCard />
                </div>
                
                {/* Row 2: Video (7/12) + Experience (5/12) -> Heights matched to row 1 (7/12 * 9/16 ≈ 4/12) */}
                <div className="md:col-span-7 flex">
                    <VideoWidget />
                </div>
                <div className="md:col-span-5 flex">
                    <WorkHistoryWidget />
                </div>
            </div>
        </div>
    );
}
