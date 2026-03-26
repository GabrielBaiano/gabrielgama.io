"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { SmartWidget } from "./SmartWidget";
import { motion } from "framer-motion";

const WORK_ITEMS = [
    { name: "Flash.com", url: "#" },
    { name: "Compass.uol", url: "#" },
    { name: "Techsolution.com", url: "#" },
    { name: "Emporio24h.com", url: "#" },
    { name: "Schultz.com", url: "#" },
    { name: "AcaiParaense.com", url: "#" },
    { name: "Gabrielgama.io", url: "#" },
];

export function WorkHistoryWidget() {
    const visibleItems = WORK_ITEMS.slice(0, 6);

    return (
        <SmartWidget className="bg-[#121212] !p-6 flex flex-col h-full border-none shadow-2xl overflow-hidden">
            <div className="flex flex-col gap-2 flex-1">
                {visibleItems.map((item, idx) => (
                    <motion.a
                        key={item.name}
                        href={item.url}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between group py-1"
                    >
                        <span className="text-white text-[28px] font-bold tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                            {item.name}
                        </span>
                        <ChevronRight className="w-6 h-6 text-stone-600 group-hover:text-white transition-colors" />
                    </motion.a>
                ))}
            </div>
        </SmartWidget>
    );
}
