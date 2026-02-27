"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

export function LocationCard() {
    const t = useTranslations("About");
    const [distance, setDistance] = useState<number | null>(null);
    const [visitorCity, setVisitorCity] = useState<string>("");
    const [visitorCountry, setVisitorCountry] = useState<string>("");
    const [method, setMethod] = useState<string>("IP address");
    const [visitorCoords, setVisitorCoords] = useState<{ lat: number, lon: number } | null>(null);

    // Coordinates for São Paulo, Brazil
    const SP_COORDS = { lat: -23.5505, lon: -46.6333 };

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
    };

    const deg2rad = (deg: number) => deg * (Math.PI / 180);

    useEffect(() => {
        // IP-based geolocation (using ipapi.co - free tier doesn't require key)
        fetch("https://ipapi.co/json/")
            .then(res => res.json())
            .then(data => {
                if (data.latitude && data.longitude) {
                    setVisitorCity(data.city);
                    setVisitorCountry(data.country_name);
                    const d = calculateDistance(data.latitude, data.longitude, SP_COORDS.lat, SP_COORDS.lon);
                    setDistance(d);
                    setVisitorCoords({ lat: data.latitude, lon: data.longitude });
                }
            })
            .catch(() => {
                // Fallback to browser geolocation if IP fails or is blocked
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((pos) => {
                        const d = calculateDistance(pos.coords.latitude, pos.coords.longitude, SP_COORDS.lat, SP_COORDS.lon);
                        setDistance(d);
                        setMethod("Geolocation API");
                        setVisitorCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
                    });
                }
            });
    }, []);

    // Helper to map lat/lon to SVG percentage for the simplified world map
    const getMapXY = (lat: number, lon: number) => {
        const x = (lon + 180) * (100 / 360);
        const y = (90 - lat) * (100 / 180);
        return { x, y };
    };

    const spPos = getMapXY(SP_COORDS.lat, SP_COORDS.lon);
    const visitorPos = visitorCoords ? getMapXY(visitorCoords.lat, visitorCoords.lon) : null;

    return (
        <motion.div
            className="bg-[#0D1117] rounded-[24px] flex flex-col justify-between shadow-xl border border-white/5 text-zinc-400 w-full h-full relative overflow-hidden group"
            whileHover={{ scale: 0.98 }}
        >
            {/* World Map Background Wrapper - Full Height */}
            <div className="absolute inset-0 z-0 opacity-60">
                <svg viewBox="0 0 100 60" className="w-full h-full text-zinc-800 fill-current preserve-3d">
                    {/* Simplified World Map Paths */}
                    <path d="M12,18 L15,16 L20,16 L25,18 L30,22 L28,28 L22,30 L15,28 L12,22 Z M45,15 L50,12 L55,14 L60,18 L58,25 L52,28 L48,25 L45,18 Z M70,20 L75,18 L85,20 L90,25 L88,35 L80,40 L72,38 L70,28 Z M30,35 L35,32 L40,35 L42,45 L38,55 L32,55 L28,45 Z M55,45 L60,42 L65,45 L68,55 L62,58 L55,55 Z" />

                    {/* Map Dotted Line */}
                    {visitorPos && (
                        <motion.line
                            x1={`${visitorPos.x}%`} y1={`${visitorPos.y}%`}
                            x2={`${spPos.x}%`} y2={`${spPos.y}%`}
                            stroke="rgba(239, 68, 68, 0.6)"
                            strokeWidth="0.8"
                            strokeDasharray="1,1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    )}
                </svg>
            </div>

            {/* Content Over Map */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Visual Markers */}
                <div className="relative w-full h-full">
                    {/* Avatar at SP */}
                    <motion.div
                        className="absolute w-12 h-12 rounded-full border-2 border-white shadow-2xl bg-zinc-800 flex items-center justify-center translate-x-1/2 overflow-hidden z-20"
                        style={{ left: `calc(${spPos.x}% - 24px)`, top: `calc(${spPos.y}% - 24px)` }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                    >
                        <img src="https://github.com/GabrielBaiano.png" alt="Gabriel" className="w-full h-full object-cover" />
                    </motion.div>

                    {/* Pin at Visitor */}
                    {visitorPos && (
                        <motion.div
                            className="absolute z-20"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            style={{ left: `calc(${visitorPos.x}% - 14px)`, top: `calc(${visitorPos.y}% - 35px)` }}
                        >
                            <MapPin className="w-7 h-7 text-red-500 fill-white/20" />
                        </motion.div>
                    )}

                    {/* Distance Badge Floating */}
                    {distance && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl z-30"
                        >
                            <span className="text-sm font-black text-red-500 italic uppercase italic tracking-wider">
                                {distance.toLocaleString()} km away
                            </span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none" />
        </motion.div>
    );
}
