"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";

interface SocialFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Retiramos a 'description' estática para usar via map dinâmico 
const SOCIAL_LINKS = [
    { name: "YouTube", icon: Youtube, color: "bg-[#FF0000]", url: "https://youtube.com/@gabrielgama" },
    { name: "LinkedIn", icon: Linkedin, color: "bg-[#0A66C2]", url: "https://linkedin.com/in/gabrielbaiano" },
    { name: "GitHub", icon: Github, color: "bg-[#141414]", url: "https://github.com/GabrielBaiano" },
    { name: "Twitter", icon: Twitter, color: "bg-[#1DA1F2]", url: "https://twitter.com/gabrielgama" },
];

export function SocialFolderModal({ isOpen, onClose }: SocialFolderModalProps) {
    const t = useTranslations("About");
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

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-md"
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="w-full max-w-[480px] bg-[#F7F7F7] rounded-[40px] p-6 md:p-8 pointer-events-auto shadow-2xl relative"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 bg-stone-200/50 hover:bg-stone-200 rounded-full transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-stone-600" />
                            </button>

                            <div className="mb-8 mt-2 pl-2">
                                <h2 className="text-[28px] leading-tight font-bold text-stone-900 tracking-tight">{t('contact_folder_name')}</h2>
                                <p className="text-stone-500 text-[15px] font-medium mt-1">{t('contact_folder_desc')}</p>
                            </div>

                            {/* iOS Style Widget Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {SOCIAL_LINKS.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${link.color} p-5 md:p-6 rounded-[28px] flex flex-col justify-between aspect-square group hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-[16px] flex items-center justify-center shadow-sm">
                                                <link.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-white font-bold text-[17px] tracking-tight">{link.name}</h3>
                                            <p className="text-white/80 text-[12px] font-medium mt-0.5 leading-snug">{t(`social_${link.name.toLowerCase()}_desc` as any)}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
