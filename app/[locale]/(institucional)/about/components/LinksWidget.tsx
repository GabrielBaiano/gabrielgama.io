"use client";

import React from "react";
import { SmartWidget } from "./SmartWidget";
import { PillButton } from "./PillButton";
import { Github, Linkedin, Twitter, Youtube, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const SOCIAL_LINKS = [
    { name: "GabrielGama.io", icon: Github, url: "https://github.com/GabrielBaiano" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/gabrielbaiano" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com/@gabrielgama" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/gabrielgama" },
];

export function LinksWidget() {
    const t = useTranslations("About");

    return (
        <SmartWidget className="flex-1 sm:max-w-[320px] h-full flex flex-col">
            <div className="flex flex-col gap-3 mb-8">
                {SOCIAL_LINKS.map((link, idx) => (
                    <a 
                        key={idx} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-white text-[26px] sm:text-[28px] font-medium tracking-tight hover:opacity-70 transition-opacity truncate group"
                    >
                        <link.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors shrink-0" />
                        <span className="truncate">{link.name}</span>
                        <ChevronRight className="w-5 h-5 opacity-20 shrink-0 ml-auto group-hover:opacity-60 transition-opacity" />
                    </a>
                ))}
            </div>
            
            <div className="mt-auto">
                <PillButton variant="glass" className="text-[14px] py-2 px-5 w-full font-semibold">
                    {t('contact_folder_desc')}
                </PillButton>
            </div>
        </SmartWidget>
    );
}
