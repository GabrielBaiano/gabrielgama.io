"use client";

import React from "react";
import { SmartWidget } from "./SmartWidget";

export function VideoWidget() {
    return (
        <SmartWidget className="!p-0 w-full aspect-video relative group shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-black/5 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-stone-900 animate-pulse" />
            <iframe 
                className="w-full h-full relative z-10"
                src="https://www.youtube.com/embed/Ecq2kcubTnY?start=50&rel=0&showinfo=0&modestbranding=1" 
                title="Apresentação Gabriel Gama"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            ></iframe>
        </SmartWidget>
    );
}
