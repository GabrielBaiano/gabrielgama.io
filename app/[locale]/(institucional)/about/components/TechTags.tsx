"use client";

import { motion } from "framer-motion";

const tags = [
    "Next.js", "React/React native", "TypeScript", "Redux", "Angular", "Java",
    "Node.js", "TailwindCSS", "Jest", "PostgreSQL", "SOLID"
];

export function TechTags() {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-7xl mx-auto px-4">
            {tags.map((tag, idx) => (
                <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 + 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 bg-stone-700/90 text-stone-50 rounded-full text-xs font-medium cursor-pointer shadow-sm hover:shadow-md border border-stone-600/50 transition-shadow transition-colors select-none backdrop-blur-sm"
                >
                    {tag}
                </motion.div>
            ))}
        </div>
    );
}
