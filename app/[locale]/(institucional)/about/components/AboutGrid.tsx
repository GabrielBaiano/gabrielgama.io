"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FolderCard } from "./FolderCard";
import { ProjectsFolderModal } from "./ProjectsFolderModal";
import { AboutMeCard } from "./AboutMeCard";
import { GithubActivityChart } from "./GithubActivityChart";

export function AboutGrid() {
    const t = useTranslations("About");
    const [isFolderOpen, setIsFolderOpen] = useState(false);

    return (
        <div className="flex flex-col gap-5 w-full max-w-[1240px] mx-auto p-4 mb-20">
            {/* Top Row: Folder + About Me */}
            <div className="flex flex-col md:flex-row gap-5 w-full">
                {/* Folder Card */}
                <div className="w-full md:w-[340px] shrink-0 aspect-[3/2]">
                    <FolderCard
                        color="#94B9FF"
                        hoverColor="#9DBEFF"
                        label={t("projects")}
                        onClick={() => setIsFolderOpen(true)}
                    />
                </div>
                
                {/* About Me Card */}
                <div className="flex-1 flex min-w-[320px]">
                    <AboutMeCard />
                </div>
            </div>

            {/* Bottom Row: GitHub Activity */}
            <div className="flex flex-col md:flex-row gap-5 w-full">
                <div className="w-full md:w-[440px] shrink-0">
                    <GithubActivityChart />
                </div>
                <div className="flex-1 hidden md:block" />
            </div>

            <ProjectsFolderModal
                isOpen={isFolderOpen}
                onClose={() => setIsFolderOpen(false)}
                title={t("projects")}
            />
        </div>
    );
}
