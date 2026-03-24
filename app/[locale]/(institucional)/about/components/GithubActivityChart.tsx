"use client";

//TODO: Implementar a busca real de dados do github, colocar mouse hover nos dias para mostrar a quantidade de commits e o dia.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useTranslations } from "next-intl";

interface ActivityDay {
    dateObj: Date;
    day: number;
    value: number;
    max: number;
    active: boolean;
}

export function GithubActivityChart() {
    const t = useTranslations("About");
    const [data, setData] = useState<ActivityDay[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchActivity() {
            try {
                // Mockup requested by user to see the chart full of commits
                const days: { [key: string]: number } = {};
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const last7Days = Array.from({ length: 7 }).map((_, i) => {
                    const d = new Date(today);
                    d.setDate(d.getDate() - (6 - i));
                    return d;
                });

                // Mock values mimicking an active week
                const mockValues = [24, 65, 30, 112, 45, 89, 70];

                last7Days.forEach((d, i) => {
                    const dateStr = d.toISOString().split('T')[0];
                    days[dateStr] = mockValues[i];
                });

                // Find active day to highlight (the one with the most commits)
                const maxValRaw = Math.max(...Object.values(days));
                const maxVal = Math.max(maxValRaw, 15);

                let activeDateStr = "";
                let currentMax = -1;
                // Defaults to the latest day if there's a tie for max
                last7Days.forEach(d => {
                    const str = d.toISOString().split('T')[0];
                    if (days[str] >= currentMax) {
                        currentMax = days[str];
                        activeDateStr = str;
                    }
                });

                const formattedData: ActivityDay[] = last7Days.map((d) => {
                    const dateStr = d.toISOString().split('T')[0];
                    const val = days[dateStr];

                    return {
                        dateObj: d,
                        day: d.getDate(),
                        value: val,
                        max: maxVal * 1.2,
                        active: dateStr === activeDateStr
                    };
                });

                setData(formattedData);
            } catch (error) {
                console.error("Error fetching github activity:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchActivity();
    }, []);

    if (isLoading) {
        return <div className="bg-[#EBEBEB] rounded-[24px] w-full min-h-[220px] animate-pulse" />;
    }

    return (
        <div className="bg-[#EBEBEB] rounded-[24px] p-6 lg:p-7 shadow-sm w-full flex flex-col h-[280px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2.5">
                    <Github className="w-5 h-5 text-stone-900 fill-current" />
                    <h3 className="text-stone-900 font-bold text-[17px] tracking-tight">{t('github_activity_title')}</h3>
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative flex-1 flex justify-between mt-2 px-1">
                {/* Dotted Line */}
                <div
                    className="absolute top-[50%] left-0 w-full h-[2px] z-0 opacity-30 pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(to right, #141414 40%, transparent 40%)", backgroundSize: "12px 2px" }}
                />

                {/* Bars - we have exactly 7 items now */}
                {data.map((item, idx) => {
                    const heightPercent = Math.max((item.value / item.max) * 100, 10);

                    return (
                        <div key={idx} className="relative flex flex-col items-center h-full z-10 pb-6 pt-4 w-[28px] md:w-[32px]">

                            {/* Active Arrow */}
                            {item.active && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-stone-800"
                                />
                            )}

                            {/* Bar Container - flex-1 ensures it fills vertical space to the label */}
                            <div className="relative w-[22px] md:w-[24px] flex-1 bg-[#D1D1D1] rounded-full mt-2 flex flex-col justify-end">

                                {/* Filled bar */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${heightPercent}%` }}
                                    transition={{ duration: 1, type: "spring", bounce: 0.2, delay: idx * 0.05 }}
                                    className={`relative w-full rounded-full ${item.active ? 'bg-[#70A5FF]' : 'bg-[#141414]'}`}
                                >
                                    {/* Active Badge tracked directly on top of the bar */}
                                    {item.active && (
                                        <motion.div
                                            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
                                            className="absolute -top-[12px] left-1/2 -translate-x-1/2 w-[24px] h-[24px] bg-[#141414] text-[#70A5FF] rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm z-20"
                                        >
                                            {item.value}
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>

                            {/* X-Axis Label */}
                            <span className="absolute bottom-0 text-stone-500 text-[11px] font-semibold">
                                {item.day}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
