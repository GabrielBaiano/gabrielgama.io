"use client";

import { motion } from "framer-motion";

export function VolunteerCard() {
    return (
        <motion.div
            className="bg-[#FB385E] text-white rounded-[24px] flex flex-col justify-center shadow-sm w-full h-full relative overflow-hidden group aspect-square p-4 md:p-6"
        >
            <h3 className="text-[54px] sm:text-[64px] md:text-[60px] lg:text-[76px] font-extrabold leading-[0.95] tracking-[-0.04em] whitespace-nowrap -ml-1">
                Volunte<br />
                Teach
            </h3>
        </motion.div>
    );
}
