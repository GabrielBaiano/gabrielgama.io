"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export function AboutMeCard() {
    const t = useTranslations("About");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.div
                layoutId="about-me-card"
                onClick={() => setIsOpen(true)}
                className="bg-[#F1E5D1] text-stone-900 rounded-[24px] p-6 lg:p-8 flex flex-col shadow-sm w-full flex-1 min-w-[320px] justify-between relative overflow-hidden group aspect-[3/2] sm:aspect-auto sm:min-h-[226px] cursor-pointer border-2 border-transparent hover:border-[#F97316] transition-colors duration-300"
            >
                {/* Top Title */}
                <motion.div layoutId="about-me-title" className="relative z-20 w-fit">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-none text-stone-900">
                        {t("about_me_title")}
                    </h3>
                </motion.div>

                {/* Single Asterisk Graphic */}
                <motion.div layoutId="about-me-asterisk" className="absolute right-[-20px] top-[50%] -translate-y-1/2 z-10 pointer-events-none opacity-90 transition-transform group-hover:rotate-12 duration-700 ease-out">
                    <svg viewBox="0 0 100 100" className="w-[180px] md:w-[220px] aspect-square fill-[#F97316]">
                        <g transform="translate(50, 50)">
                            <rect x="-10" y="-45" width="20" height="90" rx="3" />
                            <rect x="-10" y="-45" width="20" height="90" rx="3" transform="rotate(45)" />
                            <rect x="-10" y="-45" width="20" height="90" rx="3" transform="rotate(90)" />
                            <rect x="-10" y="-45" width="20" height="90" rx="3" transform="rotate(135)" />
                        </g>
                    </svg>
                </motion.div>

                {/* Bottom Text */}
                <motion.div layoutId="about-me-desc" className="relative z-20 mt-auto pointer-events-none sm:pr-[160px]">
                    <p className="text-stone-600 text-[15px] md:text-base font-medium leading-relaxed">
                        {t("about_me_desc")}
                    </p>
                </motion.div>
            </motion.div>

            {/* Modal Expandido */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                        />
                        
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                layoutId="about-me-card"
                                className="bg-[#F1E5D1] text-stone-900 rounded-[24px] p-8 md:p-12 shadow-2xl w-full max-w-2xl min-h-[50vh] flex flex-col relative overflow-hidden pointer-events-auto border-2 border-[#F97316]"
                            >
                                <motion.div layoutId="about-me-title" className="relative z-20 mb-8 pr-12">
                                    <h3 className="text-4xl md:text-5xl font-semibold tracking-tight leading-none text-stone-900">
                                        {t("about_me_title")}
                                    </h3>
                                </motion.div>

                                <motion.div layoutId="about-me-asterisk" className="absolute -right-20 -top-20 z-10 pointer-events-none">
                                    <svg viewBox="0 0 100 100" className="w-[400px] aspect-square fill-[#F97316]">
                                        <g transform="translate(50, 50)">
                                            <rect x="-10" y="-45" width="20" height="90" rx="3" />
                                            <rect x="-10" y="-45" width="20" height="90" rx="3" transform="rotate(45)" />
                                            <rect x="-10" y="-45" width="20" height="90" rx="3" transform="rotate(90)" />
                                            <rect x="-10" y="-45" width="20" height="90" rx="3" transform="rotate(135)" />
                                        </g>
                                    </svg>
                                </motion.div>

                                <motion.div layoutId="about-me-desc" className="relative z-20 flex flex-col flex-1">
                                    <p className="text-stone-700 text-[17px] leading-relaxed font-medium">
                                        {t("about_me_desc")}
                                    </p>
                                    
                                    {/* Placeholder para mais conteúdo futuro */}
                                    <div className="mt-8 space-y-4 text-stone-600 text-[15px] opacity-80 border-t border-stone-900/10 pt-8">
                                        <p>Aqui você poderá adicionar descrições mais longas, sua história completa, detalhes das suas ferramentas favoritas e o que te motiva no dia a dia como desenvolvedor.</p>
                                        <p className="font-semibold text-stone-800">Esse espaço dentro do modal pode ser crescido livremente!</p>
                                    </div>
                                </motion.div>

                                {/* Botão de fechar */}
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-6 right-6 z-30 p-2.5 bg-stone-900/5 hover:bg-stone-900/10 text-stone-700 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
