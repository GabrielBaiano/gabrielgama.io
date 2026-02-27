"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { useTranslations } from "next-intl";

interface CertificateProps {
    type: "msc" | "bsc";
    institution: string;
    degree: string;
    date: string;
    gpa?: string;
    status: string;
}

export function Certificate({ type, institution, degree, date, gpa, status }: CertificateProps) {
    const t = useTranslations("About");

    const isMsc = type === "msc";
    const title = isMsc ? t("academic_cert_msc") : t("academic_cert_bsc");

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative w-full h-full select-none flex items-center justify-center p-0"
        >
            <svg
                viewBox="0 0 580 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-sm overflow-visible"
            >
                {/* Definitions */}
                <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="25%" stopColor="#F9E29C" />
                        <stop offset="50%" stopColor="#B8860B" />
                        <stop offset="75%" stopColor="#F9E29C" />
                        <stop offset="100%" stopColor="#8B6D1E" />
                    </linearGradient>

                    <linearGradient id="textGoldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#B38E44" />
                        <stop offset="100%" stopColor="#8B6D1E" />
                    </linearGradient>

                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
                        <feOffset dx="1" dy="1" result="offsetblur" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background Layer */}
                <rect x="0" y="0" width="580" height="300" rx="30" fill="#FCF9F2" />
                <rect x="0" y="0" width="580" height="300" rx="30" stroke="#E5E7EB" strokeWidth="0.5" />

                {/* Main Double Frame */}
                <rect x="12" y="12" width="556" height="276" rx="22" stroke="url(#goldGradient)" strokeWidth="1.2" />
                <rect x="18" y="18" width="544" height="264" rx="18" stroke="url(#goldGradient)" strokeWidth="0.4" opacity="0.3" />

                {/* Decorative Corners */}
                <path d="M 12 50 L 12 30 Q 12 12 30 12 L 50 12" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 530 12 L 550 12 Q 568 12 568 30 L 568 50" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 12 250 L 12 270 Q 12 288 30 288 L 50 288" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 530 288 L 550 288 Q 568 288 568 270 L 568 250" stroke="url(#goldGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                {/* Title Section */}
                <text x="45" y="70" className="font-sans font-black" fill="url(#textGoldGradient)" style={{ fontSize: '32px', letterSpacing: '0.5px' }}>
                    DIPLOMA DE
                </text>
                <text x="45" y="105" className="font-sans font-black" fill="url(#textGoldGradient)" style={{ fontSize: '32px', letterSpacing: '0.5px' }}>
                    {isMsc ? "MESTRADO" : "GRADUAÇÃO"}
                </text>

                {/* Content Section */}
                <text x="45" y="155" className="font-sans font-bold" fill="#78716C" style={{ fontSize: '13px', letterSpacing: '1px' }}>
                    CERTIFICA: <tspan fill="#1C1917" className="font-black">[{t("academic_name")}]</tspan>
                </text>

                <text x="45" y="185" className="font-sans font-medium" fill="#44403C" style={{ fontSize: '14px' }}>
                    Grau de <tspan fill="#1C1917" className="font-black uppercase">{degree}</tspan> ({institution})
                </text>

                {/* Footer Section */}
                <text x="45" y="255" className="font-sans font-black" fill="#1C1917" style={{ fontSize: '13px' }}>
                    GPA {gpa || "9.7"} <tspan fill="#D1D5DB" className="font-normal mx-2">|</tspan> {date}
                </text>

                {/* Signatures */}
                <g transform="translate(350, 240)">
                    <line x1="0" y1="0" x2="180" y2="0" stroke="#44403C" strokeWidth="0.5" />
                    <text x="90" y="-12" textAnchor="middle" className="italic font-serif" fill="#1C1917" style={{ fontSize: '15px' }}>
                        Assinatura do Reitor
                    </text>
                    <text x="90" y="12" textAnchor="middle" className="font-sans font-bold" fill="#1C1917" style={{ fontSize: '10px', textTransform: 'uppercase' }}>
                        Assinatura do Reitor
                    </text>

                    {/* Rolled Diploma */}
                    <g transform="translate(185, -10) rotate(-15) scale(0.8)">
                        <path d="M 0 0 L 25 0 Q 30 0 30 5 L 30 15 Q 30 20 25 20 L 0 20 Q -5 20 -5 15 L -5 5 Q -5 0 0 0" fill="#FCF9F2" stroke="#44403C" strokeWidth="1" />
                        <line x1="2" y1="0" x2="2" y2="20" stroke="#44403C" strokeWidth="1" />
                        <circle cx="28" cy="10" r="2" fill="#D4AF37" stroke="#8B6D1E" strokeWidth="0.5" />
                    </g>
                </g>

                {/* Golden Seal */}
                <g transform="translate(435, 45)">
                    {/* Ribbons */}
                    <path d="M 0 50 L -12 75 L 0 65 L 12 75 L 0 50" fill="#C5A059" filter="url(#shadow)" />
                    <path d="M 25 50 L 13 75 L 25 65 L 37 75 L 25 50" fill="#C5A059" filter="url(#shadow)" />

                    {/* Serrated Seal Circle */}
                    <path d="M 25,0 L 28,2 L 32,1 L 34,4 L 38,4 L 39,8 L 43,9 L 43,13 L 46,15 L 45,19 L 47,22 L 45,25 L 46,29 L 43,31 L 43,35 L 39,36 L 38,40 L 34,39 L 32,42 L 28,41 L 25,44 L 22,41 L 18,42 L 16,39 L 12,40 L 11,36 L 7,35 L 7,31 L 4,29 L 5,25 L 3,22 L 5,19 L 4,15 L 7,13 L 7,9 L 11,8 L 12,4 L 16,4 L 18,1 L 22,2 Z"
                        fill="url(#goldGradient)"
                        filter="url(#shadow)"
                        transform="scale(1.8) translate(-12.5, -10)"
                    />

                    {/* Seal Details */}
                    <g transform="translate(13, 22)">
                        <foreignObject x="-16" y="-20" width="32" height="32">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                <GraduationCap className="text-white w-7 h-7" />
                            </div>
                        </foreignObject>
                        <text y="10" textAnchor="middle" fill="#FCF9F2" className="font-black" style={{ fontSize: '5px' }}>UNESP</text>
                    </g>
                </g>
            </svg>

            {/* Status Overlay */}
            <div className={`absolute top-4 right-8 text-[7px] font-black px-1.5 py-0.5 rounded-sm border w-fit uppercase tracking-tighter shadow-sm z-10 ${status === "concluded"
                    ? "bg-emerald-50/90 text-emerald-600 border-emerald-200"
                    : "bg-amber-50/90 text-amber-600 border-amber-200"
                }`}>
                {status === "concluded" ? t("academic_status_concluded") : t("academic_status_in_progress")}
            </div>
        </motion.div>
    );
}
