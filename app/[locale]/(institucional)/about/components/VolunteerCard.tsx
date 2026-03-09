"use client";

import { motion } from "framer-motion";

export function VolunteerCard() {
    return (
        <motion.div
            className="bg-[#FB385E] text-white rounded-[24px] flex flex-col justify-center shadow-sm w-full h-full relative overflow-hidden group aspect-square p-4 md:p-6"
        >
            <h3 className="text-[38px] sm:text-[45px] md:text-[50px] lg:text-[60px] font-extrabold leading-[0.95] tracking-[-0.04em] break-words -ml-1 pr-2">
                Volunteer<br />
                Teacher
            </h3>
        </motion.div>
    );
}
