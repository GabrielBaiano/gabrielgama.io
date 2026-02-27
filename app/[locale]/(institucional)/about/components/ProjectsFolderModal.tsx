"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ProjectsFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export function ProjectsFolderModal({ isOpen, onClose, title }: ProjectsFolderModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                    />

                    {/* Paper Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="bg-[#FDFBF7] w-full max-w-4xl h-[80vh] md:h-[70vh] rounded-md shadow-2xl relative overflow-hidden pointer-events-auto flex flex-col border border-stone-200"
                            style={{
                                backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
                            }}
                        >
                            {/* Paper Header / Closure */}
                            <div className="flex justify-between items-center p-6 border-b border-stone-200/60">
                                <h2 className="text-2xl font-semibold text-stone-800 tracking-tight">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-black/5 text-stone-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Paper Content Body */}
                            <div className="p-8 overflow-y-auto flex-1 text-stone-700 leading-relaxed font-sans space-y-6">
                                <p>
                                    Welcome to the projects repository. Here you will find a collection of my work, experiments, and case studies.
                                </p>
                                {/* We will populate this later or leave it as a placeholder for now */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-32 rounded-lg border-2 border-dashed border-stone-300 flex items-center justify-center text-stone-400 font-medium">
                                            Project {i} Placeholder
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
