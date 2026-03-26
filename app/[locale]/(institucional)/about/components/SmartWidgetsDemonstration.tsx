"use client";

import React from "react";
import { SmartWidget } from "./SmartWidget";
import { AboutBioSection } from "./AboutBioSection";

export function SmartWidgetsDemonstration() {
    return (
        <div className="w-full flex flex-col gap-24 relative z-50">
            {/* Bio Estilo Takuya */}
            <div className="w-full">
                <AboutBioSection />
            </div>

            {/* Widget de Apresentação YouTube - Estilo Cinemático Fino */}
            <div className="w-full max-w-3xl mx-auto px-2">
                <SmartWidget className="!p-0 aspect-video w-full relative group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] ring-1 ring-black/5 overflow-hidden">
                    <div className="absolute inset-0 z-0 bg-stone-900 animate-pulse" />
                    <iframe 
                        className="w-full h-full relative z-10 rounded-[32px]"
                        src="https://www.youtube.com/embed/Ecq2kcubTnY?start=50&rel=0&showinfo=0&modestbranding=1" 
                        title="Apresentação Gabriel Gama"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                    ></iframe>
                </SmartWidget>
            </div>
        </div>
    );
}
