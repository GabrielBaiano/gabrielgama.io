"use client";

import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function AboutHeader() {
    const t = useTranslations("About");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left max-w-2xl mx-auto mb-28 mt-20 gap-6 justify-center"
        >
            <div className="w-32 h-32 md:w-36 md:h-36 shrink-0 rounded-full overflow-hidden border-[1px] border-zinc-200 dark:border-zinc-800 shadow-sm relative">
                <Image
                    src="/test/test-profile-pic.png"
                    alt="Gabriel Gama Profile Picture"
                    fill
                    sizes="(max-width: 768px) 128px, 144px"
                    priority
                    className="object-cover transition-transform duration-500"
                />
            </div>

            <div className="flex flex-col justify-center pt-2">
                <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-stone-900 mb-1">
                    Gabriel Gama
                </h1>
                <p className="text-stone-400 font-medium mb-1 text-[15px]">{t("role")}</p>
                <p className="text-stone-500 text-[14px] leading-relaxed mb-3 max-w-sm">{t("bio")}</p>

                <div className="flex items-center justify-center md:justify-start text-stone-400 text-[13px] font-medium tracking-wide">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 stroke-[2] text-stone-400" />
                    {t("location")}
                </div>
            </div>
        </motion.div>
    );
}
