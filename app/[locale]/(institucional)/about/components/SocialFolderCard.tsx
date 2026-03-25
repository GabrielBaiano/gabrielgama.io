"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Youtube, X, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

const SOCIAL_LINKS = [
    { name: "YouTube", icon: Youtube, color: "bg-[#FF0000]", url: "https://youtube.com/@gabrielgama" },
    { name: "LinkedIn", icon: Linkedin, color: "bg-[#0A66C2]", url: "https://linkedin.com/in/gabrielbaiano" },
    { name: "GitHub", icon: Github, color: "bg-[#141414]", url: "https://github.com/GabrielBaiano" },
    { name: "Twitter", icon: Twitter, color: "bg-[#1DA1F2]", url: "https://twitter.com/gabrielgama" },
];

export function SocialFolderCard() {
    const t = useTranslations("About");
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            <motion.div 
                onClick={() => setIsOpen(true)}
                className="flex flex-col items-center p-2 cursor-pointer group"
            >
                {/* iOS Folder Icon Wrapper - Uses 2x2 layout now */}
                <motion.div 
                    layoutId="social-folder"
                    className="w-[76px] h-[76px] bg-[#EBEBEB] shadow-inner rounded-[22px] p-2.5 grid grid-cols-2 gap-[4px] border-2 border-transparent group-hover:border-[#F97316] transition-colors duration-300 relative overflow-hidden"
                >
                    {/* 4 real miniature icons */}
                    <div className="bg-[#FF0000] rounded-[6px] flex items-center justify-center shadow-sm">
                        <Youtube className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-[#0A66C2] rounded-[6px] flex items-center justify-center shadow-sm">
                        <Linkedin className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-[#141414] rounded-[6px] flex items-center justify-center shadow-sm">
                        <Github className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-[#1DA1F2] rounded-[6px] flex items-center justify-center shadow-sm">
                        <Twitter className="w-3.5 h-3.5 text-white fill-current" />
                    </div>
                </motion.div>

                <span className="text-stone-700 font-medium text-[13px] tracking-tight mt-2">{t('contact_folder_name')}</span>
            </motion.div>

            {mounted && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-md"
                            />
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                                <motion.div
                                    layoutId="social-folder"
                                    className="w-full max-w-[420px] bg-[#F1F3F5] rounded-[44px] p-8 pointer-events-auto shadow-2xl relative overflow-hidden"
                                >
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="absolute top-5 right-5 p-2 bg-stone-200 hover:bg-stone-300 rounded-full transition-colors z-10"
                                    >
                                        <X className="w-5 h-5 text-stone-600" />
                                    </button>

                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                                        className="mb-8 mt-2"
                                    >
                                        <h2 className="text-[32px] font-bold text-stone-900 tracking-tight text-center">{t('contact_folder_name')}</h2>
                                        <p className="text-stone-500 text-[15px] font-medium text-center">{t('contact_folder_desc')}</p>
                                    </motion.div>

                                    {/* iOS Style Inner Folder Grid (3x3 App Icons) */}
                                    <div className="grid grid-cols-3 gap-x-4 gap-y-7 mt-4">
                                        {SOCIAL_LINKS.map((link, idx) => (
                                            <motion.a
                                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + (idx * 0.05) }}
                                                key={link.name}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex flex-col items-center group cursor-pointer"
                                            >
                                                <div className={`w-[84px] h-[84px] ${link.color} rounded-[22px] flex items-center justify-center shadow-md group-hover:scale-[1.05] active:scale-[0.95] transition-all duration-300`}>
                                                    <link.icon className="w-9 h-9 text-white drop-shadow-sm" />
                                                </div>
                                                <span className="text-stone-600 font-medium text-[13px] tracking-tight mt-2.5 text-center">{link.name}</span>
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
