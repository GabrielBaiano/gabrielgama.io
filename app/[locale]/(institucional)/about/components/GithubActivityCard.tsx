"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface Contribution {
    date: string;
    contributionCount: number;
    color: string;
}

export function GithubActivityCard() {
    const [data, setData] = useState<Contribution[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetch('https://github-contributions-api.deno.dev/GabrielBaiano.json')
            .then(res => res.json())
            .then(json => {
                const flat = json.contributions.flat();
                // Find index of today or just take last 14
                const today = new Date().toISOString().split('T')[0];
                const todayIndex = flat.findIndex((d: Contribution) => d.date === today);

                let last14;
                if (todayIndex !== -1) {
                    last14 = flat.slice(Math.max(0, todayIndex - 13), todayIndex + 1);
                } else {
                    last14 = flat.slice(-14);
                }

                // If we don't have exactly 14, pad with empty days
                while (last14.length < 14) {
                    last14.unshift({ date: '', contributionCount: 0, color: '#ebedf0' });
                }

                setData(last14);
            })
            .catch(console.error);
    }, []);

    const maxContributions = Math.max(...data.map(d => d.contributionCount), 1);
    const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <motion.a
            href="https://github.com/GabrielBaiano"
            target="_blank"
            rel="noopener noreferrer"
            variants={{
                hidden: { opacity: 0, scale: 0.95, y: 20 },
                show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
            }}
            className="col-span-2 md:col-span-2 lg:col-span-4 row-span-2 lg:row-span-2 bg-black rounded-[24px] p-5 shadow-sm border border-[#30363D] relative overflow-hidden group flex flex-col justify-between hover:bg-zinc-900 transition-colors cursor-pointer"
        >
            {/* Header matching Tesla widget style */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] text-white fill-current">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.137 20.161 22 16.415 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">GITHUB</span>
                        <span className="text-[15px] font-bold text-white leading-tight">GabrielBaiano</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[11px] font-medium text-zinc-500">commits</span>
                    <span className="text-[13px] font-semibold text-white">14 days</span>
                </div>
            </div>

            {/* Chart Area */}
            <div className="flex items-end justify-between h-[100px] mt-4 w-full gap-1.5 px-1 relative">
                {mounted && data.map((day, i) => {
                    // Extract Date object (handling padding case)
                    const dateObj = day.date ? new Date(day.date + 'T00:00:00') : new Date();
                    const dayLabel = day.date ? dayLabels[dateObj.getDay()] : '-';

                    const percent = (day.contributionCount / maxContributions) * 100;

                    // Bar heights (at least bare minimum 10% for non-zero to show it is not completely empty, but visual requires scale)
                    // If 0, we can drop it to 10% just for the cap? No, wait, Tesla widget has the background track, and inner fill.
                    return (
                        <div key={i} className="flex flex-col items-center justify-end h-full group/bar w-[1rem]">
                            {/* Bar Container */}
                            <div className="w-full bg-white/10 rounded-[4px] h-[65px] relative flex items-end justify-center mb-1 overflow-hidden">
                                {day.contributionCount > 0 && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${percent}%` }}
                                        transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                                        className="w-full bg-[#39D353] rounded-[4px] absolute bottom-0 left-0 right-0"
                                        style={{ minHeight: '4px' }}
                                    />
                                )}

                                {/* Hover Tooltip */}
                                <div className="absolute -top-8 bg-zinc-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                    {day.contributionCount} commits
                                </div>
                            </div>
                            {/* Day Label */}
                            <span className="text-[10px] font-bold text-zinc-400">{dayLabel}</span>
                        </div>
                    );
                })}
                {(!mounted || data.length === 0) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </motion.a>
    );
}
